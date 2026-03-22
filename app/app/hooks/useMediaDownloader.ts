import { useState } from 'react';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Toast } from '@capacitor/toast';
import { Capacitor } from '@capacitor/core';

export function useMediaDownloader() {
  const [isDownloading, setIsDownloading] = useState(false);

  const extractDataRelativePathFromCapacitorUrl = (url: string) => {
    try {
      const parsed = new URL(url);
      const marker = '/_capacitor_file_';
      const idx = parsed.pathname.indexOf(marker);
      if (idx === -1) return null;
      const after = decodeURIComponent(parsed.pathname.slice(idx + marker.length));
      const filesMarker = '/files/';
      const filesIdx = after.indexOf(filesMarker);
      if (filesIdx === -1) return null;
      const relative = after.slice(filesIdx + filesMarker.length);
      if (!relative) return null;
      return relative;
    } catch {
      return null;
    }
  };

  const handleDownload = async (url: string, filename?: string) => {
    if (isDownloading) return;
    setIsDownloading(true);
    console.log('Starting download for:', url);

    try {
      // Sanitize filename
      const rawFilename = filename || url.split('/').pop() || `download_${Date.now()}`;
      const finalFilename = rawFilename.replace(/[^a-zA-Z0-9._-]/g, '_');

      if (Capacitor.isNativePlatform()) {
        // Android/Native Logic
        try {
            const permissionStatus = await Filesystem.requestPermissions();
            if (permissionStatus.publicStorage !== 'granted') {
                 console.log('Storage permission status:', permissionStatus);
            }
        } catch (permError) {
             console.warn('Error requesting permissions:', permError);
        }

        await Toast.show({
            text: 'Скачивание...',
            duration: 'short'
        });

        try {
            const dataRelativePath = extractDataRelativePathFromCapacitorUrl(url);
            if (dataRelativePath) {
              const data = await Filesystem.readFile({
                path: dataRelativePath,
                directory: Directory.Data
              });

              await Filesystem.writeFile({
                path: finalFilename,
                directory: Directory.Documents,
                data: data.data as string
              });

              await Toast.show({
                text: 'Файл сохранен в папку Документы',
                duration: 'long'
              });
              return;
            }

            // Download directly to public Documents directory
            // This avoids "Album" issues and is simpler
            const downloadResult = await Filesystem.downloadFile({
                path: finalFilename,
                url: url,
                directory: Directory.Documents
            });
            
            console.log('File saved to:', downloadResult.path);
            
            await Toast.show({
              text: 'Файл сохранен в папку Документы',
              duration: 'long'
            });
        } catch (nativeError) {
            console.error('Native download failed:', nativeError);
            const errorMessage = nativeError instanceof Error ? nativeError.message : String(nativeError);
            alert(`Ошибка скачивания: ${errorMessage}`); 
            throw nativeError;
        }

      } else {
        // Web Logic: Use internal API Proxy with fallback
        try {
            const proxyUrl = `/api/download?url=${encodeURIComponent(url)}`;
            
            // Trigger browser download via invisible iframe or simple navigation
            // Using window.location.href or window.open for direct stream download
            // This lets the browser handle the stream directly instead of buffering in JS blob
            const downloadLink = document.createElement('a');
            downloadLink.href = proxyUrl;
            downloadLink.download = finalFilename; // Hint to browser
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);

        } catch (webError) {
            console.error('Web download failed:', webError);
            // Fallback to direct opening if proxy fails
            if (confirm('Скачивание через прокси не удалось. Открыть прямую ссылку?')) {
                window.open(url, '_blank');
            }
        }
      }
    } catch (error) {
      console.error('Download process failed:', error);
      if (Capacitor.isNativePlatform()) {
        await Toast.show({
          text: 'Ошибка: ' + (error instanceof Error ? error.message : String(error)),
          duration: 'long'
        });
      } else {
        alert('Ошибка: ' + (error instanceof Error ? error.message : String(error)));
      }
    } finally {
      setIsDownloading(false);
    }
  };

  return { downloadMedia: handleDownload, isDownloading };
}

(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Desktop/3ch/app/app/hooks/useMediaDownloader.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useMediaDownloader",
    ()=>useMediaDownloader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/3ch/app/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f40$capacitor$2f$filesystem$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/3ch/app/node_modules/@capacitor/filesystem/dist/esm/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f40$capacitor$2f$filesystem$2f$dist$2f$esm$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/3ch/app/node_modules/@capacitor/filesystem/dist/esm/definitions.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f40$capacitor$2f$toast$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/3ch/app/node_modules/@capacitor/toast/dist/esm/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f40$capacitor$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/3ch/app/node_modules/@capacitor/core/dist/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
;
;
function useMediaDownloader() {
    _s();
    const [isDownloading, setIsDownloading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleDownload = async (url, filename)=>{
        if (isDownloading) return;
        setIsDownloading(true);
        console.log('Starting download for:', url);
        try {
            // Sanitize filename
            const rawFilename = filename || url.split('/').pop() || `download_${Date.now()}`;
            const finalFilename = rawFilename.replace(/[^a-zA-Z0-9._-]/g, '_');
            if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f40$capacitor$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Capacitor"].isNativePlatform()) {
                // Android/Native Logic
                try {
                    const permissionStatus = await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f40$capacitor$2f$filesystem$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Filesystem"].requestPermissions();
                    if (permissionStatus.publicStorage !== 'granted') {
                        console.log('Storage permission status:', permissionStatus);
                    }
                } catch (permError) {
                    console.warn('Error requesting permissions:', permError);
                }
                await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f40$capacitor$2f$toast$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Toast"].show({
                    text: 'Скачивание...',
                    duration: 'short'
                });
                try {
                    // Download directly to public Documents directory
                    // This avoids "Album" issues and is simpler
                    const downloadResult = await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f40$capacitor$2f$filesystem$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Filesystem"].downloadFile({
                        path: finalFilename,
                        url: url,
                        directory: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f40$capacitor$2f$filesystem$2f$dist$2f$esm$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Directory"].Documents
                    });
                    console.log('File saved to:', downloadResult.path);
                    await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f40$capacitor$2f$toast$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Toast"].show({
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
            if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f40$capacitor$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Capacitor"].isNativePlatform()) {
                await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f40$capacitor$2f$toast$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Toast"].show({
                    text: 'Ошибка: ' + (error instanceof Error ? error.message : String(error)),
                    duration: 'long'
                });
            } else {
                alert('Ошибка: ' + (error instanceof Error ? error.message : String(error)));
            }
        } finally{
            setIsDownloading(false);
        }
    };
    return {
        downloadMedia: handleDownload,
        isDownloading
    };
}
_s(useMediaDownloader, "I+IY6bHIajfeJNOs4vl6hY3OWII=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/3ch/app/app/components/FullscreenPlayer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>FullscreenPlayer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/3ch/app/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/3ch/app/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/3ch/app/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/3ch/app/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/3ch/app/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__ = __turbopack_context__.i("[project]/Desktop/3ch/app/node_modules/lucide-react/dist/esm/icons/play.js [app-client] (ecmascript) <export default as Play>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pause$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pause$3e$__ = __turbopack_context__.i("[project]/Desktop/3ch/app/node_modules/lucide-react/dist/esm/icons/pause.js [app-client] (ecmascript) <export default as Pause>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$volume$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Volume2$3e$__ = __turbopack_context__.i("[project]/Desktop/3ch/app/node_modules/lucide-react/dist/esm/icons/volume-2.js [app-client] (ecmascript) <export default as Volume2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$volume$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__VolumeX$3e$__ = __turbopack_context__.i("[project]/Desktop/3ch/app/node_modules/lucide-react/dist/esm/icons/volume-x.js [app-client] (ecmascript) <export default as VolumeX>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/Desktop/3ch/app/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__ = __turbopack_context__.i("[project]/Desktop/3ch/app/node_modules/lucide-react/dist/esm/icons/download.js [app-client] (ecmascript) <export default as Download>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/Desktop/3ch/app/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$app$2f$hooks$2f$useMediaDownloader$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/3ch/app/app/hooks/useMediaDownloader.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function FullscreenPlayer(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(65);
    if ($[0] !== "a4e9c98ddd41aab0c2acc8748d383d497cfb280f22b4a3c55a144b57ac3394c9") {
        for(let $i = 0; $i < 65; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "a4e9c98ddd41aab0c2acc8748d383d497cfb280f22b4a3c55a144b57ac3394c9";
    }
    const { src, poster, initialTime: t1, onClose } = t0;
    const initialTime = t1 === undefined ? 0 : t1;
    const videoRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [isPlaying, setIsPlaying] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isMuted, setIsMuted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [currentTime, setCurrentTime] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialTime);
    const [duration, setDuration] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [isBuffering, setIsBuffering] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [showControls, setShowControls] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const controlsTimeoutRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const { downloadMedia, isDownloading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$app$2f$hooks$2f$useMediaDownloader$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMediaDownloader"])();
    let t2;
    if ($[1] !== initialTime) {
        t2 = ({
            "FullscreenPlayer[useEffect()]": ()=>{
                const video = videoRef.current;
                if (!video) {
                    return;
                }
                video.currentTime = initialTime;
                video.muted = false;
                video.volume = 1;
                setIsMuted(false);
                const playPromise = video.play();
                if (playPromise !== undefined) {
                    playPromise.then({
                        "FullscreenPlayer[useEffect() > playPromise.then()]": ()=>{
                            setIsPlaying(true);
                        }
                    }["FullscreenPlayer[useEffect() > playPromise.then()]"]).catch({
                        "FullscreenPlayer[useEffect() > (anonymous)()]": (error)=>{
                            console.warn("Autoplay prevented:", error);
                            setIsPlaying(false);
                        }
                    }["FullscreenPlayer[useEffect() > (anonymous)()]"]);
                }
                return ()=>{
                    if (controlsTimeoutRef.current) {
                        clearTimeout(controlsTimeoutRef.current);
                    }
                };
            }
        })["FullscreenPlayer[useEffect()]"];
        $[1] = initialTime;
        $[2] = t2;
    } else {
        t2 = $[2];
    }
    let t3;
    if ($[3] !== initialTime || $[4] !== src) {
        t3 = [
            initialTime,
            src
        ];
        $[3] = initialTime;
        $[4] = src;
        $[5] = t3;
    } else {
        t3 = $[5];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t2, t3);
    let t4;
    if ($[6] !== isPlaying) {
        t4 = ({
            "FullscreenPlayer[handleInteraction]": ()=>{
                setShowControls(true);
                if (controlsTimeoutRef.current) {
                    clearTimeout(controlsTimeoutRef.current);
                }
                if (isPlaying) {
                    controlsTimeoutRef.current = setTimeout({
                        "FullscreenPlayer[handleInteraction > setTimeout()]": ()=>{
                            setShowControls(false);
                        }
                    }["FullscreenPlayer[handleInteraction > setTimeout()]"], 2500);
                }
            }
        })["FullscreenPlayer[handleInteraction]"];
        $[6] = isPlaying;
        $[7] = t4;
    } else {
        t4 = $[7];
    }
    const handleInteraction = t4;
    let t5;
    if ($[8] !== handleInteraction || $[9] !== isPlaying) {
        t5 = ({
            "FullscreenPlayer[useEffect()]": ()=>{
                if (isPlaying) {
                    handleInteraction();
                } else {
                    setShowControls(true);
                }
            }
        })["FullscreenPlayer[useEffect()]"];
        $[8] = handleInteraction;
        $[9] = isPlaying;
        $[10] = t5;
    } else {
        t5 = $[10];
    }
    let t6;
    if ($[11] !== isPlaying) {
        t6 = [
            isPlaying
        ];
        $[11] = isPlaying;
        $[12] = t6;
    } else {
        t6 = $[12];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t5, t6);
    let t7;
    if ($[13] !== handleInteraction) {
        t7 = ({
            "FullscreenPlayer[togglePlay]": (e)=>{
                e?.stopPropagation();
                const video_0 = videoRef.current;
                if (!video_0) {
                    return;
                }
                if (video_0.paused) {
                    video_0.play();
                    setIsPlaying(true);
                } else {
                    video_0.pause();
                    setIsPlaying(false);
                }
                handleInteraction();
            }
        })["FullscreenPlayer[togglePlay]"];
        $[13] = handleInteraction;
        $[14] = t7;
    } else {
        t7 = $[14];
    }
    const togglePlay = t7;
    let t8;
    if ($[15] !== handleInteraction) {
        t8 = ({
            "FullscreenPlayer[toggleMute]": (e_0)=>{
                e_0.stopPropagation();
                const video_1 = videoRef.current;
                if (!video_1) {
                    return;
                }
                video_1.muted = !video_1.muted;
                setIsMuted(video_1.muted);
                handleInteraction();
            }
        })["FullscreenPlayer[toggleMute]"];
        $[15] = handleInteraction;
        $[16] = t8;
    } else {
        t8 = $[16];
    }
    const toggleMute = t8;
    let t9;
    if ($[17] === Symbol.for("react.memo_cache_sentinel")) {
        t9 = ({
            "FullscreenPlayer[handleTimeUpdate]": ()=>{
                const video_2 = videoRef.current;
                if (!video_2) {
                    return;
                }
                setCurrentTime(video_2.currentTime);
                setDuration(video_2.duration || 0);
            }
        })["FullscreenPlayer[handleTimeUpdate]"];
        $[17] = t9;
    } else {
        t9 = $[17];
    }
    const handleTimeUpdate = t9;
    let t10;
    if ($[18] === Symbol.for("react.memo_cache_sentinel")) {
        t10 = ({
            "FullscreenPlayer[handleSeek]": (e_1)=>{
                e_1.stopPropagation();
                const video_3 = videoRef.current;
                if (!video_3) {
                    return;
                }
                const progressBar = e_1.currentTarget;
                const rect = progressBar.getBoundingClientRect();
                const x = e_1.clientX - rect.left;
                const percentage = Math.max(0, Math.min(1, x / rect.width));
                video_3.currentTime = percentage * video_3.duration;
                setCurrentTime(video_3.currentTime);
            }
        })["FullscreenPlayer[handleSeek]"];
        $[18] = t10;
    } else {
        t10 = $[18];
    }
    const handleSeek = t10;
    let t11;
    let t12;
    let t13;
    let t14;
    if ($[19] === Symbol.for("react.memo_cache_sentinel")) {
        t11 = {
            opacity: 0
        };
        t12 = {
            opacity: 1
        };
        t13 = {
            opacity: 0
        };
        t14 = {
            duration: 0.3
        };
        $[19] = t11;
        $[20] = t12;
        $[21] = t13;
        $[22] = t14;
    } else {
        t11 = $[19];
        t12 = $[20];
        t13 = $[21];
        t14 = $[22];
    }
    let t15;
    if ($[23] === Symbol.for("react.memo_cache_sentinel")) {
        t15 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
            size: 24
        }, void 0, false, {
            fileName: "[project]/Desktop/3ch/app/app/components/FullscreenPlayer.tsx",
            lineNumber: 250,
            columnNumber: 11
        }, this);
        $[23] = t15;
    } else {
        t15 = $[23];
    }
    let t16;
    if ($[24] !== onClose) {
        t16 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            className: "absolute top-4 right-4 text-white/70 hover:text-white p-2 z-50 bg-black/50 rounded-full backdrop-blur-md transition-colors",
            onClick: onClose,
            children: t15
        }, void 0, false, {
            fileName: "[project]/Desktop/3ch/app/app/components/FullscreenPlayer.tsx",
            lineNumber: 257,
            columnNumber: 11
        }, this);
        $[24] = onClose;
        $[25] = t16;
    } else {
        t16 = $[25];
    }
    let t17;
    let t18;
    let t19;
    if ($[26] === Symbol.for("react.memo_cache_sentinel")) {
        t17 = ({
            "FullscreenPlayer[<video>.onWaiting]": ()=>setIsBuffering(true)
        })["FullscreenPlayer[<video>.onWaiting]"];
        t18 = ({
            "FullscreenPlayer[<video>.onCanPlay]": ()=>setIsBuffering(false)
        })["FullscreenPlayer[<video>.onCanPlay]"];
        t19 = ({
            "FullscreenPlayer[<video>.onEnded]": ()=>{
                setIsPlaying(false);
                setShowControls(true);
                if (videoRef.current) {
                    videoRef.current.currentTime = 0;
                }
            }
        })["FullscreenPlayer[<video>.onEnded]"];
        $[26] = t17;
        $[27] = t18;
        $[28] = t19;
    } else {
        t17 = $[26];
        t18 = $[27];
        t19 = $[28];
    }
    let t20;
    if ($[29] !== poster || $[30] !== src || $[31] !== togglePlay) {
        t20 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
            ref: videoRef,
            src: src,
            poster: poster,
            className: "max-w-full max-h-full object-contain shadow-2xl",
            playsInline: true,
            onTimeUpdate: handleTimeUpdate,
            onWaiting: t17,
            onCanPlay: t18,
            onEnded: t19,
            onClick: togglePlay
        }, void 0, false, {
            fileName: "[project]/Desktop/3ch/app/app/components/FullscreenPlayer.tsx",
            lineNumber: 292,
            columnNumber: 11
        }, this);
        $[29] = poster;
        $[30] = src;
        $[31] = togglePlay;
        $[32] = t20;
    } else {
        t20 = $[32];
    }
    let t21;
    if ($[33] !== isBuffering) {
        t21 = isBuffering && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
            initial: {
                opacity: 0,
                scale: 0.8
            },
            animate: {
                opacity: 1,
                scale: 1
            },
            exit: {
                opacity: 0,
                scale: 0.8
            },
            className: "absolute inset-0 flex items-center justify-center pointer-events-none",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-black/40 backdrop-blur-sm p-4 rounded-full",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                    className: "w-8 h-8 text-white animate-spin"
                }, void 0, false, {
                    fileName: "[project]/Desktop/3ch/app/app/components/FullscreenPlayer.tsx",
                    lineNumber: 311,
                    columnNumber: 153
                }, this)
            }, void 0, false, {
                fileName: "[project]/Desktop/3ch/app/app/components/FullscreenPlayer.tsx",
                lineNumber: 311,
                columnNumber: 90
            }, this)
        }, void 0, false, {
            fileName: "[project]/Desktop/3ch/app/app/components/FullscreenPlayer.tsx",
            lineNumber: 302,
            columnNumber: 26
        }, this);
        $[33] = isBuffering;
        $[34] = t21;
    } else {
        t21 = $[34];
    }
    let t22;
    if ($[35] !== t21) {
        t22 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
            children: t21
        }, void 0, false, {
            fileName: "[project]/Desktop/3ch/app/app/components/FullscreenPlayer.tsx",
            lineNumber: 319,
            columnNumber: 11
        }, this);
        $[35] = t21;
        $[36] = t22;
    } else {
        t22 = $[36];
    }
    let t23;
    if ($[37] !== isBuffering || $[38] !== isPlaying) {
        t23 = !isPlaying && !isBuffering && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
            initial: {
                opacity: 0,
                scale: 0.5
            },
            animate: {
                opacity: 1,
                scale: 1
            },
            exit: {
                opacity: 0,
                scale: 1.5
            },
            className: "absolute inset-0 flex items-center justify-center pointer-events-none",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-black/40 backdrop-blur-md p-6 rounded-full border border-white/10",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__["Play"], {
                    className: "w-12 h-12 text-white fill-white"
                }, void 0, false, {
                    fileName: "[project]/Desktop/3ch/app/app/components/FullscreenPlayer.tsx",
                    lineNumber: 336,
                    columnNumber: 176
                }, this)
            }, void 0, false, {
                fileName: "[project]/Desktop/3ch/app/app/components/FullscreenPlayer.tsx",
                lineNumber: 336,
                columnNumber: 90
            }, this)
        }, void 0, false, {
            fileName: "[project]/Desktop/3ch/app/app/components/FullscreenPlayer.tsx",
            lineNumber: 327,
            columnNumber: 41
        }, this);
        $[37] = isBuffering;
        $[38] = isPlaying;
        $[39] = t23;
    } else {
        t23 = $[39];
    }
    let t24;
    if ($[40] !== t23) {
        t24 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
            children: t23
        }, void 0, false, {
            fileName: "[project]/Desktop/3ch/app/app/components/FullscreenPlayer.tsx",
            lineNumber: 345,
            columnNumber: 11
        }, this);
        $[40] = t23;
        $[41] = t24;
    } else {
        t24 = $[41];
    }
    let t25;
    if ($[42] !== currentTime || $[43] !== downloadMedia || $[44] !== duration || $[45] !== isDownloading || $[46] !== isMuted || $[47] !== isPlaying || $[48] !== showControls || $[49] !== src || $[50] !== toggleMute || $[51] !== togglePlay) {
        t25 = showControls && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
            initial: {
                opacity: 0,
                y: 20
            },
            animate: {
                opacity: 1,
                y: 0
            },
            exit: {
                opacity: 0,
                y: 20
            },
            transition: {
                duration: 0.2
            },
            className: "absolute bottom-0 left-0 right-0 p-4 md:p-8 bg-gradient-to-t from-black/90 via-black/50 to-transparent pt-20",
            onClick: _FullscreenPlayerMotionDivOnClick,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-4xl mx-auto w-full space-y-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative w-full h-4 group cursor-pointer flex items-center",
                        onClick: handleSeek,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute w-full h-[2px] bg-white/20 group-hover:h-[4px] transition-all duration-200 rounded-full"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/3ch/app/app/components/FullscreenPlayer.tsx",
                                lineNumber: 364,
                                columnNumber: 322
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                className: "absolute h-[2px] bg-cyan-400 group-hover:h-[4px] transition-all duration-200 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.5)]",
                                style: {
                                    width: `${currentTime / duration * 100}%`
                                },
                                layoutId: "progress"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/3ch/app/app/components/FullscreenPlayer.tsx",
                                lineNumber: 364,
                                columnNumber: 438
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute h-3 w-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-lg scale-0 group-hover:scale-100",
                                style: {
                                    left: `${currentTime / duration * 100}%`,
                                    transform: "translateX(-50%)"
                                }
                            }, void 0, false, {
                                fileName: "[project]/Desktop/3ch/app/app/components/FullscreenPlayer.tsx",
                                lineNumber: 366,
                                columnNumber: 36
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/3ch/app/app/components/FullscreenPlayer.tsx",
                        lineNumber: 364,
                        columnNumber: 225
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between backdrop-blur-md bg-white/5 rounded-2xl px-4 py-3 border border-white/10 shadow-lg",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: {
                                            "FullscreenPlayer[<button>.onClick]": ()=>togglePlay()
                                        }["FullscreenPlayer[<button>.onClick]"],
                                        className: "text-white/90 hover:text-white hover:scale-110 transition-all active:scale-95",
                                        children: isPlaying ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pause$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pause$3e$__["Pause"], {
                                            size: 24,
                                            fill: "white"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/3ch/app/app/components/FullscreenPlayer.tsx",
                                            lineNumber: 371,
                                            columnNumber: 157
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__["Play"], {
                                            size: 24,
                                            fill: "white"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/3ch/app/app/components/FullscreenPlayer.tsx",
                                            lineNumber: 371,
                                            columnNumber: 192
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/3ch/app/app/components/FullscreenPlayer.tsx",
                                        lineNumber: 369,
                                        columnNumber: 197
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2 group/volume",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: toggleMute,
                                            className: "text-white/80 hover:text-white transition-colors",
                                            children: isMuted ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$volume$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__VolumeX$3e$__["VolumeX"], {
                                                size: 20
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/3ch/app/app/components/FullscreenPlayer.tsx",
                                                lineNumber: 371,
                                                columnNumber: 388
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$volume$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Volume2$3e$__["Volume2"], {
                                                size: 20
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/3ch/app/app/components/FullscreenPlayer.tsx",
                                                lineNumber: 371,
                                                columnNumber: 412
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/3ch/app/app/components/FullscreenPlayer.tsx",
                                            lineNumber: 371,
                                            columnNumber: 287
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/3ch/app/app/components/FullscreenPlayer.tsx",
                                        lineNumber: 371,
                                        columnNumber: 233
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs font-mono text-white/60",
                                        children: [
                                            formatTime(currentTime),
                                            " / ",
                                            formatTime(duration)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/3ch/app/app/components/FullscreenPlayer.tsx",
                                        lineNumber: 371,
                                        columnNumber: 449
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/3ch/app/app/components/FullscreenPlayer.tsx",
                                lineNumber: 369,
                                columnNumber: 156
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-4",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: {
                                        "FullscreenPlayer[<button>.onClick]": (e_3)=>{
                                            e_3.stopPropagation();
                                            downloadMedia(src);
                                        }
                                    }["FullscreenPlayer[<button>.onClick]"],
                                    className: "text-white/80 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full",
                                    title: "\u0421\u043A\u0430\u0447\u0430\u0442\u044C",
                                    disabled: isDownloading,
                                    children: isDownloading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                        size: 20,
                                        className: "animate-spin"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/3ch/app/app/components/FullscreenPlayer.tsx",
                                        lineNumber: 376,
                                        columnNumber: 245
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"], {
                                        size: 20
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/3ch/app/app/components/FullscreenPlayer.tsx",
                                        lineNumber: 376,
                                        columnNumber: 294
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/3ch/app/app/components/FullscreenPlayer.tsx",
                                    lineNumber: 371,
                                    columnNumber: 603
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Desktop/3ch/app/app/components/FullscreenPlayer.tsx",
                                lineNumber: 371,
                                columnNumber: 562
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/3ch/app/app/components/FullscreenPlayer.tsx",
                        lineNumber: 369,
                        columnNumber: 22
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/3ch/app/app/components/FullscreenPlayer.tsx",
                lineNumber: 364,
                columnNumber: 173
            }, this)
        }, void 0, false, {
            fileName: "[project]/Desktop/3ch/app/app/components/FullscreenPlayer.tsx",
            lineNumber: 353,
            columnNumber: 27
        }, this);
        $[42] = currentTime;
        $[43] = downloadMedia;
        $[44] = duration;
        $[45] = isDownloading;
        $[46] = isMuted;
        $[47] = isPlaying;
        $[48] = showControls;
        $[49] = src;
        $[50] = toggleMute;
        $[51] = togglePlay;
        $[52] = t25;
    } else {
        t25 = $[52];
    }
    let t26;
    if ($[53] !== t25) {
        t26 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
            children: t25
        }, void 0, false, {
            fileName: "[project]/Desktop/3ch/app/app/components/FullscreenPlayer.tsx",
            lineNumber: 393,
            columnNumber: 11
        }, this);
        $[53] = t25;
        $[54] = t26;
    } else {
        t26 = $[54];
    }
    let t27;
    if ($[55] !== handleInteraction || $[56] !== t16 || $[57] !== t20 || $[58] !== t22 || $[59] !== t24 || $[60] !== t26) {
        t27 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative w-full h-full flex items-center justify-center",
            onMouseMove: handleInteraction,
            onTouchStart: handleInteraction,
            children: [
                t16,
                t20,
                t22,
                t24,
                t26
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/3ch/app/app/components/FullscreenPlayer.tsx",
            lineNumber: 401,
            columnNumber: 11
        }, this);
        $[55] = handleInteraction;
        $[56] = t16;
        $[57] = t20;
        $[58] = t22;
        $[59] = t24;
        $[60] = t26;
        $[61] = t27;
    } else {
        t27 = $[61];
    }
    let t28;
    if ($[62] !== onClose || $[63] !== t27) {
        t28 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
            initial: t11,
            animate: t12,
            exit: t13,
            transition: t14,
            className: "fixed inset-0 z-50 bg-black/95 flex items-center justify-center overflow-hidden",
            onClick: onClose,
            children: t27
        }, void 0, false, {
            fileName: "[project]/Desktop/3ch/app/app/components/FullscreenPlayer.tsx",
            lineNumber: 414,
            columnNumber: 11
        }, this);
        $[62] = onClose;
        $[63] = t27;
        $[64] = t28;
    } else {
        t28 = $[64];
    }
    return t28;
}
_s(FullscreenPlayer, "8RJszcQ9f/dgy7rfsyPOAA3QMyM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$app$2f$hooks$2f$useMediaDownloader$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMediaDownloader"]
    ];
});
_c = FullscreenPlayer;
function _FullscreenPlayerMotionDivOnClick(e_2) {
    return e_2.stopPropagation();
}
function formatTime(seconds) {
    if (!seconds || isNaN(seconds)) return "0:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
}
var _c;
__turbopack_context__.k.register(_c, "FullscreenPlayer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/3ch/app/app/components/FullscreenViewer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>FullscreenViewer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/3ch/app/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/3ch/app/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/3ch/app/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/3ch/app/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/3ch/app/node_modules/framer-motion/dist/es/value/use-motion-value.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/3ch/app/node_modules/framer-motion/dist/es/value/use-transform.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$hooks$2f$use$2d$animation$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/3ch/app/node_modules/framer-motion/dist/es/animation/hooks/use-animation.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__ = __turbopack_context__.i("[project]/Desktop/3ch/app/node_modules/lucide-react/dist/esm/icons/download.js [app-client] (ecmascript) <export default as Download>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/Desktop/3ch/app/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$app$2f$components$2f$FullscreenPlayer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/3ch/app/app/components/FullscreenPlayer.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$app$2f$hooks$2f$useMediaDownloader$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/3ch/app/app/hooks/useMediaDownloader.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/3ch/app/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$body$2d$scroll$2d$lock$2f$lib$2f$bodyScrollLock$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/3ch/app/node_modules/body-scroll-lock/lib/bodyScrollLock.esm.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
function FullscreenViewer(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(24);
    if ($[0] !== "f4f501dcb13b2381de48178ae23c21a6cda1d15804a8385af3b49e09e13cc532") {
        for(let $i = 0; $i < 24; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "f4f501dcb13b2381de48178ae23c21a6cda1d15804a8385af3b49e09e13cc532";
    }
    const { item, onClose } = t0;
    const { downloadMedia, isDownloading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$app$2f$hooks$2f$useMediaDownloader$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMediaDownloader"])();
    const y = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMotionValue"])(0);
    const x = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMotionValue"])(0);
    const controls = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$hooks$2f$use$2d$animation$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAnimation"])();
    let t1;
    let t2;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = [
            -200,
            0,
            200
        ];
        t2 = [
            0,
            1,
            0
        ];
        $[1] = t1;
        $[2] = t2;
    } else {
        t1 = $[1];
        t2 = $[2];
    }
    const opacity = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"])(y, t1, t2);
    let t3;
    let t4;
    if ($[3] === Symbol.for("react.memo_cache_sentinel")) {
        t3 = [
            -200,
            0,
            200
        ];
        t4 = [
            0.85,
            1,
            0.85
        ];
        $[3] = t3;
        $[4] = t4;
    } else {
        t3 = $[3];
        t4 = $[4];
    }
    const scale = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"])(y, t3, t4);
    let t5;
    let t6;
    if ($[5] !== item) {
        t5 = ({
            "FullscreenViewer[useEffect()]": ()=>{
                if (item) {
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$body$2d$scroll$2d$lock$2f$lib$2f$bodyScrollLock$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["disableBodyScroll"])(document.body);
                } else {
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$body$2d$scroll$2d$lock$2f$lib$2f$bodyScrollLock$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["enableBodyScroll"])(document.body);
                }
                return _temp;
            }
        })["FullscreenViewer[useEffect()]"];
        t6 = [
            item
        ];
        $[5] = item;
        $[6] = t5;
        $[7] = t6;
    } else {
        t5 = $[6];
        t6 = $[7];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t5, t6);
    let t7;
    if ($[8] !== controls || $[9] !== onClose) {
        t7 = ({
            "FullscreenViewer[handleDragEnd]": async (_, info)=>{
                const { offset, velocity } = info;
                if (Math.abs(offset.y) > 100 || Math.abs(velocity.y) > 500) {
                    if (Math.abs(velocity.y) > 500) {
                        await controls.start({
                            y: velocity.y > 0 ? window.innerHeight : -window.innerHeight,
                            opacity: 0,
                            transition: {
                                duration: 0.2,
                                ease: "easeOut"
                            }
                        });
                    }
                    onClose();
                } else {
                    controls.start({
                        x: 0,
                        y: 0,
                        scale: 1,
                        opacity: 1
                    });
                }
            }
        })["FullscreenViewer[handleDragEnd]"];
        $[8] = controls;
        $[9] = onClose;
        $[10] = t7;
    } else {
        t7 = $[10];
    }
    const handleDragEnd = t7;
    let t8;
    if ($[11] !== controls || $[12] !== downloadMedia || $[13] !== handleDragEnd || $[14] !== isDownloading || $[15] !== item || $[16] !== onClose || $[17] !== opacity || $[18] !== scale || $[19] !== x || $[20] !== y) {
        t8 = !item ? null : item.type === "video" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$app$2f$components$2f$FullscreenPlayer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            src: item.src,
            poster: item.poster,
            initialTime: item.currentTime,
            onClose: onClose
        }, "video-player", false, {
            fileName: "[project]/Desktop/3ch/app/app/components/FullscreenViewer.tsx",
            lineNumber: 119,
            columnNumber: 49
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
            initial: {
                opacity: 0
            },
            animate: {
                opacity: 1
            },
            exit: {
                opacity: 0,
                transition: {
                    duration: 0.2
                }
            },
            style: {
                opacity
            },
            className: "fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-[30px] bg-black/30",
            onClick: onClose,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                layoutId: item.layoutId,
                animate: controls,
                onLayoutAnimationComplete: {
                    "FullscreenViewer[<motion.div>.onLayoutAnimationComplete]": ()=>{
                        controls.set({
                            x: 0,
                            y: 0,
                            opacity: 1,
                            scale: 1
                        });
                    }
                }["FullscreenViewer[<motion.div>.onLayoutAnimationComplete]"],
                style: {
                    y,
                    x,
                    scale,
                    opacity: 1
                },
                drag: true,
                dragConstraints: {
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0
                },
                dragElastic: 0.7,
                onDragEnd: handleDragEnd,
                className: "relative w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing",
                onClick: _FullscreenViewerMotionDivOnClick,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].img, {
                        src: item.src,
                        alt: item.alt || "Full size image",
                        className: "max-w-full max-h-[90vh] object-contain rounded-lg shadow-none",
                        layoutId: `${item.layoutId}-image`,
                        drag: false
                    }, void 0, false, {
                        fileName: "[project]/Desktop/3ch/app/app/components/FullscreenViewer.tsx",
                        lineNumber: 149,
                        columnNumber: 201
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                        initial: {
                            opacity: 0,
                            y: 20
                        },
                        animate: {
                            opacity: 1,
                            y: 0
                        },
                        exit: {
                            opacity: 0,
                            y: 20
                        },
                        className: "absolute bottom-8 right-6 z-50 text-white/90 hover:text-white p-3 bg-black/40 rounded-full backdrop-blur-md transition-colors hover:bg-black/60",
                        onClick: {
                            "FullscreenViewer[<motion.button>.onClick]": (e_0)=>{
                                e_0.stopPropagation();
                                downloadMedia(item.src);
                            }
                        }["FullscreenViewer[<motion.button>.onClick]"],
                        title: "\u0421\u043A\u0430\u0447\u0430\u0442\u044C",
                        disabled: isDownloading,
                        children: isDownloading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                            size: 28,
                            className: "animate-spin"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/3ch/app/app/components/FullscreenViewer.tsx",
                            lineNumber: 163,
                            columnNumber: 152
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"], {
                            size: 28
                        }, void 0, false, {
                            fileName: "[project]/Desktop/3ch/app/app/components/FullscreenViewer.tsx",
                            lineNumber: 163,
                            columnNumber: 201
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/3ch/app/app/components/FullscreenViewer.tsx",
                        lineNumber: 149,
                        columnNumber: 389
                    }, this),
                    item.alt && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute bottom-4 left-0 right-0 text-center text-gray-400 text-sm pointer-events-none",
                        children: item.alt
                    }, void 0, false, {
                        fileName: "[project]/Desktop/3ch/app/app/components/FullscreenViewer.tsx",
                        lineNumber: 163,
                        columnNumber: 253
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/3ch/app/app/components/FullscreenViewer.tsx",
                lineNumber: 130,
                columnNumber: 127
            }, this)
        }, "image-viewer", false, {
            fileName: "[project]/Desktop/3ch/app/app/components/FullscreenViewer.tsx",
            lineNumber: 119,
            columnNumber: 176
        }, this);
        $[11] = controls;
        $[12] = downloadMedia;
        $[13] = handleDragEnd;
        $[14] = isDownloading;
        $[15] = item;
        $[16] = onClose;
        $[17] = opacity;
        $[18] = scale;
        $[19] = x;
        $[20] = y;
        $[21] = t8;
    } else {
        t8 = $[21];
    }
    let t9;
    if ($[22] !== t8) {
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
            children: t8
        }, void 0, false, {
            fileName: "[project]/Desktop/3ch/app/app/components/FullscreenViewer.tsx",
            lineNumber: 180,
            columnNumber: 10
        }, this);
        $[22] = t8;
        $[23] = t9;
    } else {
        t9 = $[23];
    }
    return t9;
}
_s(FullscreenViewer, "sx2JeYebPmQOhQ1uqKp12q6b1E8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$app$2f$hooks$2f$useMediaDownloader$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMediaDownloader"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMotionValue"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMotionValue"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$hooks$2f$use$2d$animation$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAnimation"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"]
    ];
});
_c = FullscreenViewer;
function _FullscreenViewerMotionDivOnClick(e) {
    return e.stopPropagation();
}
function _temp() {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$body$2d$scroll$2d$lock$2f$lib$2f$bodyScrollLock$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clearAllBodyScrollLocks"])();
}
var _c;
__turbopack_context__.k.register(_c, "FullscreenViewer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/3ch/app/app/components/FullscreenViewer.tsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/Desktop/3ch/app/app/components/FullscreenViewer.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=Desktop_3ch_app_app_469c1e7d._.js.map
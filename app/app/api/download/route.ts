import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'Missing url parameter' }, { status: 400 });
  }

  // Basic validation
  try {
    const targetUrl = new URL(url);
    if (!['2ch.hk', '2ch.life'].includes(targetUrl.hostname)) {
       console.warn('Proxying request to non-standard domain:', targetUrl.hostname);
    }
  } catch (e) {
    return NextResponse.json({ error: 'Invalid URL' }, { status: 400 });
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
        return NextResponse.json({ error: 'Failed to fetch source' }, { status: response.status });
    }

    const contentType = response.headers.get('content-type') || 'application/octet-stream';
    const filename = url.split('/').pop() || 'download.bin';
    const encodedFilename = encodeURIComponent(filename);

    const headers = new Headers();
    headers.set('Content-Type', contentType);
    headers.set('Content-Disposition', `attachment; filename*=UTF-8''${encodedFilename}`);
    
    // Copy relevant headers for correct media handling
    if (response.headers.has('Content-Length')) {
        headers.set('Content-Length', response.headers.get('Content-Length')!);
    }
    
    // Explicitly set cache control to ensure smooth streaming/downloading
    headers.set('Cache-Control', 'no-cache');

    return new NextResponse(response.body, {
        status: 200,
        headers,
    });

  } catch (error) {
    console.error('Proxy download error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

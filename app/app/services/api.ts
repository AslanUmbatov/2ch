import { Thread } from '../types';
import { CapacitorHttp, Capacitor } from '@capacitor/core';

const BASE_DOMAINS = ['https://2ch.life', 'https://2ch.hk', 'https://2ch.org'];

// Expanded proxy list - Reordered for reliability
const CORS_PROXIES = [
  // CodeTabs - usually works well without config
  { url: 'https://api.codetabs.com/v1/proxy?quest=', type: 'direct' },
  // CORS Proxy IO
  { url: 'https://corsproxy.io/?', type: 'direct' },
  // AllOrigins (JSON wrapper)
  { url: 'https://api.allorigins.win/get?url=', type: 'json_wrapper' },
  // ThingProxy
  { url: 'https://thingproxy.freeboard.io/fetch/', type: 'direct' }
];

// Timeout helper - reduced to fail faster
const fetchWithTimeout = async (promise: Promise<any>, timeoutMs: number = 8000) => {
  let timeoutHandle: NodeJS.Timeout;
  const timeoutPromise = new Promise((_, reject) => {
    timeoutHandle = setTimeout(() => reject(new Error('Request timed out')), timeoutMs);
  });

  return Promise.race([
    promise.then((res) => {
      clearTimeout(timeoutHandle);
      return res;
    }),
    timeoutPromise
  ]);
};

// Check if response looks like HTML (Cloudflare Captcha or Block page)
const isHtmlResponse = (data: any): boolean => {
    if (typeof data === 'string') {
        const trimmed = data.trim().toLowerCase();
        return trimmed.startsWith('<!doctype html') || trimmed.startsWith('<html');
    }
    return false;
};

async function fetchWithFallback(path: string) {
  const errors: string[] = [];

  // 1. Try direct/native request first ONLY if on Native Platform (Android/iOS)
  if (Capacitor.isNativePlatform()) {
    for (const domain of BASE_DOMAINS) {
        const url = `${domain}${path}`;
        try {
        console.log(`Trying CapacitorHttp (Native): ${url}`);
        const response = await fetchWithTimeout(
            CapacitorHttp.get({
            url: url,
            headers: {
                'Accept': 'application/json',
                // Use a real Android User-Agent to look less suspicious
                'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36',
                'Cache-Control': 'no-cache'
            },
            connectTimeout: 5000,
            readTimeout: 5000
            }), 
            8000
        );
        
        if (response.status === 200) {
            // CRITICAL: Check if we got HTML (Cloudflare Captcha) instead of JSON
            if (isHtmlResponse(response.data)) {
                console.warn(`Cloudflare Captcha detected from ${url} (got HTML instead of JSON)`);
                errors.push(`${url} - Cloudflare Captcha`);
                continue; // Try next domain or fall through to proxies
            }
            
            console.log(`Success CapacitorHttp: ${url}`);
            return response.data;
        } else {
            console.warn(`CapacitorHttp status ${response.status} for ${url}`);
            errors.push(`${url} - Status ${response.status}`);
        }
        } catch (error: any) {
        console.warn(`Capacitor fetch failed from ${domain}:`, error);
        errors.push(`${url} - ${error.message}`);
        }
    }
  }

  // 2. Fallback: Use Proxies (for Web or if Native failed)
  console.log('Falling back to Proxies...');

  for (const proxy of CORS_PROXIES) {
    for (const domain of BASE_DOMAINS) {
       const targetUrl = encodeURIComponent(`${domain}${path}`);
       let proxyUrl = '';

       // Construct Proxy URL
       if (proxy.url.includes('corsproxy.io')) {
           proxyUrl = `${proxy.url}${targetUrl}`;
       } else {
           proxyUrl = `${proxy.url}${targetUrl}`;
       }
       
       // Add cache busting for allorigins
       if (proxy.url.includes('allorigins')) {
           proxyUrl += `&t=${Date.now()}`;
       }

       try {
          console.log(`Trying Proxy: ${proxyUrl}`);
          
          const response = await fetchWithTimeout(
            fetch(proxyUrl, {
                method: 'GET',
                // No headers to avoid preflight!
            }),
            8000 
          );
          
          if (response.ok) {
              const text = await response.text();
              
              // Check for HTML/Cloudflare from proxy
              if (isHtmlResponse(text)) {
                   console.warn(`Proxy ${proxyUrl} returned HTML (likely Cloudflare)`);
                   errors.push(`${proxy.url} - Cloudflare HTML`);
                   continue;
              }

              try {
                  const json = JSON.parse(text);
                  let resultData = json;

                  // Handle JSON Wrappers (like AllOrigins /get)
                  if (proxy.type === 'json_wrapper') {
                      if (json.contents) {
                          // Sometimes contents is a string that needs parsing again
                          if (typeof json.contents === 'string') {
                              try {
                                  // Check inner content for HTML too
                                  if (isHtmlResponse(json.contents)) {
                                      throw new Error('Inner content is HTML');
                                  }
                                  resultData = JSON.parse(json.contents);
                              } catch (e) {
                                  console.warn('Failed to parse inner contents JSON', e);
                                  throw new Error('Invalid inner JSON');
                              }
                          } else {
                              resultData = json.contents;
                          }
                      } else {
                          throw new Error('Missing contents in wrapper');
                      }
                  }

                  console.log(`Success Proxy: ${proxyUrl}`);
                  return resultData;
              } catch (e) {
                  console.warn(`Failed to parse JSON from ${proxyUrl}:`, text.substring(0, 100));
                  errors.push(`${proxy.url} - JSON Parse Error`);
              }
          } else {
              console.warn(`Proxy ${proxyUrl} returned ${response.status}`);
              errors.push(`${proxy.url} - Status ${response.status}`);
          }
       } catch (e: any) {
           console.warn(`Proxy fetch failed for ${domain} via ${proxy.url}:`, e);
           errors.push(`${proxy.url} - ${e.message}`);
       }
    }
  }

  console.error('All proxies failed:', errors);
  throw new Error(`Failed to fetch from all mirrors and proxies. Errors: ${errors.join('; ')}`);
}

export async function getThreads(): Promise<Thread[]> {
  try {
    const data = await fetchWithFallback('/b/catalog.json');
    
    // Parse data if it's a string (sometimes proxies or Capacitor return string)
    let parsedData = data;
    if (typeof data === 'string') {
        try {
            parsedData = JSON.parse(data);
        } catch (e) {
            console.error('Failed to parse JSON response', e);
            return [];
        }
    }

    if (parsedData && parsedData.threads && Array.isArray(parsedData.threads)) {
       return parsedData.threads.map((t: any) => {
           // Handle catalog.json vs index.json differences
           if (t.posts && Array.isArray(t.posts) && t.posts.length > 0) {
               const opPost = t.posts[0];
               return {
                   ...opPost,
                   posts_count: t.posts_count || opPost.posts_count,
                   views: t.views || opPost.views || 0,
                   files_count: t.files_count
               };
           } else {
               // Flat structure
               return {
                   ...t,
                   posts_count: t.posts_count || 0,
                   views: t.views || 0,
                   files: t.files || [],
                   timestamp: t.timestamp || 0
               };
           }
       }).filter((t: any) => t && t.num);
    }
    return [];
  } catch (error) {
    console.error('Error fetching threads:', error);
    // Re-throw to show in UI
    throw error;
  }
}

export async function getThread(id: string): Promise<{ thread: Thread, posts: any[] } | null> {
  try {
    const data = await fetchWithFallback(`/b/res/${id}.json`);
    
    // Parse data if it's a string
    let parsedData = data;
    if (typeof data === 'string') {
        try {
            parsedData = JSON.parse(data);
        } catch (e) {
            console.error('Failed to parse JSON response', e);
            return null;
        }
    }
    
    let postsArray: any[] = [];
    
    // Normalize response
    if (parsedData.threads && Array.isArray(parsedData.threads) && parsedData.threads.length > 0) {
        postsArray = parsedData.threads[0].posts;
    } else if (parsedData.posts && Array.isArray(parsedData.posts)) {
        postsArray = parsedData.posts;
    } else if (Array.isArray(parsedData)) {
        postsArray = parsedData;
    }

    if (postsArray.length > 0) {
      const opPost = postsArray[0];
      const thread: Thread = {
          num: opPost.num,
          comment: opPost.comment,
          subject: opPost.subject,
          timestamp: opPost.timestamp,
          files: opPost.files,
          posts_count: postsArray.length,
          views: opPost.views || 0
      };
      return { thread, posts: postsArray };
    }
    
    return null;
  } catch (error) {
    console.error(`Error fetching thread ${id}:`, error);
    return null;
  }
}

export interface FourChanBoard {
  board: string;
  title: string;
  meta_description?: string;
  ws_board?: number;
  per_page?: number;
  pages?: number;
}

type FourChanBoardsResponse = {
  boards: FourChanBoard[];
};

type FourChanPost = {
  no: number;
  time: number;
  sub?: string;
  com?: string;
  tim?: number;
  ext?: string;
  filename?: string;
  w?: number;
  h?: number;
  fsize?: number;
  tn_w?: number;
  tn_h?: number;
};

type FourChanThreadResponse = {
  posts: FourChanPost[];
};

type FourChanCatalogThread = FourChanPost & {
  replies?: number;
  images?: number;
  last_modified?: number;
};

type FourChanCatalogPage = {
  page: number;
  threads: FourChanCatalogThread[];
};

const parseJsonIfString = (data: any) => {
  if (typeof data === 'string') {
    try {
      return JSON.parse(data);
    } catch {
      return data;
    }
  }
  return data;
};

async function fetchJsonUrl(url: string) {
  const userAgent =
    'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36';

  const tryDirect = async () => {
    if (Capacitor.isNativePlatform()) {
      const response = await fetchWithTimeout(
        CapacitorHttp.get({
          url,
          headers: {
            Accept: 'application/json',
            'Cache-Control': 'no-cache',
            'User-Agent': userAgent
          },
          connectTimeout: 8000,
          readTimeout: 8000
        }),
        12000
      );
      if (response.status !== 200) {
        throw new Error(`HTTP ${response.status}`);
      }
      return response.data;
    }

    const response = await fetchWithTimeout(fetch(url), 12000);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return response.json();
  };

  try {
    return await tryDirect();
  } catch (directError) {
    const errors: string[] = [];
    errors.push(`direct - ${(directError as Error)?.message || 'unknown error'}`);

    for (const proxy of CORS_PROXIES) {
      const targetUrl = encodeURIComponent(url);
      let proxyUrl = '';

      if (proxy.url.includes('corsproxy.io')) {
        proxyUrl = `${proxy.url}${targetUrl}`;
      } else {
        proxyUrl = `${proxy.url}${targetUrl}`;
      }

      if (proxy.url.includes('allorigins')) {
        proxyUrl += `&t=${Date.now()}`;
      }

      try {
        if (Capacitor.isNativePlatform()) {
          const response = await fetchWithTimeout(
            CapacitorHttp.get({
              url: proxyUrl,
              headers: {
                Accept: 'application/json',
                'Cache-Control': 'no-cache',
                'User-Agent': userAgent
              },
              connectTimeout: 8000,
              readTimeout: 8000
            }),
            12000
          );

          if (response.status !== 200) {
            errors.push(`${proxy.url} - HTTP ${response.status}`);
            continue;
          }

          const data = response.data;
          const parsed = parseJsonIfString(data);
          if (proxy.type === 'json_wrapper') {
            const wrapper = parsed as { contents?: unknown };
            if (typeof wrapper?.contents === 'string') {
              return JSON.parse(wrapper.contents);
            }
            if (wrapper?.contents) return wrapper.contents;
            errors.push(`${proxy.url} - Missing contents`);
            continue;
          }

          return parsed;
        }

        const response = await fetchWithTimeout(fetch(proxyUrl), 12000);
        if (!response.ok) {
          errors.push(`${proxy.url} - HTTP ${response.status}`);
          continue;
        }

        const text = await response.text();
        if (isHtmlResponse(text)) {
          errors.push(`${proxy.url} - HTML response`);
          continue;
        }

        const parsed = JSON.parse(text);
        if (proxy.type === 'json_wrapper') {
          if (typeof parsed?.contents === 'string') {
            return JSON.parse(parsed.contents);
          }
          if (parsed?.contents) return parsed.contents;
          errors.push(`${proxy.url} - Missing contents`);
          continue;
        }

        return parsed;
      } catch (e) {
        errors.push(`${proxy.url} - ${(e as Error)?.message || 'unknown error'}`);
      }
    }

    throw new Error(`Failed to fetch JSON. Errors: ${errors.join('; ')}`);
  }
}

const build4ChanFile = (board: string, post: FourChanPost) => {
  if (!post.tim || !post.ext) return null;

  const extLower = post.ext.toLowerCase();
  const src = `https://i.4cdn.org/${board}/${post.tim}${extLower}`;
  const thumbnail = `https://i.4cdn.org/${board}/${post.tim}s.jpg`;
  const name = `${post.filename || post.tim}${extLower}`;
  const ext = extLower;
  const proxiedSrc = `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(src)}`;

  const type =
    ext === '.webm' ? 6 :
    ext === '.mp4' ? 10 :
    1;

  return {
    path: proxiedSrc,
    thumbnail,
    displayname: name,
    fullname: name,
    width: post.w || 0,
    height: post.h || 0,
    size: post.fsize || 0,
    type
  };
};

const normalize4ChanPost = (board: string, post: FourChanPost) => {
  const file = build4ChanFile(board, post);
  return {
    num: post.no,
    comment: post.com || '',
    subject: post.sub || '',
    timestamp: post.time,
    files: file ? [file] : [],
    posts_count: 0,
    views: 0
  };
};

export async function get4ChanBoards(): Promise<FourChanBoard[]> {
  const data = await fetchJsonUrl('https://a.4cdn.org/boards.json');
  const parsed = parseJsonIfString(data) as FourChanBoardsResponse;
  return Array.isArray(parsed?.boards) ? parsed.boards : [];
}

export async function get4ChanCatalog(board: string): Promise<Thread[]> {
  const safeBoard = board.replaceAll('/', '').trim();
  const data = await fetchJsonUrl(`https://a.4cdn.org/${safeBoard}/catalog.json`);
  const parsed = parseJsonIfString(data) as FourChanCatalogPage[];
  if (!Array.isArray(parsed)) return [];

  const threads: Thread[] = [];
  for (const page of parsed) {
    for (const t of page.threads || []) {
      const file = build4ChanFile(safeBoard, t);
      threads.push({
        num: t.no,
        comment: t.com || '',
        subject: t.sub || '',
        timestamp: t.time,
        files: file ? [file] : [],
        posts_count: (t.replies || 0) + 1,
        views: 0
      });
    }
  }
  return threads;
}

export async function get4ChanThread(board: string, id: string): Promise<{ thread: Thread; posts: any[] } | null> {
  const safeBoard = board.replaceAll('/', '').trim();
  const safeId = id.trim();
  const data = await fetchJsonUrl(`https://a.4cdn.org/${safeBoard}/thread/${safeId}.json`);
  const parsed = parseJsonIfString(data) as FourChanThreadResponse;
  if (!parsed?.posts || !Array.isArray(parsed.posts) || parsed.posts.length === 0) return null;

  const normalizedPosts = parsed.posts.map(p => normalize4ChanPost(safeBoard, p));
  const op = normalizedPosts[0];

  const thread: Thread = {
    num: op.num,
    comment: op.comment,
    subject: op.subject,
    timestamp: op.timestamp,
    files: op.files,
    posts_count: normalizedPosts.length,
    views: 0
  };

  return { thread, posts: normalizedPosts };
}

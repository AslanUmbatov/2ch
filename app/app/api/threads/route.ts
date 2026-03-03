import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    // User requested to load ALL threads, so we switch to catalog.json by default.
    // catalog.json contains all threads on the board.
    const jsonName = 'catalog.json';

    // Prioritize 2ch.org as per user instruction.
    const domains = ['https://2ch.org', 'https://2ch.hk', 'https://2ch.life'];
    
    for (const domain of domains) {
      const url = `${domain}/b/${jsonName}`;
      try {
        console.log(`Fetching from ${url}...`);
        const response = await fetch(url, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'application/json',
          },
          cache: 'no-store', // Ensure we get fresh data
        });

        if (!response.ok) {
           console.error(`Failed to fetch from ${url}: ${response.status} ${response.statusText}`);
           continue;
        }

        const text = await response.text();
        try {
          const data = JSON.parse(text);
          
          let transformedThreads = [];

          if (data.threads && Array.isArray(data.threads)) {
             transformedThreads = data.threads.map((t: any) => {
                 // catalog.json structure usually has flat thread objects.
                 // index.json structure has { posts: [...] }
                 
                 // If it has 'posts' array (like in index.json or older APIs), extract OP post.
                 if (t.posts && Array.isArray(t.posts) && t.posts.length > 0) {
                     const opPost = t.posts[0];
                     return {
                         ...opPost,
                         posts_count: t.posts_count || opPost.posts_count,
                         views: t.views || opPost.views || 0,
                         files_count: t.files_count
                     };
                 } else {
                     // Flat structure (catalog.json)
                     // Ensure required fields are present or defaulted
                     return {
                         ...t,
                         posts_count: t.posts_count || 0,
                         views: t.views || 0,
                         files: t.files || [],
                         // timestamp might be 'timestamp' or 'date' (usually timestamp in seconds)
                         timestamp: t.timestamp || 0
                     };
                 }
             });
             
             // Filter out any undefined/null results
             transformedThreads = transformedThreads.filter((t: any) => t && t.num);
          }
          
          return NextResponse.json({ ...data, threads: transformedThreads });

        } catch (e) {
          console.error(`JSON parse error for ${url}:`, e);
          continue;
        }
      } catch (err) {
        console.error(`Error fetching ${url}:`, err);
      }
    }

    return NextResponse.json(
      { error: 'Failed to fetch from all mirrors' },
      { status: 500 }
    );

  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

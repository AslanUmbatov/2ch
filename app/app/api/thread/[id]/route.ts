import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // Prioritize 2ch.org
    const domains = ['https://2ch.org', 'https://2ch.hk', 'https://2ch.life'];
    
    for (const domain of domains) {
      const url = `${domain}/b/res/${id}.json`;
      try {
        console.log(`Fetching thread from ${url}...`);
        const response = await fetch(url, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'application/json',
          },
        });

        if (!response.ok) {
           console.error(`Failed to fetch thread from ${url}: ${response.status} ${response.statusText}`);
           continue;
        }

        const data = await response.json();
        return NextResponse.json(data);
      } catch (err) {
        console.error(`Error fetching thread from ${url}:`, err);
      }
    }

    return NextResponse.json(
      { error: 'Failed to fetch thread from all mirrors' },
      { status: 500 }
    );

  } catch (error) {
    console.error('Thread proxy error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

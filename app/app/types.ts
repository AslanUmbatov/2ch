export interface File {
  path: string;
  thumbnail: string;
  displayname: string;
  fullname: string;
  width: number;
  height: number;
  size: number;
  type: number; // 1=jpg/png, 6=webm, 10=mp4 usually
  duration?: string;
  duration_secs?: number;
}

export interface Thread {
  num: string | number;
  comment: string;
  subject: string;
  timestamp: number;
  files: File[];
  posts_count: number;
  views: number;
  tags?: string[];
}

export interface ThreadsResponse {
  threads: Thread[];
}

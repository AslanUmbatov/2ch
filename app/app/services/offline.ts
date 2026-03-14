import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { Capacitor } from '@capacitor/core';
import type { Thread, File as ThreadFile } from '../types';

export type SavedThreadSource = '2ch' | '4chan';

export type SavedThreadPost = {
  num: string | number;
  files?: ThreadFile[];
  [key: string]: unknown;
};

export type SavedThreadMeta = {
  key: string;
  source: SavedThreadSource;
  board?: string;
  id: string;
  savedAt: number;
  sizeBytes: number;
  thread: Thread;
};

type SavedThreadManifest = {
  version: 1;
  meta: SavedThreadMeta;
  thread: Thread;
  posts: SavedThreadPost[];
};

type SaveProgress = {
  phase: 'downloading' | 'finalizing';
  done: number;
  total: number;
  percent: number;
  label: string;
};

const INDEX_KEY = 'savedThreadsIndex_v1';
const ROOT_DIR = 'savedThreads_v1';

const safeFilename = (value: string) => value.replace(/[^a-zA-Z0-9._-]/g, '_');

const getAbsolute2chUrl = (path: string) => {
  if (!path) return path;
  if (path.startsWith('http')) return path;
  return `https://2ch.life${path}`;
};

const tryExtractProxiedUrl = (url: string) => {
  try {
    const parsed = new URL(url);
    const quest = parsed.searchParams.get('quest');
    if (quest) return quest;
  } catch {}
  return null;
};

const getDownloadUrl = (src: string, source: SavedThreadSource) => {
  if (!src) return src;

  const fromQuest = tryExtractProxiedUrl(src);
  if (fromQuest) return fromQuest;

  if (source === '2ch') return getAbsolute2chUrl(src);
  return src;
};

const getExtensionFromUrl = (url: string) => {
  const clean = url.split('?')[0];
  const lastDot = clean.lastIndexOf('.');
  if (lastDot === -1) return '';
  const ext = clean.slice(lastDot);
  if (ext.length > 12) return '';
  return ext;
};

const sumThreadBytes = (posts: SavedThreadPost[]) => {
  let total = 0;
  for (const post of posts) {
    for (const f of (post?.files || []) as ThreadFile[]) {
      const rawSize = (f as unknown as { size?: unknown })?.size;
      const size =
        typeof rawSize === 'number'
          ? rawSize
          : typeof rawSize === 'string'
            ? (() => {
                const s = rawSize.trim().replace(',', '.');
                if (/^\d+$/.test(s)) return Number(s);
                const m = s.match(/([\d.]+)\s*([a-zA-Z]{0,3})/);
                if (!m) return 0;
                const value = Number(m[1]);
                if (!Number.isFinite(value) || value <= 0) return 0;
                const unit = (m[2] || '').toLowerCase();
                if (unit === 'b' || unit === '') return value;
                if (unit === 'kb' || unit === 'kib' || unit === 'k') return value * 1024;
                if (unit === 'mb' || unit === 'mib' || unit === 'm') return value * 1024 * 1024;
                if (unit === 'gb' || unit === 'gib' || unit === 'g') return value * 1024 * 1024 * 1024;
                return 0;
              })()
            : 0;
      if (Number.isFinite(size) && size > 0) total += size;
    }
  }
  return total;
};

const readIndexFromStorage = (): SavedThreadMeta[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(INDEX_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(Boolean);
  } catch {
    return [];
  }
};

const writeIndexToStorage = (items: SavedThreadMeta[]) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(INDEX_KEY, JSON.stringify(items));
  } catch {}
};

export const listSavedThreads = () => {
  const items = readIndexFromStorage();
  return [...items].sort((a, b) => (a.savedAt || 0) - (b.savedAt || 0));
};

export const estimateThreadSizeBytes = (posts: SavedThreadPost[]) => {
  return sumThreadBytes(posts);
};

export async function loadSavedThread(key: string): Promise<{ meta: SavedThreadMeta; thread: Thread; posts: SavedThreadPost[] } | null> {
  if (!Capacitor.isNativePlatform()) return null;
  const path = `${ROOT_DIR}/${safeFilename(key)}/manifest.json`;
  try {
    const res = await Filesystem.readFile({ path, directory: Directory.Data, encoding: Encoding.UTF8 });
    const manifest = JSON.parse(res.data as string) as SavedThreadManifest;
    return { meta: manifest.meta, thread: manifest.thread, posts: manifest.posts };
  } catch {
    return null;
  }
}

export async function saveThreadLocally(params: {
  key: string;
  source: SavedThreadSource;
  board?: string;
  id: string;
  thread: Thread;
  posts: SavedThreadPost[];
  onProgress?: (p: SaveProgress) => void;
}): Promise<SavedThreadMeta> {
  if (!Capacitor.isNativePlatform()) {
    throw new Error('Локальное сохранение доступно только на устройстве');
  }

  const key = params.key;
  const folder = `${ROOT_DIR}/${safeFilename(key)}`;
  const mediaFolder = `${folder}/media`;

  await Filesystem.mkdir({ path: mediaFolder, directory: Directory.Data, recursive: true });

  const sizeBytes = sumThreadBytes(params.posts);

  const meta: SavedThreadMeta = {
    key,
    source: params.source,
    board: params.board,
    id: params.id,
    savedAt: Date.now(),
    sizeBytes,
    thread: params.thread
  };

  const downloads: Array<{
    url: string;
    targetPath: string;
    applyTo: (resultPath: string) => void;
  }> = [];

  const patchFile = (file: ThreadFile, patch: Partial<ThreadFile>) => Object.assign(file, patch);

  for (const post of params.posts) {
    const files = (post?.files || []) as ThreadFile[];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const srcUrl = getDownloadUrl(file.path, params.source);
      const thumbUrl = getDownloadUrl(file.thumbnail, params.source);

      const srcExt = getExtensionFromUrl(srcUrl);
      const thumbExt = getExtensionFromUrl(thumbUrl) || '.jpg';
      const base = safeFilename(`${post.num}_${i}_${Date.now()}`);

      const srcTarget = `${mediaFolder}/${base}${srcExt || ''}`;
      const thumbTarget = `${mediaFolder}/${base}_thumb${thumbExt}`;

      downloads.push({
        url: srcUrl,
        targetPath: srcTarget,
        applyTo: (resultPath) => patchFile(file, { path: resultPath })
      });

      downloads.push({
        url: thumbUrl,
        targetPath: thumbTarget,
        applyTo: (resultPath) => patchFile(file, { thumbnail: resultPath })
      });
    }
  }

  let done = 0;
  const total = downloads.length;

  const report = (phase: SaveProgress['phase'], label: string) => {
    const percent = total > 0 ? Math.round((done / total) * 100) : 0;
    params.onProgress?.({
      phase,
      done,
      total,
      percent,
      label
    });
  };

  for (const d of downloads) {
    report('downloading', d.url);
    await Filesystem.downloadFile({
      url: d.url,
      path: d.targetPath,
      directory: Directory.Data
    });
    const uri = await Filesystem.getUri({ path: d.targetPath, directory: Directory.Data });
    d.applyTo(Capacitor.convertFileSrc(uri.uri));
    done += 1;
  }

  if (Array.isArray(params.posts) && params.posts.length > 0 && params.posts[0]?.files) {
    params.thread.files = params.posts[0].files;
    meta.thread = params.thread;
  }

  report('finalizing', 'manifest');

  const manifest: SavedThreadManifest = {
    version: 1,
    meta,
    thread: params.thread,
    posts: params.posts
  };

  await Filesystem.writeFile({
    path: `${folder}/manifest.json`,
    directory: Directory.Data,
    encoding: Encoding.UTF8,
    data: JSON.stringify(manifest)
  });

  const index = readIndexFromStorage();
  const without = index.filter((t) => t?.key !== key);
  writeIndexToStorage([meta, ...without]);

  return meta;
}

export async function deleteSavedThread(key: string): Promise<void> {
  const sanitized = safeFilename(key);
  const folder = `${ROOT_DIR}/${sanitized}`;
  if (Capacitor.isNativePlatform()) {
    try {
      await Filesystem.rmdir({ path: folder, directory: Directory.Data, recursive: true });
    } catch {}
  }

  const index = readIndexFromStorage();
  const without = index.filter((t) => t?.key !== key);
  writeIndexToStorage(without);
}

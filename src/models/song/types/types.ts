export type SongsState = {
  songs: Song[];
};

export type Song = {
  id: number | null;
  author: string;
  title: string;
  linkOnYouTube?: string;
};

export type LocalStorageState = {
  songs: Song[];
};

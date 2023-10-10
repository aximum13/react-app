export type SongsState = {
  list: SongState[];
};

export type SongState = {
  id: number;
  author: string;
  title: string;
  linkOnYouTube?: string;
};

export type LocalStorageState = {
  songs: {
    list: SongState[];
  };
};

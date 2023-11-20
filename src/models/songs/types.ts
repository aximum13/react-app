export type SongsState = {
  songs: SongState[];
  song?: SongState;
  loading?: boolean;
  isDelete?: boolean;
  error?: string | null;
};

export type SongState = {
  id: number;
  author: string;
  title: string;
  linkOnYouTube: string;
};

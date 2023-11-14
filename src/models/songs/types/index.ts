export type SongsState = {
  songs: SongState[];
};

export type SongState = {
  id: number;
  author: string;
  title: string;
  linkOnYouTube: string;
};

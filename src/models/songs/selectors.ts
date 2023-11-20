import { RootState } from 'store';

export const allSongs = (state: RootState) => state.songs;
export const song = (state: RootState) => state.song;
export const loading = (state: RootState) => state.loading;
export const error = (state: RootState) => state.error;
export const isDeleted = (state: RootState) => state.isDelete;

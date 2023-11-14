import { RootState } from 'store';

const songs = (state: RootState) => state.songs;

export const allSongs = songs;

import { RootState } from 'store';

const songsSelector = (state: RootState) => state.songs.list;

export const getSongs = songsSelector;

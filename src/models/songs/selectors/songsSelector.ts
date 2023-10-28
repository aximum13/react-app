import { RootState } from 'store';

const songs = (state: RootState) => state.list;

export const getSongs = songs;

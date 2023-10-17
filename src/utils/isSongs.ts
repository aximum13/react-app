import { SongState } from 'models/songs/types';

export const isSongs = (items: SongState[]) => items && items.length > 0;

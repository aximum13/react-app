import { SongState } from 'models/songs/types';

export const isItems = (items: SongState[]) => items && items.length > 0;

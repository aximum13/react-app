import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { load } from 'redux-localstorage-simple';

import {
  SongsState,
  SongState,
  LocalStorageState,
  FilterTypes,
} from 'models/songs/types';

let SONGS = load({ namespace: 'musicList' }) as LocalStorageState;

const initialState: SongsState & FilterTypes = {
  list: SONGS?.list ?? [],
  query: '',
};

export const songsSlice = createSlice({
  name: 'songs',
  initialState,
  reducers: {
    addSong: (state, action: PayloadAction<SongState>) => {
      const { id, author, title, linkOnYouTube } = action.payload;
      const newSong: SongState = {
        id,
        author,
        title,
        linkOnYouTube,
      };

      state.list.push(newSong);

      return state;
    },

    editSong: (state, action: PayloadAction<SongState>) => {
      const { id, author, title, linkOnYouTube } = action.payload;

      state.list = state.list.map((song: SongState) => {
        if (song.id === id) {
          return {
            ...song,
            author,
            title,
            linkOnYouTube,
          };
        }
        return song;
      });
    },

    deleteSong: (state, action: PayloadAction<number>) => {
      const songId = action.payload;
      state.list = state.list.filter((song) => song.id !== songId);
      return state;
    },

    filterSongs: (state, action: PayloadAction<FilterTypes>) => {
      const { query } = action.payload;
      return { ...state, query };
    },
  },
});

const { actions, reducer } = songsSlice;

export const { addSong, editSong, deleteSong, filterSongs } = actions;

export default reducer;

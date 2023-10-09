import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { load } from 'redux-localstorage-simple';

import {
  SongsState,
  SongState,
  LocalStorageState,
} from 'models/songs/types/types';

let SONGS = load({ namespace: 'musicList' }) as LocalStorageState;

if (!SONGS || !SONGS.songs || !SONGS.songs.length) {
  SONGS = {
    songs: [],
  };
}

const initialState: SongsState = {
  songs: SONGS.songs,
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

      state.songs.push(newSong);

      return state;
    },

    editSong: (state, action: PayloadAction<SongState>) => {
      const { id, author, title, linkOnYouTube } = action.payload;

      state.songs = state.songs.map((song: SongState) => {
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
      state.songs = state.songs.filter((song) => song.id !== songId);
      return state;
    },
  },
});

const { actions, reducer } = songsSlice;

export const { addSong, editSong, deleteSong } = actions;

export default reducer;

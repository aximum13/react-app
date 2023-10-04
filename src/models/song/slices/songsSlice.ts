import { createSlice } from '@reduxjs/toolkit';
import { load } from 'redux-localstorage-simple';

import { SongsState, Song, LocalStorageState } from 'models/song/types/types';

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
    addSong: (state, action) => {
      const newSong: Song = {
        id: action.payload.id,
        author: action.payload.author,
        title: action.payload.title,
        linkOnYouTube: action.payload.linkOnYouTube,
      };

      state.songs.push(newSong);

      return state;
    },
  },
});

const { actions, reducer } = songsSlice;

export const { addSong } = actions;

export default reducer;

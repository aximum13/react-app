import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { SongsState, SongState } from 'models/songs/types';

const initialState: SongsState = {
  songs: [],
};

export const songsSlice = createSlice({
  name: 'songs',
  initialState,
  reducers: {
    getSongsSuccess: (state, action) => {
      state.songs = action.payload;
    },

    addSongSuccess: (state, action: PayloadAction<SongState>) => {
      state.songs.push(action.payload);
    },

    getSongSuccess: (state, action: PayloadAction<SongState>) => {
      const getSong = action.payload;
      const index = state.songs.findIndex((song) => song.id === getSong.id);
      if (index !== -1) {
        state.songs[index] = getSong;
      }
    },
  },
});

export const GET_SONGS = 'songs/getSongs';
export const getSongs = createAction(GET_SONGS);

export const ADD_SONG = 'songs/addSong';
export const addSong = createAction(ADD_SONG, (payload: SongState) => ({
  payload,
}));

export const GET_SONG = 'songs/getSong';
export const getSong = createAction(GET_SONG, (payload: number) => ({
  payload,
}));

const { actions, reducer } = songsSlice;

export const { getSongsSuccess, addSongSuccess, getSongSuccess } = actions;

export default reducer;

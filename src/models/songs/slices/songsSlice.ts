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

    editSongSuccess: (state, action: PayloadAction<SongState>) => {
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

    deleteSongSuccess: (state, action: PayloadAction<number>) => {
      const songId = action.payload;
      state.songs = state.songs.filter((song) => song.id !== songId);
      return state;
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

export const EDIT_SONG = 'songs/editSong';
export const editSong = createAction(EDIT_SONG, (payload: SongState) => ({
  payload,
}));

export const DELETE_SONG = 'songs/deleteSong';
export const deleteSong = createAction(DELETE_SONG, (payload: number) => ({
  payload,
}));

const { actions, reducer } = songsSlice;

export const {
  getSongsSuccess,
  addSongSuccess,
  getSongSuccess,
  editSongSuccess,
  deleteSongSuccess,
} = actions;

export default reducer;

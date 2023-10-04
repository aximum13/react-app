import { createSlice } from '@reduxjs/toolkit';
import { load } from 'redux-localstorage-simple';

let ITEMS = load({ namespace: 'musicList' });

if (!ITEMS || !ITEMS.items || !ITEMS.items.length) {
  ITEMS = {
    items: [],
  };
}

export const songsSlice = createSlice({
  name: 'songs',
  initialState: ITEMS,
  reducers: {
    addSong: (state, action) => {
      const newSong = {
        id: action.payload.id,
        author: action.payload.author,
        title: action.payload.title,
        linkOnYouTube: action.payload.linkOnYouTube,
      };

      state.items.push(newSong);

      console.log(state.items, state, ITEMS, newSong);

      return state;
    },
  },
});

const { actions, reducer } = songsSlice;

export const { addSong } = actions;

export default reducer;

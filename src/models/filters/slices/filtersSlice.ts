import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { FilterTypes } from 'models/filters/types';

const initialState = {
  value: '',
  activeFilter: 'all',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    filterSongs: (state, action: PayloadAction<FilterTypes>) => {
      const { value, activeFilter } = action.payload;
      return { ...state, value, activeFilter };
    },
  },
});

const { actions, reducer } = filterSlice;

export const { filterSongs } = actions;

export default reducer;

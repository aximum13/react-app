import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'store';
import { SongState } from 'models/songs/types';

const songs = (state: RootState) => state.list;
const filter = (state: RootState) => state.query;

export const getSongs = songs;

export const getFilters = createSelector([songs, filter], (songs, filter) => {
  if (filter === '') return songs;
  else
    return songs.filter((song: SongState) => {
      return (
        song.author.toLowerCase().indexOf(filter.toLowerCase()) > -1 ||
        song.title.toLowerCase().indexOf(filter.toLowerCase()) > -1
      );
    });
});

import { all } from 'redux-saga/effects';

import { watchGetSongs } from './getSongsSaga';
import { watchAddSong } from './addSongSaga';
import { watchGetSong } from './getSongSaga';

export default function* rootSaga() {
  yield all([watchGetSongs(), watchAddSong(), watchGetSong()]);
}

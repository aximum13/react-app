import { all } from 'redux-saga/effects';

import { watchGetSongs } from './getSongsSaga';
import { watchAddSong } from './addSongSaga';

export default function* rootSaga() {
  yield all([watchGetSongs(), watchAddSong()]);
}

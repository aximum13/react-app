import { all } from 'redux-saga/effects';

import { watchGetSongs } from './getSongsSaga';
import { watchAddSong } from './addSongSaga';
import { watchGetSong } from './getSongSaga';
import { watchEditSong } from './editSongSaga';
import { watchDeleteSong } from './deleteSongSaga';

export default function* rootSaga() {
  yield all([
    watchGetSongs(),
    watchGetSong(),
    watchAddSong(),
    watchEditSong(),
    watchDeleteSong(),
  ]);
}

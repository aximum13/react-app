import { PayloadAction } from '@reduxjs/toolkit';
import { delay, put, takeEvery } from 'redux-saga/effects';

import { deleteSongApi } from 'API/songs';
import {
  DELETE_SONG,
  deleteSongSuccess,
  hideAlert,
  showAlert,
} from 'models/songs/slices/songsSlice';

function* deleteSongSaga(action: PayloadAction<number>) {
  try {
    const id = action.payload;
    const response = yield deleteSongApi(id);

    if (!response.ok) {
      throw new Error(`Ошибка при удалении записи, статус: ${response.status}`);
    }

    yield put(deleteSongSuccess(id));
  } catch (error) {
    console.error('Ошибка при удалении записи:', error);

    yield put(
      showAlert(
        'Ошибка при удалении записи. Перезагрузите страницу или попробуйте ещё раз.'
      )
    );
    yield delay(3000);
    yield put(hideAlert());
  }
}

export function* watchDeleteSong() {
  yield takeEvery(DELETE_SONG, deleteSongSaga);
}

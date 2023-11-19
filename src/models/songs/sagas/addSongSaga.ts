import { delay, put, takeEvery } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import { addSongApi } from 'API/songs';
import {
  ADD_SONG,
  addSongSuccess,
  hideAlert,
  showAlert,
} from 'models/songs/slices/songsSlice';
import { SongState } from 'models/songs/types';

function* addSongSaga(action: PayloadAction<SongState>) {
  try {
    const newSong = action.payload;
    const response = yield addSongApi(newSong);

    if (!response.ok) {
      throw new Error(
        `Ошибка при создании новой записи, статус: ${response.status}`
      );
    }

    const addSong = yield response.json();
    yield put(addSongSuccess(addSong));
  } catch (error) {
    console.error('Ошибка при создании новой записи:', error);

    yield put(
      showAlert(
        'Ошибка при создании новой записи. Перезагрузите страницу или попробуйте ещё раз.'
      )
    );
    yield delay(5000);
    yield put(hideAlert());
  }
}

export function* watchAddSong() {
  yield takeEvery(ADD_SONG, addSongSaga);
}

import { delay, put, takeEvery } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import { editSongApi } from 'API/songs';
import {
  EDIT_SONG,
  editSongSuccess,
  showAlert,
  hideAlert,
} from 'models/songs/slices/songsSlice';
import { SongState } from 'models/songs/types';

function* editSongSaga(action: PayloadAction<SongState>) {
  try {
    const id = action.payload.id;
    const song = action.payload;
    const response = yield editSongApi(id, song);

    if (!response.ok) {
      throw new Error(
        `Ошибка при редактировании записи, статус: ${response.status}`
      );
    }

    const editSong = yield response.json();
    yield put(editSongSuccess(editSong));
  } catch (error) {
    console.error('Ошибка при редактировании записи:', error);

    yield put(
      showAlert(
        'Ошибка при редактировании записи. Перезагрузите страницу или попробуйте ещё раз.'
      )
    );
    yield delay(3000);
    yield put(hideAlert());
  }
}

export function* watchEditSong() {
  yield takeEvery(EDIT_SONG, editSongSaga);
}

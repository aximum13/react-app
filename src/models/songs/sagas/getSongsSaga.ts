import { put, takeEvery } from 'redux-saga/effects';

import { getSongsApi } from 'API/songs';
import { GET_SONGS, getSongsSuccess } from 'models/songs/slices/songsSlice';

function* getSongsSaga() {
  try {
    const response = yield getSongsApi();
    if (!response.ok) {
      throw new Error(
        `Ошибка при получении списка произведений, статус: ${response.status}`
      );
    }

    const payload = yield response.json();
    yield put(getSongsSuccess(payload));
  } catch (error) {
    console.error('Ошибка при получении списка произведений:', error);
  }
}

export function* watchGetSongs() {
  yield takeEvery(GET_SONGS, getSongsSaga);
}

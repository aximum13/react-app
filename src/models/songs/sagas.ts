import { all } from 'redux-saga/effects';

import { delay, put, takeEvery } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import {
  getSongsApi,
  getSongApi,
  addSongApi,
  editSongApi,
  deleteSongApi,
} from 'API/songs';
import {
  GET_SONGS,
  GET_SONG,
  ADD_SONG,
  EDIT_SONG,
  DELETE_SONG,
  getSongsSuccess,
  getSongSuccess,
  addSongSuccess,
  editSongSuccess,
  deleteSongSuccess,
  endLoadSongs,
  showAlert,
  hideAlert,
} from 'models/songs';

import { SongState } from 'models/songs/types';

// getSongsSaga

function* getSongsSaga() {
  try {
    const response = yield getSongsApi();

    if (!response.ok) {
      throw new Error(
        `Ошибка при получении списка произведений, статус: ${response.status}`
      );
    }

    const payload = yield response.json();
    yield put(endLoadSongs());
    yield put(getSongsSuccess(payload));
  } catch (error) {
    console.error('Ошибка при получении списка произведений:', error);

    yield put(
      showAlert(
        'Ошибка при получении списка произведений. Перезагрузите страницу или попробуйте позднее.'
      )
    );
  }
}

function* watchGetSongs() {
  yield takeEvery(GET_SONGS, getSongsSaga);
}

// getSongSaga

function* getSongSaga(action: PayloadAction<number>) {
  try {
    const id = action.payload;
    const response = yield getSongApi(id);

    if (!response.ok) {
      throw new Error(`Ошибка при открытии записи, статус: ${response.status}`);
    }

    const getSong = yield response.json();
    yield put(endLoadSongs());
    yield put(getSongSuccess(getSong));
  } catch (error) {
    console.error('Ошибка при открытии записи:', error);

    yield put(
      showAlert(
        'Ошибка при открытии записи. Перезагрузите страницу или попробуйте позднее.'
      )
    );
  }
}

function* watchGetSong() {
  yield takeEvery(GET_SONG, getSongSaga);
}

// addSongSaga

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

function* watchAddSong() {
  yield takeEvery(ADD_SONG, addSongSaga);
}

// editSongSaga

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

function* watchEditSong() {
  yield takeEvery(EDIT_SONG, editSongSaga);
}

// deleteSongSaga

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

function* watchDeleteSong() {
  yield takeEvery(DELETE_SONG, deleteSongSaga);
}

export default function* rootSaga() {
  yield all([
    watchGetSongs(),
    watchGetSong(),
    watchAddSong(),
    watchEditSong(),
    watchDeleteSong(),
  ]);
}

import { watchGetSongs } from './getSongsSaga';

export default function* rootSaga() {
  yield watchGetSongs();
}

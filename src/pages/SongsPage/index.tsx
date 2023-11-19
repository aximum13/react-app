import { useSearchParams } from 'react-router-dom';

import Title from 'components/Title';
import Header from 'pages/SongsPage/Header';
import SongsList from 'pages/SongsPage/SongsList';

import { useAppDispatch, useAppSelector } from 'hooks';
import { allSongs } from 'models/songs/selectors/songsSelector';
import { useEffect } from 'react';
import { getSongs, loadSongs } from 'models/songs/slices/songsSlice';

import Loader from 'components/Loader';
import Alert from 'components/Alert';

const SongsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const songQuery = searchParams.get('song') || '';

  useEffect(() => {
    dispatch(loadSongs());
    dispatch(getSongs());
  }, [dispatch]);

  const songs = useAppSelector(allSongs);
  const loading = useAppSelector((state) => state.loading);
  const error = useAppSelector((state) => state.error);

  return (
    <>
      <Title />

      <Header
        setSearchParams={setSearchParams}
        songQuery={songQuery}
        songs={songs}
      />
      {error && <Alert text={error} />}
      {loading ? <Loader /> : <SongsList songQuery={songQuery} songs={songs} />}
    </>
  );
};

export default SongsPage;

import { useSearchParams } from 'react-router-dom';

import Title from 'components/Title';
import Header from 'pages/SongsPage/Header';
import SongsList from 'pages/SongsPage/SongsList';

import { useAppDispatch, useAppSelector } from 'hooks';
import { isSongs } from 'utils/isSongs';
import { allSongs } from 'models/songs/selectors/songsSelector';
import { useEffect } from 'react';
import { getSongs } from 'models/songs/slices/songsSlice';

const SongsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const songQuery = searchParams.get('song') || '';

  useEffect(() => {
    dispatch(getSongs());
  }, [dispatch]);

  const songs = useAppSelector(allSongs);

  return (
    <>
      <Title />
      <Header
        setSearchParams={setSearchParams}
        songQuery={songQuery}
        songs={songs}
      />

      {isSongs(songs) && <SongsList songQuery={songQuery} songs={songs} />}
    </>
  );
};

export default SongsPage;

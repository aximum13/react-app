import { useAppSelector } from 'hooks';
import { useSearchParams } from 'react-router-dom';

import { getSongs } from 'models/songs/selectors/songsSelector';
import { isSongs } from 'utils/isSongs';

import SongsList from 'pages/SongsPage/SongsList';
import Title from 'components/Title';
import Header from 'pages/SongsPage/Header';

const SongsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const songQuery = searchParams.get('song') || '';

  const songs = useAppSelector(getSongs);

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

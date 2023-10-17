import { useAppSelector } from 'hooks';

import { getSongs } from 'models/songs/selectors/songsSelector';
import { isSongs } from 'utils/isSongs';

import SongsList from 'pages/SongsPage/SongsList';
import Title from 'components/Title';
import Header from 'pages/SongsPage/Header';

const SongsPage: React.FC = () => {
  const songs = useAppSelector(getSongs);

  return (
    <>
      <Title />
      <Header />
      {isSongs(songs) && <SongsList />}
    </>
  );
};

export default SongsPage;

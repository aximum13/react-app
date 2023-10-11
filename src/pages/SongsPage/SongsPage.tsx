import { useAppSelector } from 'hooks';

import { getSongs } from 'models/songs/selectors/SongsSelector';
import { isItems } from 'utils/isItems';

import AddSong from 'pages/SongsPage/AddSong/AddSong';
import SongsList from 'pages/SongsPage/SongsList/SongsList';
import Title from 'components/Title/Title';
import Filter from 'pages/SongsPage/Filter/Filter';

const SongsPage = () => {
  const items = useAppSelector(getSongs);

  return (
    <>
      <Title />
      {isItems(items) && <Filter />}
      <AddSong />
      {isItems(items) && <SongsList />}
    </>
  );
};

export default SongsPage;

import { useSelector } from 'react-redux';

import { getSongs } from 'models/songs/selectors/SongsSelector';
import { isItems } from 'utils/isItems';

import AddSong from 'pages/SongsPage/AddSong/AddSong';
import SongsList from 'pages/SongsPage/SongsList/SongsList';
import Title from 'components/Title/Title';

const SongsPage = () => {
  const items = useSelector(getSongs);
  return (
    <>
      <Title />
      <AddSong />
      {isItems(items) && <SongsList />}
    </>
  );
};

export default SongsPage;

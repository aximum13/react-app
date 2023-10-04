import { useSelector } from 'react-redux';

import { getItems } from 'selectors/itemsSelector';
import { isItems } from 'utils/isItems';

import AddSong from 'pages/SongsPage/AddSong/AddSong';
import SongsList from 'pages/SongsPage/SongsList/SongsList';
import Title from 'components/Title/Title';

const SongsPage = () => {
  const items = useSelector(getItems);
  return (
    <>
      <Title />
      <AddSong />
      {isItems(items) && <SongsList />}
    </>
  );
};

export default SongsPage;

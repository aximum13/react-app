import classNames from 'classnames';

import { useAppSelector } from 'hooks';
import { getSongs } from 'models/songs/selectors/songsSelector';
import { isSongs } from 'utils/isSongs';

import AddSong from 'components/AddSong';
import Filter from 'components/Filter';

import styles from './Header.module.scss';

const Header: React.FC = () => {
  const songs = useAppSelector(getSongs);
  return (
    <div className={classNames(styles.Header)}>
      {isSongs(songs) && <Filter />}
      <AddSong />
    </div>
  );
};

export default Header;

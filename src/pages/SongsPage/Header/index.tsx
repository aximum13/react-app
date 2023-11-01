import classNames from 'classnames';

import { useAppSelector } from 'hooks';
import { getSongs } from 'models/songs/selectors/songsSelector';
import { isSongs } from 'utils/isSongs';

import AddSong from 'components/AddSong';
import Filter from 'components/Filter';

import { FilterTypes } from 'components/Filter/types';

import styles from './Header.module.scss';

const Header: React.FC<FilterTypes> = ({ setSearchParams, songQuery }) => {
  const songs = useAppSelector(getSongs);

  return (
    <div className={classNames(styles.Header)}>
      <AddSong />
      {isSongs(songs) && (
        <Filter setSearchParams={setSearchParams} songQuery={songQuery} />
      )}
    </div>
  );
};

export default Header;

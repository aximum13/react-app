import classNames from 'classnames';

import { isSongs } from 'utils/isSongs';

import AddSong from 'components/AddSong';
import Filter from 'components/Filter';

import { FilterTypes } from 'components/Filter/types';

import styles from './Header.module.scss';
import { SongState } from 'models/songs/types';

type Props = FilterTypes & {
  songs: SongState[];
};

const Header: React.FC<Props> = ({ setSearchParams, songQuery, songs }) => {
  return (
    <div className={classNames(styles.Header)}>
      <AddSong songs={songs} />
      {isSongs(songs) && (
        <Filter
          setSearchParams={setSearchParams}
          songQuery={songQuery}
        />
      )}
    </div>
  );
};

export default Header;

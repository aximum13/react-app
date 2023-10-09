import { useSelector } from 'react-redux';

import { getSongs } from 'models/songs/selectors/SongsSelector';
import { SongState } from 'models/songs/types/types';
import Song from '../Song/Song';

import styles from './SongsList.module.scss';

const SongsList = () => {
  const items = useSelector(getSongs);

  return (
    <ul className={styles.SongsList}>
      {items.map((item: SongState, index: number) => (
        <Song
          id={item.id}
          index={index}
          key={item.id}
          author={item.author}
          title={item.title}
          linkOnYouTube={item.linkOnYouTube}
        />
      ))}
    </ul>
  );
};

export default SongsList;

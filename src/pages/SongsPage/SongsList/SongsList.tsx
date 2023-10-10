import { useSelector } from 'react-redux';

import { getSongs } from 'models/songs/selectors/SongsSelector';
import { getFilters } from 'models/filters/selectors/FiltersSelector';
import { SongState } from 'models/songs/types';
import Song from '../Song/Song';

import styles from './SongsList.module.scss';
import { filteredItems } from 'utils/filteredItems';

const SongsList = () => {
  const items = useSelector(getSongs);
  const filters = useSelector(getFilters);

  const filteredResults = filteredItems(
    items,
    filters.value,
    filters.activeFilter
  );

  return (
    <ul className={styles.SongsList}>
      {filteredResults.map((item: SongState, index: number) => (
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

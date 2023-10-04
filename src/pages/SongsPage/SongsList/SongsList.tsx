import { useSelector } from 'react-redux';

import { getItems } from 'selectors/itemsSelector';
import Song from '../Song/Song';

import styles from './SongsList.module.scss';

const SongsList = () => {
  const items = useSelector(getItems);

  return (
    <ul className={styles.SongsList}>
      {items.map(
        (
          item: {
            id: number;
            author: string;
            title: string;
            linkOnYouTube: string;
          },
          index: number
        ) => (
          <Song
            id={item.id}
            index={index}
            key={item.id}
            author={item.author}
            title={item.title}
            linkOnYouTube={item.linkOnYouTube}
          />
        )
      )}
    </ul>
  );
};

export default SongsList;

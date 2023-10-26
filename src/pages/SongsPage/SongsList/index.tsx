import { useAppSelector } from 'hooks';

import { getFilters } from 'models/songs/selectors/songsSelector';

import SongDetail from '../SongDetail';

import styles from './SongsList.module.scss';

const SongsList: React.FC = () => {
  const filters = useAppSelector(getFilters);

  return (
    <ul className={styles.SongsList}>
      {filters?.map(({ id, author, title, linkOnYouTube }, index: number) => (
        <SongDetail
          id={id}
          index={index}
          key={id}
          author={author}
          title={title}
          linkOnYouTube={linkOnYouTube}
        />
      ))}
    </ul>
  );
};

export default SongsList;

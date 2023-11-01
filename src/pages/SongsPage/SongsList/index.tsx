import SongDetail from '../SongDetail';

import { SongState } from 'models/songs/types';
import { SongsListTypes } from './types';

import styles from './SongsList.module.scss';

type Props = SongsListTypes & {
  songs: SongState[];
};

const SongsList: React.FC<Props> = ({ songQuery, songs }) => {
  return (
    <>
      <ul className={styles.SongsList}>
        {songs
          ?.filter(
            (song) =>
              song.author?.includes(songQuery) ||
              song.title?.includes(songQuery)
          )
          .map(({ id, author, title, linkOnYouTube }, index: number) => (
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
    </>
  );
};

export default SongsList;

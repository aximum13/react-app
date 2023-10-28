import { useAppSelector } from 'hooks';

import { getSongs } from 'models/songs/selectors/songsSelector';

import SongDetail from '../SongDetail';

import { SongsListTypes } from './types';

import styles from './SongsList.module.scss';

const SongsList: React.FC<SongsListTypes> = ({ songQuery }) => {
  const songs = useAppSelector(getSongs);
  return (
    <>
      <ul className={styles.SongsList}>
        {songs
          ?.filter(
            (song) =>
              song.author.includes(songQuery) || song.title.includes(songQuery)
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

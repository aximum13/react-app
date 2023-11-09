import classNames from 'classnames';
import { useParams } from 'react-router-dom';

import { useAppSelector } from 'hooks';
import { getSongs } from 'models/songs/selectors/songsSelector';

import Single from 'components/Song';

import styles from './Song.module.scss';

const Song = () => {
  const songs = useAppSelector(getSongs);

  const { id } = useParams();
  const idSong = id ? parseInt(id) : 0;

  const song = songs.find((song) => song.id === idSong);

  const { author, title, linkOnYouTube } = song
    ? song
    : { author: '', title: '', linkOnYouTube: '' };

  return (
    <div className={styles.Container}>
      <h1 className={classNames(styles.Title)}>Произведение</h1>

      <Single
        id={idSong}
        author={author}
        title={title}
        linkOnYouTube={linkOnYouTube}
        song={song}
        songs={songs}
      />
    </div>
  );
};

export default Song;

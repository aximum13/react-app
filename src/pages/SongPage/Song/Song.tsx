import classNames from 'classnames';
import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'hooks';
import { allSongs } from 'models/songs/selectors/songsSelector';

import Single from 'components/Song';

import styles from './Song.module.scss';
import { useEffect } from 'react';
import { getSong, getSongs } from 'models/songs/slices/songsSlice';

const Song = () => {
  const dispatch = useAppDispatch();
  const songs = useAppSelector(allSongs);

  const { id } = useParams();
  const idSong = id ? parseInt(id) : 0;

  const song = songs.find((song) => song.id === idSong);

  useEffect(() => {
    dispatch(getSongs());
    dispatch(getSong(idSong));
  }, [dispatch, idSong]);

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

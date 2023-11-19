import classNames from 'classnames';
import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'hooks';

import Single from 'components/Song';

import styles from './Song.module.scss';
import { useEffect } from 'react';
import { getSong, loadSongs } from 'models/songs/slices/songsSlice';

const Song = () => {
  const dispatch = useAppDispatch();
  const songs = useAppSelector((state) => state.songs);
  const song = useAppSelector((state) => state.song);

  const { id } = useParams();
  const idSong = id ? parseInt(id) : 0;

  useEffect(() => {
    dispatch(loadSongs());
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

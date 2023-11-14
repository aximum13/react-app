import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAppDispatch } from 'hooks';
import { getSong, deleteSong } from 'models/songs/slices/songsSlice';
import { SongState } from 'models/songs/types';

import ModalCmp from 'components/Modal';
import ButtonsGroup from 'components/ButtonsGroup';
import LinkOnYouTube from 'components/LinkOnYouTube';
import { FormEdit } from 'components/Form';
import { Button } from 'react-bootstrap';

import styles from './Song.module.scss';

type Props = SongState & {
  index?: number;
  isDetail?: boolean;
  song?: SongState;
  songs: SongState[];
};

const Song: React.FC<Props> = ({
  isDetail,
  id,
  index,
  author,
  title,
  linkOnYouTube,
  song,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isEdit, setIsEdit] = useState(false);
  const [isShow, setIsShow] = useState(false);

  const handleShow = () => setIsShow(true);
  const handleCloseShow = () => setIsShow(false);

  const handleEdit = () => setIsEdit(true);
  const handleCloseEdit = () => {
    setIsEdit(false);
  };

  const handleDeleteSong = (id: number) => {
    dispatch(deleteSong(id));
    setIsEdit(false);
    if (!isDetail) navigate('/');
  };

  return (
    <>
      {isDetail ? (
        <li className={classNames(styles.SongDetail)}>
          <Link className={styles.TextDetail} to={`/${id}`}>
            {index ? index + 1 : 1}. {author} - {title}
          </Link>

          <ButtonsGroup
            isDetail={isDetail}
            handleLeftBtn={handleShow}
            handleRightBtn={handleEdit}
          />
        </li>
      ) : song ? (
        <div className={classNames(styles.Song)}>
          <div className={classNames(styles.TextContainer)}>
            <LinkOnYouTube
              linkOnYouTube={linkOnYouTube}
              author={author}
              title={title}
            />
          </div>
          <ButtonsGroup
            isDetail={isDetail}
            handleLeftBtn={handleEdit}
            handleRightBtn={() => handleDeleteSong(id)}
          />
        </div>
      ) : (
        <>
          <p className={styles.NotFound}>Не найдено. </p>
        </>
      )}

      {!isDetail && (
        <Link
          className={classNames(song ? styles.ToHome : styles.ToHomeNotFound)}
          to={'/'}
          replace
        >
          Вернуться на главную страницу
        </Link>
      )}

      {isDetail && (
        <ModalCmp show={isShow} isShow={true} handleClose={handleCloseShow}>
          <LinkOnYouTube
            linkOnYouTube={linkOnYouTube}
            author={author}
            title={title}
          />
          <Button
            className={'ms-auto d-block'}
            onClick={handleCloseShow}
            variant={'secondary'}
          >
            Закрыть
          </Button>
        </ModalCmp>
      )}

      <ModalCmp show={isEdit} handleClose={handleCloseEdit}>
        <FormEdit
          handleDelete={() => handleDeleteSong(id)}
          handleClose={handleCloseEdit}
          id={id}
          title={title}
          author={author}
          linkOnYouTube={linkOnYouTube}
          isDetail={isDetail}
        ></FormEdit>
      </ModalCmp>
    </>
  );
};

export default Song;

import classNames from 'classnames';
import { useState } from 'react';

import { Button } from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs';
import ModalCmp from 'components/Modal/Modal';

import styles from './Song.module.scss';

type SongType = {
  id: number;
  index: number;
  author: string;
  title: string;
  linkOnYouTube: string;
};

const Song = ({ id, index, author, title, linkOnYouTube }: SongType) => {
  const [show, setShow] = useState(false);

  const handleCloseShow = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <li className={classNames(styles.Song)}>
        <div className={styles.Text}>
          {index + 1}. {author} - {title}
        </div>

        <Button
          className={classNames(styles.ButtonShow, 'showed me-3')}
          variant="outline-success"
          onClick={handleShow}
        >
          <BsSearch />
        </Button>
      </li>

      <ModalCmp
        handleClose={handleCloseShow}
        isForm={false}
        title={'Просмотр'}
        btnCancelText={'Закрыть'}
        show={show}
        handleSubmit={undefined}
        btnSubmitText={undefined}
      >
        {linkOnYouTube ? (
          <a
            className={styles.ModalText}
            href={linkOnYouTube}
            rel="noreferrer"
            target="_blank"
          >
            Композитор: {author}
            Название: {title}
          </a>
        ) : (
          <>
            <p className={styles.ModalText}>Композитор: {author}</p>
            <p className={styles.ModalText}> Название: {title}</p>
          </>
        )}
      </ModalCmp>
    </>
  );
};

export default Song;

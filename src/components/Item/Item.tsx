import classNames from 'classnames';
import { useState } from 'react';

import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { BsSearch } from 'react-icons/bs';

import styles from './Item.module.scss';

type ItemType = {
  id: number;
  index: number;
  author: string;
  title: string;
  linkOnYouTube: string;
};

const Item = ({ id, index, author, title, linkOnYouTube }: ItemType) => {
  const [show, setShow] = useState(false);

  const handleCloseShow = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <li className={classNames(styles.Item)}>
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

      <Modal show={show} onHide={handleCloseShow}>
        <Modal.Header>
          <Modal.Title>Просмотр</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {linkOnYouTube ? (
            <a
              className={styles.ModalText}
              href={linkOnYouTube}
              rel="noreferrer"
              target="_blank"
            >
              {author} - {title}
            </a>
          ) : (
            <p className={styles.ModalText}>
              {author} - {title}
            </p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseShow}>
            Закрыть
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Item;

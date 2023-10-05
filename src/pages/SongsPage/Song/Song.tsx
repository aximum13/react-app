import classNames from 'classnames';
import { useState } from 'react';

import { Button } from 'react-bootstrap';
import { ButtonGroup } from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs';
import { FiEdit } from 'react-icons/fi';
import ModalCmp from 'components/Modal/Modal';

import styles from './Song.module.scss';

import { errorTexts } from 'utils/errorTexts';
import { trimText } from 'utils/trimText';
import { deleteSong, editSong } from 'models/song/slices/songsSlice';
import { useDispatch } from 'react-redux';

import FormCmp from 'components/Form/Form';

type SongType = {
  id: number;
  index: number;
  author: string;
  title: string;
  linkOnYouTube: string;
};

const Song = ({ id, index, author, title, linkOnYouTube }: SongType) => {
  const dispatch = useDispatch();

  const [isShow, setIsShow] = useState(false);

  const handleCloseShow = () => setIsShow(false);
  const handleShow = () => setIsShow(true);

  const [formValues, setFormValues] = useState({
    author,
    title,
    linkOnYouTube,
  });

  let newErrors = {
    errorAuthor: '',
    errorTitle: '',
    errorLink: '',
  };

  const [errors, setErrors] = useState(newErrors);

  const [isEdit, setIsEdit] = useState(false);

  const handleEdit = () => setIsEdit(true);

  const handleCloseEdit = () => setIsEdit(false);

  const handleInputChange = (e: {
    target: { name: string; value: string };
  }) => {
    const { name, value } = e.target;
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [name]: value,
    }));
  };

  const handleFormSubmit = () => {
    newErrors = errorTexts(
      formValues.author.trim(),
      formValues.title.trim(),
      formValues.linkOnYouTube
    );

    if (newErrors.errorAuthor || newErrors.errorTitle || newErrors.errorLink) {
      return (
        setErrors(newErrors),
        setFormValues({
          author: trimText(formValues.author),
          title: trimText(formValues.title),
          linkOnYouTube: trimText(formValues.linkOnYouTube),
        })
      );
    }

    dispatch(
      editSong({
        id: id,
        author: formValues.author.trim(),
        title: formValues.title.trim(),
        linkOnYouTube: formValues.linkOnYouTube.trim(),
      })
    );

    setFormValues({
      author: formValues.author.trim(),
      title: formValues.title.trim(),
      linkOnYouTube: formValues.linkOnYouTube.trim(),
    });
    setErrors({ errorAuthor: '', errorTitle: '', errorLink: '' });
    setIsEdit(false);
  };

  const handleDeleteSong = (id: number) => {
    dispatch(deleteSong(id));
    setIsEdit(false);
  };

  return (
    <>
      <li className={classNames(styles.Song)}>
        <div className={styles.Text}>
          {index + 1}. {author} - {title}
        </div>

        <ButtonGroup>
          {' '}
          <Button
            className={classNames(styles.ButtonShow, 'showed me-3')}
            variant="outline-success"
            onClick={handleShow}
          >
            <BsSearch />
          </Button>
          <Button
            className="edit"
            variant="outline-primary"
            onClick={handleEdit}
          >
            <FiEdit />
          </Button>
        </ButtonGroup>
      </li>

      <ModalCmp
        show={isShow}
        handleClose={handleCloseShow}
        isForm={false}
        isEdit={false}
        title={'Просмотр'}
        btnCancelText={'Закрыть'}
        handleSubmit={undefined}
        handleDelete={undefined}
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

      <ModalCmp
        show={isEdit}
        isForm={true}
        isEdit={true}
        handleDelete={() => handleDeleteSong(id)}
        handleClose={handleCloseEdit}
        handleSubmit={handleFormSubmit}
        title={'Редактировать'}
        btnCancelText={'Удалить'}
        btnSubmitText={'Сохранить'}
      >
        <FormCmp
          formValues={formValues}
          errors={errors}
          handleInputChange={handleInputChange}
        ></FormCmp>
      </ModalCmp>
    </>
  );
};

export default Song;

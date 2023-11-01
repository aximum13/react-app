import classNames from 'classnames';
import { useState } from 'react';

import { useNavigate, useParams, Link } from 'react-router-dom';

import { Button } from 'react-bootstrap';
import { ButtonGroup } from 'react-bootstrap';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { FiEdit } from 'react-icons/fi';

import ModalCmp from 'components/Modal';
import FormCmp from 'components/Form';

import styles from './Song.module.scss';

import { useAppDispatch, useAppSelector } from 'hooks';
import { deleteSong, editSong } from 'models/songs/slices/songsSlice';
import { getSongs } from 'models/songs/selectors/songsSelector';

import { errorTexts } from 'utils/errorTexts';
import { trimText } from 'utils/trimText';

const Song = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const songs = useAppSelector(getSongs);

  const { id } = useParams();
  const idSong = id ? parseInt(id) : 0;

  const song = songs.find((song) => song.id === idSong);

  const { author, title, linkOnYouTube } = song
    ? song
    : { author: '', title: '', linkOnYouTube: undefined };

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

  const handleCloseEdit = () => {
    setFormValues({
      author,
      title,
      linkOnYouTube,
    });
    setIsEdit(false);
  };

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
          linkOnYouTube: formValues.linkOnYouTube
            ? trimText(formValues.linkOnYouTube)
            : '',
        })
      );
    }
    dispatch(
      editSong({
        id: idSong,
        author: formValues.author.trim(),
        title: formValues.title.trim(),
        linkOnYouTube: formValues.linkOnYouTube
          ? formValues.linkOnYouTube.trim()
          : '',
      })
    );
    setFormValues({
      author: formValues.author.trim(),
      title: formValues.title.trim(),
      linkOnYouTube: formValues.linkOnYouTube
        ? formValues.linkOnYouTube.trim()
        : '',
    });
    setErrors({ errorAuthor: '', errorTitle: '', errorLink: '' });
    setIsEdit(false);
  };

  const handleDeleteSong = (id: number) => {
    dispatch(deleteSong(id));
    setIsEdit(false);
    navigate('/react-app');
  };

  return (
    <div className={styles.Container}>
      <h1 className={classNames(styles.Title)}>Произведение</h1>
      {song ? (
        <div className={classNames(styles.Song)}>
          <div className={classNames(styles.TextContainer)}>
            {linkOnYouTube ? (
              <a href={linkOnYouTube} rel="noreferrer" target="_blank">
                {author} - {title}
              </a>
            ) : (
              <>
                <p className={styles.Text}>Композитор - {author}</p>
                <p className={styles.Text}>Название - {title}</p>
              </>
            )}
          </div>
          <ButtonGroup>
            <Button
              className="edit me-3"
              variant="outline-primary"
              onClick={handleEdit}
            >
              <FiEdit />
            </Button>
            <Button
              className={classNames(styles.ButtonDelete, 'deleted ')}
              variant="outline-danger"
              onClick={() => handleDeleteSong(idSong)}
            >
              <RiDeleteBin6Line />
            </Button>
          </ButtonGroup>
        </div>
      ) : (
        <>
          <p className={styles.NotFound}>Не найдено. </p>
        </>
      )}

      <Link
        className={classNames(song ? styles.ToHome : styles.ToHomeNotFound)}
        to={'/react-app'}
        replace
      >
        Вернуться на главную страницу
      </Link>

      <ModalCmp
        show={isEdit}
        isForm={true}
        handleClose={handleCloseEdit}
        handleSubmit={handleFormSubmit}
        title={'Редактировать'}
        btnCancelText={'Отмена'}
        btnSubmitText={'Сохранить'}
      >
        <FormCmp
          formValues={formValues}
          errors={errors}
          handleInputChange={handleInputChange}
        ></FormCmp>
      </ModalCmp>
    </div>
  );
};

export default Song;

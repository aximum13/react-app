import classNames from 'classnames';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAppDispatch } from 'hooks';
import { deleteSong, editSong } from 'models/songs/slices/songsSlice';
import { SongState } from 'models/songs/types';
import { errorTexts } from 'utils/errorTexts';

import FormCmp from 'components/Form';
import ModalCmp from 'components/Modal';
import ButtonsGroup from 'components/ButtonsGroup';
import LinkOnYouTube from 'components/LinkOnYouTube';

import styles from './Song.module.scss';

type Props = SongState & {
  index?: number;
  isDetail?: boolean;
  isEdit?: boolean;
  isShow?: boolean;
  isForm?: boolean;
  modalShowTitle?: string;
  modalEditTitle?: string;
  btnCancelText?: string;
  btnShowCancelText?: string;
  btnSubmitText?: string;
  handleShow?: () => void;
  handleCloseShow?: () => void;
  song?: SongState;
};

const Song: React.FC<Props> = ({
  isDetail,
  isShow,
  isForm,
  id,
  index,
  author,
  title,
  linkOnYouTube,
  modalShowTitle,
  modalEditTitle,
  btnShowCancelText,
  btnCancelText,
  btnSubmitText,
  handleShow,
  handleCloseShow,
  song,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [songProps, setSongProps] = useState({
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
    setSongProps({
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
    setSongProps((prevFormValues) => ({
      ...prevFormValues,
      [name]: value,
    }));
  };

  const handleFormSubmit = () => {
    newErrors = errorTexts(
      songProps.author ? songProps.author.trim() : '',
      songProps.title ? songProps.title.trim() : '',
      songProps.linkOnYouTube
    );
    if (newErrors.errorAuthor || newErrors.errorTitle || newErrors.errorLink) {
      return (
        setErrors(newErrors),
        setSongProps({
          author: songProps.author ? songProps.author.trim() : '',
          title: songProps.title ? songProps.title.trim() : '',
          linkOnYouTube: songProps.linkOnYouTube
            ? songProps.linkOnYouTube.trim()
            : '',
        })
      );
    }
    dispatch(
      editSong({
        id: id,
        author: songProps.author ? songProps.author.trim() : '',
        title: songProps.title ? songProps.title.trim() : '',
        linkOnYouTube: songProps.linkOnYouTube
          ? songProps.linkOnYouTube.trim()
          : '',
      })
    );
    setSongProps({
      author: songProps.author ? songProps.author.trim() : '',
      title: songProps.title ? songProps.title.trim() : '',
      linkOnYouTube: songProps.linkOnYouTube
        ? songProps.linkOnYouTube.trim()
        : '',
    });
    setErrors({ errorAuthor: '', errorTitle: '', errorLink: '' });
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
          <Link to={`${id}`} className={styles.TextDetail}>
            {index ? index + 1 : 1}. {author} - {title}
          </Link>

          <ButtonsGroup
            isDetail={isDetail}
            handleLeftBtn={handleShow}
            handleRightBtn={handleEdit}
          />
        </li>
      ) : song ? (
        <>
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
        </>
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
        <ModalCmp
          show={isShow}
          handleClose={handleCloseShow}
          title={modalShowTitle}
          btnCancelText={btnShowCancelText}
        >
          <LinkOnYouTube
            linkOnYouTube={linkOnYouTube}
            author={author}
            title={title}
          />
        </ModalCmp>
      )}

      <ModalCmp
        show={isEdit}
        isEdit={isDetail}
        isForm={isForm}
        title={modalEditTitle}
        btnCancelText={btnCancelText}
        btnSubmitText={btnSubmitText}
        handleClose={handleCloseEdit}
        handleDelete={() => handleDeleteSong(id)}
        handleSubmit={handleFormSubmit}
      >
        <FormCmp
          formValues={songProps}
          errors={errors}
          handleInputChange={handleInputChange}
        ></FormCmp>
      </ModalCmp>
    </>
  );
};

export default Song;

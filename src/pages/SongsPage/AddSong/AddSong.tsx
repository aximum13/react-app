import classNames from 'classnames';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { addSong } from 'models/song/slices/songsSlice';
import { getSongs } from 'models/song/selectors/SongsSelector';
import { errorTexts } from 'utils/errorTexts';
import { trimText } from 'utils/trimText';

import styles from './AddSong.module.scss';

import { Button } from 'react-bootstrap';
import ModalCmp from 'components/Modal/Modal';
import FormCmp from 'components/Form/Form';

const AddSong = () => {
  const dispatch = useDispatch();

  const songs = useSelector(getSongs);
  const initialId = songs.length > 0 ? songs[songs.length - 1].id : 0;
  const [currentId, setCurrentId] = useState(initialId);

  const [formValues, setFormValues] = useState({
    id: 0,
    author: '',
    title: '',
    linkOnYouTube: '',
  });

  let newErrors = {
    errorAuthor: '',
    errorTitle: '',
    errorLink: '',
  };

  const [errors, setErrors] = useState(newErrors);

  const [isShow, setIsShow] = useState(false);

  const handleClose = () => setIsShow(false);
  const handleOpen = () => setIsShow(true);

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
          id: initialId,
          author: trimText(formValues.author),
          title: trimText(formValues.title),
          linkOnYouTube: trimText(formValues.linkOnYouTube),
        })
      );
    }

    dispatch(
      addSong({
        id: currentId + 1,
        author: formValues.author.trim(),
        title: formValues.title.trim(),
        linkOnYouTube: formValues.linkOnYouTube.trim(),
      })
    );

    setFormValues({ id: 0, author: '', title: '', linkOnYouTube: '' });
    setErrors({ errorAuthor: '', errorTitle: '', errorLink: '' });
    setCurrentId(currentId + 1);
    setIsShow(false);
  };

  return (
    <>
      <Button onClick={handleOpen} className={classNames(styles.AddSong)}>
        Добавить
      </Button>
      <ModalCmp
        show={isShow}
        isForm={true}
        isEdit={false}
        handleClose={handleClose}
        handleSubmit={handleFormSubmit}
        handleDelete={undefined}
        title={'Новое произведение'}
        btnCancelText={'Отмена'}
        btnSubmitText={'Добавить'}
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

export default AddSong;

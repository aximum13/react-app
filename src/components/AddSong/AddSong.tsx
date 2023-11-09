import classNames from 'classnames';
import { useState } from 'react';

import { SongState } from 'models/songs/types';
import { isSongs } from 'utils/isSongs';

import { Button } from 'react-bootstrap';
import ModalCmp from 'components/Modal';
import { FormAdd } from 'components/Form';

type Props = {
  songs: SongState[];
};

const AddSong: React.FC<Props> = ({ songs }) => {
  const [isShow, setIsShow] = useState(false);

  const handleClose = () => setIsShow(false);
  const handleOpen = () => setIsShow(true);

  return (
    <>
      <Button
        onClick={handleOpen}
        className={classNames(!isSongs(songs) && 'centered')}
      >
        Добавить
      </Button>
      <ModalCmp show={isShow} isNew={true} handleClose={handleClose}>
        <FormAdd songs={songs} handleClose={handleClose}></FormAdd>
      </ModalCmp>
    </>
  );
};

export default AddSong;

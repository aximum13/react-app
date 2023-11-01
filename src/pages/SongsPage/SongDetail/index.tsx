import { useState } from 'react';

import { SongState } from 'models/songs/types';

import Song from 'components/Song';

type Props = SongState & {
  index: number;
};

const SongDetail = ({ id, index, author, title, linkOnYouTube }: Props) => {
  const [isShow, setIsShow] = useState(false);

  const handleCloseShow = () => setIsShow(false);
  const handleShow = () => setIsShow(true);

  return (
    <Song
      id={id}
      author={author}
      title={title}
      linkOnYouTube={linkOnYouTube}
      index={index}
      isDetail={true}
      isShow={isShow}
      isForm={true}
      modalShowTitle={'Просмотр'}
      modalEditTitle={'Редактировать'}
      handleShow={handleShow}
      handleCloseShow={handleCloseShow}
      btnShowCancelText={'Закрыть'}
      btnCancelText={'Удалить'}
      btnSubmitText={'Сохранить'}
    />
  );
};

export default SongDetail;

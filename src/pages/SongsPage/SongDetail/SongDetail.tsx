import { SongState } from 'models/songs/types';

import Song from 'components/Song';

type Props = SongState & {
  index: number;
};

const SongDetail = ({ id, index, author, title, linkOnYouTube }: Props) => {
  return (
    <Song
      isDetail={true}
      id={id}
      author={author}
      title={title}
      linkOnYouTube={linkOnYouTube}
      index={index}
    />
  );
};

export default SongDetail;

import { SongState } from 'models/songs/types';

import Song from 'components/Song';

type Props = SongState & {
  index: number;
  songs: SongState[];
};

const SongDetail = ({
  id,
  index,
  author,
  title,
  linkOnYouTube,
  songs,
}: Props) => {
  return (
    <Song
      isDetail={true}
      id={id}
      author={author}
      title={title}
      linkOnYouTube={linkOnYouTube}
      index={index}
      songs={songs}
    />
  );
};

export default SongDetail;

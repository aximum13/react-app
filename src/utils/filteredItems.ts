import { SongState } from 'models/songs/types';

export const filteredItems = (
  items: [],
  value: string,
  activeFilter: string
) => {
  if (activeFilter === 'FILTER_BY_AUTHOR') {
    const list = items.filter((item: SongState) => {
      return item.author.toLowerCase().indexOf(value.toLowerCase()) > -1;
    });

    return list;
  } else if (activeFilter === 'FILTER_BY_TITLE') {
    const list = items.filter((item: SongState) => {
      return item.title.toLowerCase().indexOf(value.toLowerCase()) > -1;
    });

    return list;
  } else return items;
};

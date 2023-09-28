import { ADD_ITEM } from 'constans';

export const addItem = (id, author, title, linkOnYouTube) => ({
  type: ADD_ITEM,
  id,
  author,
  title,
  linkOnYouTube,
});

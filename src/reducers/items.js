import { ADD_ITEM } from 'constans';

import { load } from 'redux-localstorage-simple';

let ITEMS = load({ namespace: 'musicList' });

if (!ITEMS || !ITEMS.items || !ITEMS.items.length) {
  ITEMS = {
    items: [],
  };
}

const items = (
  state = ITEMS.items,
  { id, author, title, linkOnYouTube, type }
) => {
  switch (type) {
    case ADD_ITEM:
      return [
        ...state,
        {
          id,
          author,
          title,
          linkOnYouTube,
        },
      ];

    default:
      return state;
  }
};

export default items;

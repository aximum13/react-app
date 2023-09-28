import { useSelector } from 'react-redux';

import { getItems } from 'selectors/itemsSelector';

import Item from 'components/Item/Item';

import styles from './List.module.scss';

const List = () => {
  const items = useSelector(getItems);

  return (
    <ul className={styles.List}>
      {items.map(
        (
          item: {
            id: number;
            author: string;
            title: string;
            linkOnYouTube: string;
          },
          index: number
        ) => (
          <Item
            id={item.id}
            index={index}
            key={item.id}
            author={item.author}
            title={item.title}
            linkOnYouTube={item.linkOnYouTube}
          />
        )
      )}
    </ul>
  );
};

export default List;

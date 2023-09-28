import { useSelector } from 'react-redux';

import { getItems } from 'selectors/itemsSelector';
import { isItems } from 'utils/isItems';

import Title from './Title/Title';
import List from './List/List';
import AddItem from './AddItem/AddItem';

const Content = () => {
  const items = useSelector(getItems);
  return (
    <>
      <Title />
      <AddItem />
      {isItems(items) && <List />}
    </>
  );
};

export default Content;

import classNames from 'classnames';

import { useState } from 'react';
import { useAppDispatch } from 'hooks';
import { filterSongs } from 'models/songs/slices/songsSlice';

import styles from './Filter.module.scss';

const Filter: React.FC = () => {
  const dispatch = useAppDispatch();

  const [valueFilter, setValueFilter] = useState('');

  const handleValueFilterChange = (e: { target: { value: string } }) => {
    const query: string = e.target.value;
    dispatch(filterSongs({ query }));
    setValueFilter(query);
  };

  return (
    <div className={classNames(styles.Filters)}>
      <label className={styles.Filter}>
        Фильтр:
        <input
          className={classNames(styles.Input)}
          type="text"
          placeholder="Чайковский"
          value={valueFilter}
          onChange={handleValueFilterChange}
        />
      </label>
    </div>
  );
};

export default Filter;

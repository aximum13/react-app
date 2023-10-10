import classNames from 'classnames';
import styles from './Filter.module.scss';

import { useState } from 'react';

const Filter = () => {
  const [authorFilter, setAuthorFilter] = useState('');
  const [titleFilter, setTitleFilter] = useState('');

  const handleAuthorFilterChange = (e: { target: { value: string } }) => {
    const value: string = e.target.value;
    setAuthorFilter(value);
  };

  const handleTitleFilterChange = (e: { target: { value: string } }) => {
    const value: string = e.target.value;
    setTitleFilter(value);
  };

  return (
    <div className={classNames(styles.Filters)}>
      <label className={styles.Filter}>
        Фильтр по композиторам:
        <input
          className={classNames(styles.Input)}
          type="text"
          placeholder="Чайковский"
          value={authorFilter}
          onChange={handleAuthorFilterChange}
        />
      </label>
      <label className={styles.Filter}>
        Фильтр по произведениям:
        <input
          className={classNames(styles.Input)}
          type="text"
          placeholder="Симфония № 5"
          value={titleFilter}
          onChange={handleTitleFilterChange}
        />
      </label>
    </div>
  );
};

export default Filter;

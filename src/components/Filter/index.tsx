import classNames from 'classnames';

import { useState } from 'react';

import styles from './Filter.module.scss';

import { FilterTypes } from './types';

const Filter: React.FC<FilterTypes> = ({ setSearchParams, songQuery }) => {
  const [search, setSearch] = useState(songQuery);

  const params = { song: '' };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query: string = event.target.value;

    if (query.length) params.song = query;
    setSearchParams(params);
    setSearch(query);
  };

  return (
    <div className={classNames(styles.Filters)}>
      <label className={styles.Filter}>
        Фильтр:
        <input
          className={classNames(styles.Input)}
          value={search}
          name="search"
          onChange={handleChange}
          placeholder="Чайковский"
          type="text"
        />
      </label>
    </div>
  );
};

export default Filter;

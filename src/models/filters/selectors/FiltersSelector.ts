import { RootState } from 'store';

const filtersSelector = (state: RootState) => state.filters;

export const getFilters = filtersSelector;

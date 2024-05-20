import { slice } from 'lodash';

type Item = any; 

export const ROWS_PER_PAGE=10;
export const DEFAULT_PAGE=0;

export const PaginationData = (items: Item[], itemsPerPage: number, currentPage: number): Item[] => {

  
  const getCurrentPageItems = (): Item[] => {
    const startIndex = currentPage * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, items.length);
    return slice(items, startIndex, endIndex);
  };

  return getCurrentPageItems();
};

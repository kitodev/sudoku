let ID = Date.now();

export type SodokuOptions = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type Cell =
  Record<'value', SodokuOptions>
  & Record<'location' | 'id', number>
  & Record<'predefined', boolean>
  & Record<'theme', '' | 'error' | 'error strong'>
  ;


export function createCell(location: number): Cell {
  return {
    location,
    value: 0,
    id: ++ID,
    predefined: false,
    theme: '',
  }
};

export function createCellWithValue(value: SodokuOptions): Cell {
  return {
    location: 0,
    value,
    id: ++ID,
    predefined: false,
    theme: '',
  }
};


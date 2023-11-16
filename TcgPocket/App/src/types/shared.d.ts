export type Error = {
  property: string;
  message: string;
};

export type Response<T = any> = {
  data: T;
  errors: Error[];
  hasErrors: boolean;
};

export type Id = {
  id: number;
};

export type Fn<TValue = void, TResult = void> = (values: TValue) => TResult;

export type PageDto = {
  currentPage?: number;
  pageSize?: number;
  sortBy?: string;
  orderBy?: 'asc' | 'desc';
};

export type List<T = any> = T[];

export type PagedResult<TDto = any> = {
  items: List<TDto>;
  pageCount: number;
  itemCount: number;
  firstRowOnPage: number;
  lastRowOnPage: number;
} & PageDto;

export type OptionItemDto = {
  label: string;
  value: string | number;
};

export type OptionItemDto<T = any> = {
  label: string;
  value: string | number;
  meta: T;
};

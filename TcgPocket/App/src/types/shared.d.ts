export type Error = {
  property: string;
  message: string;
};

export type Response<T> = {
  data: T;
  errors: Error[];
  hasErrors: boolean;
};

export type Response = {
  data;
  errors: Error[];
  hasErrors: boolean;
};

export type Id = {
  id: number;
};

export type PageDto = {
  currentPage: number;
  pageSize: number;
};

export type PagedResult<TDto = any> = {
  items: List<TDto>;
  PageCount: number;
  ItemCount: number;
  FirstRowOnPage: number;
  LastRowOnPage: number;
} & PageDto;

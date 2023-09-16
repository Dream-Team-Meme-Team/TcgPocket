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

export type Fn<TValue = void, TResult = void> = (values: TValue) => TResult;

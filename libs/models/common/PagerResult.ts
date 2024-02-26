export interface PagerResult<T> {
    Data: T[];
    PageIndex: number;
    PageSize: number;
    TotalPage: number;
    TotalRowCount: number;
  }
interface PaginationResponse<T> {
  readonly rows: T[];
  readonly lastRow: number;
}

export default PaginationResponse;

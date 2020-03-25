
export interface AngusResponse<T> {
    DataTypes?: any;
    TotalCount?: number;
    ResultSets: Array<Array<T>>;
    SQL: string;
}
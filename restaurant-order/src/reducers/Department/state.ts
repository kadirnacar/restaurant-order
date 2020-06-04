import { IDepartment, ITable, ICheck, ICheckDetail } from '@models';
import { IBaseReducer } from '../BaseReducer';

export enum Actions {
    RequestDepartmentItems = "REQUEST_DEPARTMENT_ITEMS",
    ReceiveDepartmentItems = "RECEIVE_DEPARTMENT_ITEMS",
    RequestTables = "REQUEST_TABLES",
    ReceiveTables = "RECEIVE_TABLES",
    RequestTablesChecks = "REQUEST_TABLES_CHECKS",
    ReceiveTablesChecks = "RECEIVE_TABLES_CHECKS",
    RequestTablesCheckDetail = "REQUEST_TABLES_CHECK_DETAIL",
    ReceiveTablesCheckDetail = "RECEIVE_TABLES_CHECK_DETAIL",
    SetCurrent = "SET_CURRENT_DEPARTMENT",
    SetCurrentTable = "SET_CURRENT_TABLE"
}

export interface DepartmentState extends IBaseReducer {
    // items?: IDepartment[];
    current: IDepartment;
    currentTable: ITable;
    [key: number]: IDepartment;
}

export interface IRequestDepartmentItemsAction {
    type: Actions.RequestDepartmentItems;
}

export interface IReceiveDepartmentItemsAction {
    type: Actions.ReceiveDepartmentItems;
    payload: IDepartment[];
}

export interface IRequestTablesAction {
    type: Actions.RequestTables;
}

export interface IReceiveTablesAction {
    type: Actions.ReceiveTables;
    payload: ITable[];
}

export interface IRequestTablesChecksAction {
    type: Actions.RequestTablesChecks;
}

export interface IReceiveTablesChecksAction {
    type: Actions.ReceiveTablesChecks;
    payload: ICheck[];
}

export interface IRequestTablesCheckDetailAction {
    type: Actions.RequestTablesCheckDetail;
}

export interface IReceiveTablesCheckDetailAction {
    type: Actions.ReceiveTablesCheckDetail;
    payload: ICheckDetail[];
}

export interface ISetCurrentAction {
    type: Actions.SetCurrent;
    payload: IDepartment;
}

export interface ISetCurrentTableAction {
    type: Actions.SetCurrentTable;
    payload: ITable;
}
import { IDepartment, ITable } from '@models';
import { IBaseReducer } from '../BaseReducer';

export enum Actions {
    RequestDepartmentItems = "REQUEST_DEPARTMENT_ITEMS",
    ReceiveDepartmentItems = "RECEIVE_DEPARTMENT_ITEMS",
    RequestTables = "REQUEST_TABLES",
    ReceiveTables = "RECEIVE_TABLES",
    SetCurrent = "SET_CURRENT_DEPARTMENT"
}

export interface DepartmentState extends IBaseReducer {
    // items?: IDepartment[];
    current: IDepartment;
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

export interface ISetCurrentAction {
    type: Actions.SetCurrent;
    payload: IDepartment;
}
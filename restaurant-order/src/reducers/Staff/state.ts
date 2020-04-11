import { IStaff } from '@models';
import { IBaseReducer } from '../BaseReducer';

export enum Actions {
    RequestStaffItem = "REQUEST_STAFF_ITEM",
    ReceiveStaffItem = "RECEIVE_STAFF_ITEM",
}

export interface StaffState extends IBaseReducer {
    current: IStaff;
}

export interface IRequestStaffItemAction {
    type: Actions.RequestStaffItem;
}

export interface IReceiveStaffItemAction {
    type: Actions.ReceiveStaffItem;
    payload: IStaff;
}
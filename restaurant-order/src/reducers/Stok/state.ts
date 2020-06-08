import {
  IStokGrup,
  IStok,
  ICheckType,
  IStokBarcode,
  IStokDepartment,
} from "@models";
import { IBaseReducer } from "../BaseReducer";

export enum Actions {
  RequestStokItems = "REQUEST_STOK_ITEMS",
  ReceiveStokItems = "RECEIVE_STOK_ITEMS",
}

export interface StokState extends IBaseReducer {
  stoks?: IStok[];
  checkTypes: ICheckType[];
  stokBarcodes: IStokBarcode[];
  stokDepartments: IStokDepartment[];
  stokGrups: IStokGrup[];
}

export interface IRequestStokItemsAction {
  type: Actions.RequestStokItems;
}

export interface IReceiveStokItemsAction {
  type: Actions.ReceiveStokItems;
  payload: any;
}

import {
  DepartmentReducer,
  DepartmentState,
  StaffReducer,
  StaffState,
  StokReducer,
  StokState,
  UserReducer,
  UserState,
} from "@reducers";
import * as LocalStorage from "./localStorage";
export { LocalStorage };

export interface ApplicationState {
  User: UserState;
  Department: DepartmentState;
  Staff: StaffState;
  Stok: StokState;
}

export const reducers = {
  User: UserReducer,
  Department: DepartmentReducer,
  Staff: StaffReducer,
  Stok: StokReducer,
};

export interface AppThunkAction<TAction> {
  (
    dispatch: (action: TAction) => void,
    getState: () => ApplicationState
  ): Promise<any>;
}

export interface AppThunkActionAsync<TAction, TResult> {
  (
    dispatch: (action: TAction) => void,
    getState: () => ApplicationState
  ): Promise<TResult>;
}

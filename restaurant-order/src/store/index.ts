
import { UserReducer, UserState } from '@reducers';
import { DepartmentReducer, DepartmentState } from '@reducers';
import * as LocalStorage from './localStorage';
export { LocalStorage };

export interface ApplicationState {
    User: UserState;
    Department: DepartmentState;
}

export const reducers = {
    User: UserReducer,
    Department: DepartmentReducer,
};

export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): Promise<any>;
}

export interface AppThunkActionAsync<TAction, TResult> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): Promise<TResult>
}
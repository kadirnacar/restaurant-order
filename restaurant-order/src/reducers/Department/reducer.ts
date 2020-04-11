import { Action } from 'redux';
import { Actions, DepartmentState, IReceiveDepartmentItemsAction, IReceiveTablesAction, IRequestTablesAction, ISetCurrentAction, IRequestDepartmentItemsAction } from './state';

const unloadedState: DepartmentState = {
    current: null
};

export type KnownAction = IReceiveDepartmentItemsAction | IRequestDepartmentItemsAction | IReceiveTablesAction | IRequestTablesAction | ISetCurrentAction;

export const reducer = (currentState: DepartmentState = unloadedState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case Actions.ReceiveDepartmentItems:
            currentState.isRequest = false;
            if (action.payload) {
                action.payload.forEach(dep => {
                    if (dep.MOBILPOSCONFIG) {
                        dep.MobilPosConfigObject = JSON.parse(dep.MOBILPOSCONFIG);
                        delete dep.MOBILPOSCONFIG;
                    }
                    currentState[dep.ID] = dep;
                })
            }
            return { ...currentState };
        case Actions.RequestDepartmentItems:
            currentState.isRequest = true;
            return { ...currentState };
        case Actions.ReceiveTables:
            currentState.isRequest = false;
            if (action.payload) {
                action.payload.forEach(table => {
                    if (currentState[table.DEPID]) {
                        if (!currentState[table.DEPID].Tables)
                            currentState[table.DEPID].Tables = {};
                        currentState[table.DEPID].Tables[table.ID] = table;
                    }
                })
            }
            return { ...currentState };
        case Actions.RequestTables:
            currentState.isRequest = true;
            return { ...currentState };
        case Actions.SetCurrent:
            currentState.isRequest = false;
            currentState.current = action.payload;
            return { ...currentState };
        default:
            break;
    }

    return currentState || unloadedState;
};

import { Action } from 'redux';
import { Actions, IReceiveStaffItemAction, IRequestStaffItemAction, StaffState } from './state';

const unloadedState: StaffState = {
    current: null
};

export type KnownAction = IReceiveStaffItemAction | IRequestStaffItemAction;

export const reducer = (currentState: StaffState = unloadedState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case Actions.ReceiveStaffItem:
            currentState.isRequest = false;
            if (action.payload) {
                currentState.current = action.payload;
            }
            return { ...currentState };
        case Actions.RequestStaffItem:
            currentState.isRequest = true;
            return { ...currentState };
            break;
    }

    return currentState || unloadedState;
};

import { Action } from "redux";
import {
  Actions,
  IReceiveStokItemsAction,
  IRequestStokItemsAction,
  StokState,
} from "./state";

const unloadedState: StokState = {
  checkTypes: [],
  stokBarcodes: [],
  stokDepartments: [],
  stokGrups: [],
  stoks: [],
};

export type KnownAction = IReceiveStokItemsAction | IRequestStokItemsAction;

export const reducer = (
  currentState: StokState = unloadedState,
  incomingAction: Action
) => {
  const action = incomingAction as KnownAction;
  switch (action.type) {
    case Actions.ReceiveStokItems:
      currentState.isRequest = false;
      currentState.stokGrups = action.payload[0];
      currentState.stoks = action.payload[1];
      currentState.stokDepartments = action.payload[2];
      currentState.stokBarcodes = action.payload[3];
      currentState.checkTypes = action.payload[4];
      return { ...currentState };
    case Actions.RequestStokItems:
      currentState.isRequest = true;
      return { ...currentState };
    default:
      break;
  }

  return currentState || unloadedState;
};

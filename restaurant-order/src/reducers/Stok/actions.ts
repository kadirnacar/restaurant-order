import { StokService } from "@services";
import { Alert } from "react-native";
import { batch } from "react-redux";
import { Actions } from "./state";

export const actionCreators = {
  getItems: () => async (dispatch, getState) => {
    let isSuccess: boolean = false;
    await batch(async () => {
      await dispatch({ type: Actions.RequestStokItems });
      var result = await StokService.getItems();

      await dispatch({
        type: Actions.ReceiveStokItems,
        payload:
          result.value && (!result.errors || result.errors.length <= 0)
            ? result.value
            : [[], [], [], [], []],
      });

      if (result.hasErrors()) {
        Alert.alert(result.errors[0]);
        isSuccess = false;
        return;
      }
      isSuccess = true;
    });
    return isSuccess;
  },
};

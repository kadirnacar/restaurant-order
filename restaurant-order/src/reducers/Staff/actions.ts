import { IStaff } from "@models";
import { StaffService } from "@services";
import { Alert } from "react-native";
import { batch } from "react-redux";
import { Actions } from './state';

export const actionCreators = {
    getItem: (id: number) => async (dispatch, getState) => {
        let isSuccess: boolean = false;
        await batch(async () => {
            await dispatch({ type: Actions.RequestStaffItem });
            var result = await StaffService.getItem(id);
            let userResult = result.value
                && result.value.length > 0
                && result.value[0].length > 0 ? result.value[0][0] : null;
            let garson: IStaff = null;
            if (userResult) {
                garson = JSON.parse(userResult.Return);
            }
            await dispatch({
                type: Actions.ReceiveStaffItem,
                payload: garson
            });

            if (result.hasErrors()) {
                Alert.alert(result.errors[0]);
                isSuccess = false;
                return;
            }

            isSuccess = true;
        });
        return isSuccess;
    }
}
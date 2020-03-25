import { IDepartment } from "@models";
import { DepartmentService, FileService } from "@services";
import { batch } from "react-redux";
import { Actions } from './state';
import { Alert } from "react-native";

export const actionCreators = {
    getItems: () => async (dispatch, getState) => {
        let isSuccess: boolean = false;
        await batch(async () => {
            await dispatch({ type: Actions.RequestDepartmentItems });
            var result = await DepartmentService.getItems();
            var depts = result.value && result.value.ResultSets && result.value.ResultSets.length > 0 ? result.value.ResultSets[0] : [];
            
            await dispatch({
                type: Actions.ReceiveDepartmentItems,
                payload: depts
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
    setCurrent: (item: IDepartment) => async (dispatch, getState) => {
        await dispatch({ type: Actions.SetCurrent, payload: item });
    }
}
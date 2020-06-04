import { IDepartment, ITable } from "@models";
import { DepartmentService } from "@services";
import { Alert } from "react-native";
import { batch } from "react-redux";
import { Actions } from "./state";
import { TableService } from "@services";

export const actionCreators = {
  getItems: () => async (dispatch, getState) => {
    let isSuccess: boolean = false;
    await batch(async () => {
      await dispatch({ type: Actions.RequestDepartmentItems });
      var result = await DepartmentService.getItems();
      var depts =
        result.value &&
        result.value.ResultSets &&
        result.value.ResultSets.length > 0
          ? result.value.ResultSets[0]
          : [];

      await dispatch({
        type: Actions.ReceiveDepartmentItems,
        payload: depts,
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
  getTables: () => async (dispatch, getState) => {
    let isSuccess: boolean = false;
    await batch(async () => {
      await dispatch({ type: Actions.RequestTables });
      var result = await TableService.getTables();
      var tables =
        result.value &&
        result.value.ResultSets &&
        result.value.ResultSets.length > 0
          ? result.value.ResultSets[0]
          : [];

      await dispatch({
        type: Actions.ReceiveTables,
        payload: tables,
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
  getChecks: (depId: number) => async (dispatch, getState) => {
    let isSuccess: boolean = false;
    await batch(async () => {
      await dispatch({ type: Actions.RequestTablesChecks });
      var result = await TableService.getOpenedTables(depId);
      var tables =
        result.value &&
        result.value.ResultSets &&
        result.value.ResultSets.length > 0
          ? result.value.ResultSets[0]
          : [];

      await dispatch({
        type: Actions.ReceiveTablesChecks,
        payload: tables,
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
  getCheckDetail: (checkId: number) => async (dispatch, getState) => {
    let isSuccess: boolean = false;
    await batch(async () => {
      await dispatch({ type: Actions.RequestTablesCheckDetail });
      var result = await TableService.getCheckDetail(checkId);
      var tables =
        result.value &&
        result.value.ResultSets &&
        result.value.ResultSets.length > 0
          ? result.value.ResultSets[0]
          : [];

      await dispatch({
        type: Actions.ReceiveTablesCheckDetail,
        payload: tables,
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
  },
  setCurrentTable: (item: ITable) => async (dispatch, getState) => {
    await dispatch({ type: Actions.SetCurrentTable, payload: item });
  },
};

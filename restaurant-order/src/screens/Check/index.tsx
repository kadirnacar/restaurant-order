import { BackImage, LoaderSpinner } from "@components";
import { ICheck } from "@models";
import { NavigationProp } from "@react-navigation/native";
import { DepartmentActions } from "@reducers";
import { ApplicationState } from "@store";
import { colors, hexToRgb } from "@tools";
import ColorScheme from "color-scheme";
import React, { Component } from "react";
import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
const { width } = Dimensions.get("window");

interface ChecksScreenState {
  tables?: ICheck[];
}

interface ChecksProps {
  DepartmentActions: typeof DepartmentActions;
  navigation: NavigationProp<any>;
}

type Props = ChecksProps & ApplicationState;

export class ChecksScreenComp extends Component<Props, ChecksScreenState> {
  constructor(props) {
    super(props);
    this.scheme = new ColorScheme();
    this.scheme.scheme("analogic").variation("hard");
    this.colors = this.scheme.colors();
    this.state = { tables: [] };
  }
  scheme: ColorScheme;
  colors: any;

  async componentDidMount() {}
  render() {
    return (
      <BackImage>
        <LoaderSpinner showLoader={this.props.Department.isRequest} />
        <FlatList
          keyboardDismissMode="on-drag"
          style={{ flex: 1 }}
          keyboardShouldPersistTaps="always"
          updateCellsBatchingPeriod={10}
          windowSize={20}
          maxToRenderPerBatch={20}
          initialNumToRender={10}
          removeClippedSubviews={true}
          data={
            this.props.Department.currentTable &&
            this.props.Department.currentTable.Check
              ? this.props.Department.currentTable.Check.CheckDetails
              : []
          }
          renderItem={({ item, index }) => {
            const color = hexToRgb(this.colors[index % 12]);
            const dep = item; //this.props.Department.current.Checks[item];
            return (
              <View
                key={index}
                style={[
                  {
                    backgroundColor: `rgba(${color.r},${color.g},${color.b},0.3)`,
                    padding: 3,
                    marginVertical: 3,
                  },
                ]}
              >
                <Text style={{ color: colors.textColor, fontSize: 20 }}>
                  {dep.PRODUCTNAME}
                </Text>
                <Text
                  style={{
                    color: colors.textColor,
                    fontSize: 14,
                    textAlign: "right",
                  }}
                >
                  {dep.QUANTITY} X{" "}
                  {dep.LINE_MID_UNITPRICE
                    ? dep.LINE_MID_UNITPRICE.toFixed(2)
                    : (0).toFixed(2)}{" "}
                  ={" "}
                  {dep.LINE_MID_TOTAL
                    ? dep.LINE_MID_TOTAL.toFixed(2)
                    : (0).toFixed(2)}
                </Text>
                {dep.NOTES ? (
                  <Text style={{ color: colors.textColor, fontSize: 14 }}>
                    {dep.NOTES}
                  </Text>
                ) : null}
              </View>
            );
          }}
          keyExtractor={(item, index) => index.toString()}
        />
        <View
          style={{
            height: 50,
            flexDirection: "row",
            backgroundColor: colors.color1,
          }}
        >
          <Text
            style={{
              flex: 3,
              alignSelf: "flex-end",
              color: colors.textColor,
              fontSize: 20,
              lineHeight: 50,
            }}
          >
            Toplam
          </Text>
          <Text
            style={{
              flex: 1,
              alignSelf: "flex-end",
              textAlign: "right",
              color: colors.textColor,
              fontSize: 20,
              lineHeight: 50,
            }}
          >
            {this.props.Department.currentTable &&
            this.props.Department.currentTable.Check &&
            this.props.Department.currentTable.Check.CHECKTOTAL
              ? this.props.Department.currentTable.Check.CHECKTOTAL.toFixed(2)
              : (0).toFixed(2)}
          </Text>
        </View>
      </BackImage>
    );
  }
}
const style = StyleSheet.create({
  button: {
    flex: 1,
    borderColor: colors.borderColor,
    backgroundColor: colors.borderColor,
    borderRadius: 25,
    flexDirection: "row",
    borderWidth: 4,
    margin: 10,
    width: width / 3 - 20,
    height: width / 3 - 20,
    alignSelf: "center",
    alignItems: "center",
    alignContent: "center",
  },
  buttonText: {
    flex: 1,

    fontSize: 26,
    fontWeight: "bold",
    color: colors.textColor,
    textAlignVertical: "center",
    textAlign: "center",
  },
});

export const ChecksScreen = connect(
  (state: ApplicationState) => state,
  (dispatch) => {
    return {
      DepartmentActions: bindActionCreators({ ...DepartmentActions }, dispatch),
    };
  }
)(ChecksScreenComp);

import { BackImage, LoaderSpinner } from "@components";
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
import LottieView from 'lottie-react-native';

interface NfcScreenState {
  tables?: any[];
}

interface NfcProps {
  DepartmentActions: typeof DepartmentActions;
  navigation: NavigationProp<any>;
}

type Props = NfcProps & ApplicationState;

export class NfcScreenComp extends Component<Props, NfcScreenState> {
  constructor(props) {
    super(props);
    this.scheme = new ColorScheme();
    this.scheme.scheme("analogic").variation("hard");
    this.colors = this.scheme.colors();
    this.state = { tables: [] };
  }
  scheme: ColorScheme;
  colors: any;

  async componentDidMount() {
   
  }
  render() {
    return (
      <BackImage>
        <LoaderSpinner showLoader={this.props.Department.isRequest} />
        <LottieView
            source={require('../../../assets/animation.json')}
            autoPlay
            loop
          />
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

export const NfcScreen = connect(
  (state: ApplicationState) => state,
  (dispatch) => {
    return {
      DepartmentActions: bindActionCreators({ ...DepartmentActions }, dispatch),
    };
  }
)(NfcScreenComp);

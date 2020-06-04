import { BackImage, LoaderSpinner } from "@components";
import { ICheck } from "@models";
import { NavigationProp } from "@react-navigation/native";
import { DepartmentActions } from "@reducers";
import { ApplicationState } from "@store";
import { colors, hexToRgb } from "@tools";
import ColorScheme from "color-scheme";
import React, { Component } from "react";
import { Dimensions, FlatList, StyleSheet, Text } from "react-native";
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

  async componentDidMount() {
    
    this.setState({ tables: [] });
  }
  render() {
    return (
      <BackImage>
        <LoaderSpinner showLoader={this.props.Department.isRequest} />
        <FlatList
          style={{ flex: 1 }}
          data={this.state.tables}
          renderItem={({ item, index }) => {
            const color = hexToRgb(this.colors[index % 12]);
            const dep = item; //this.props.Department.current.Checks[item];
            return (
              <TouchableHighlight
                underlayColor="#ffffff00"
                key={index}
                style={[
                  style.button,
                  {
                    backgroundColor: `rgba(${color.r},${color.g},${color.b},0.3)`,
                  },
                ]}
                onPress={async () => {
                  // await this.props.DepartmentActions.setCurrentCheck(item);

                }}
              >
                <Text style={style.buttonText}>{dep.TABLENO}</Text>
              </TouchableHighlight>
            );
          }}
          numColumns={3}
          keyExtractor={(item, index) => index.toString()}
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

export const ChecksScreen = connect(
  (state: ApplicationState) => state,
  (dispatch) => {
    return {
      DepartmentActions: bindActionCreators({ ...DepartmentActions }, dispatch),
    };
  }
)(ChecksScreenComp);

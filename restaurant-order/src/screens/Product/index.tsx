import { BackImage, LoaderSpinner } from "@components";
import { NavigationProp } from "@react-navigation/native";
import { DepartmentActions } from "@reducers";
import { ApplicationState } from "@store";
import { colors, hexToRgb } from "@tools";
import ColorScheme from "color-scheme";
import React, { Component } from "react";
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";
import {
  TouchableHighlight,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FontAwesome5 } from "@expo/vector-icons";
const { width } = Dimensions.get("window");

interface ProductScreenState {
  tables?: any[];
}

interface ProductProps {
  DepartmentActions: typeof DepartmentActions;
  navigation: NavigationProp<any>;
}

type Props = ProductProps & ApplicationState;

export class ProductScreenComp extends Component<Props, ProductScreenState> {
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
          data={this.props.Stok.stoks ? this.props.Stok.stoks : []}
          renderItem={({ item, index }) => {
            const color = hexToRgb(this.colors[index % 12]);

            return (
              <View
                key={index}
                style={[
                  {
                    backgroundColor: `rgba(${color.r},${color.g},${color.b},0.3)`,
                    padding: 3,
                    flexDirection: "row",
                    marginVertical: 3,
                  },
                ]}
              >
                <Image
                  style={{
                    flexDirection: "column",
                    width: 75,
                    height: 75,
                    marginRight: 5,
                    borderRadius: 10,
                    borderWidth: 5,
                    borderColor: colors.borderColor,
                  }}
                  source={{ uri: item.PHOTOURL }}
                />
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        color: colors.textColor,
                        fontSize: 20,
                        flex: 3,
                        flexDirection: "column",
                      }}
                    >
                      {item.NAME}
                    </Text>
                    <Text
                      style={{
                        color: colors.textColor,
                        flex: 1,
                        flexDirection: "column",
                        fontSize: 16,
                        alignContent: "flex-end",
                        alignItems: "flex-end",
                        alignSelf: "flex-start",
                        textAlign: "right",
                        justifyContent: "flex-end",
                      }}
                    >
                      {item.PRICE}
                    </Text>
                  </View>
                  <View
                    style={{
                      alignItems: "flex-end",
                      justifyContent: "flex-end",
                      flex: 1,
                      flexDirection: "row",
                      padding: 3,
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        borderRadius: 10,
                        padding: 5,
                        borderWidth: 2,
                        borderColor: colors.borderColor,
                        backgroundColor: colors.color3,
                      }}
                    >
                      <FontAwesome5
                        name="minus"
                        size={25}
                        color={colors.inputTextColor}
                      />
                    </TouchableOpacity>
                    <View
                      style={{
                        borderRadius: 10,
                        padding: 5,
                        borderWidth: 2,
                        minWidth: 80,
                        justifyContent: "center",
                        alignContent: "center",
                        alignItems: "center",
                        alignSelf: "center",
                        borderColor: colors.borderColor,
                        backgroundColor: colors.inputTextColor,
                      }}
                    >
                      <Text style={{ fontSize: 18 }}>0</Text>
                    </View>
                    <TouchableOpacity
                      style={{
                        borderRadius: 10,
                        padding: 5,
                        borderWidth: 2,
                        borderColor: colors.borderColor,
                        backgroundColor: colors.color3,
                      }}
                    >
                      <FontAwesome5
                        name="plus"
                        size={25}
                        color={colors.inputTextColor}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          }}
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

export const ProductScreen = connect(
  (state: ApplicationState) => state,
  (dispatch) => {
    return {
      DepartmentActions: bindActionCreators({ ...DepartmentActions }, dispatch),
    };
  }
)(ProductScreenComp);

import { BackImage, LoaderSpinner } from "@components";
import { FontAwesome5 } from "@expo/vector-icons";
import { IStok } from "@models";
import { NavigationProp } from "@react-navigation/native";
import { DepartmentActions } from "@reducers";
import { ApplicationState } from "@store";
import { colors, hexToRgb } from "@tools";
import ColorScheme from "color-scheme";
import fuzzysort from "fuzzysort";
import React, { Component } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const { width } = Dimensions.get("window");

interface ProductScreenState {
  items?: IStok[];
  search?: string;
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
    this.state = { items: [], search: "" };
  }
  scheme: ColorScheme;
  colors: any;

  async componentDidMount() {
    const source = this.props.Stok.stoks.filter((t) =>
      this.props.Stok.stokDepartments && this.props.Department.current
        ? this.props.Stok.stokDepartments.findIndex(
            (d) =>
              d.DEPID == this.props.Department.current.ID && d.PRODUCTID == t.ID
          ) > -1
        : false
    );
    // const groups = source.map((x) => x.STOKGRUPID).filter(distinct);
    // this.setState({
    //   source,
    //   groupIds: groups,
    // });
    this.setState({
      items: source,
    });
  }
  searchData(search: string) {
    return fuzzysort
      .go(search, this.state.items, {
        limit: 20,
        allowTypo: true,
        threshold: -50000,
        keys: ["NAME"],
      })
      .map((i) => i.obj);
  }
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
            this.state.items && this.state.search
              ? this.searchData(this.state.search)
              : this.state.items
              ? this.state.items
              : []
          }
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
                    width: 60,
                    height: 60,
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
                        fontSize: 16,
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
                        borderBottomEndRadius: 0,
                        borderTopEndRadius: 0,
                        borderRightWidth: 0,
                        padding: 5,
                        borderWidth: 2,
                        width: 50,
                        justifyContent: "center",
                        alignContent: "center",
                        alignItems: "center",
                        alignSelf: "center",
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
                        borderRadius: 0,
                        padding: 4,
                        borderWidth: 2,
                        minWidth: 60,
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
                        borderBottomStartRadius: 0,
                        borderTopStartRadius: 0,
                        borderLeftWidth: 0,
                        padding: 5,
                        borderWidth: 2,
                        width: 50,
                        justifyContent: "center",
                        alignContent: "center",
                        alignItems: "center",
                        alignSelf: "center",
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
        <View style={{ flexDirection: "row" }}>
          <TextInput
            placeholder="Ara..."
            value={this.state.search}
            placeholderTextColor={colors.primaryButtonTextColor}
            style={style.buttonText}
            clearButtonMode="always"
            autoFocus={true}
            clearTextOnFocus
            onChangeText={(text) => {
              this.setState({ search: text });
            }}
          />
          <TouchableOpacity
            style={{
              padding: 5,
              backgroundColor: colors.color1,
            }}
            onPress={() => {
              this.setState({ search: "" });
            }}
          >
            <FontAwesome5 name="times" size={35} color={"#ffffff"} />
          </TouchableOpacity>
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
    backgroundColor: colors.color1,
    fontSize: 18,
    justifyContent: "flex-end",
    color: colors.textColor,
    textAlignVertical: "center",
    textAlign: "left",
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

import { BackImage, LoaderSpinner } from "@components";
import { FontAwesome5 } from "@expo/vector-icons";
import { IStok, IStokGrup } from "@models";
import { NavigationProp } from "@react-navigation/native";
import { DepartmentActions } from "@reducers";
import { ApplicationState } from "@store";
import { colors, hexToRgb } from "@tools";
import { distinct } from "@utils";
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
import Drawer from "react-native-drawer-menu";
import { TouchableOpacity } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const { width } = Dimensions.get("window");

interface ProductScreenState {
  items?: IStok[];
  groups?: IStokGrup[];
  currentGroup?: number;
  showCategory?: boolean;
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
    this.drawer = React.createRef();
    this.scheme.scheme("analogic").variation("hard");
    this.colors = this.scheme.colors();
    this.state = { items: [], search: "", showCategory: false, groups: [] };
  }
  scheme: ColorScheme;
  colors: any;
  drawer: React.RefObject<any>;
  async componentDidMount() {
    const source =
      this.props.Stok && this.props.Stok.stoks
        ? this.props.Stok.stoks.filter((t) =>
            this.props.Stok.stokDepartments && this.props.Department.current
              ? this.props.Stok.stokDepartments.findIndex(
                  (d) =>
                    d.DEPID == this.props.Department.current.ID &&
                    d.PRODUCTID == t.ID
                ) > -1
              : false
          )
        : [];
    const groupIds = source.map((x) => x.PRODUCTGROUPID).filter(distinct);
    const groups =
      this.props.Stok && this.props.Stok.stokGrups
        ? this.props.Stok.stokGrups.filter(
            (t) => groupIds.findIndex((d) => d == t.ID) > -1
          )
        : [];

    this.setState({
      items: source,
      groups: groups,
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
        <Drawer
          ref={this.drawer}
          drawerWidth={300}
          drawerContent={
            <View style={{ flex: 1, backgroundColor: colors.color2 }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: colors.textColor,
                  flexDirection: "row",
                  width: "100%",
                  textAlign: "center",
                }}
              >
                Ürün Kategorileri
              </Text>
              <FlatList
                ListHeaderComponent={
                  <TouchableOpacity
                    style={[
                      {
                        padding: 5,
                        flexDirection: "row",
                        marginVertical: 3,
                        borderBottomWidth: 1,
                        borderBottomColor: colors.borderColor,
                        backgroundColor: !this.state.currentGroup
                          ? colors.borderColor
                          : null,
                      },
                    ]}
                    onPress={() => {
                      this.setState({ currentGroup: null });
                    }}
                  >
                    <Text
                      style={{
                        color: colors.textColor,
                        fontSize: 18,
                      }}
                    >
                      Tümü
                    </Text>
                  </TouchableOpacity>
                }
                keyboardDismissMode="on-drag"
                style={{ flex: 1, padding: 10 }}
                keyboardShouldPersistTaps="always"
                updateCellsBatchingPeriod={10}
                windowSize={20}
                maxToRenderPerBatch={20}
                initialNumToRender={10}
                removeClippedSubviews={true}
                data={this.state.groups ? this.state.groups : []}
                renderItem={({ item, index }) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      style={[
                        {
                          padding: 3,
                          borderBottomColor: colors.borderColor,
                          flexDirection: "row",
                          marginVertical: 3,
                          borderBottomWidth: 1,
                          backgroundColor:
                            this.state.currentGroup == item.ID
                              ? colors.borderColor
                              : null,
                        },
                      ]}
                      onPress={() => {
                        this.setState({ currentGroup: item.ID });
                      }}
                    >
                      <Text
                        style={{
                          color: colors.textColor,
                          fontSize: 18,
                        }}
                      >
                        {item.NAME}
                      </Text>
                    </TouchableOpacity>
                  );
                }}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          }
          type={Drawer.types.Overlay}
          drawerPosition={Drawer.positions.Right}
          onDrawerOpen={() => {
            this.setState({ showCategory: true });
          }}
          onDrawerClose={() => {
            this.setState({ showCategory: false });
          }}
        >
          <FlatList
            keyboardDismissMode="on-drag"
            style={{ flex: 1 }}
            keyboardShouldPersistTaps="always"
            updateCellsBatchingPeriod={10}
            windowSize={20}
            maxToRenderPerBatch={20}
            initialNumToRender={10}
            removeClippedSubviews={true}
            data={(this.state.items && this.state.search
              ? this.searchData(this.state.search)
              : this.state.items
              ? this.state.items
              : []
            ).filter((x) =>
              this.state.currentGroup
                ? x.PRODUCTGROUPID == this.state.currentGroup
                : true
            )}
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
        </Drawer>

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
              this.setState({ search: text, currentGroup: null });
            }}
          />
          <TouchableOpacity
            style={{
              padding: 5,
              backgroundColor: colors.color1,
            }}
            onPress={() => {
              this.setState({ search: "", currentGroup: null });
            }}
          >
            <FontAwesome5 name="times" size={35} color={"#ffffff"} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              padding: 5,
              backgroundColor: colors.color1,
            }}
            onPress={() => {
              if (this.state.showCategory) {
                this.drawer.current.closeDrawer();
              } else {
                this.drawer.current.openDrawer();
              }
            }}
          >
            <FontAwesome5 name="bars" size={35} color={"#ffffff"} />
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

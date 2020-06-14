import { BackImage, LoaderSpinner } from "@components";
import { FontAwesome5 } from "@expo/vector-icons";
import { ITable } from "@models";
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
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { distinct } from "@utils";
import Drawer from "react-native-drawer-menu";

const { width } = Dimensions.get("window");
interface TablesScreenState {
  tables?: ITable[];
  search?: string;

  groups?: string[];
  currentGroup?: string;
  showCategory?: boolean;
}

interface TablesProps {
  DepartmentActions: typeof DepartmentActions;
  navigation: NavigationProp<any>;
}

type Props = TablesProps & ApplicationState;

export class TablesScreenComp extends Component<Props, TablesScreenState> {
  constructor(props) {
    super(props);
    this.scheme = new ColorScheme();
    this.scheme.scheme("analogic").variation("hard");
    this.colors = this.scheme.colors();
    this.drawer = React.createRef();
    this.state = { tables: [], search: "" };
    this.props.navigation.addListener("focus", async (e) => {
      await this.props.DepartmentActions.setCurrentTable(null);
    });
  }
  scheme: ColorScheme;
  colors: any;
  drawer: React.RefObject<any>;

  async componentDidMount() {
    await this.props.DepartmentActions.getChecks(
      this.props.Department.current.ID
    );
    const userDeps: ITable[] =
      this.props.Department.current && this.props.Department.current.Tables
        ? Object.keys(this.props.Department.current.Tables)
            .map((id) => this.props.Department.current.Tables[id])
            .sort((a, b) => {
              if (a.TABLENO > b.TABLENO) {
                return 1;
              } else if (a.TABLENO < b.TABLENO) {
                return -1;
              }
              return 0;
            })
        : [];
    const groups = userDeps.map((x) => x.TABLEGROUP).filter(distinct);
    this.setState({ tables: userDeps, groups: groups });
  }
  searchData(search: string) {
    return fuzzysort
      .go(search, this.state.tables, {
        limit: 20,
        allowTypo: true,
        threshold: -50000,
        keys: ["TABLENO"],
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
                Masa Grupları
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
                            this.state.currentGroup == item
                              ? colors.borderColor
                              : null,
                        },
                      ]}
                      onPress={() => {
                        this.setState({ currentGroup: item });
                      }}
                    >
                      <Text
                        style={{
                          color: colors.textColor,
                          fontSize: 18,
                        }}
                      >
                        {item}
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
            style={{ flex: 1 }}
            data={(this.state.tables && this.state.search
              ? this.searchData(this.state.search)
              : this.state.tables
              ? this.state.tables
              : []
            ).filter((x) =>
              this.state.currentGroup
                ? x.TABLEGROUP == this.state.currentGroup
                : true
            )}
            renderItem={({ item, index }) => {
              const color = hexToRgb(this.colors[index % 12]);
              const dep = item; //this.props.Department.current.Tables[item];
              return (
                <TouchableHighlight
                  underlayColor="#ffffff00"
                  key={index}
                  style={[
                    style.button,
                    {
                      backgroundColor: `rgba(${color.r},${color.g},${color.b},0.3)`,
                      flexDirection: "row",
                      borderColor: item.Check
                        ? colors.inputTextColor
                        : colors.borderColor,
                    },
                  ]}
                  onPress={async () => {
                    await this.props.DepartmentActions.setCurrentTable(item);
                    if (
                      this.props.Department.currentTable &&
                      this.props.Department.currentTable.Check
                    ) {
                      await this.props.DepartmentActions.getCheckDetail(
                        this.props.Department.currentTable.Check.CHECKID
                      );
                    }
                    this.props.navigation.navigate("Check");
                  }}
                >
                  <React.Fragment>
                    {item.Check ? (
                      <FontAwesome5
                        name="users"
                        size={20}
                        color={colors.inputTextColor}
                        style={{
                          position: "absolute",
                          flexDirection: "row",
                          alignContent: "center",
                          alignItems: "center",
                          alignSelf: "center",
                          justifyContent: "center",
                          textAlign: "center",
                          bottom: 5,
                          width: "100%",
                        }}
                      />
                    ) : null}
                    <Text
                      style={[
                        style.buttonText,
                        {
                          color: item.Check
                            ? colors.inputTextColor
                            : colors.borderColor,
                        },
                      ]}
                    >
                      {dep.TABLENO}
                    </Text>
                  </React.Fragment>
                </TouchableHighlight>
              );
            }}
            numColumns={3}
            keyExtractor={(item, index) => index.toString()}
          />
        </Drawer>
        {this.state.tables && this.state.tables.length > 0 ? (
          <View style={{ flexDirection: "row" }}>
            <TextInput
              placeholder="Ara..."
              value={this.state.search}
              placeholderTextColor={colors.primaryButtonTextColor}
              style={style.searchText}
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
        ) : null}
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
  searchText: {
    flex: 1,
    backgroundColor: colors.color1,
    fontSize: 18,
    justifyContent: "flex-end",
    color: colors.textColor,
    textAlignVertical: "center",
    textAlign: "left",
  },
});

export const TablesScreen = connect(
  (state: ApplicationState) => state,
  (dispatch) => {
    return {
      DepartmentActions: bindActionCreators({ ...DepartmentActions }, dispatch),
    };
  }
)(TablesScreenComp);

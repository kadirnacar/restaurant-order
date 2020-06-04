import { HeaderRight, HeaderTitle } from "@components";
import { FontAwesome5 } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { DepartmentScreen, LoginScreen, TablesScreen,ChecksScreen } from "@screens";
import { colors } from "@tools";
import * as React from "react";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TableTabNavigator = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeBackgroundColor: colors.color3,
        inactiveBackgroundColor: colors.color1,
        activeTintColor: colors.color2,
      }}
      lazy={false}
      screenOptions={{ unmountOnBlur: true }}
    >
      <Tab.Screen
        name="Department"
        component={DepartmentScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="store" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Tables"
        component={TablesScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="chair" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        headerMode={"screen"}
        screenOptions={(navigation) => {
          return {
            headerStyle: { backgroundColor: colors.color1 },
            headerTintColor: "#fff",
            headerBackTitleVisible: false,
            headerTitleAlign: "center",
            headerTitle: (props) => {
              return (
                <HeaderTitle
                  style={[
                    props.style,
                    { color: "#fff", fontWeight: "bold", fontSize: 20 },
                  ]}
                />
              );
            },
            // headerLeft: null,
            safeAreaInsets: { bottom: 0, left: 0, right: 0, top: 0 },
            animationTypeForReplace: "pop",
            headerRight: (props) => {
              return <HeaderRight navigation={navigation.navigation} />;
            },
            headerStatusBarHeight: 0,
          };
        }}
        initialRouteName="Login"
        mode="card"
      >
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerRight: null }}
        />
        <Stack.Screen
          name="Department"
          component={DepartmentScreen}
          options={{ headerLeft: null }}
        />
        <Stack.Screen
          name="Tables"
          component={TablesScreen}
        />
         <Stack.Screen
          name="Check"
          component={ChecksScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

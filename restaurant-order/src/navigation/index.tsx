import { FontAwesome5 } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DepartmentActions, UserActions } from '@reducers';
import { DepartmentScreen, HomeScreen, LoginScreen } from '@screens';
import { colors, store } from '@tools';
import * as React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator tabBarOptions={{
            activeBackgroundColor: colors.color3,
            inactiveBackgroundColor: colors.color1,
            activeTintColor: colors.color2,

        }} lazy={true}>
            <Tab.Screen name="Department"
                component={DepartmentScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome5 name="store" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen name="HomeTab"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome5 name="home" color={color} size={size} />
                    ),
                }}
            />
        </Tab.Navigator>
    )
}

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
                        headerTitle: "ElektraWeb POS",
                        headerLeft: null,
                        safeAreaInsets: { bottom: 0, left: 0, right: 0, top: 0 },
                        animationTypeForReplace:"pop",
                        headerRight: (props) => {
                            return <TouchableOpacity style={{ marginHorizontal: 10 }}
                                onPress={async () => {
                                    await UserActions.clear()(store.dispatch, store.getState);
                                    await DepartmentActions.setCurrent(null)(store.dispatch, store.getState);

                                    navigation.navigation.navigate("Login");
                                }}>
                                <FontAwesome5 name="power-off" size={20} color="#fff" />
                            </TouchableOpacity>
                        },
                        headerStatusBarHeight: 0
                    }
                }}
                initialRouteName="Login"
                mode="card"
            >
                <Stack.Screen name="Login" component={LoginScreen} options={{ headerRight: null }} />
                {/* <Stack.Screen name="Department"
                    options={{ headerLeft: null }}
                    component={DepartmentScreen} /> */}
                <Stack.Screen name="Home"
                    component={TabNavigator} />
            </Stack.Navigator>
        </NavigationContainer >
    );
}
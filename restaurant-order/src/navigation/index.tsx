import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen, LoginScreen, DepartmentScreen } from '@screens';
import { colors, store } from '@tools';
import * as React from 'react';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { UserActions, DepartmentActions } from '@reducers';

const Stack = createStackNavigator();

export const AppNavigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                headerMode={"screen"}
                screenOptions={(navigation) => {
                    return {
                        headerStyle: { backgroundColor: colors.color1 },
                        headerTintColor: "#fff",
                        headerTitleAlign: "center",
                        headerTitle: "ElektraWeb POS",
                        headerRight: (props) => {
                            return <TouchableOpacity style={{ marginHorizontal: 10 }}
                                onPress={async () => {
                                    await UserActions.clear()(store.dispatch, store.getState);
                                    await DepartmentActions.setCurrent(null)(store.dispatch, store.getState);

                                    navigation.navigation.navigate("Login");
                                }}>
                                <FontAwesome5 name="power-off" size={28} color="#fff" />
                            </TouchableOpacity>
                        },
                        headerStatusBarHeight: 0
                    }
                }}
                initialRouteName="Login"
                mode="card"
            >
                <Stack.Screen name="Login" component={LoginScreen} options={{ headerRight: null }} />
                <Stack.Screen name="Department"
                    options={{ headerLeft: null }}
                    component={DepartmentScreen} />
                <Stack.Screen name="Home"
                    options={{ headerLeft: null }}
                    component={HomeScreen} />
            </Stack.Navigator>
        </NavigationContainer >
    );
}
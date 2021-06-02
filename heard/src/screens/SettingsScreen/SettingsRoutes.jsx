import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {SettingsScreen, } from "../index";
import {theme} from "../../theme/Theme";

const SettingsStack = createStackNavigator();

function SettingsRoutes() {
    return (
        <SettingsStack.Navigator
            initialRouteName="Search"
            screenOptions={{
                headerStyle: {
                    backgroundColor: theme.colors.primary,
                },
                headerTintColor: '#fff',
            }}
        >
            <SettingsStack.Screen name="Search" component={SettingsScreen}  options={{ title: 'Settings' }} />


        </SettingsStack.Navigator>

    );
}

export default SettingsRoutes;

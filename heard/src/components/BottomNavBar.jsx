import React from "react";
import {createMaterialBottomTabNavigator} from "@react-navigation/material-bottom-tabs"
import {HomeRoutes, SettingsRoutes, SearchRoutes} from "../screens";
import {MaterialCommunityIcons} from '@expo/vector-icons';
import CustomNavigationBar from "./CustomNavBar";
import {theme} from "../theme/Theme";
import {getFocusedRouteNameFromRoute} from "@react-navigation/native";

const Tabs = createMaterialBottomTabNavigator();


function getHeaderTitle(route) {
    // If the focused route is not found, we need to assume it's the initial screen
    // This can happen during if there hasn't been any navigation inside the screen
    // In our case, it's "Feed" as that's the first screen inside the navigator
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'Albums';

    switch (routeName) {
        case 'Albums':
            return 'Your Albums';
        case 'Search':
            return 'Find Album';
        case 'Settings':
            return 'Settings';
    }
}



export default function BottomNavBar({navigation}){

/*    React.useLayoutEffect(() => {
        props.navigation.setOptions({ headerTitle: getHeaderTitle(props.route) });
    }, [props.navigation, props.route]);*/



    return(
        <Tabs.Navigator
            screenOptions={
                ({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Albums') {
                        iconName = 'music-box';
                    } else if (route.name === 'Search') {
                        iconName = 'magnify';
                    } else if (route.name === 'Settings') {
                        iconName = 'cog';
                    }

                    // You can return any component that you like here!
                    return <MaterialCommunityIcons name={iconName} size={23} color={color}  />;
                }
            })}
            barStyle={{ backgroundColor: theme.colors.primary }}
        >
            <Tabs.Screen name="Albums" component={HomeRoutes}  />
            <Tabs.Screen name="Search" component={SearchRoutes} />
            <Tabs.Screen name="Settings" component={SettingsRoutes} />
        </Tabs.Navigator>
    );
}
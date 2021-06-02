import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {SearchScreen, AddOwnAlbum} from "../index";
import {theme} from "../../theme/Theme";
const SearchStack = createStackNavigator();

function SearchRoutes() {
    return (
        <SearchStack.Navigator
            initialRouteName="Search"
            screenOptions={{
                headerStyle: {
                backgroundColor: theme.colors.primary,
            },
                headerTintColor: '#fff',
            }}
        >
            <SearchStack.Screen name="Search" component={SearchScreen}  options={{ title: 'Search' }} />


        </SearchStack.Navigator>

    );
}

export default SearchRoutes;

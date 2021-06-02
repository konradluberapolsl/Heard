import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {HomeScreen, AddEditOwnAlbum, SearchRoutes, AlbumDetailsScreen} from "../index";
import {theme} from "../../theme/Theme";

const QueueStack = createStackNavigator();

function HomeRoutes() {
    return (
        <QueueStack.Navigator
            initialRouteName="AlbumsList"
            screenOptions={{
                headerStyle: {
                    backgroundColor: theme.colors.primary,
                },
                headerTintColor: '#fff',
            }}
        >
            <QueueStack.Screen name="AlbumList" component={HomeScreen}  options={{ title: 'Your Albums' }} />
            <QueueStack.Screen name="AddOwnAlbum" options={{ title: 'Add album' }} component={AddEditOwnAlbum} />
            <QueueStack.Screen name="Search" options={{ title: 'Search', headerShown: false  }} component={SearchRoutes}/>
            <QueueStack.Screen name={"AlbumDetails"}  options={{ title: 'Album Details', headerShown: true  }} component={AlbumDetailsScreen}/>
        </QueueStack.Navigator>

    );
}

export default HomeRoutes;

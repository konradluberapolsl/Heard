import React from 'react'
import {Button, Portal, Provider} from "react-native-paper";
import { firebase } from '../../firebase/config'
import {View, useWindowDimensions, SafeAreaView, StyleSheet} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import { QueueList, HeardList, SearchRoutes} from "../index";
import {theme} from "../../theme/Theme";
import FloatingActionButton from "../../components/FAB";


export default function HomeScreen({navigation}) {

    const onSingOutPressed =  () => {
        firebase.auth().signOut();
    }
    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'Heard' },
        { key: 'second', title: 'Queue' },
    ]);

    const renderScene = ({ route }) => {
        switch (route.key) {
            case 'first':
                return <HeardList navigation={navigation} />;
            case 'second':
                return <QueueList navigation={navigation} />;
            default:
                return null;
        }
    };

    const onOwnAddPress = () => {
        navigation.navigate("AddOwnAlbum");
    }

    const onApiPress = () => {
        navigation.navigate("Search");
    }


    // const renderScene = SceneMap({
    //     first: HeardList,
    //     second: QueueListRoutes,
    // });

    const renderTabBar = props => (
        <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: theme.colors.accent }}
            style={{ backgroundColor: theme.colors.primary }}
        />
    );

    return (
        <Portal.Host>
            <SafeAreaView style={{ flex: 1,   marginTop: 0 }}>

                    <TabView
                        renderTabBar={renderTabBar}
                        navigationState={{ index, routes }}
                        renderScene={renderScene}
                        onIndexChange={setIndex}
                        initialLayout={{ width: layout.width }}

                    />


                <Portal>
                    <FloatingActionButton
                        onApiAddPress={onApiPress}
                        onOwnAddPress={onOwnAddPress}
                    />
                </Portal>

            </SafeAreaView>
        </Portal.Host>


    );
};

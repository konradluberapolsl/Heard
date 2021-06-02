import React from 'react'
import {SafeAreaView, View} from 'react-native'
import styles from "./styles";
import { Avatar, Button } from 'react-native-elements';
import { Switch, Text } from 'react-native-paper';
import firebase from "firebase";


export default function SettingsScreen({navigation}) {

    const [isSwitchOn, setIsSwitchOn] = React.useState(false);

    const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

    const onLogOutPress = () => firebase.auth().signOut();


    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={styles.accountContainer}>
                <Avatar
                    containerStyle={styles.avatar}
                    rounded
                    size="large"
                    source={{
                        uri:
                            'https://konradluberapolsl.github.io/static/media/avatar.2b75376e.jpg',
                    }}
                />
                <View style={styles.infoContainer}>
                    <Text style={styles.text}>Your name</Text>
                    <Button onPress={() => console.log("Press")} title="EDIT PROFILE" type="clear" titleStyle={styles.button} />
                </View>
            </View>

            <View style={styles.buttonContainer}>
                <Text style={styles.buttonText}>Dark mode</Text>
                <Switch style={styles.switch} value={isSwitchOn} onValueChange={onToggleSwitch} />
            </View>

            <View style={{flex: 1,justifyContent: 'flex-end'}}>
                <Button onPress={onLogOutPress} title="LOG OUT" type="clear" titleStyle={styles.buttonLogOut} />
            </View>
        </SafeAreaView>
    )
}
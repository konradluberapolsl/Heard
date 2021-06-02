import React from "react";
import { Appbar } from 'react-native-paper';


export default function CustomNavigationBar({ navigation, previous, scene }) {
    const { options } = scene.descriptor
        return (
            <Appbar.Header>
                {previous ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
                <Appbar.Content title="Heard" />
            </Appbar.Header>
        );
}


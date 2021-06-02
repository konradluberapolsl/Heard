import * as React from 'react';
import {List, Subheading, Title, Caption, Button} from 'react-native-paper'
import {StyleSheet, Text, View} from "react-native";



export default function TrackListItem({item}) {

    return(
    <View style={styles.container}>
        <Text style={styles.number}>{item.number}</Text>

        <View style={styles.textContainer}>
            <Text style={{fontSize: 17, fontWeight: "600"}}>{item.title}</Text>
            { ((item.featuring !== ""))  && <Caption style={{fontSize: 15}}>feat. {item.featuring}</Caption>}
        </View>

        <Text style={styles.duration}>{item.duration}</Text>

    </View>
    );
};



const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        padding: 10
    },
    number: {
        fontWeight: "bold",
        fontSize: 25,
        marginStart: 10
    },
    duration:{
        fontWeight: "bold",
        fontSize: 20,
        marginLeft: "auto",
        marginEnd: 15
    },
    textContainer: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        marginStart: 15,
        flexShrink: 1,
    }


});
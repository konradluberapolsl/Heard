import * as React from 'react';
import { IconButton, Card, Title, Paragraph } from 'react-native-paper'
import {Image, StyleSheet, TouchableOpacity, View} from "react-native";
import {theme} from "../theme/Theme";

export default function SearchResultItem ({item, onPress, onAddPress}) {

    const name = item.title.split(' - ');
    const title = name[1];
    const artists = name[0].replace("*", "");


    return (
    <Card style={styles.item} onPress={onPress}>
        <View style={styles.container} >

            <Image style={styles.thumbnail} source={{ uri: item.thumb }} />

            <View style={styles.textContainer}>
                <Title style={styles.textTitle} >{title}</Title>
                <Paragraph style={styles.textParagraph} >{artists}</Paragraph>
            </View>
            <IconButton
                style={styles.button}
                icon="book-plus"
                color={theme.colors.accent}
                size={30}
                onPress={onAddPress}
            />
        </View>

    </Card>
    )
};


const styles = StyleSheet.create({

    item: {
        padding: 0,
        marginVertical: 6,
        marginHorizontal: 12,
    },
    container:{
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'flex-start',
    },

    textTitle: {
        marginVertical: 0,
        fontSize: 15
    },
    textParagraph: {
        marginVertical: 0,
        fontSize: 12
    },
    textContainer: {
        marginStart: 10,
        flexShrink: 1
    },
    thumbnail:{
        width: 75,
        height: 75,
        borderRadius: 4,
    },
    button: {
        marginLeft: 'auto'
    }
});
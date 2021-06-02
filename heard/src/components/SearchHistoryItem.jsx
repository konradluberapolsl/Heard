import * as React from 'react';
import { Card, Title, Paragraph } from 'react-native-paper'
import {Image, StyleSheet, View, TouchableOpacity} from "react-native";

const SearchHistoryItem = ({item}) => (
    <Card style={styles.item} onPress={() => console.log("Record pressed")}>
        <View style={styles.container} >

            <Image style={styles.thumbnail} source={{ uri: 'https://img.discogs.com/3KrlBcMxl3WOliT0TuxV6XgNBUw=/fit-in/600x600/filters:strip_icc()' +
                    ':format(jpeg):mode_rgb():quality(90)/discogs-images/R-6736792-1549154079-2751.jpeg.jpg' }} />

            <View style={styles.textContainer}>
                <Title style={styles.textTitle} >{item.title}</Title>
                <Paragraph style={styles.textParagraph} >{item.artist}</Paragraph>
            </View>

        </View>

    </Card>
);

export default SearchHistoryItem;

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
        fontSize: 15,
        flexWrap: 'wrap'
    },
    textParagraph: {
        marginVertical: 0,
        fontSize: 12,
        flexWrap: 'wrap'
    },
    textContainer: {
        marginStart: 10
    },

    thumbnail:{
        width: 75,
        height: 75,
        borderRadius: 4,
    }
});
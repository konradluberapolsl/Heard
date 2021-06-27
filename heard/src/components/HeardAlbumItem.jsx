import * as React from 'react';
import { Button, Card, Title, Paragraph } from 'react-native-paper'
import { StyleSheet} from "react-native";
import {AirbnbRating, Rating} from 'react-native-ratings';
import {theme} from "../theme/Theme";

const HeardAlbumItem = ({item, onLongPress , onPress, borderWidth}) => (
    <Card style={[styles.item, borderWidth]} onLongPress={onLongPress}  onPress={onPress}>
        <Card.Content style={styles.textContainer}>
            <Title style={styles.text} >{item.title}</Title>
            <Paragraph style={styles.text} >{item.artists_sort}</Paragraph>
        </Card.Content>
        <Card.Cover style={styles.thumbnail} source={{ uri: item.thumb }} />
        <Card.Actions style={styles.button}>
            <AirbnbRating defaultRating={item.rating}  showRating={false}  size={25}  selectedColor="#000" isDisabled={true} />
        </Card.Actions>
    </Card>
);

export default HeardAlbumItem;

const styles = StyleSheet.create({

    text: {

    },
    item: {
        padding: 0,
        marginVertical: 8,
         marginRight: "auto",
        overflow: 'hidden',
        width: 175,
        alignItems: "flex-end",
        justifyContent: "center",
        flexDirection: "row",
        marginLeft: "auto",
        borderColor: theme.colors.accent,
    },
    textContainer: {
        marginBottom: 10,
        justifyContent: "center",
        flexDirection: "column"

    },
    thumbnail:{
        width: 175,
        height: 175
    },
    button:{
        alignSelf: "center",

    }
});
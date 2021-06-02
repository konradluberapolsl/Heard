import * as React from 'react';
import { Button, Card, Title, Paragraph } from 'react-native-paper'
import { StyleSheet} from "react-native";
import {AirbnbRating, Rating} from 'react-native-ratings';

const HeardAlbumItem = ({item, onPress, style}) => (
    <Card style={styles.item} onPress={onPress}>
        <Card.Content style={styles.textContainer}>
            <Title style={styles.text} >{item.title}</Title>
            <Paragraph style={styles.text} >{item.artist}</Paragraph>
        </Card.Content>
        <Card.Cover style={styles.thumbnail} source={{ uri: 'https://img.discogs.com/3KrlBcMxl3WOliT0TuxV6XgNBUw=/fit-in/600x600/filters:strip_icc()' +
                ':format(jpeg):mode_rgb():quality(90)/discogs-images/R-6736792-1549154079-2751.jpeg.jpg' }} />
        <Card.Actions style={styles.button}>
            {/*<Rating type='custom'  ratingColor='#000' readonly={false} imageSize={32} jumpValue={0.5}/>*/}
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
        width: 175,
        alignItems: "flex-end",
        justifyContent: "center",
        flexDirection: "row",
        marginLeft: "auto"
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
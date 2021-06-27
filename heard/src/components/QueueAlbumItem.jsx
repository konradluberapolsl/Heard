import * as React from 'react';
import { Button, Card, Title, Paragraph } from 'react-native-paper'
import { StyleSheet} from "react-native";
import {theme} from "../theme/Theme";

const QueueAlbumItem = ({item,onPressItem, onPressHeard, onLongPress, borderWidth}) => (
    <Card onPress={onPressItem} onLongPress={onLongPress}  style={[styles.item, borderWidth] }>
        <Card.Content style={styles.textContainer}>
            <Title style={styles.text} >{item.title}</Title>
            <Paragraph style={styles.text} >{item.artists_sort}</Paragraph>
        </Card.Content>
        <Card.Cover style={styles.thumbnail} source={{ uri: item.thumb }} />
        <Card.Actions style={styles.button}>
            <Button onPress={onPressHeard} >HEARD</Button>

        </Card.Actions>
    </Card>
);

export default QueueAlbumItem;

const styles = StyleSheet.create({

    text: {

    },
    item: {
        padding: 0,
        marginVertical: 8,
        marginHorizontal: 16,
        width: 175,
        overflow: 'hidden',
        alignItems: "flex-end",
        justifyContent: "center",
        flexDirection: "row",
        marginRight: "auto",
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
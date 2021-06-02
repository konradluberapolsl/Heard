import React, {useState} from 'react'
import { FlatList, SafeAreaView} from 'react-native'
import QueueAlbumItem from "../../components/QueueAlbumItem";
import styles from "./styles"
import FloatingActionButton from "../../components/FAB";
import {Button, Paragraph, Dialog, Portal, TextInput} from 'react-native-paper';
import {AirbnbRating} from 'react-native-ratings';
import {theme} from "../../theme/Theme";


const DATA = [
    {
        key: 1,
        title: "2014 Forest Hills Drive",
        artist: "J. Cole",
        rating: 5
    },
    {
        key: 2,
        title: "Silny jak Nigdy",
        artist: "Gruby Mielzky",
        rating: 4
    },
    {
        key: 3,
        title: "Eliminati",
        artist: "TEDE",
        rating: 3
    },
    {
        key: 4,
        title: "2014 Forest Hills Drive",
        artist: "J. Cole",
        rating: 4
    },
    {
        key: 5,
        title: "Silny jak Nigdy",
        artist: "Gruby Mielzky",
        rating: 4
    },
    {
        key: 6,
        title: "Eliminati",
        artist: "TEDE",
        rating: 4
    },
    {
        key: 7,
        title: "2014 Forest Hills Drive",
        artist: "J. Cole",
        rating: 4
    },
    {
        key: 8,
        title: "Silny jak Nigdy",
        artist: "Gruby Mielzky",
        rating: 4
    },
    {
        key: 9,
        title: "Eliminati",
        artist: "TEDE",
        rating: 4
    },
];

export default function QueueList({navigation}) {

    const [selectedId, setSelectedId] = useState(null);

    const [visible, setVisible] = React.useState(false);

    const showDialog = () => setVisible(true);

    const hideDialog = () => setVisible(false);

    const [comment, setComment] = React.useState('');

    const [rate, setRate] = React.useState(1);

    const onOwnAddPress = () => {
        navigation.navigate("AddOwnAlbum");
    }

    const onApiPress = () => {
        navigation.navigate("Search");
    }

    const renderItem = ({ item }) => {
        return (
            <QueueAlbumItem
                item={item}
                onPress={showDialog}
            />
        );
    };


    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={DATA}
                renderItem={renderItem}
                keyExtractor={(item) => item.key}
                numColumns={ 2 }
            />

            {/*<FloatingActionButton*/}
            {/*    onApiAddPress={onApiPress}*/}
            {/*    onOwnAddPress={onOwnAddPress}*/}
            {/*/>*/}

            <Portal>
                <Dialog visible={visible} onDismiss={hideDialog}>
                    <Dialog.Title>Review this album</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph>Leave comment and give stars.</Paragraph>
                        <TextInput
                            style={styles.textInput}
                            label="Comment"
                            value={comment}
                            onChangeText={comment => setComment(comment)}
                            mode='outlined'
                            multiline={true}
                        />
                        <AirbnbRating
                            defaultRating={1}
                            showRating={false}
                            size={30}
                            selectedColor={theme.colors.primary}
                            onFinishRating={setRate}
                        />
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={hideDialog}>Cancel</Button>
                        <Button onPress={hideDialog}>Heard</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </SafeAreaView>
    );
}
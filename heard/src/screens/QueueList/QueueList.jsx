import React, {useState, useEffect} from 'react'
import { FlatList, SafeAreaView} from 'react-native'
import QueueAlbumItem from "../../components/QueueAlbumItem";
import styles from "./styles"
import FloatingActionButton from "../../components/FAB";
import {Button, Paragraph, Dialog, Portal, TextInput, Title, ActivityIndicator, FAB} from 'react-native-paper';
import {AirbnbRating} from 'react-native-ratings';
import {theme} from "../../theme/Theme";
import firebase from "firebase";

export default function QueueList({navigation}) {

    const [isLoading, setLoading] = useState(true);

    const [isEmpty, setEmpty] = useState(true);

    const [visible, setVisible] = React.useState(false);

    const [data, setData] = React.useState([]);

    const showDialog = () => setVisible(true);

    const hideDialog = () => setVisible(false);

    const [selectedItems, setSelectedItems] = React.useState([])

    const [comment, setComment] = React.useState('');

    const [rate, setRate] = React.useState(1);

    const [deleteVisibility, setDeleteVisibility] = React.useState(false);

    const [clickedItem, setClickedItem] = React.useState(null);

    const userId = firebase.auth().currentUser.uid;

    const userCollection =  firebase.firestore().collection("users").doc(userId);

    const getQueue = () => {
        userCollection.collection("queue").onSnapshot((snapshot) => {
            if (!snapshot.empty){
                const albums = snapshot.docs.map((doc) => doc.data());
                setData(albums);
                setEmpty(false);
            }
            else{
                setEmpty(true);
            }
            setLoading(false);
        });
    };

    const moveToHeard = (album) =>{
        userCollection.collection("queue")
            .doc(album.id.toString()).delete().then(() =>{
            addAlbum("heard", album);
            console.log("Album added to heard");

        }).catch((error) => {
            console.log(error);
        });
    };

    const addAlbum = (type, album) => {
        userCollection.collection(type).doc(album.id.toString()).set(
            {
                id: album.id,
                artists_sort: album.artists_sort,
                title: album.title,
                thumb: album.thumb,
                genres: album.genres,
                released_formatted: album.released_formatted,
                tracklist: album.tracklist,
                rating: rate,
                comment: comment,
            }
        ).catch((error) => {
            console.log(error);
        });
    };

    const onItemPressed = (item) => {
        navigation.navigate("AlbumDetails", {album: item})
    };

    const onItemLongPressed = (item) => {

        if (!selectedItems.includes(item.id))
            setSelectedItems(prevArray => [...prevArray, item.id]);
        else if(selectedItems.includes(item.id))
            setSelectedItems(selectedItems.filter( id => id !== item.id ) );

    };

    const onHeardPressed = () => {
        moveToHeard(clickedItem);
        hideDialog();
    };


    const onDeletePressed = () => {

        for(let id of selectedItems){
            userCollection.collection("queue")
                .doc(id.toString()).delete().then(() => {
                    console.log("success")
            }).catch((error) => console.log(error))
        }
        setDeleteVisibility(false);

    };

    useEffect(() => {
        getQueue();
    },[])

    useEffect(() => {
        if(selectedItems.length === 0)
            setDeleteVisibility(false);
        else if (selectedItems.length !== 0)
            setDeleteVisibility(true);

    },[selectedItems.length]);


    const renderItem = ({ item }) => {

        const borderWidth = !selectedItems.includes(item.id) ? 0 : 3;

        return (
            <QueueAlbumItem
                borderWidth={{borderWidth}}
                item={item}
                onPressItem={() => onItemPressed(item)}
                onLongPress={() => onItemLongPressed(item)}
                onPressHeard={() => {
                    showDialog();
                    setClickedItem(item);
                }}
            />
        );
    };


    return (
        <SafeAreaView style={styles.container}>
            { isLoading ? <ActivityIndicator style={{flex: 1}} size='large'/> : (isEmpty ?
                <Title style={styles.message}>Your queue is empty.</Title>
                :  <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                numColumns={ 2 }
            />)
            }

            <FAB
                style={styles.fab}
                small
                icon="delete"
                visible={deleteVisibility}
                theme={theme.colors.error}
                onPress={() => onDeletePressed()}
            />


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
                        <Button onPress={() => onHeardPressed()}>Heard</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </SafeAreaView>
    );
}
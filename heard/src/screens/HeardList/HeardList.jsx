import React, {useEffect, useState} from 'react'
import {Text, View, FlatList, SafeAreaView} from 'react-native'
import HeardAlbumItem from "../../components/HeardAlbumItem";
import styles from "./styles"
import FloatingActionButton from "../../components/FAB";
import firebase from "firebase";
import {ActivityIndicator, FAB, Title} from "react-native-paper";
import {theme} from "../../theme/Theme";


export default function HeardList({navigation}) {


    const [isLoading, setLoading] = useState(true);
    const [isEmpty, setEmpty] = useState(true);

    const [data, setData] = React.useState([]);

    const [deleteVisibility, setDeleteVisibility] = React.useState(false);
    const [selectedItems, setSelectedItems] = useState([]);

    const userId = firebase.auth().currentUser.uid;

    const userCollection =  firebase.firestore().collection("users").doc(userId);

    const getHeard = () => {
        userCollection.collection("heard").onSnapshot((snapshot) => {
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


    const onItemPressed = (item) => {
        navigation.navigate("AlbumDetails", {album: item})
    }

    useEffect(() => {
       getHeard();
    },[]);


    useEffect(() => {
        if(selectedItems.length === 0)
            setDeleteVisibility(false);
        else if (selectedItems.length !== 0)
            setDeleteVisibility(true);

    },[selectedItems.length]);


    const onItemLongPressed = (item) => {

        if (!selectedItems.includes(item.id))
            setSelectedItems(prevArray => [...prevArray, item.id]);
        else if(selectedItems.includes(item.id))
            setSelectedItems(selectedItems.filter( id => id !== item.id ) );

    };

    const onDeletePressed = () => {

        for(let id of selectedItems){
            userCollection.collection("heard")
                .doc(id.toString()).delete().then(() => {
                console.log("success")
            }).catch((error) => console.log(error))
        }
        setDeleteVisibility(false);

    };

    const renderItem = ({ item }) => {

        const borderWidth = !selectedItems.includes(item.id) ? 0 : 3;

        return (
            <HeardAlbumItem
                borderWidth={{borderWidth}}
                item={item}
                onPress={() => onItemPressed(item)}
                onLongPress={() => onItemLongPressed(item)}
            />
        );
    };


    return (
        <SafeAreaView style={styles.container}>

            { isLoading ? <ActivityIndicator style={{flex: 1}} size='large'/> : (isEmpty ?
                <Title style={styles.message}>Your heard list is empty.</Title>
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


        </SafeAreaView>
    );
}
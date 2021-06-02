import React, {useState} from 'react'
import {Text, View, FlatList, SafeAreaView} from 'react-native'
import HeardAlbumItem from "../../components/HeardAlbumItem";
import styles from "./styles"
import FloatingActionButton from "../../components/FAB";


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

export default function HeardList({navigation}) {

    const [selectedId, setSelectedId] = useState(null);



    const renderItem = ({ item }) => {
        return (
            <HeardAlbumItem
                item={item}
                onPress={() => navigation.navigate("AlbumDetails")}
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
        </SafeAreaView>
    );
}
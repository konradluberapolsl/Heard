import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, FlatList } from 'react-native';
import { SearchBar } from 'react-native-elements';
import {Button, Paragraph, Dialog, Portal, TextInput} from 'react-native-paper';
import styles from "./styles"
import SearchHistoryItem from "../../components/SearchHistoryItem";
import SearchResultItem from "../../components/SearchResultItem";
import {AirbnbRating} from "react-native-ratings";
import {theme} from "../../theme/Theme";


export default function SearchScreen({navigation}) {

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




    const [search, setSearch] = useState('');
    const [filteredDataSource, setFilteredDataSource] = useState([]);

    const [visible, setVisible] = React.useState(false);

    const showDialog = () => setVisible(true);

    const hideDialog = () => setVisible(false);

    const [rate, setRate] = React.useState(1);

    const [comment, setComment] = React.useState('');


    const searchFilterFunction = (text) => {
        // Check if searched text is not blank
        if (text) {
            setSearch(text);
        } else {

            setSearch(text);
        }
    };

    const renderItem = ({ item }) => {

        if(search !== ""){
            return (
                <SearchResultItem
                    item={item}
                    onAddPress={showDialog}
                />
            );
        }
        else{
            return (
                <SearchHistoryItem
                    item={item}
                />
            );
        }


    };


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <SearchBar
                    round
                    searchIcon={{ size: 24 }}
                    onChangeText={(text) => searchFilterFunction(text)}
                    onClear={(text) => searchFilterFunction('')}
                    placeholder="Type Here..."
                    value={search}
                    platform="android"
                    cancelIcon={false}/>

                <FlatList
                    data={DATA}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.key}
                />
            </View>

            <Portal>
                <Dialog visible={visible} onDismiss={hideDialog}>
                    <Dialog.Title>Review this album</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph style={{ flexWrap: 'wrap'}}>Comment and give stars or leave it empty to add to queue</Paragraph>
                        <TextInput
                            style={styles.textInput}
                            label="Comment"
                            value={comment}
                            onChangeText={comment => setComment(comment)}
                            mode='outlined'
                            multiline={true}
                        />
                        <AirbnbRating
                            defaultRating={0}
                            showRating={false}
                            size={30}
                            selectedColor={theme.colors.primary}
                            onFinishRating={setRate}
                        />
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={hideDialog}>Cancel</Button>
                        <Button onPress={hideDialog}>Add</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>

        </SafeAreaView>
    )
}
import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, FlatList } from 'react-native';
import { SearchBar } from 'react-native-elements';
import {Button, Paragraph, Dialog, Portal, TextInput, ActivityIndicator} from 'react-native-paper';
import styles from "./styles"
import SearchHistoryItem from "../../components/SearchHistoryItem";
import SearchResultItem from "../../components/SearchResultItem";
import {AirbnbRating} from "react-native-ratings";
import {theme} from "../../theme/Theme";
import {searchAlbums} from "../../api/searchAlbums"
import {getAlbum} from "../../api/getAlbum";

export default function SearchScreen({navigation}) {

    const [data, setData] = useState([]);

    const [isLoading, setLoading] = useState(false);

    const [search, setSearch] = useState('');
    const [filteredDataSource, setFilteredDataSource] = useState([]);

    const [visible, setVisible] = React.useState(false);

    const showDialog = () => setVisible(true);

    const hideDialog = () => setVisible(false);

    const [rate, setRate] = React.useState(1);

    const [comment, setComment] = React.useState('');

    const fetchAlbums = (query) => {
        setLoading(true);
        searchAlbums(query)
            .then((res) => {
                setData(res);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
            });

    };

    const fetchAlbum = (query) => {
        setLoading(true)
        getAlbum(query)
            .then((res) => {
                navigation.navigate("AlbumDetails", {album: res})
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
            });
    }

    const searchFilterFunction = (text) => {
        // Check if searched text is not blank
        if (text !== "") {
            fetchAlbums(text);
            setSearch(text);
        } else {
            setSearch(text);
        }
    };

    const renderItem = ({ item }) => {
            return (
                <SearchHistoryItem
                    item={item}
                    onPress={() => fetchAlbum(item.id)}
                />
            );
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
                {isLoading ? <ActivityIndicator style={styles.activityIndicator} size='large'/> : (
                    <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                /> )}
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
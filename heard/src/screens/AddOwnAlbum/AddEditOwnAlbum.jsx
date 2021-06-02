import React from 'react'
import {FlatList, Image, ScrollView, Text, View} from 'react-native'
import TrackListItem from "../../components/TrackListItem";
import {Button, Caption, Card, Subheading, TextInput, Title} from "react-native-paper";
import styles from "../AddOwnAlbum/styles";
import {AirbnbRating} from "react-native-ratings";
import {theme} from "../../theme/Theme";



export default function AddEditOwnAlbum({navigation}) {

    const [albumName, setAlbumName] = React.useState('');

    const [artistName, setArtistName] = React.useState('');

    const [genre, setGenre] = React.useState('');

    const [coverImage, setCoverImage] = React.useState('');

    const [release, setRelease] = React.useState('');

    const [trackName, setTrackName] = React.useState('');

    const [feat, setFeat] = React.useState('');

    const [duration, setDuration] = React.useState('');

    const [number, setNumber] = React.useState('');



    const [comment, setComment] = React.useState('');

    const [addVisibility, setAddVisibility] = React.useState(true);

    const [saveVisibility, setSaveVisibility] = React.useState(false);

    const [disable, setDisable] = React.useState(true);


    let Album = {
        title: "",
        artist: "",
        genre: "",
        released: "",
        cover_image: {uri: "https://img.discogs.com/fN7X7VrZ_X0ATM-xpZ8L6HMoXjM=/fit-in/600x600/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-6023735-1409079220-2641.jpeg.jpg"},
        tracks: [

        ]
    };



    const renderItem = ({ item }) => {

        return (
            <TrackListItem
                item={item}
            />
        );
    };

    const renderSeparator = () => (
        <View
            style={{
                backgroundColor: 'rgba(196,196,196,0.8)',
                height: 1.1,
                width: "95%",
                alignSelf: "center"
            }}
        />
    );

    return (
        <ScrollView styles={{flex: 1}}  nestedScrollEnabled={false}>
            <Card style={styles.card}>
                <Caption style={styles.cardTitle}>Basic Information</Caption>
                    <View style={styles.textInputRow}>

                        <TextInput
                            label="Album Name"
                            value={albumName}
                            onChangeText={text => setAlbumName(text)}
                        />
                    </View>

                    <View style={styles.textInputRow}>
                        <TextInput
                            label="Artist"
                            value={artistName}
                            onChangeText={text => setArtistName(text)}
                        />
                    </View>

                <View style={styles.textInputRow}>
                    <TextInput
                        label="Genre"
                        value={genre}
                        onChangeText={text => setGenre(text)}
                    />
                </View>
                <View style={styles.textInputRow}>
                    <TextInput
                        label="Release Date"
                        value={release}
                        onChangeText={text => setRelease(text)}
                    />
                </View>
                <View style={styles.textInputRow}>
                    <TextInput
                        label="Cover Image URL"
                        value={coverImage}
                        onChangeText={text => setCoverImage(text)}
                    />
                </View>
            </Card>

            <Card style={styles.card}>
                <Caption style={styles.cardTitle}>Tracks</Caption>
                <FlatList
                    data={Album.tracks.sort((a, b) => a.number - b.number)}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.number}
                    ItemSeparatorComponent={renderSeparator}
                />

                <View style={styles.textInputRow}>
                    <TextInput
                        label="Cover Image URL"
                        value={coverImage}
                        onChangeText={text => setCoverImage(text)}
                    />
                </View>
                <View style={styles.textInputRow}>
                    <TextInput
                        label="Cover Image URL"
                        value={coverImage}
                        onChangeText={text => setCoverImage(text)}
                    />
                </View>

            </Card>

            <Card style={styles.card}>
                <Caption style={styles.cardTitle}>Review</Caption>
                <AirbnbRating
                    defaultRating={1}
                    showRating={false}
                    size={30}
                    selectedColor={theme.colors.primary}
                    starContainerStyle={{marginTop: 15}}
                    onFinishRating={() => setDisable(false)}
                />
                <TextInput
                    style={styles.textInput}
                    label="Comment"
                    value={comment}
                    onChangeText={comment =>{
                        setComment(comment)
                        setDisable(false)
                    }}
                    mode='outlined'
                    multiline={true}
                    numberOfLines={2}
                    underlineColor={theme.colors.primary}
                />
                <Card.Actions style={{marginLeft: "auto", marginRight: 10}}>
                    { saveVisibility && <Button disabled={disable} >save</Button>}
                    { addVisibility && <Button disabled={disable} icon="plus" onPress={() => console.log('Pressed')}>Add</Button>}
                </Card.Actions>
            </Card>
        </ScrollView>
    );
}
import React from 'react'
import {FlatList, Image, ScrollView, Text, TouchableOpacity, View} from 'react-native'
import TrackListItem from "../../components/TrackListItem";
import {Button, Caption, Card, Paragraph, Subheading, TextInput, Title} from "react-native-paper";
import styles from "../AddOwnAlbum/styles";
import {AirbnbRating} from "react-native-ratings";
import {theme} from "../../theme/Theme";
import CalendarPicker from "react-native-calendar-picker";
import moment from "moment";
import firebase from "firebase";
import { StackActions } from '@react-navigation/native';



export default function AddEditOwnAlbum({navigation}) {

    const [albumName, setAlbumName] = React.useState("");

    const [artistName, setArtistName] = React.useState("");

    const [genre, setGenre] = React.useState("");

    const [coverImage, setCoverImage] = React.useState("");

    const [release, setRelease] = React.useState("");


    const [comment, setComment] = React.useState("");
    const [rating, setRating] = React.useState(0);

    const [albumNameError, setAlbumNameError] = React.useState(false);
    const [artistNameError, setArtistNameError] = React.useState(false);

    const [saveVisibility, setSaveVisibility] = React.useState(false);
    const [discardVisibility, setDiscardVisibility] = React.useState(false);

    const [disable, setDisable] = React.useState(true);

    const  userId = firebase.auth().currentUser.uid;

    const userCollection =   firebase.firestore().collection("users").doc(userId);




    const addAlbum = (type, albumId, thumb) => {
        userCollection.collection(type).doc(albumId).set(
            {
                id: albumId,
                artists_sort: artistName,
                title: albumName,
                thumb: thumb,
                genres: [genre],
                released_formatted: release,
                tracklist: [],
                rating: rating,
                comment: comment,
            }
        ).catch((error) => {
            console.log(error);
        });
    };

    const onSavePressed = () => {

        if(artistName === "" && artistName === ""){
            setAlbumNameError(true);
            setArtistNameError(true);
        }
        else if (artistName === ""){
            setArtistNameError(true);
        }
        else if( albumName === "" ){
            setAlbumNameError(true);
        }
        else{
            let randomID = Math.random().toString(36).substring(7);
            let placeholderThumb = "http://myavatar.pl/wp-content/plugins/woocommerce/assets/images/placeholder.png";

            let thumb;

            if(coverImage === "")
                thumb = placeholderThumb;
            else
                thumb = coverImage;

            if(rating === 0){
                addAlbum("queue", randomID, thumb);
            }
            else if (rating !== 0){
                addAlbum("queue", randomID, thumb);
            }

            let Album = {
                id: randomID,
                artists_sort: artistName,
                title: albumName,
                thumb: thumb,
                genres: [genre],
                released_formatted: release,
                tracklist: [],
                rating: rating,
                comment: comment,
            };

            navigation.dispatch(
                StackActions.replace('AlbumList')
            );
            navigation.navigate("AlbumDetails", {album: Album})
        }



    };

    const clearForm = () => {
        setComment("");
        setRating(0);
        setDiscardVisibility(false)
        setDisable(true);
    }

    React.useEffect(() => {
        let today = new Date();
        console.log(today)
        setRelease(moment(today).format("DD MMM YYYY"))

    },[])

    return (
        <ScrollView styles={{flex: 1}}  nestedScrollEnabled={false}>
            <Card style={styles.card}>
                <Caption style={styles.cardTitle}>Basic Information</Caption>
                    <View style={styles.textInputRow}>
                        <TextInput
                            error={albumNameError}
                            label="Album Name"
                            value={albumName}
                            onChangeText={text => setAlbumName(text)}
                        />
                        { albumNameError && <Text style={{marginTop: 5, color: theme.colors.error}}>This field can't be empty.</Text>}
                    </View>

                    <View style={styles.textInputRow}>
                        <TextInput
                            error={artistNameError}
                            label="Artist"
                            value={artistName}
                            onChangeText={text => setArtistName(text)}
                        />
                        { artistNameError && <Text style={{marginTop: 5, color: theme.colors.error}}>This field can't be empty.</Text>}
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
                        label="Cover Image URL"
                        value={coverImage}
                        onChangeText={text => setCoverImage(text)}
                    />
                </View>

                <View style={{marginHorizontal: 15, marginVertical: 10}}>
                    <Text style={{marginBottom: 10, fontSize: 16}}>Release date:</Text>
                    <CalendarPicker
                        startFromMonday={true}
                        previousTitleStyle={styles.pickerButton}
                        nextTitleStyle = {styles.pickerButton}
                        scaleFactor={390}
                        todayBackgroundColor={theme.colors.primary}
                        selectedDayColor={theme.colors.accent}
                        selectedDayTextColor={theme.colors.background}
                        scrollable={false}
                        onDateChange={(date) => {
                            setRelease(moment(date).format("DD MMM YYYY"))
                        }}
                    />

                </View>

            </Card>

            <Card style={styles.card}>
                <Caption style={styles.cardTitle}>Review</Caption>
                <Card.Content>
                  <Paragraph style={{textAlign: "center"}}>Rate this album or leave empty to add to queue.</Paragraph>
                </Card.Content>
                <AirbnbRating
                    defaultRating={rating}
                    showRating={false}
                    size={30}
                    selectedColor={theme.colors.primary}
                    starContainerStyle={{marginTop: 15}}
                    onFinishRating={(rating) => {
                        setRating(rating);
                        setDiscardVisibility(true);
                        setDisable(false);
                    }}
                />
                <TextInput
                    style={styles.textInput}
                    label="Comment"
                    value={comment}
                    onChangeText={comment =>{
                        setComment(comment);
                    }}
                    mode='outlined'
                    multiline={true}
                    numberOfLines={2}
                    underlineColor={theme.colors.primary}
                />

                <Card.Actions style={{marginLeft: 10, marginRight: "auto"}}>
                    { discardVisibility && <Button onPress={() => clearForm()} style={{marginLeft: 0, marginRight: "auto"}} >Discard</Button>}
                </Card.Actions>

            </Card>

            <TouchableOpacity
                style={styles.button}
                onPress={() => onSavePressed()}>
                <Text style={styles.buttonTitle}>SAVE</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}
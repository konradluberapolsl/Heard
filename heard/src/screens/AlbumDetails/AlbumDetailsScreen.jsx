import React from 'react'
import {Image, ScrollView, View, FlatList} from 'react-native'
import styles from "./styles";
import {Caption, Card, Paragraph, Subheading, Switch, Text, Button, TextInput, Title} from 'react-native-paper';
import TrackListItem from "../../components/TrackListItem";
import {AirbnbRating} from "react-native-ratings";
import {theme} from "../../theme/Theme";

export default function AlbumDetailsScreen({navigation}) {

    const [comment, setComment] = React.useState('');

    const [addVisibility, setAddVisibility] = React.useState(true);

    const [saveVisibility, setSaveVisibility] = React.useState(false);

    const [disable, setDisable] = React.useState(true);


    let Album = {
        title: "Silny Jak Nigdy",
        artist: "Gruby Mielzky",
        genre: "Hip Hop",
        released: "12 Oct 2012",
        cover_image: {uri: "https://img.discogs.com/fN7X7VrZ_X0ATM-xpZ8L6HMoXjM=/fit-in/600x600/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-6023735-1409079220-2641.jpeg.jpg"},
        tracks: [
            {
                number: 1,
                title: "...",
                duration: "1:18",
                featuring: ""
            },
            {
                number: 2,
                title: "Silny Jak Nigdy",
                duration: "1:18",
                featuring: ""
            },
            {
                number: 3,
                title: "Żyję Normalnie",
                duration: "1:18",
                featuring: "Jinx"
            },
            {
                number: 4,
                title: "Najlepszy Dzień",
                duration: "1:18",
                featuring: ""
            },
            {
                number: 5,
                title: "Brat To Brat, Wróg To Wróg",
                duration: "1:18",
                featuring: ""
            },
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
                <View style={styles.detailsContainer}>
                    <Image style={styles.thumbnail} source={Album.cover_image} />
                    <View style={styles.textContainer}>
                        <Title>{Album.title}</Title>
                        <Subheading style={styles.subheading}>{Album.artist}</Subheading>
                        <Subheading style={styles.subheading}>{Album.genre}</Subheading>
                        <Subheading style={styles.subheading}>{Album.released}</Subheading>
                    </View>
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
    )
}
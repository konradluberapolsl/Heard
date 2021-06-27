import React from 'react'
import {Image, ScrollView, View, FlatList} from 'react-native'
import styles from "./styles";
import {Caption, Card, Paragraph, Subheading, Switch, Text, Button, TextInput, Title} from 'react-native-paper';
import TrackListItem from "../../components/TrackListItem";
import {AirbnbRating} from "react-native-ratings";
import {theme} from "../../theme/Theme";
import {getAlbum} from "../../api/getAlbum";
import firebase from "firebase";


export default function AlbumDetailsScreen({route, navigation}) {

    const { album } = route.params;

    const [comment, setComment] = React.useState('');
    const [rating, setRating] = React.useState(0);

    const [heardVisibility, setHeardVisibility] = React.useState(false);
    const [discardVisibility, setDiscardVisibility] = React.useState(false);
    const [queueVisibility, setQueueVisibility] = React.useState(false);
    const [saveVisibility, setSaveVisibility] = React.useState(false);

    const [tracksVisibility, setTracksVisibility] = React.useState(true);

    const [queuePromptVisibility, setQueuePromptVisibility] = React.useState(false);
    const [newPromptVisibility, setNewPromptVisibility] = React.useState(false);
    const [heardPromptVisibility, setHeardPromptVisibility] = React.useState(false);

    const [disable, setDisable] = React.useState(false);


    const  userId = firebase.auth().currentUser.uid;

    const userCollection =   firebase.firestore().collection("users").doc(userId);

    const [exists, setExists] = React.useState(false);

    const addAlbum = (type) => {
        userCollection.collection(type).doc(album.id.toString()).set(
            {
                id: album.id,
                artists_sort: album.artists_sort,
                title: album.title,
                thumb: album.thumb,
                genres: album.genres,
                released_formatted: album.released_formatted,
                tracklist: album.tracklist,
                rating: rating,
                comment: comment,
            }
        ).catch((error) => {
            console.log(error);
        });
    };

    const updateAlbum = () => {
      userCollection.collection("heard").doc(album.id.toString())
          .update(
              {
                  "rating" : album.rating,
                  "comment" : album.comment
              }
          ).then( () => {
              console.log("Album was updated")
      } ).catch((error) => {
          console.log(error);
      });
    };

    const moveToHeard = () =>{
        userCollection.collection("queue")
            .doc(album.id.toString()).delete().then(() =>{
           addAlbum("heard");
           console.log("Album added to heard");

        }).catch((error) => {
            console.log(error);
        });
    };

     const findAlbum = (collection) => {
        userCollection.collection(collection)
           .doc(album.id.toString()).get()
               .then(snapshot => {
                   if (snapshot.exists)
                   {
                       const tmp = snapshot.data();
                       album.rating = tmp.rating;
                       album.comment = tmp.comment;
                       setExists(true);
                       console.log(tmp);
                       checkWhereIsAlbum();
                   }
               }).catch((error) => {
                   console.log(error);
        });
    };

    const lookForAlbum = () => {
         findAlbum("queue");
         findAlbum("heard");
    }

    const checkWhereIsAlbum = () => {

        if (typeof album.rating == "undefined"){

            setNewPromptVisibility(true);
            setQueueVisibility(true);

            lookForAlbum();
        }
        else if ( album.rating === 0 ){

            setHeardVisibility(true);
            setQueuePromptVisibility(true);

            setNewPromptVisibility(false);
            setQueueVisibility(false);

            setDisable(true);
        }
        else if ( album.rating !== 0){
            setRating(album.rating);
            setComment(album.comment);

            setHeardVisibility(false);
            setQueuePromptVisibility(false);
            setNewPromptVisibility(false);
            setQueueVisibility(false);

            setHeardPromptVisibility(true);
            setSaveVisibility(true);

            setDisable(true);
        }
    };

    const onHeardClicked = () =>{
        if (typeof album.rating != "undefined"){
            moveToHeard();
        }
        else {
            addAlbum("heard");
        }
        setHeardVisibility(false);
        setQueuePromptVisibility(false);
        setQueueVisibility(false);
        setNewPromptVisibility(false);

        setHeardPromptVisibility(true);
        setSaveVisibility(true);
        setDisable(true);
        setDiscardVisibility(false);
    };

    const onQueueClicked = () => {
        addAlbum("queue")

        setNewPromptVisibility(false);
        setQueueVisibility(false);

        setQueuePromptVisibility(true);
        setHeardVisibility(true);
    };

    const onSaveClicked = () => {
      updateAlbum();

      album.rating = rating;
      album.comment = comment;

      setDisable(true);
      setDiscardVisibility(false);
    };

    const clearForm = () => {
        console.log(album.rating);

        if ( typeof album.rating == "undefined" || album.rating === 0){
            console.log("elo");
            setComment("");
            setRating(0);
            if(typeof album.rating == "undefined"){
                setHeardVisibility(false);
                setQueueVisibility(true);
            }
        }
        else if(album.rating !== 0){
            setComment(album.comment);
            setRating(album.rating);
            setQueueVisibility(false);
            setHeardVisibility(false);
        }
        setDiscardVisibility(false)
        setDisable(true);
    }


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

    React.useEffect(() => {
        checkWhereIsAlbum();

        if (album.tracklist.length === 0)
            setTracksVisibility(false);

    }, []);

    return (
       <ScrollView styles={{flex: 1}}  nestedScrollEnabled={false}>
            <Card style={styles.card}>
                <View style={styles.detailsContainer}>
                    <Image style={styles.thumbnail} source={{uri: album.thumb}} />
                    <View style={styles.textContainer}>
                        <Title>{album.title}</Title>
                        <Subheading style={styles.subheading}>{album.artists_sort}</Subheading>
                        <Subheading style={styles.subheading}>{album.genres[0]}</Subheading>
                        <Subheading style={styles.subheading}>{album.released_formatted}</Subheading>
                    </View>
                </View>
            </Card>
           { tracksVisibility &&
                   <Card style={styles.card}>
                       <Caption style={styles.cardTitle}>Tracks</Caption>
                       <FlatList
                           data={album.tracklist}
                           renderItem={renderItem}
                           keyExtractor={(item) => item.position}
                           ItemSeparatorComponent={renderSeparator}
                       />
                   </Card>
           }




           <Card style={styles.card}>
               <Caption style={styles.cardTitle}>Review</Caption>
               <Card.Content>
                   { queuePromptVisibility && <Paragraph style={styles.prompt}>This album is in queue rate it and click Heard to save.</Paragraph>}
                   { newPromptVisibility && <Paragraph style={styles.prompt}>Leave stars and comment to add to Herad or leave empty to add to queue.</Paragraph>}
                   { heardPromptVisibility && <Paragraph style={styles.prompt}>You Heard this album, you can edit it and save changes by pressing Save.</Paragraph>}
               </Card.Content>

               <AirbnbRating
                   defaultRating={rating}
                   showRating={false}
                   size={30}
                   selectedColor={theme.colors.primary}
                   starContainerStyle={{marginTop: 15}}
                   onFinishRating={(rating) => {

                       if (typeof album.rating == "undefined"){
                           setQueueVisibility(false);
                           setHeardVisibility(true);
                           setDisable(false);
                       }

            /*           setQueueVisibility(false);
                       setHeardVisibility(true); */
                       if (rating !== album.rating)
                           setDiscardVisibility(true);
                       else
                           setDiscardVisibility(false);


                       setDisable(false);
                       setRating(rating);
                   }}
               />
               <TextInput
                   style={styles.textInput}
                   label="Comment"
                   value={comment}
                   onChangeText={ (comment) =>{
                       setComment(comment.toString());

                       if (typeof album.rating == "undefined"){
                           setQueueVisibility(false);
                           setHeardVisibility(true);
                           if (rating === 0)
                            setDisable(true);
                           else
                               setDisable(false)
                       }

                       if (comment !== album.comment)
                           setDiscardVisibility(true);
                       else
                           setDiscardVisibility(false);

                       setDiscardVisibility(true);
                   }}
                   mode='outlined'
                   multiline={true}
                   numberOfLines={2}
                   underlineColor={theme.colors.primary}
               />
               <View style={{ flexDirection: "row"}} >
               <Card.Actions style={{marginLeft: 10, marginRight: "auto"}}>
                   { discardVisibility && <Button onPress={() => clearForm()} style={{marginLeft: 0, marginRight: "auto"}} >Discard</Button>}
               </Card.Actions>
               <Card.Actions style={{marginLeft: "auto", marginRight: 10}}>
                   { saveVisibility && <Button disabled={disable} onPress={() => onSaveClicked()} >save</Button>}
                   { heardVisibility && <Button disabled={disable}  onPress={() => onHeardClicked()}>heard</Button>}
                   { queueVisibility && <Button onPress={() => onQueueClicked()}>queue</Button>}
               </Card.Actions>
               </View>
           </Card>
       </ScrollView>
    )
}
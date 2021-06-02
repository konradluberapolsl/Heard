import React, {useState} from "react";
import {View, StyleSheet, Text, TouchableOpacity} from "react-native";
import {FontAwesome} from '@expo/vector-icons';

export default function StarRating(){
    const [defaultRating, setDefaultRating] =  useState(2)
    const [maxRating , setMaxRating] = useState([1,2,3,4,5])
    return(
        <View style={styles.starRatingBar}>
            {/*{*/}
            {/*    maxRating.map((item, key) => {*/}
            {/*        return(*/}
            {/*            <FontAwesome key={item}  color="black" size={32} onPress{() => setDefaultRating(item)}*/}
            {/*            name ={*/}
            {/*                item <= defaultRating ? "star" : "star-o"*/}
            {/*            }*/}
            {/*            />*/}

            {/*        );*/}
            {/*})*/}
            {/*}*/}
        </View>
    );
};



const styles = StyleSheet.create({
    starRatingBar: {
        justifyContent: "center",
        flexDirection: "row",

    }
})

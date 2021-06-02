import { StyleSheet, } from 'react-native';
import {theme} from "../../theme/Theme";


const styles = StyleSheet.create({
    card: {
        marginTop: 10,
        marginHorizontal: 10
    },
    detailsContainer: {
        flexDirection: "row",
        padding: 10,
        justifyContent: "flex-start",
        alignItems: "center"
    },
    thumbnail:{
        width: 120,
        height: 120,

    },
    textContainer: {
        flexShrink: 1,
        marginStart: 10
    },
    subheading: {
        fontSize: 15
    },
    cardTitle: {
        marginStart: 10,
        marginTop: 10
    },
    textInput:{
        marginVertical: 15,
        marginHorizontal: 25,


    }
});

export  default styles;
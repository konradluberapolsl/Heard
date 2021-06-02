import { StyleSheet, } from 'react-native';
import {theme} from "../../theme/Theme";


const styles = StyleSheet.create({
    card: {
        marginTop: 10,
        marginHorizontal: 10
    },
    detailsContainer: {
        flexDirection: "column",
        padding: 10,
        justifyContent: "center",
        alignItems: "flex-start"
    },
    textInputRow:{
        paddingHorizontal: 10,
        paddingVertical: 10,
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
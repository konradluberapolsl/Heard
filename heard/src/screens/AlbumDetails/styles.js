import { StyleSheet, } from 'react-native';
import {theme} from "../../theme/Theme";


const styles = StyleSheet.create({
    card: {
        marginTop: 10,
        marginHorizontal: 10,
        marginBottom: 5,
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
    },
    prompt: {
        textAlign: "center",
        marginTop: 15,
        marginHorizontal: 7,
        flexShrink: 1,
    }
});

export  default styles;
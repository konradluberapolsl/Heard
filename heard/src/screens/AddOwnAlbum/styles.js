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

    },
    button: {
        backgroundColor: theme.colors.primary,
        marginHorizontal: 10,
        marginBottom: 15,
        marginTop: 15,
        height: 48,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center'
    },
    buttonTitle: {
        color: 'white',
        fontSize: 16,
    },
    datePicker: {
        padding: 15
    },
    pickerButton:{
        width: 85,
        paddingVertical: 10,
        marginHorizontal: 5,
        backgroundColor: theme.colors.primary,
        color: theme.colors.background,
        textAlign: "center",
        borderRadius: 5,
    }
});

export  default styles;
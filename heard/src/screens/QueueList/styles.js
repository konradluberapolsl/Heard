import { StyleSheet, StatusBar } from 'react-native';
import {theme} from "../../theme/Theme";


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 0,
        justifyContent: "center"
    },
    textInput:{
        marginBottom: 30,
        marginTop: 10
    },
    message: {
        alignSelf: "center"
    },
    fab: {
            position: 'absolute',
            margin: 16,
            right: 10,
            backgroundColor: theme.colors.error,
            bottom: 65,
        },
});

export  default styles;
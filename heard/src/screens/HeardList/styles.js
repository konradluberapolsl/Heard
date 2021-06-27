import { StyleSheet, StatusBar } from 'react-native';
import {theme} from "../../theme/Theme";


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 0,
        justifyContent: "center"
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 10,
        backgroundColor: theme.colors.error,
        bottom: 65,
    },
    message: {
        alignSelf: "center"
    },
});

export  default styles;
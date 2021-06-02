import { StyleSheet } from 'react-native';
import {theme} from "../../theme/Theme";

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    titleContainer:{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30,
        marginBottom: 25,
        marginHorizontal: 20
    },
    title: {
        fontSize: 80,
        marginStart: 10,
        fontWeight: "bold"
    },
    logo: {
        width: 100,
        height: 100
    },
    input: {
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 30,
        marginRight: 30,
        paddingLeft: 16
    },
    button: {
        backgroundColor: theme.colors.primary,
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        height: 48,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center'
    },
    buttonTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: "bold"
    },
    footerView: {
        flex: 1,
        alignItems: "center",
        marginTop: 20
    },
    footerText: {
        fontSize: 16,
        color: '#2e2e2d'
    },
    footerLink: {
        color: theme.colors.primary,
        fontWeight: "bold",
        fontSize: 16
    }
})
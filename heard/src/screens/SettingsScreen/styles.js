import { StyleSheet } from 'react-native';
import {theme} from "../../theme/Theme";

const styles = StyleSheet.create({
    accountContainer: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: "#a3a3a3"
    },
    avatar:{
        marginVertical: 10,
        marginHorizontal: 15
    },
    infoContainer: {
        flexDirection: 'column',
        marginTop: 20,

    },
    text:{
        fontSize: 22,
        fontWeight: "600",
        marginStart: 5
    },
    button:{
        fontSize: 16,
        color: theme.colors.primary
    },
    buttonContainer:{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'flex-start',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#a3a3a3"
    },
    buttonText:{
        fontSize: 18,
        marginStart: 15
    },
    switch:{
        marginLeft: 'auto',
        marginEnd: 15
    },
    buttonLogOut:{
        fontSize: 16,
        color: theme.colors.primary,
        marginVertical: 10
    },
});

export default  styles
import {configureFonts} from "react-native-paper";
import  {fontConfig} from "./Fonts"
import {black, white, pinkA400, yellow500, lightBlue600} from './colors';

const {DefaultTheme} = require("@react-navigation/native");

const theme = {

    dark: false,
    roundness: 4,
    colors: {
        ...DefaultTheme,
        primary: lightBlue600,
        accent: yellow500,
        background: '#f6f6f6',
        surface: white,
        error: '#B00020',
        text: black,
        onSurface: '#000000',
        disabled: black,
        placeholder: black,
        backdrop: 'rgba(0, 0, 0, 0.6)',
        notification: pinkA400,
    },
    fonts: configureFonts(fontConfig),
    animation: {
        scale: 1.0,
    },
};

//     roundness: 2,
//     fonts: configureFonts(fontConfig),
//     animation: {
//         scale: 1.0,
//     },
//     colors: {
//         ...DefaultTheme.colors,
//         primary: '#3498DB',
//         accent: '#f1c40f',
//
//     },
// };

export {theme} ;
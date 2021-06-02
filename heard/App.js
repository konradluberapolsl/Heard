import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react'
import { firebase } from './src/firebase/config'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { LoginScreen, RegisterScreen } from './src/screens'
import {Provider as PaperProvider } from 'react-native-paper';
import BottomNavBar from "./src/components/BottomNavBar";
import {decode, encode} from 'base-64'
import {theme} from "./src/theme/Theme";
import {CombinedDefaultTheme} from "./src/theme/default";
import {Provider} from "react-redux";
import {createStore, applyMiddleware} from "redux";
import rootReducer from "./src/redux/reducers"
import thunk from "redux-thunk";

if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode }

const Stack = createStackNavigator();

const store = createStore(rootReducer, applyMiddleware(thunk))

export default function App() {

    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)


    useEffect(() => {
        const usersRef = firebase.firestore().collection('users');
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                usersRef
                    .doc(user.uid)
                    .get()
                    .then((document) => {
                        const userData = document.data()
                        setLoading(false)
                        setUser(userData)
                    })
                    .catch((error) => {
                        setLoading(false)
                    });
            } else if (!user){
                setUser(null)
                setLoading(false)
            }
            else {
                setLoading(false)
            }
        });
    }, []);

    if (loading) {
        return (
            <></>
        )
    }

    return (
        <Provider store={store}>
        <PaperProvider theme={theme}>
        <NavigationContainer theme={CombinedDefaultTheme}>
            <Stack.Navigator
                screenOptions={{
                    headerStyle: {
                        backgroundColor: theme.colors.primary,
                    },
                    headerTintColor: '#fff',
                }}
            >
                { user ? (

                        <Stack.Screen
                            name="Home"
                            options={{ headerShown: false }}
                            component={BottomNavBar}
                        />

                ) : (
                    <>
                        <Stack.Screen name="Login" component={LoginScreen} />
                        <Stack.Screen name="Registration" component={RegisterScreen} />

                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
        </PaperProvider>
        </Provider>

    );
}

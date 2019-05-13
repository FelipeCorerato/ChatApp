import React from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
    View,
} from 'react-native';
import firebase from 'firebase';

import User from '../User';

export default class AuthLoadingScreen extends React.Component {
    constructor(props) {
        super(props);
        this._bootstrapAsync();
    }

    componentWillMount() {
        // Your web app's Firebase configuration
        var firebaseConfig = {
            apiKey: "AIzaSyCRfcVJrerI3HR72BrqnwPM-n7FYnMyyI4",
            authDomain: "chatapp-9ef28.firebaseapp.com",
            databaseURL: "https://chatapp-9ef28.firebaseio.com",
            projectId: "chatapp-9ef28",
            storageBucket: "chatapp-9ef28.appspot.com",
            messagingSenderId: "458268637626",
            appId: "1:458268637626:web:f021eabe7c9b3fba"
        };
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
    }

    // Fetch the token from storage then navigate to our appropriate place
    _bootstrapAsync = async () => {
        User.phone = await AsyncStorage.getItem('userPhone');
        this.props.navigation.navigate(User.phone ? 'App' : 'Auth');
    };

    // Render any loading content that you like here
    render() {
        return (
            <View>
                <ActivityIndicator />
                <StatusBar barStyle="default" />
            </View>
        );
    }
}
import React from 'react';
import {SafeAreaView, Text, TextInput, Alert, TouchableOpacity, AsyncStorage, Image} from 'react-native'
import firebase from 'firebase';

import User from '../User';
import styles from '../constants/styles';

export default class ProfileScreen extends React.Component {
    static navigationOptions = {
        title: 'Profile'
    }

    state = {
        name: User.name
    }

    handleChange = key => val => {
        this.setState({ [key]: val });
    }

    _logout = async() => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
    }

    changeName = async () => {
        if (this.state.name.length < 3){
            Alert.alert('Erro', 'Insira um nome válido!');
            return;
        }

        if (User.name != this.state.name) {
            firebase.database().ref('users').child(User.phone).set({name: this.state.name});
            User.name = this.state.name;

            Alert.alert('Sucesso', 'Nome alterado com sucesso!');
        }
    }

    render() {
        return(
            <SafeAreaView style={styles.container}>
                <Image source={require('../assets/user.png')} style={{width: 150, height: 150, marginBottom: 20}} />
                <Text style={{fontSize: 20}}>{User.phone}</Text>
                <TextInput 
                  style={styles.input}
                  value={this.state.name}
                  placeholder='Nome'
                  onChangeText={this.handleChange('name')}
                />
                <TouchableOpacity onPress={this.changeName}>
                    <Text style={styles.btnText}>Change name</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this._logout}>
                    <Text style={styles.btnText}>Logout</Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }
}
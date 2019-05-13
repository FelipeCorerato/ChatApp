import React from 'react';
import { Text, TouchableOpacity, View, TextInput, Alert, AsyncStorage } from 'react-native';
import firebase from 'firebase';

import styles from '../constants/styles';
import User from '../User';

export default class LoginScreen extends React.Component {
    static navigationOptions = {
        header: null
    }

    state = {
        phone: '',
        name: ''
    }

    handleChange = key => val => {
        this.setState({ [key]: val });
    }

    submitForm = async() => {
        if (this.state.phone == '' || this.state.name == '') {
            Alert.alert('Erro', 'Há campos não preenchidos!');
            return;
        }

        if (this.state.phone.length < 9) {
            Alert.alert('Erro', 'Numero de telefone inválido!');
            return;
        } else if (this.state.name.length < 3) {
            Alert.alert('Erro', 'Nome inválido!');
            return;
        }

        //Guarda os dados do usuario
        await AsyncStorage.setItem('userPhone', this.state.phone);
        User.phone = this.state.phone;
        firebase.database().ref('users/' + User.phone).set({name: this.state.name});
        this.props.navigation.navigate('App');
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput 
                  placeholder='Numero de telefone'
                  keyboardType='number-pad'
                  style={styles.input}
                  value={this.state.phone}
                  onChangeText={this.handleChange('phone')}
                />
                <TextInput 
                  placeholder='Nome'
                  style={styles.input}
                  value={this.state.name}
                  onChangeText={this.handleChange('name')}
                />
                <TouchableOpacity onPress={this.submitForm}>
                    <Text style={styles.btnText}>Entrar</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Image } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { render } from 'react-dom';
import CustTxtInput from '../components/CustTxtInput';
import CustBtn from '../components/CustBtn';
import Colors from '../constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import Register from './Register';
import { FlatGrid } from 'react-native-super-grid';
import { MonoText } from '../components/StyledText';
import { AsyncStorage } from 'react-native';
import api from '../constants/api';
import imageuri from '../constants/imageuri';


export default class AdobtionByAccount extends Component {

    constructor(props){
        super(props);
        this.state={
            account_id:this.props.route.params,
            Adoptions:[],
            Token:"",
        }
    }

    componentDidMount = async () =>{
         await this._retrieveData();
    }

    _unsubscribe = this.props.navigation.addListener('focus', async () => {
        await this._retrieveData();
    });

    _retrieveData = async () => {
        try {
            var token = await AsyncStorage.getItem('auth_Token');
            this.setState({ Token: token });
        } catch (error) {
            console.log(error)
        }

        this.fetchData();
    };

    fetchData = async () => {

        fetch(api +'/adoption/byorg/'+this.state.account_id.id,
            {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            })
            .then((response) => response.json())
            .then((responseJson) => {    
                this.setState({ Adoptions: responseJson });
            })
            .catch((error) => {
                console.error(error);
            });
    };

    componentWillUnmount() {
        this._unsubscribe();
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatGrid
                    itemDimension={150}
                    items={this.state.Adoptions}
                    renderItem={({ item }) => (
                        <TouchableOpacity  onPress={() => this.props.navigation.navigate('Adoption', {Adoption_id :item.adoption_id, Token:this.state.Token, TypeUser:"user"})}>
                            <View>
                                <Image
                                    style={{ height: 160, width: 150, backgroundColor: "#ccf0e1" }}
                                    borderRadius={5}
                                    source={{ uri: imageuri + item.img }}
                                />
                                <MonoText>{item.name}</MonoText>
                                <Text>{item.city}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: '5%',
        flexDirection: 'column',
        alignContent: 'center',
        backgroundColor: '#fff',
    },

});
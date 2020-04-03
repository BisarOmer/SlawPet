import React, { Component } from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, SafeAreaView } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { FlatGrid } from 'react-native-super-grid';
import { MonoText } from '../components/StyledText';
import api from '../constants/api';
import imageuri from '../constants/imageuri';
import { AsyncStorage } from 'react-native';

export default class Adobtion extends Component {


    constructor(props) {
        super(props);
        this.state = {
            Adoptions: [],
            Token: "",
        }
    }

    componentDidMount = async () => {
        await this._retrieveData();
    };

     _unsubscribe = this.props.navigation.addListener('focus', async () => {
        await this._retrieveData();
    });

    _retrieveData = async () => {
        try {
            var value = await AsyncStorage.getItem('AccountType');
            var token = await AsyncStorage.getItem('auth_Token');
            this.setState({ Token: token });
        } catch (error) {
            console.log(error)
        }

        this.fetchData();
    };

    fetchData = async () => {

        fetch(api + '/myAdoptions',
            {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'x-access-token': this.state.Token,
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
        // this._unsubscribe();
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={{ marginLeft: "5%" }} >
                    <FlatGrid                      
                        itemDimension={150}
                        items={this.state.Adoptions}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('View Adoption',{Adoption_id :item.adoption_id, Token:this.state.Token, TypeUser:"owner"})}>
                                <View>
                                    <Image
                                        style={{ height: 160, width: 150, backgroundColor: "#ccf0e1" }}
                                        borderRadius={5}
                                        source={{ uri: imageuri + item.img }}
                                    />
                                    <MonoText>{item.name}</MonoText>
                                    <Text>{item.city}</Text>
                                    {item.status==1?<Text style={{color:"#18F879"}}>Adopted</Text>:null}
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            </SafeAreaView >
        );

    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: '#fff',
        backgroundColor: "#fff"

    },
    picker: {
        height: 50,
        backgroundColor: '#fff',
        color: '#18F879',
        fontFamily: 'Segoe UI',
        fontWeight: '600',
        borderRadius: 5,
        shadowOpacity: 0.4,
        shadowRadius: 5,
        shadowOffset: {
            height: 2,
            width: 0,
        },
    },
});

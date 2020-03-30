import React, { Component } from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';
import { FlatGrid } from 'react-native-super-grid';
import { MonoText } from '../components/StyledText';
import api from '../constants/api';
import imageuri from '../constants/imageuri';
import { AsyncStorage } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default class Adobtion extends Component {


    constructor(props) {
        super(props);
        this.state = {
            Adoptions: [],
            Token: "",
        }
    }


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


    componentDidMount = async () => {
        await this._retrieveData();
    };



    render() {

        return (
            <SafeAreaView style={styles.container}>
                <View style={{ marginLeft: "5%" }} >
                    <FlatGrid
                        ListHeaderComponent={
                            <View style={{ marginBottom: '4%' }}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Add Adoption')} >
                                    <View>
                                        <Image
                                            style={{ height: 160, width: 150, backgroundColor: "#f1f3f4", alignSelf: "center" }}
                                            borderRadius={5}
                                        />
                                        <MonoText style={{ alignSelf: "center" }}>Add</MonoText>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        }
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
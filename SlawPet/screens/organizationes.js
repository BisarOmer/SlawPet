// import * as React from 'react';
import React, { Component } from 'react';
import { useState, useEffect } from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, Picker, FlatList, Button, TouchableHighlightBase } from 'react-native';
// import { Component } from "react-native";
import { ScrollView } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';

import { MonoText } from '../components/StyledText';
import { Ionicons } from '@expo/vector-icons';
import { render } from 'react-dom';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustTxtInput from '../components/CustTxtInput'
import defaultOrg from '../assets/images/account.png';

import { AsyncStorage } from 'react-native';
import api from '../constants/api';
import imageuri from '../constants/imageuri';

class Organizationes extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Organizations: [],
            query: "",
            refresh: true,

        }
    }


    componentDidMount = async () => {
        await this.fetchData();
    };

    fetchData = async () => {

        fetch(api + '/organization',
            {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ Organizations: responseJson });
            })
            .catch((error) => {
                console.error(error);
            });
    };

    Orgbyname = async () => {
        await fetch(api + '/organization/searchName/' + this.state.query,
            {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.length) {
                    this.setState({ Organizations: responseJson })
                }

                else {
                    var arr = []
                    arr.push(responseJson)
                    this.setState({ Organizations: arr });
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.query != this.state.query && this.state.query != "") {
            this.Orgbyname();
        }
        else if (prevState.query != this.state.query && this.state.query == "") {
            this.fetchData();
        }
    }

    render() {
        return (
            <View style={styles.container}>

                <View style={{ padding: 10 }}>
                    <CustTxtInput placeholder="Search" onChangeText={(search) => { search == "" ? this.setState({ query: "" }) : this.setState({ query: search }) }} />

                    <FlatList
                        extraData={this.state.refresh}
                        data={this.state.Organizations}
                        renderItem={({ item }) =>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Organization Profile', { id: item.account_id })} >
                                <View style={{ flex: 1, flexDirection: "row", marginBottom: 10 }}>
                                    <Image
                                        style={{ width: 50, height: 50, }}
                                        borderRadius={100}
                                        source={{ uri: imageuri + item.profile }}
                                    />
                                    <MonoText style={{ marginLeft: "5%" }}>{item.name}</MonoText>
                                </View>
                            </TouchableOpacity>
                        }
                        keyExtractor={item => item.profile}
                        style={{ marginTop: 40, padding: 10 }}
                    />
                </View>


            </View >
        );
    }
};



export default Organizationes

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: '#fff',

    },
});
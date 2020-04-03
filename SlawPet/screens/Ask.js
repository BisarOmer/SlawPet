import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Image, FlatList,RefreshControl } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { render } from 'react-dom';
import CustTxtInput from '../components/CustTxtInput';
import CustBtn from '../components/CustBtn';
import Colors from '../constants/Colors';
import { MonoText } from '../components/StyledText';
import { AsyncStorage } from 'react-native';
import api from '../constants/api';
import imageuri from '../constants/imageuri';

export default class Ask extends Component {

    constructor(props) {
        super(props);
        this.state = {
            account_id: this.props.route.params,
            Asks: [],
            Token: "",

            messege:"",

            refreshing: false,
        }
    }

    componentDidMount = async () => {
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
       await this.fetchData();
    };

    fetchData = async () => {  
        if (this.state.Token != undefined) {
            fetch(api + '/organization/adobted',
                {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'x-access-token': this.state.Token,
                    }
                })
                .then((response) => response.json())
                .then((responseJson) => {
                    if(!responseJson.status){
                        this.setState({messege:responseJson.messege})
                    }
                    else{
                        this.setState({ Asks: responseJson.res });
                    }    
                })
                .catch((error) => {
                    console.error(error);
                });

        }
    };

    _onRefresh = () => {
        this.setState({ refreshing: true });
        this.fetchData().then(() => {
            this.setState({ refreshing: false });
        });
    }

    componentWillUnmount() {
        this._unsubscribe();
    }

    render() {
        return (
            <View style={styles.container}>
                <View >
                    {this.state.messege!=""&&<MonoText>{this.state.messege}</MonoText>}
                    <FlatList
                     refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh}/> }
                    keyExtractor={item => String(item.adoption_id)}
                        data={this.state.Asks}
                        renderItem={({ item }) =>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Ask Details', {Adoption_id :item.adoption_id,Token:this.state.Token})} >
                                <View style={{ flex: 1, flexDirection: "row", marginBottom: 10 }}>
                                    <Image
                                        style={{ width: 50, height: 50, }}
                                        borderRadius={100}
                                        source={{ uri: imageuri + item.profile }}
                                    />
                                    <MonoText style={{ marginLeft:"4%" }}>{item.asker}</MonoText>
                                </View>
                            </TouchableOpacity>
                        }
                        style={{ marginTop: 40 }}
                    />
                </View>
            </View>
        );
    }
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignContent: 'center',
        paddingTop: 5,
        padding: 10,
        backgroundColor: '#fff',
    },

});
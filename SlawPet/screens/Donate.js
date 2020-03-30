import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { render } from 'react-dom';
import CustTxtInput from '../components/CustTxtInput';
import CustBtn from '../components/CustBtn';
import Colors from '../constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import Register from '../screens/Register';
import { MonoText } from '../components/StyledText';

import api from '../constants/api';
import imageuri from '../constants/imageuri';


export default class Donate extends Component {


    constructor(props) {
        super(props);
        this.state = {
            account_id: this.props.route.params,
            qrCode: {},
        }
    }

    componentDidMount = async () => {
        await this.fetchData();
    }

    fetchData = async () => {

        fetch(api + '/organization/donate/' + this.state.account_id.id,
            {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ qrCode: responseJson.qrCode });
            })
            .catch((error) => {
                console.error(error);
            });
    };

    render() {
        return (
            <View style={styles.container}>
                <MonoText style={{ color: "#F846BD", alignSelf: 'center' }}>FastPay</MonoText>
                <Image
                    style={{ height: 200, backgroundColor: "#ccf0e1" }}
                    borderRadius={5}
                    source={{ uri: imageuri + this.state.qrCode }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignContent: 'center',
        padding: '5%',
        backgroundColor: '#fff',
    },

});
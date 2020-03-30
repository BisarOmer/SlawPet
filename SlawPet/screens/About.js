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
import { ScrollView } from 'react-native-gesture-handler';

import api from '../constants/api';
import imageuri from '../constants/imageuri';


export default class About extends Component {

    constructor(props) {
        super(props);
        this.state = {
            account_id: this.props.route.params,
            About: {},
        }
    }

    componentDidMount = async () => {
        await this.fetchData();
    }

    fetchData = async () => {

        fetch(api + '/organization/about/' + this.state.account_id.id,
            {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ About: responseJson });
            })
            .catch((error) => {
                console.error(error);
            });
    };

    render() {
        const about = this.state.About
        return (
            <ScrollView>
                <View style={styles.container}>
                    <MonoText>Address</MonoText>
                    <Text style={styles.info}>{about.address}</Text>
                    <MonoText>Phone Number</MonoText>
                    <Text style={styles.info}>{about.phoneNumber}</Text>
                    <MonoText>Certification</MonoText>
                    <Image
                        style={{ height: 200, backgroundColor: "#ccf0e1" }}
                        borderRadius={5}
                        source={{ uri: imageuri + about.certification }}
                    />
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignContent: 'center',
        padding: '2%',
        backgroundColor: '#fff',
    },
    info: {
        fontWeight: "100",
        fontSize: 15,
        fontFamily: 'Segoe UI'
    }

});
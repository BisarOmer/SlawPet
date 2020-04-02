import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import CustTxtInput from '../components/CustTxtInput';
import CustBtn from '../components/CustBtn'
import Colors from '../constants/Colors';
import { MonoText } from '../components/StyledText';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import About from './About';
import OrgAdoption from './OrgAdoptions';
import Donate from './Donate';
import { AsyncStorage } from 'react-native';
import api from '../constants/api';
import imageuri from '../constants/imageuri';


const Tab = createMaterialTopTabNavigator();

export default class ViewOrg extends Component {

    constructor(props) {
        super(props);
        this.state = {
            account_id: this.props.route.params,
            OrganizationData: {},
        }
    }

    componentDidMount = async () => {
        await this.fetchData();
    }

    fetchData = async () => {

        fetch(api + '/organization/' + this.state.account_id.id,
            {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ OrganizationData: responseJson });
            })
            .catch((error) => {
                console.error(error);
            });
    };

    render() {
        return (
            <View style={styles.container} contentContainerStyle={styles.contentContainer}>
                <View style={{ padding: '5%' }}>
                    <Image
                        style={{ width: 150, height: 150, alignSelf: 'center' }}
                        borderRadius={150}
                        source={{ uri: imageuri + this.state.OrganizationData.profile }}
                    />
                    <MonoText style={{ alignSelf: 'center' }}>{this.state.OrganizationData.name}</MonoText>
                </View>

                <Tab.Navigator tabBarOptions={{
                    tabBarPosition: "top",
                    activeTintColor: "#000",
                    swipeEnabled: true,
                    style: { backgroundColor: '#fff' },
                }}>
                    <Tab.Screen name="Adobt" component={OrgAdoption} initialParams={{ id: this.state.account_id.id }} />
                    <Tab.Screen name="About" component={About}  initialParams={{ id: this.state.account_id.id }}/>
                    <Tab.Screen name="Donate" component={Donate}  initialParams={{ id: this.state.account_id.id }} />
                </Tab.Navigator>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginRight: '2%',
        marginLeft: '2%'
    },
    uploadimg: {
        alignSelf: 'center',
        marginTop: '2%',
        backgroundColor: '#dff6f0',
        padding: 10,
        fontWeight: "600",
        fontSize: 18,
        borderRadius: 5
    },



    contentContainer: {
        paddingTop: 15,
    },
    optionIconContainer: {
        marginRight: 12,
    },
    option: {
        backgroundColor: '#fdfdfd',
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderWidth: StyleSheet.hairlineWidth,
        borderBottomWidth: 0,
        borderColor: '#ededed',
    },
    lastOption: {
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    optionText: {
        fontSize: 15,
        alignSelf: 'flex-start',
        marginTop: 1,
    },
});

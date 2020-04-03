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

                <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start', alignContent: 'flex-start',padding:'5%' }}>

                    <View style={styles.viewShadow}>
                        <Image
                            style={{ width: 90, height: 90, backgroundColor: "#ccf0e1" }}
                            borderRadius={100}
                            source={{ uri: imageuri + this.state.OrganizationData.profile}} />
                        <MonoText style={{ height: 45 }}>{this.state.OrganizationData.name} </MonoText>
                    </View>

                    <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', marginLeft: "10%" }}>

                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start', alignContent: 'flex-start', }}>
                            <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginLeft: "10%" }}>
                                <Text style={{ marginTop: 15 }}>Adoptions</Text>
                                <MonoText>15</MonoText>
                            </View>
                            <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginLeft: "10%" }}>
                                <Text style={{ marginTop: 15 }}>Adopted</Text>
                                <MonoText >5</MonoText>
                            </View>
                        </View>
                    </View>

                </View>

                <Tab.Navigator tabBarOptions={{
                    tabBarPosition: "top",
                    activeTintColor: "#18F879",
                    inactiveTintColor :"#d7d1c9",
                    swipeEnabled: true,
                    style: { backgroundColor: '#fff' },
                    pressColor:"#18F879",
                    indicatorStyle:{ backgroundColor: "#18F879" }
                }}
                >
                    <Tab.Screen name="Adobt" component={OrgAdoption} initialParams={{ id: this.state.account_id.id }} />
                    <Tab.Screen name="About" component={About} initialParams={{ id: this.state.account_id.id }} />
                    <Tab.Screen name="Donate" component={Donate} initialParams={{ id: this.state.account_id.id }} />
                </Tab.Navigator>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
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
});

import React, { Component } from 'react';
import { AsyncStorage, Vibration } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { StyleSheet, Text, View, Image, TouchableOpacity, Button, Alert, RefreshControl, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import CustTxtInputProfile from '../components/CustTxtInputProfile';
import CustTxtInput from '../components/CustTxtInput';
import CustBtn from '../components/CustBtn'
import Colors from '../constants/Colors';
import { MonoText } from '../components/StyledText';
import api from '../constants/api';
import imageuri from '../constants/imageuri';
import { render } from 'react-dom';
import { FlatGrid } from 'react-native-super-grid';



//require
var validate = require("validate.js");
var constraints = {
    from: {
        email: true
    }
};

export default class Profile extends Component {


    constructor(props) {
        super(props);
        this.state = {
            Token: '',
            AccountType: '',
            AccountData: {},
            Account_id: "",
            OrganizationData: {},
            Adoptions: [],
            refreshing: false,
            NumberAdoptions: "",
            NumberAdopted: "",

        };

        //retrve data and showing
        this.showOrgData = this.showOrgData.bind(this);
        this.fetchData = this.fetchData.bind(this);
    }

    _unsubscribe = this.props.navigation.addListener('focus', async () => {
        await this._retrieveData();
    });

    _retrieveData = async () => {
        try {
            var value = await AsyncStorage.getItem('AccountType');
            var token = await AsyncStorage.getItem('auth_Token');
            var id = await AsyncStorage.getItem('Acco_id');
            this.setState({ Account_id: id, Token: token, AccountType: value });
        } catch (error) {
            console.log(error)
        }

        this.fetchData();
        this.fetchAdoptions();
        await this.countAdopted();
        await this.countAdoptions();
    };

    fetchData = async () => {

        fetch(api + '/me',
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
                this.setState({ AccountData: responseJson });
            })
            .catch((error) => {
                console.error(error);
            });

        if (this.state.AccountType == "Organization") {
            fetch(api + '/me/org',
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
                    this.setState({ OrganizationData: responseJson });
                    this.setState({ newAddress: responseJson.address });
                })
                .catch((error) => {
                    console.error(error);
                });

        }
    };

    fetchAdoptions() {
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
    }

    countAdoptions = async () => {
        fetch(api + '/count',
            {
                method: 'POSt',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    account_id: this.state.Account_id
                })
            })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ NumberAdoptions: responseJson.NumAdoptions });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    countAdopted = async () => {
        fetch(api + '/countAdopted',
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    account_id: this.state.Account_id
                })
            })
            .then((response) => response.json())
            .then((responseJson) => {
                
                this.setState({ NumberAdopted: responseJson.NumAdopted });

            })
            .catch((error) => {
                console.error(error);
            });
    }

    _onRefresh = () => {
        this.setState({ refreshing: true });
        this.fetchData().then(() => {
            this.setState({ refreshing: false });
        });
    }

    showOrgData() {

        return (
            <View style={styles.viewShadow}>

                <CustTxtInputProfile placeholder={this.state.OrganizationData.address} onChangeText={(address) => { this.setState({ newAddress: address }) }} />
                <View style={{ padding: 50 }}><CustBtn title="Update Address" onpress={this.updateAddress} BgColor={Colors.primaryBtnBG} /></View>

                <MonoText style={{ color: "#000", alignSelf: 'center' }}>Certification</MonoText>
                <TouchableOpacity onPress={() => { this.setState({ routName: "/upload/Certification" }); this.openImagePickerAsync() }}>
                    <Image style={{ height: 200, backgroundColor: "#ccf0e1", margin: 10 }} borderRadius={5}
                        source={{ uri: imageuri + this.state.OrganizationData.certification }} />
                </TouchableOpacity>

                <MonoText style={{ color: "#000", alignSelf: 'center' }}>Donate</MonoText>
                <TouchableOpacity onPress={() => { this.setState({ routName: "/upload/Donate" }); this.openImagePickerAsync() }}>
                    <Image style={{ height: 200, backgroundColor: "#ccf0e1", margin: 10 }} borderRadius={5}
                        source={{ uri: imageuri + this.state.OrganizationData.qrCode }} />
                </TouchableOpacity>
            </View>
        );

    };

    componentDidMount = async () => {
        await this._retrieveData();
    };

    componentWillUnmount() {
        this._unsubscribe();
    }

    headers() {
        return (
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start', alignContent: 'flex-start', }}>

                <View style={styles.viewShadow}>
                    <Image
                        style={{ width: 90, height: 90, backgroundColor: "#ccf0e1" }}
                        borderRadius={100}
                        source={{ uri: imageuri + this.state.AccountData.profile }} />
                    <MonoText style={{ height: 45 }}>{this.state.AccountData.name} </MonoText>
                </View>

                <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', marginLeft: "10%" }}>

                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start', alignContent: 'flex-start', }}>

                        <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginLeft: "10%" }}>
                            <Text style={{ marginTop: 15 }}>Adoptions</Text>
                            <MonoText>{this.state.NumberAdoptions}</MonoText>
                        </View>

                        <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginLeft: "10%" }}>
                            <TouchableOpacity style={{ alignItems: 'center' }}>
                                <Text style={{ marginTop: 15 }}>Adopted</Text>
                                <MonoText >{this.state.NumberAdopted}</MonoText>
                            </TouchableOpacity>
                        </View>

                    </View>

                    <TouchableOpacity style={styles.uploadimg} onPress={() => { this.props.navigation.navigate('Edit Profile') }}>
                        <Text>Edit Profile</Text>
                    </TouchableOpacity>

                </View>

            </View>
        );

    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={{ marginLeft: "5%" }} >
                    <FlatGrid
                        refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh} />}
                        ListHeaderComponent={this.headers()}
                        itemDimension={150}
                        items={this.state.Adoptions}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Adoption', { Adoption_id: item.adoption_id, Token: this.state.Token, TypeUser: "owner" })}>
                                <View>
                                    <Image
                                        style={{ height: 160, width: 150, backgroundColor: "#ccf0e1" }}
                                        borderRadius={5}
                                        source={{ uri: imageuri + item.img }}
                                    />
                                    <MonoText>{item.name}</MonoText>
                                    <Text>{item.city}</Text>
                                    {item.status == 1 ? <Text style={{ color: "#18F879" }}>Adopted</Text> : null}
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            </SafeAreaView>

        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    viewShadow: {
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignContent: 'center',
    },
    uploadimg: {
        width: 180,
        alignItems: "center",
        marginTop: '8%',
        backgroundColor: '#fff',
        padding: 5,
        fontWeight: "600",
        fontSize: 18,
        borderRadius: 2,
        borderWidth: 1,
        borderColor: "#000",

    },
});

import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { StyleSheet, Text, View, Image, TouchableOpacity, Button, Alert } from 'react-native';
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
            OrganizationData: {},

            newName: "",
            newEmail: "",
            newPhone: "",
            newPassword: "",
            newAddress: "",

            photo: "",
            routName: "",

            notFilled: false,
            emailError: false,

        };

        //retrve data and showing
        this.showOrgData = this.showOrgData.bind(this);
        this.loggedOut = this.loggedOut.bind(this);
        this.fetchData = this.fetchData.bind(this);
        // imagge select and upload
        this.openImagePickerAsync = this.openImagePickerAsync.bind(this);
        this.handleUploadPhoto = this.handleUploadPhoto.bind(this);
        //update
        this.updateData = this.updateData.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
        this.updateAddress = this.updateAddress.bind(this);


    }

    _retrieveData = async () => {
        try {
            var value = await AsyncStorage.getItem('AccountType');
            var token = await AsyncStorage.getItem('auth_Token');
            this.setState({ Token: token });
            this.setState({ AccountType: value });
        } catch (error) {
            console.log(error)
        }

        this.fetchData();
    };

    _deleteToken = async () => {
        try {
            await AsyncStorage.removeItem('AccountType');
            await AsyncStorage.removeItem('auth_Token');

        } catch (error) {
            console.log(error.message);
        }
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
                //storing data
                this.setState({ newName: responseJson.name });
                this.setState({ newEmail: responseJson.email });
                this.setState({ newPhone: responseJson.phoneNumber });
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

    handleUploadPhoto = async (photo, routName) => {
        console.log(routName);
        const photoData = {
            uri: photo.uri,
            name: photo.uri.split('/')[photo.uri.split('/').length - 1],
            type: 'image/jpeg',
            height: photo.height,
            width: photo.width,
        }

        const formData = new FormData();
        formData.append("photo", photoData);
        formData.append("typeUpload", routName);

        fetch(api + routName, {
            body: formData,
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
                'x-access-token': this.state.Token
            }
        })
            .then(response => {
                return response.json()
            })
            .then(response => {
                console.log("upload succes", response);
                alert("Upload success");
                this.setState({ photo: "" });

                if (routName == "/upload/Profile") {
                    this.setState(prevState => ({
                        AccountData: {
                            ...prevState.AccountData,
                            profile: photo.name
                        }
                    }))
                }

                else if (routName == "/upload/Certification") {
                    this.setState(prevState => ({
                        OrganizationData: {
                            ...prevState.OrganizationData,
                            certification: photo.name
                        }
                    }))
                }

                else if(routName=="/upload/Donate"){
                    this.setState(prevState => ({
                        OrganizationData: {
                            ...prevState.OrganizationData,
                            qrCode: photo.name
                        }
                    }))
                }


            })
            .catch(error => {
                console.log("upload error", error);
                alert("Upload failed!");
            });
    };

    openImagePickerAsync = async () => {

        let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

        if (permissionResult.granted === false) {
            alert('Permission to access camera roll is required!');
            return;
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync();

        if (pickerResult.cancelled === true) {
            return;
        }

        if (pickerResult.uri) {
            this.setState({ photo: pickerResult });
        }

        this.handleUploadPhoto(this.state.photo, this.state.routName);

    };

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

    loggedOut() {
        this.props.navigation.navigate('Home');
        this._deleteToken();
    };

    componentDidMount = async () => {
        await this._retrieveData();
    };

    updateData() {

        var validEmail = validate({ from: this.state.newEmail }, constraints);

        if (this.state.newName == "" || this.state.newEmail == "" || this.state.newPhone == "") {
            this.setState({ notFilled: true });
            if (validEmail == undefined)
                this.setState({ emailError: false });
        }
        else if (validEmail !== undefined) {
            this.setState({ emailError: true });
            this.setState({ notFilled: false });
        }

        else {
            fetch(api + '/update', {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'x-access-token': this.state.Token,
                }
                ,
                body: JSON.stringify({
                    name: this.state.newName,
                    email: this.state.newEmail,
                    phoneNumber: this.state.newPhone,
                })
            }
            )
                .then((response) => response.json())
                .then((responseJson) => {
                    if (responseJson) {
                        if (!responseJson.status) {
                            Alert.alert(responseJson.message);
                        }
                        else {
                            Alert.alert(responseJson.message);
                        }
                    }
                })
                .catch((error) => {
                    console.error(error);
                });

        }
    }

    updatePassword() {

        if (this.state.newPassword = "") {
            this.setState({ notFilled: true })
        }
        else {
            fetch(api + '/updatepassword', {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'x-access-token': this.state.Token,
                }
                ,
                body: JSON.stringify({
                    password: this.state.newPassword,
                })
            }
            )
                .then((response) => response.json())
                .then((responseJson) => {
                    if (responseJson) {
                        if (!responseJson.status) {
                            Alert.alert(responseJson.message);
                        }
                        else {
                            Alert.alert(responseJson.message);
                        }
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }

    updateAddress() {

        fetch(api + '/updateAddress', {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': this.state.Token,
            }
            ,
            body: JSON.stringify({
                address: this.state.newAddress,
            })
        }
        )
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson) {
                    if (!responseJson.status) {
                        Alert.alert(responseJson.message);
                    }
                    else {
                        Alert.alert(responseJson.message);
                    }
                }
            })
            .catch((error) => {
                console.error(error);
            });

    }

    render() {

        return (
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

                <View style={styles.viewShadow}>
                    <Image
                        style={{ width: 150, height: 150, alignSelf: 'center' }}
                        borderRadius={150}
                        source={{ uri: imageuri + this.state.AccountData.profile }} />
                    <TouchableOpacity style={styles.uploadimg} onPress={() => { this.setState({ routName: "/upload/Profile" }); this.openImagePickerAsync() }}>
                        <Text>Upload a photo</Text>
                    </TouchableOpacity>

                    <CustTxtInputProfile placeholder={this.state.AccountData.name} onChangeText={(name) => { this.setState({ newName: name }) }} />
                    <CustTxtInputProfile placeholder={this.state.AccountData.email} onChangeText={(email) => { this.setState({ newEmail: email }) }} />
                    <CustTxtInputProfile placeholder={String(this.state.AccountData.phoneNumber)} keyboardType='phone-pad' onChangeText={(phone) => { this.setState({ newPhone: phone }) }} />
                    <View style={{ padding: 50 }}><CustBtn title="Update" onpress={this.updateData} BgColor={Colors.primaryBtnBG} style={{ marginTop: "5%" }} /></View>

                </View>

                <View style={styles.viewShadow}>
                    <CustTxtInput placeholder="New Password" onChangeText={(password) => { this.setState({ newPassword: password }) }} />
                    <View style={{ padding: 50 }}><CustBtn title="Update Password" onpress={this.updatePassword} BgColor={Colors.primaryBtnBG} /></View>
                </View>

                {this.state.AccountType == "Organization" ? this.showOrgData() : null}

                <View style={{ padding: 20 }}>
                    {this.state.notFilled ? <MonoText style={{ color: "#fa163f" }}>Fill All input</MonoText> : null}
                    <Text style={{ color: "#fa163f" }}>{this.state.emailError ? "Invalid Email" : null}</Text>
                </View>
                <View style={{ padding: 50 }}>
                    <CustBtn style={{ marginTop: '10%' }} title="Logout" BgColor='#000' onpress={this.loggedOut} />
                </View>
            </ScrollView>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    viewShadow: {
        margin: "5%",
        padding: "2%",
        backgroundColor: '#fff',
        color: '#18F879',
        borderRadius: 5,
        shadowOpacity: 0.4,
        shadowRadius: 5,
        shadowOffset: {
            height: 2,
            width: 0,
        },
        elevation: 1,
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

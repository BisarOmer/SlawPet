import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { StyleSheet, Text, View, Image, TouchableOpacity, Picker, Alert } from 'react-native';
import api from '../constants/api';
import imageuri from '../constants/imageuri';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import CustTxtInput from '../components/CustTxtInput';
import CustBtn from '../components/CustBtn'
import Colors from '../constants/Colors';
import { MonoText } from '../components/StyledText';

export default class AddAdoption extends Component {

    constructor(props) {
        super(props);
        this.state = {


            Token: "",

            routName: "",
            photo: "",

            name: "",
            age: "",
            gender: "Male",
            city: "Slemani",
            pet: "Cat",
            content: "",

            notFill: false,


        }

        this.openImagePickerAsync = this.openImagePickerAsync.bind(this);
        this.handleUploadPhoto = this.handleUploadPhoto.bind(this);

        this.postAdoption = this.postAdoption.bind(this);
    }


    componentDidMount = async () => {
        await this._retrieveData();
    };

    _retrieveData = async () => {
        try {
            var token = await AsyncStorage.getItem('auth_Token');
            this.setState({ Token: token });

        } catch (error) {
            console.log(error)
        }

        if (this.state.Adoption_id != undefined)
            this.fetchData();
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
            
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
                'x-access-token': this.state.Token
            },
            body: formData,
        })
            .then(response => {
                return response.json()
            })
            .then(response => {
                this.setState({ photo: "" });

            })
            .catch(error => {
                console.log("upload error", error);
                alert("Upload failed!");
            });
    };

    postAdoption() {


        const name = this.state.name;
        const age = this.state.age;
        const gender = this.state.gender;
        const city = this.state.city;
        const pet = this.state.pet;
        const content = this.state.content;




        if (name == "" || age == "" || gender == "" || city == "" || pet == ""||this.state.photo=="") {
            this.setState({ notFill: true });
        }

        else {
            this.setState({ notFill: false });
            fetch(api + '/adoption', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'x-access-token': this.state.Token,
                }
                ,
                body: JSON.stringify({
                    name: name,
                    age: age,
                    gender: gender,
                    city: city,
                    pet: pet,
                    content: content
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
                            Alert.alert("successfully Added");
                        }
                    }
                })
                .catch((error) => {
                    console.error(error);
                });

            this.handleUploadPhoto(this.state.photo, this.state.routName);

        }

    };

    render() {
        return (
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

                <View style={{ padding: 20 }}>
                    <TouchableOpacity onPress={() => { this.setState({ routName: "/upload/AdoptionImage" }); this.openImagePickerAsync(); }} >
                        <Image
                            style={{ height: 225,width:"100%", backgroundColor: "#ccf0e1" }}
                            borderRadius={5}
                            source={this.state.photo!=""?this.state.photo:null }
                        />
                    </TouchableOpacity>

                    <CustTxtInput placeholder="Name" onChangeText={(name) => { this.setState({ name: name }) }} />
                    <CustTxtInput placeholder="Age" keyboardType='phone-pad' onChangeText={(age) => { this.setState({ age: age }) }} />

                    <View style={{ backgroundColor: "#f7f7f7", borderRadius: 5, marginTop: "5%" }}>
                        <Picker
                            selectedValue={this.state.gender}
                            onValueChange={(itemValue) =>
                                this.setState({ gender: itemValue })
                            }
                            style={styles.picker}>
                            <Picker.Item label="Male" value="Male" />
                            <Picker.Item label="Female" value="Female" />
                        </Picker>
                    </View>

                    <View style={{ backgroundColor: "#f7f7f7", borderRadius: 5, marginTop: "5%" }}>
                        <Picker
                            selectedValue={this.state.pet}
                            onValueChange={(itemValue) =>
                                this.setState({ pet: itemValue })
                            }
                            style={styles.picker}>
                            <Picker.Item label="Cat" value="Cat" />
                            <Picker.Item label="Dog" value="Dog" />
                            <Picker.Item label="Bird" value="Bird" />
                            <Picker.Item label="Rabbit" value="Rabbit" />
                            <Picker.Item label="Other" value="Other" />
                        </Picker>
                    </View>

                    <View style={{ backgroundColor: "#f7f7f7", borderRadius: 5, marginTop: "5%" }}>
                        <Picker
                            selectedValue={this.state.city}
                            onValueChange={(itemValue) =>
                                this.setState({ city: itemValue })
                            }
                            style={styles.picker}>
                            <Picker.Item label="Sulaymaniyah" value="Sulaymaniyah" />
                            <Picker.Item label="Hawler" value="Hawler" />
                            <Picker.Item label="Duhok" value="Duhok" />
                            <Picker.Item label="Halabja" value="Halabja" />
                            <Picker.Item label="Kirkuk" value="Kirkuk" />
                        </Picker>
                    </View>

                    <CustTxtInput placeholder="Write More" onChangeText={(content) => { this.setState({ content: content }) }}></CustTxtInput>
                </View>

                <View style={{ padding: 20 ,alignItems:"center"}}>
                    {this.state.notFill ? <Text style={{ color: "#fa163f" }}>Please Fill All Inputs</Text> : null}
                    <CustBtn title="Post" color="#fff" onpress={this.postAdoption} style={{backgroundColor:Colors.primaryBtnBG}} />
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
    uploadimg: {
        alignSelf: 'center',
        marginTop: '2%',
        backgroundColor: '#dff6f0',
        padding: 10,
        fontWeight: "600",
        fontSize: 18,
        borderRadius: 5
    },
    picker: {
        height: 50,
        color: '#18F879',
        fontFamily: 'Segoe UI',
    }
});

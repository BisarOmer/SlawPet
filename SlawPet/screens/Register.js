import * as React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Picker, Alert } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { render } from 'react-dom';
import CustTxtInput from '../components/CustTxtInput';
import CustBtn from '../components/CustBtn';
import { MonoText } from '../components/StyledText';
import Colors from '../constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import api from '../constants/api';





export default function Register({ navigation }) {

    var validate = require("validate.js");

    var constraints = {
        from: {
            email: true
        }
    };

    //erroe
    var [notFilled, setnotfilled] = useState(false);
    var [emailError, setErroremail] = useState();

    // request body
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [phoneNumber, setPhone] = useState();
    const [profile] = useState("default.png");
    const [accType, setAccType] = useState("user");


    function registerUSer() {

       var validEmail = validate({ from: email }, constraints);
        

        if (name == null || email == null || password == null || phoneNumber == null) {
            setnotfilled(true);
            if (validEmail == undefined)
                setErroremail(false);
        }

        else if (validEmail !== undefined) {
            setErroremail(true);
            setnotfilled(false);
 
            
        }

        else {
            return fetch(api+'/register', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
                ,
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password,
                    phoneNumber: phoneNumber,
                    profile: profile,
                    accType: accType
                })
            }
            )
                .then((response) => response.json())
                .then((responseJson) => {
                    if (responseJson) {
                        if (!responseJson.status) {
                               Alert.alert(responseJson.message);
                        }
                    }
                })
                .catch((error) => {
                    console.error(error);
                });

        }

    };

    return (
        <View style={styles.container}>

            <View style={{ padding: '10%' }}>
                <Text style={styles.title}>Slaw Pet</Text>
                <CustTxtInput placeholder="Name" onChangeText={(name) => { name == "" ? setName(null) : setName(name) }} />
                <CustTxtInput placeholder="Email" onChangeText={(email) => { email == "" ? setEmail(null) : setEmail(email) }} keyboardType='email-address' />
                <CustTxtInput password={true} placeholder="Password" onChangeText={(password) => { password == "" ? setPassword(null) : setPassword(password) }} />
                <CustTxtInput placeholder="Phone Number" onChangeText={(phone) => { if (/^\d+$/.test(phone)) phone == "" ? setPhone(null) : setPhone(phone) }} keyboardType='phone-pad' />
                <MonoText>Account Type</MonoText>
                <Picker
                    selectedValue={accType}
                    onValueChange={(itemValue) =>
                        setAccType(itemValue)
                    }
                    style={styles.picker}>
                    <Picker.Item label="User" value="user" />
                    <Picker.Item label="Organiazation" value="Organization" />
                </Picker>

                <Text style={{ color: "#fa163f" }}>{notFilled ? "Fill All Inputs" : null}</Text>
                <Text style={{ color: "#fa163f" }}>{emailError ? "Invalid Email" : null}</Text>
               

            </View>

            <View style={{ marginLeft: '10%',marginRight:'10%' }}>
                <CustBtn onpress={registerUSer} title="Create" BgColor={Colors.primaryBtnBG} />
            </View>

        </View>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignContent: 'center',
        backgroundColor: '#fff',
    },
    title: {
        alignSelf: "center",
        fontFamily: 'Segoe UI',
        fontWeight: '600',
        color: Colors.primaryTxtColor,
        fontSize: 35,
    },
    picker: {
        height: 50,
        backgroundColor: '#fff',
        color: '#18F879',
        fontFamily: 'Segoe UI',
        fontWeight: '600',
        borderRadius: 5,
        shadowOpacity: 0.2,
        shadowRadius: 5,
        shadowOffset: {
            height: 2,
            width: 0,
        },
    }
});
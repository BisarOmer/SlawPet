import * as React from 'react';
import { useState} from 'react';
import { StyleSheet, Text, View, Button, Picker, Alert } from 'react-native';

import CustTxtInput from '../components/CustTxtInput';
import CustBtn from '../components/CustBtn';
import { MonoText } from '../components/StyledText';
import Colors from '../constants/Colors';
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
            fetch(api + '/register', {
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
                <MonoText style={{ marginTop: "4%" }}>Account Type</MonoText>
                <View style={{ backgroundColor: "#f7f7f7", borderRadius: 5, }}>
                    <Picker
                        selectedValue={accType}
                        onValueChange={(itemValue) =>
                            setAccType(itemValue)
                        }
                        style={styles.picker}>
                        <Picker.Item label="User" value="User" />
                        <Picker.Item label="Organiazation" value="Organization" />
                    </Picker>
                </View>
                <Text style={{ color: "#fa163f" }}>{notFilled ? "Fill All Inputs" : null}</Text>
                <Text style={{ color: "#fa163f" }}>{emailError ? "Invalid Email" : null}</Text>


            </View>

            <View style={{ marginLeft: '10%', marginRight: '8%', alignItems: "center" }}>
                <CustBtn onpress={registerUSer} title="Create" color="#fff" style={{ backgroundColor: "#18F879" }} />
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
        color: '#18F879',
        fontFamily: 'Segoe UI',
        fontWeight: '600',
    }
});
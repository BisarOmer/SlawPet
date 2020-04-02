import * as React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Alert, SafeAreaView } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { render } from 'react-dom';
import CustTxtInput from '../components/CustTxtInput';
import CustBtn from '../components/CustBtn';
import Colors from '../constants/Colors';
import { AsyncStorage } from 'react-native';
import api from '../constants/api';

export default function LoginScreen({ navigation }) {



    var validate = require("validate.js");
    var _storeData;

    var constraints = {
        from: {
            email: true
        }
    };

    // request body
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    //error
    var [notFilled, setnotfilled] = useState(false);
    var [emailError, setErroremail] = useState();


    function login() {

        var validEmail = validate({ from: email }, constraints);


        if (email == null || password == null) {
            setnotfilled(true);
            if (validEmail === undefined)
                setErroremail(false);
        }

        else if (validEmail !== undefined) {
            setErroremail(true);
            setnotfilled(false);


        }

        else {
            fetch(api + '/signin', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
                ,
                body: JSON.stringify({
                    email: email,
                    password: password,
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

                            //storing token
                            _storeData = async () => {
                                
                                try {
                                    await AsyncStorage.setItem('auth_Token', responseJson.token);
                                    await AsyncStorage.setItem('AccountType', responseJson.AccountType);
                                    await AsyncStorage.setItem('Acco_id', String(responseJson.account_id));
                                } catch (error) {
                                    console.log(error);
                                }

                            };
                            _storeData();
                            navigation.navigate('Home');
                           

                        }
                    }
                })
                .catch((error) => {
                    console.error(error);
                });

        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ alignItems: 'center' }}>
                <Text style={styles.title}>Slaw Pet</Text>
            </View>

            <View style={{ padding: '10%' }}>
                <CustTxtInput placeholder="Email" onChangeText={(email) => { setErroremail(false); email == "" ? setEmail(null) : setEmail(email) }} />
                <CustTxtInput password={true} placeholder="Password" onChangeText={(password) => { password == "" ? setPassword(null) : setPassword(password) }} />


                <Text style={{ color: "#fa163f" }}>{notFilled ? "Fill All Inputs" : null}</Text>
                <Text style={{ color: "#fa163f" }}>{emailError ? "Invalid Email" : null}</Text>
            </View>



            <View style={{ marginTop: '6%', margin: '20%' }}>
                <CustBtn title="Login" onpress={login} BgColor={Colors.primaryBtnBG} />
                <Text style={styles.normalText}>Create Account</Text>
                <CustBtn title="Register" onpress={() => navigation.navigate('Register')} BgColor="#000" />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignContent: 'center',
        padding: '10%',
        paddingTop: 50,
        backgroundColor: '#fff',
    },
    title: {
        fontFamily: 'Segoe UI',
        fontWeight: '600',
        color: Colors.primaryTxtColor,
        fontSize: 35,
    },
    normalText: {
        alignSelf: "center",
        fontFamily: 'Segoe UI',
        fontWeight: '400',
        color: '#000',
        fontSize: 16,
        marginTop: '40%',
        marginBottom: '5%',
    }

});
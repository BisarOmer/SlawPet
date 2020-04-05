import * as React from 'react';
import { Linking } from 'react-native'
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import CustTxtInput from '../components/CustTxtInput';
import CustBtn from '../components/CustBtn'
import Colors from '../constants/Colors';
import { MonoText } from '../components/StyledText';
import { AsyncStorage } from 'react-native';
import api from '../constants/api';
import imageuri from '../constants/imageuri';

export default class ViewAsk extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Adoption_id: this.props.route.params.Adoption_id,
            Token: this.props.route.params.Token,

            AskData: {},
        }

        this.give = this.give.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    componentDidMount = async () => {
        await this.fetchData();
    };

    fetchData = async () => {

        fetch(api + '/organization/viewAsk',
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'x-access-token': this.state.Token,
                },
                body: JSON.stringify({
                    Adoption_id: this.state.Adoption_id
                })
            })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ AskData: responseJson });
            })
            .catch((error) => {
                console.error(error);
            });

    };

    giveReq() {
        fetch(api + '/give',
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'x-access-token': this.state.Token,
                },
                body: JSON.stringify({
                    Adoption_id: this.state.Adoption_id
                })
            })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.status) {
                    Alert.alert(responseJson.messege + " " + this.state.AskData.asker);
                    this.props.navigation.goBack();
                }

            })
            .catch((error) => {
                console.error(error);
            });

    }

    cancelReq() {
        fetch(api + '/cancel',
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'x-access-token': this.state.Token,
                },
                body: JSON.stringify({
                    Adoption_id: this.state.Adoption_id
                })
            })
            .then((response) => response.json())
            .then((responseJson) => {

                if (responseJson.status) {
                    this.props.navigation.goBack();
                }

            })
            .catch((error) => {
                console.error(error);
            });

    }

    give() {
        Alert.alert(
            'Give Confirmation',
            'Please before giving call adopter',
            [
                { text: 'Cancel' },
                { text: 'OK', onPress: () => this.giveReq() },
            ],
            { cancelable: false }
        )
    }

    cancel() {
        Alert.alert(
            'Cancel Confirmation',
            'Are You Sure',
            [
                { text: 'Cancel' },
                { text: 'OK', onPress: () => this.cancelReq() },
            ],
            { cancelable: false }
        )

    }

    render() {
        const viewAsk = this.state.AskData
        return (
            <View style={styles.container} contentContainerStyle={styles.contentContainer}>

                <View style={{ flexDirection: 'row', alignItems: 'center', }}>

                    <View style={{ padding: '5%' }}>
                        <Image
                            style={{ width: 100, height: 100, alignSelf: 'center' }}
                            borderRadius={150}
                            source={{ uri: imageuri + viewAsk.profile }}
                        />
                        <MonoText style={{ alignSelf: 'center' }}>{viewAsk.asker}</MonoText>
                    </View>

                    <View style={{justifyContent: 'space-between',alignItems: 'flex-start',alignContent: 'flex-start',}}>
                        <MonoText >{viewAsk.phoneNumber}</MonoText>
                        <CustBtn title="Call" color="#fff" style={{ backgroundColor: "#18F879" ,}} onpress={() => { Linking.openURL(`tel:${viewAsk.phoneNumber}`) }} />
                    </View>


                </View>


                <View style={{ padding: '5%' }}>

                    <TouchableOpacity style={{ marginTop: 20 }} onPress={() => this.props.navigation.navigate('Adoption', { Adoption_id: this.state.Adoption_id, Token: this.state.Token, TypeUser: "owner" })}>
                        <View>
                            <Image
                                style={{ height: 160, width: 150, backgroundColor: "#ccf0e1", alignSelf: 'center' }}
                                borderRadius={5}
                                source={{ uri: imageuri + viewAsk.img }}
                            />
                            <MonoText style={{ alignSelf: 'center' }}>{viewAsk.name}</MonoText>
                        </View>
                    </TouchableOpacity>

                    <View style={{ marginTop: "10%", alignItems: "center" }}>
                        <CustBtn title="Give" color="#fff" style={{ backgroundColor: "#18F879" }} onpress={this.give} />
                        <CustBtn title="Cancel" style={{ marginTop: "25%" }} onpress={this.cancel} />
                    </View>


                </View>

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
});

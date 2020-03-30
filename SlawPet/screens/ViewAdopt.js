import React, { Component } from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, SafeAreaView, Picker, FlatList, Alert, TouchableHighlightBase } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';
import { SectionGrid } from 'react-native-super-grid';
import { MonoText } from '../components/StyledText';
import defaultOrg from '../assets/images/account.png';
import CustBtn from '../components/CustBtn';
import CustTxtInput from '../components/CustTxtInput';
import Colors from '../constants/Colors';
import { AsyncStorage } from 'react-native';
import api from '../constants/api';
import imageuri from '../constants/imageuri';

export default class ViewAdopt extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Token: this.props.route.params.Token,
            Adoption_id: this.props.route.params.Adoption_id,
            TypeUser: this.props.route.params.TypeUser,
            AdoptionData: {},
            Comments:{},

            content: "",

        }

        this.deleteAdoption = this.deleteAdoption.bind(this);
        this.postComment = this.postComment.bind(this);
        this.ask = this.ask.bind(this);
    }

    componentDidMount = async () => {
        await this._retrieveData();
    };

    _retrieveData = async () => {
        try {
            var value = await AsyncStorage.getItem('AccountType');
        } catch (error) {
            console.log(error)
        }

        this.fetchData();
        this.fetchComments();
    };

    fetchData = async () => {

        if (this.state.TypeUser == "owner") {
            fetch(api + '/myAdoptions/Adoption_id',
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
                    this.setState({ AdoptionData: responseJson });
                })
                .catch((error) => {
                    console.error(error);
                });
        }

        else {
            fetch(api + '/adoption/byid/' + this.state.Adoption_id,
                {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },

                })
                .then((response) => response.json())
                .then((responseJson) => {
                    this.setState({ AdoptionData: responseJson });
                })
                .catch((error) => {
                    console.error(error);
                });

        }
    };

    fetchComments = async()=>{
        
            fetch(api + '/comment/'+this.state.Adoption_id,
                {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                })
                .then((response) => response.json())
                .then((responseJson) => {
                    this.setState({Comments: responseJson });
                })
                .catch((error) => {
                    console.error(error);
                });
    }

    deleteAdoption() {
        fetch(api + '/adoption/delete',
            {
                method: 'DELETE',
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
                if (responseJson) {
                    Alert.alert(responseJson.message);
                }
            })
            .catch((error) => {
                console.error(error);
            });

        this.props.navigation.navigate("MyAdoptions");

    }

    postComment() {
        if (this.state.content != "") {
            fetch(api + '/comment',
                {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'x-access-token': this.state.Token,
                    },
                    body: JSON.stringify({
                        Adoption_id: this.state.Adoption_id,
                        content: this.state.content
                    })
                })
                .then((response) => response.json())
                .then((responseJson) => {
                    if (responseJson) {
                        Alert.alert(responseJson.message);
                    }
                })
                .catch((error) => {
                    console.error(error);
                });

        }
        else {
            Alert.alert("Comment is Empty")
        }

    }

    ask(){
        if(this.state.Token!=undefined){
        fetch(api + '/ask',
        {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': this.state.Token,
            },
            body: JSON.stringify({
                Adoption_id: this.state.Adoption_id,
                org_id:this.state.AdoptionData.account_id
            })
        })
        .then((response) => response.json())
        .then((responseJson) => {
            Alert.alert(responseJson.message);
        })
        .catch((error) => {
            console.error(error);
        });

        this.props.navigation.navigate("Home");
    }
    else{
        Alert.alert("Please Login or Create Account");
    }
    }

    commentSection() {
       
        if (this.state.Token) {
            return (
                <View>
                    <MonoText>Commments</MonoText>
                    <CustTxtInput placeholder="Write Here" onChangeText={(content) => { this.setState({ content: content }) }} />
                    <View style={{ padding: 25 }}><CustBtn title="Post" onpress={this.postComment} /></View>
                </View>
            );
        }
    }

    header() {
        
        const AdoptionData = this.state.AdoptionData
        const items = [
            { name: 'Gender', code: AdoptionData.gender },
            { name: 'Age', code: AdoptionData.age },
            { name: 'City ', code: AdoptionData.city },
        ]

        return (
            <View>

                <View>

                    <Image
                        style={{ height: 160, backgroundColor: "#ccf0e1" }}
                        borderRadius={5}
                        source={{ uri: imageuri + AdoptionData.img }}
                    />
                    <MonoText>{AdoptionData.title}</MonoText>

                    <TouchableOpacity style={{ marginTop: '2%' }}>
                        <View style={{ flex: 1, flexDirection: "row", marginBottom: "5%" }}>
                            <Image
                                style={{ width: 50, height: 50, }}
                                borderRadius={100}
                                source={{ uri: imageuri + AdoptionData.profile }}
                            />
                            <MonoText style={{ marginLeft:"4%"}}>{AdoptionData.owner}</MonoText>
                        </View>
                    </TouchableOpacity>
                </View>

                <SectionGrid
                    itemDimension={90}
                    sections={[
                        {
                            title: 'Information',
                            data: items.slice(0, 3),
                        },
                    ]}
                    style={styles.gridView}

                    renderItem={({ item, section, index }) => (
                        <View style={[styles.itemContainer, { backgroundColor: "#fff" }]}>
                            <MonoText style={styles.itemName}>{item.name}</MonoText>
                            <Text style={styles.itemCode}>{item.code}</Text>
                        </View>
                    )}

                    renderSectionHeader={({ section }) => (
                        <MonoText style={styles.sectionHeader}>{section.title}</MonoText>
                    )}
                />

                <View style={{ margin: '5%' }}>
                    <MonoText>{AdoptionData.content}</MonoText>
                </View >

                <View style={{ margin: '3%', padding: 10 }}>
                    {/* //btns */}
                    {this.state.TypeUser == "owner" ? <CustBtn title="Delete" BgColor={"#fa163f"} onpress={this.deleteAdoption} /> : null}
                    {this.state.TypeUser == "user" ? <CustBtn title="Adobt" BgColor={Colors.primaryBtnBG} onpress={this.ask}/> : null}
                </View>

                {this.commentSection()}


            </View>
        );
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <FlatList
                    ListHeaderComponent={this.header()}
                    data={this.state.Comments}
                    keyExtractor={item => String(item.comment_id)}
                    renderItem={({ item }) =>
                        <TouchableOpacity style={{ marginTop: 10 }} >
                            <View style={{ flex: 1, flexDirection: "row", marginBottom: 10 }}>
                                <Image
                                    style={{ width: 50, height: 50, }}
                                    borderRadius={100}
                                    source={{ uri: imageuri + item.profile }}
                                />
                                <MonoText style={{ marginLeft:"4%" }}>{item.name}</MonoText>
                            </View>
                            <MonoText style={styles.comment}>{item.content}</MonoText>
                        </TouchableOpacity>
                    }
                    style={{ margin: "3%" }}
                />

            </SafeAreaView >
        );

    }
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: '#fff',
    },
    gridView: {
        marginTop: 20,
        flex: 1,
    },
    itemContainer: {
        justifyContent: 'flex-end',
        borderRadius: 5,
        padding: 10,
        height: 100,
        shadowOpacity: 0.4,
        shadowOffset: {
            height: 2,
            width: 0,
        },
    },
    itemName: {
        color: '#000',
        fontWeight: '600',
    },
    itemCode: {
        fontWeight: '600',
        fontSize: 12,
        color: '#000',
    },
    sectionHeader: {
        flex: 1,
        fontWeight: '600',
        alignItems: 'center',
        backgroundColor: '#000',
        color: 'white',
        padding: 10,
    },
    comment: {
        backgroundColor: '#f1f3f4',
        borderRadius: 5,
        padding: 10,

        shadowOpacity: 0.4,
        shadowOffset: {
            height: 2,
            width: 0,
        }
    }

});

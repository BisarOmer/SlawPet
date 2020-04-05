import React, { Component } from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, SafeAreaView, Picker, FlatList, Alert, TouchableHighlightBase } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';
import { SectionGrid } from 'react-native-super-grid';
import { MonoText } from '../components/StyledText';
import CustBtn from '../components/CustBtn';
import CustTxtInput from '../components/CustTxtInput';
import Colors from '../constants/Colors';
import { AsyncStorage } from 'react-native';
import api from '../constants/api';
import imageuri from '../constants/imageuri';

export default class ViewAdoption extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Token: this.props.route.params.Token,
            Adoption_id: this.props.route.params.Adoption_id,
            TypeUser: this.props.route.params.TypeUser,
            Account_id: "",
            AdoptionData: {},
            Comments: {},
            content: "",


        }
        this.myRef = React.createRef();
        this.deleteAdoption = this.deleteAdoption.bind(this);
        this.postComment = this.postComment.bind(this);
        this.deleteComment = this.deleteComment.bind(this);
        this.ask = this.ask.bind(this);
        this.askReq = this.askReq.bind(this);
    }

    componentDidMount = async () => {
        await this._retrieveData();
    };

    _retrieveData = async () => {
        try {
            var value = await AsyncStorage.getItem('Acco_id');
            this.setState({ Account_id: value });
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

    fetchComments = async () => {

        fetch(api + '/comment/' + this.state.Adoption_id,
            {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.status == "true")
                    this.setState({ Comments: responseJson.res });
                else if (responseJson.status == "false") {
                    const defaultComment = {
                        "comment_id": 0,
                        "content": "Hope soon this soul get Comment ",
                        "name": "No Comment",
                        "profile": "default.png"
                    }
                    var arr = []
                    arr.push(defaultComment)
                    this.setState({ Comments: arr })
                }

            })
            .catch((error) => {
                console.error(error);
            });
    }

    deleteAdoptionReq() {
        fetch(api + '/adoption/delete',
            {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'x-access-token': this.state.Token,
                },
                body: JSON.stringify({
                    Adoption_id: this.state.Adoption_id,
                    img: this.state.AdoptionData.img
                })
            })
            .catch((error) => {
                console.error(error);
            });
        this.props.navigation.goBack();
    }
    deleteAdoption() {
        Alert.alert(
            'Deleting Adoption',
            'After deleting this Adoption you can not restore it',
            [
                { text: 'Cancel', style: 'cancel', },
                { text: 'Yes', onPress: () => this.deleteAdoptionReq() },
            ],
            { cancelable: false }
        )
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
                .catch((error) => {
                    console.error(error);
                });
            this.myRef.current.clear();
            this._retrieveData()
        }
        else {
            Alert.alert("Comment is Empty")
        }

    }

    askReq() {
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
                    saver_id: this.state.AdoptionData.account_id
                })
            })
            .then((response) => response.json())
            .then((responseJson) => {
                Alert.alert(responseJson.message);
            })
            .catch((error) => {
                console.error(error);
            });
        this.props.navigation.goBack();
    }
    ask() {
        if (this.state.Token != undefined) {
            Alert.alert(
                'Adopting',
                'You have responsibility to save and love this soul',
                [
                    { text: 'Cancel', style: 'cancel', },
                    { text: 'Yes', onPress: () => this.askReq() },
                ],
                { cancelable: false }
            )
        }
        else {
            Alert.alert("Please Login or Create Account");
        }
    }

    commentInput() {
        return (
            <TextInput placeholder="write comment" onChangeText={(content) => { this.setState({ content: content }) }} style={styles.commentInput} />
        );
    }

    commentSection() {
        if (this.state.Token != null) {
            return (
                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                    {this.commentInput()}
                    <TouchableOpacity style={styles.post} onPress={this.postComment}>
                        <MonoText style={{ color: "#fff", marginTop: "-5%" }}>Post</MonoText>
                    </TouchableOpacity>
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

                <TouchableOpacity style={{ marginTop: '2%' }}>
                    <View style={{ flex: 1, flexDirection: "row", marginBottom: "5%" ,alignItems:"center"}}>
                        <Image
                            style={{ width: 50, height: 50, }}
                            borderRadius={100}
                            source={{ uri: imageuri + AdoptionData.profile }}
                        />
                        <MonoText style={{ marginLeft: "4%" }}>{AdoptionData.owner}</MonoText>
                    </View>
                </TouchableOpacity>

                <View>
                    <Image
                        style={{ height: 225, backgroundColor: "#ccf0e1" }}
                        borderRadius={5}
                        source={{ uri: imageuri + AdoptionData.img }}
                    />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', alignContent: 'flex-start', }}>
                        <MonoText>{AdoptionData.title}</MonoText>
                        {this.state.TypeUser == "owner" ? <CustBtn title="Delete" color="#fff" style={{ backgroundColor: "#fa163f", marginTop: '3%' }} onpress={this.deleteAdoption} /> : null}
                        {this.state.TypeUser == "user" ? <CustBtn title="Adopt" color="#fff" style={{ backgroundColor: Colors.primaryBtnBG, marginTop: '3%' }} onpress={this.ask}></CustBtn> : null}
                    </View>

                </View>

                <SectionGrid
                    itemDimension={90}
                    sections={[
                        {
                            title: 'Details',
                            data: items.slice(0, 3),
                        },
                    ]}
                    style={styles.gridView}

                    renderItem={({ item }) => (
                        <View style={[styles.itemContainer]}>
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

                <MonoText>Comments</MonoText>
                {this.commentSection()}

            </View>
        );
    }

    deleteCommentReq(comment_id) {
        fetch(api + '/comment',
            {
                method: 'Delete',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'x-access-token': this.state.Token,
                },
                body: JSON.stringify({
                    comment_id: comment_id
                })
            })
            .catch((error) => {
                console.error(error);
            });
        this.fetchComments()
    }

    deleteComment(comment_id) {
        Alert.alert(
            'Deleting Comment',
            'After deleting this comment you can not restore it',
            [
                { text: 'Cancel', style: 'cancel', },
                { text: 'Yes', onPress: () => this.deleteCommentReq(comment_id) },
            ],
            { cancelable: false }
        )
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <FlatList
                    ListHeaderComponent={this.header()}
                    data={this.state.Comments}
                    keyExtractor={item => String(item.comment_id)}
                    renderItem={({ item }) =>
                        <TouchableOpacity style={{ marginTop: 10, }} onPress={() => { item.account_id == this.state.Account_id ? this.deleteComment(item.comment_id) : null }} >
                            <View style={{ flex: 1, flexDirection: "row", marginBottom: 10,alignItems:"center" }}>
                                <Image
                                    style={{ width: 50, height: 50, }}
                                    borderRadius={100}
                                    source={{ uri: imageuri + item.profile }}
                                />
                                <MonoText style={{ marginLeft: "4%" }}>{item.name}</MonoText>
                            </View>
                            <View style={{ borderRadius: 5, backgroundColor: '#f1f3f4', }}>
                                <MonoText style={styles.comment}>{item.content}</MonoText>
                            </View>
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
        padding: 10,
        justifyContent: 'flex-start',
        borderRadius: 5,
        backgroundColor: "#fff",
    },
    itemName: {
        color: '#000',
        fontWeight: '800',
    },
    itemCode: {
        fontWeight: '600',
        fontSize: 14,
        color: '#000',
    },
    sectionHeader: {
        flex: 1,
        borderRadius: 5,
        fontWeight: '600',
        alignItems: 'center',
        backgroundColor: '#f7f7f7',
        color: '#000',
        padding: 10,
    },
    comment: {
        borderRadius: 5,
        padding: 10,
    },
    commentInput: {
        width: 300,
        backgroundColor: '#f1f3f4',
        borderRadius: 5,
        padding: 10,

    },
    post: {
        width: 80,
        height: 45,
        margin: "1%",
        alignItems: "center",
        backgroundColor: '#18F879',
        padding: 10,
        fontWeight: "600",
        fontSize: 18,
        borderRadius: 5,
    },

});

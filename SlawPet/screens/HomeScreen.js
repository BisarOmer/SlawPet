import React, { Component } from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, SafeAreaView, Picker, FlatList, Vibration, PickerIOSItem } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';
import { FlatGrid } from 'react-native-super-grid';
import { MonoText } from '../components/StyledText';
import { render } from 'react-dom';
import api from '../constants/api';
import imageuri from '../constants/imageuri';
import { AsyncStorage } from 'react-native';


export default class HomeScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            city: "All",
            pet: "All",
            Token: "",

            adoptions: [],
        }
    }

    componentDidMount = async () => {
        await this._retrieveData();
    };

    _unsubscribe = this.props.navigation.addListener('focus', async () => {
        await this._retrieveData();
    });

    _retrieveData = async () => {
        try {
            var token = await AsyncStorage.getItem('auth_Token');
            this.setState({ Token: token });
        } catch (error) {
            console.log(error)
        }

        this.fetchData();
    };

    fetchData = async () => {
        if (this.state.city == "All" && this.state.pet == "All") {
            fetch(api + '/adoption',
                {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    }
                })
                .then((response) => response.json())
                .then((responseJson) => {
                    this.setState({ adoptions: responseJson });
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    };

    componentDidUpdate(prevProps, prevState) {

        //just by city
        if (prevState.city !== this.state.city && this.state.city != "All" && this.state.pet == "All") {
            this.AdoptionsByCity();
        }
        //just by city pet changed to all
        else if (prevState.pet !== this.state.pet && this.state.city != "All" && this.state.pet == "All") {
            this.AdoptionsByCity();
        }

        //just by pet
        else if (prevState.pet !== this.state.pet && this.state.pet != "All" && this.state.city == "All") {
            this.AdoptionsByPet();
        }
        //just by pet change city to all
        else if (prevState.city != this.state.city && this.state.pet != "All" && this.state.city == "All") {
            this.AdoptionsByPet();

        }

        //by both change city
        else if (prevState.city !== this.state.city && this.state.city != "All" && this.state.pet != "All") {
            this.AdoptioinsByBoth();
        }
        //by both change pet
        else if (prevState.pet !== this.state.pet && this.state.pet != "All" && this.state.city != "All") {
            this.AdoptioinsByBoth();
        }

        //all
        else if (prevState.pet !== this.state.pet && this.state.pet == "All" && this.state.city == "All") {
            this.AdoptoinsAll();
        }
        else if (prevState.city !== this.state.city && this.state.city == "All" && this.state.pet == "All") {
            this.AdoptoinsAll();
        }

    }

    AdoptionsByCity() {
        fetch(api + '/adoption/bycity/' + this.state.city,
            {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ adoptions: responseJson });
            })
            .catch((error) => {
                console.error(error);
            });
    }
    AdoptionsByPet() {
        fetch(api + '/adoption/bypet/' + this.state.pet,
            {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ adoptions: responseJson });
            })
            .catch((error) => {
                console.error(error);
            });

    }
    AdoptioinsByBoth() {
        fetch(api + '/adoption/byPetandCity/' + this.state.city + "-" + this.state.pet,
            {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ adoptions: responseJson });
            })
            .catch((error) => {
                console.error(error);
            });
    }
    AdoptoinsAll() {
        fetch(api + '/adoption',
            {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ adoptions: responseJson });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    componentWillUnmount() {
        this._unsubscribe();
    }

    render() {
        const adoptions = this.state.adoptions
        return (
            <SafeAreaView style={styles.container}>
                <View style={{ marginLeft: '5%', marginRight: "5%" }} >
                    <FlatList
                        ListHeaderComponent={
                            <View style={{ marginBottom: '5%' }}>
                                <MonoText>City</MonoText>
                                <View style={{ backgroundColor: "#f7f7f7", borderRadius: 5, }}>
                                    <Picker
                                        style={styles.picker}
                                        selectedValue={this.state.city}
                                        onValueChange={(itemValue) =>
                                            this.setState({ city: itemValue })
                                        }
                                    >
                                        <Picker.Item label="All" value="All" />
                                        <Picker.Item label="Sulaymaniyah" value="Sulaymaniyah" />
                                        <Picker.Item label="Hawler" value="Hawler" />
                                        <Picker.Item label="Duhok" value="Duhok" />
                                        <Picker.Item label="Halabja" value="Halabja" />
                                        <Picker.Item label="Kirkuk" value="Kirkuk" />
                                    </Picker>
                                </View>
                                <MonoText>Pet</MonoText>
                                <View style={{ backgroundColor: "#f7f7f7", borderRadius: 5, }}>
                                    <Picker
                                        style={styles.picker}
                                        selectedValue={this.state.pet}
                                        onValueChange={(itemValue) =>
                                            this.setState({ pet: itemValue })

                                        }>
                                        <Picker.Item label="All" value="All" />
                                        <Picker.Item label="Cat" value="Cat" />
                                        <Picker.Item label="Dog" value="Dog" />
                                        <Picker.Item label="Bird" value="Bird" />
                                        <Picker.Item label="Rabbit" value="Rabbit" />
                                        <Picker.Item label="Other" value="Other" />
                                    </Picker>
                                </View>
                            </View>
                        }
                        keyExtractor={item => String(item.adoption_id)}
                        data={adoptions}
                        renderItem={({ item }) => (
                            <View style={styles.post}>
                                <TouchableOpacity style={{ margin: '2%' }}>
                                    <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
                                        <Image
                                            style={{ width: 50, height: 50, backgroundColor: "#ccf0e1"  }}
                                            borderRadius={100}
                                            source={{ uri: imageuri + item.profile }}
                                        />
                                        <MonoText style={{ marginLeft: "4%" }}>{item.owner}</MonoText>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => this.props.navigation.navigate('View Adoption', { Adoption_id: item.adoption_id, Token: this.state.Token, TypeUser: "user" })}>
                                    <View>
                                        <Image
                                            style={{ height: 160, backgroundColor: "#ccf0e1" }}
                                            borderRadius={5}
                                            source={{ uri: imageuri + item.img }}
                                        />
                                        <MonoText>{item.title}</MonoText>
                                    </View>
                                    <Text>{item.content}</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    />
                </View>
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
    picker: {
        height: 50,
        color: '#18F879',
        fontFamily: 'Segoe UI',
        fontWeight: '600',
    },
    post: {
        padding:"5%",
        marginTop: "10%",
        borderRadius: 5,
        backgroundColor: "#fff",
        shadowColor: "#7fcd91",
        shadowOffset: {
            width: 0,
            height:1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4.65,
        elevation: 3,
    }
});

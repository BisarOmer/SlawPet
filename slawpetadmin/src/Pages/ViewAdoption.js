import React, { Component } from 'react';
import { withRouter } from "react-router";
import api from '../Components/api';
import imguri from '../Components/imgURI';
import {Button } from 'antd';


class ViewAdoption extends Component {

    constructor(props) {
        super(props);
        this.state = {
            adoptionData: {},
            id: this.props.match.params.id,
            token: "",
        }
    }

    componentDidMount() {
        this.fetchInfo()
        let toke = localStorage.getItem("token");
        this.setState({ token: toke })
    }

    fetchInfo() {
        fetch(api + "/adoption/byid/" + this.state.id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                this.setState({ adoptionData: data })
                console.log(data)
            })

    }

    deleteAdoption(adoption_id) {
        fetch(api + "/deleteAdoption", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                'x-access-token': this.state.token,
            },
            body: JSON.stringify({
                adoption_id: adoption_id
            })
        }).catch((error) => {
            console.error('Error:', error);
          });
    }


    render() {
        var data = this.state.adoptionData;
        return (
            <div style={{ padding: "5%" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <img alt="img" style={{ backgroundColor: "##aeefec", width: 100, height: 100 }} src={imguri + data.profile} />
                    <h3>{data.owner}</h3>
                </div>

                <div style={{ margin: "3%" }}>
                    <img alt="img" style={{ backgroundColor: "##aeefec", width: "90%", height: 350 }} src={imguri + data.img} />
                    <h3>{data.title}</h3>
                </div>

                <div>
                    <h3>Age {data.age}</h3>
                    <h3>Gender {data.gender}</h3>
                    <h3>city {data.city}</h3>
                </div>

                <div>
                    <h3>{data.content}</h3>
                    <Button type="primary" danger onClick={()=>{this.deleteAdoption(data.adoption_id)}}>Delete</Button>

                </div>
            </div>
        );
    }

}

export default withRouter(ViewAdoption);

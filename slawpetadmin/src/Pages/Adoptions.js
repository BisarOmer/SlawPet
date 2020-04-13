import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import { Input } from 'antd';
import imguri from '../Components/imgURI';
import api from '../Components/api';
const { Search } = Input;


export default class Adoptions extends Component {

  constructor(props) {
    super(props);
    this.state = {
      AllAdoption:[],
    }
  }

  componentDidMount() {
    this.fetchAdoptions()
  }


  fetchAdoptions() {
    fetch(api + "/adoption", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({ AllAdoption: data })
      })

  }

  render() {
    var token = localStorage.getItem("token");

    if(token){
    return (
      <div style={{ padding: "5%" }}>
        <Search style={{ width: 300 }} placeholder="Search" onSearch={value => console.log(value)} enterButton />

        <div style={{ display: "flex", flexWrap: "wrap" }}>

          {this.state.AllAdoption.map(odd => {
            return (
              <div style={{
                display: "flex", flexDirection: "column", flexWrap: 'warp', justifyContent: "space-around",
                boxShadow: "0px 5px 10px rgba(0,0,0,0.16)", width: 300, height: 150, padding: "3%", marginTop: "5%",margin:"1%"
              }}>

                <div style={{ display: "flex", flexDirection: "column", flexWrap: 'warp', alignItems: "center" }}>
                  <img alt="img" style={{ width: 75, height: 75, borderRadius: 50, backgroundColor: "#aeefec" }} 
                        src={imguri+odd.img}
                        onClick={()=>{this.props.history.push('/ViewAdoptions/'+odd.adoption_id)}}
                  />
                  <h1>{odd.title}</h1>
                </div>

              </div>
            );

          })}
        </div>

      </div>
    );
        }
        else{
          return <Redirect to="/login"/>
        }
  }
}

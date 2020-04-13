import React, { Component } from "react";
import { Button, Input } from "antd";
import api from "../Components/api";
import imguri from '../Components/imgURI';
import { Redirect } from 'react-router-dom';


const { Search } = Input;

export default class Organizations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Orgs: [],
      token: "",
    };
  }

  componentDidMount() {
    this.fetchOrgs()
    let toke = localStorage.getItem("token");
    this.setState({ token: toke })
  }

  fetchOrgs() {
    fetch(api + "/organization", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({ Orgs: data })
      })

  }

  disableAccount(account_id) {

    fetch(api + "/disableAccount", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'x-access-token': this.state.token,
      },
      body: JSON.stringify({
        account_id: account_id
      })
    })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  enableAccount(account_id) {

    fetch(api + "/enableAccount", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'x-access-token': this.state.token,
      },
      body: JSON.stringify({
        account_id: account_id
      })
    })
      .catch((error) => {
        console.error('Error:', error);
      });
  }


  render() {

    const data = this.state.Orgs;

    if(this.state.token!==undefined){
      return (
        <div style={{ padding: "5%" }}>
  
          <Search
            style={{ width: 300 }}
            placeholder="Search"
            onSearch={(value) => console.log(value)}
            enterButton
          />
  
          <div style={{ display: "flex", flexWrap: "wrap", }}>
  
            {data.map(odd => {
              return (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    flexWrap: "warp",
                    justifyContent: "space-around",
                    boxShadow: "0px 5px 10px rgba(0,0,0,0.16)",
                    width: 300,
                    height: 150,
                    padding: "3%",
                    marginTop: "5%",
                    margin: "1%",
                    backgroundColor: "#",
                  }}
                >
                  <div
                    style={{ display: "flex", flexWrap: "warp", alignItems: "center" }}
                  >
                    <img
                      alt="img"
                      style={{
                        width: 75,
                        height: 75,
                        borderRadius: 50,
                        backgroundColor: "#aeefec",
                      }}
                      src={imguri + odd.profile}
                    />
                    <h1 style={{ paddingLeft: "10%" }}>{odd.name}</h1>
                  </div>
  
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "warp",
                      marginTop: "10%",
                      alignItems: "center",
                    }}
                  >
                    {
                    odd.disable
                      ?
                      <Button  onClick={() => { this.enableAccount(odd.account_id) }}>
                        Enable
                       </Button>
                      :
                      <Button type="primary" danger onClick={() => { this.disableAccount(odd.account_id) }}>
                        Disable
                    </Button>
                    }
  
                    <h5 style={{ paddingLeft: "10%" }}>Adopted</h5>
                  </div>
                </div>
              );
            })
            }
          </div>
  
  
        </div>
      );
    }

    else{
      return <Redirect to="/login" />
    }
  }
}

import React from "react";
import "antd/dist/antd.css";

import { Route, Switch } from "react-router-dom";
import { Layout } from "antd";

import ViewAdoption from "./Pages/ViewAdoption";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import User from "./Pages/User";
import Adoptions from "./Pages/Adoptions";
import Organizations from "./Pages/Organizations";
import Nav from "./Components/Nav";





const { Sider, Content } = Layout;

function App() {

  const token = localStorage.getItem("token");

  return (
    <React.Fragment>
      <Layout>
        <Sider style={{ backgroundColor: "#fff" }}>
          {token ? <Nav /> : null}
        </Sider>
        <Layout>
          <Content style={{ paddingLeft: "5%", backgroundColor: "#fff" }}>
            <main>
              <Switch>
                <Route exact path="/" component={Dashboard} />
                <Route path="/user" component={User} />
                <Route path="/organizations" component={Organizations} />
                <Route path="/adoptions" component={Adoptions} />
                <Route path="/ViewAdoptions/:id" component={ViewAdoption} />
                <Route path="/login" component={Login} />
              </Switch>
            </main>
          </Content>
        </Layout>
      </Layout>
    </React.Fragment>
  );
}

export default App;

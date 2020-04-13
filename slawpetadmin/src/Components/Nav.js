import React, { Component } from "react";

import { Menu } from "antd";
import { PieChartOutlined, LoginOutlined, UserOutlined, IdcardOutlined, MedicineBoxOutlined } from "@ant-design/icons";

import { Link,withRouter} from "react-router-dom";



 class Nav extends Component {


  render() {
    return (
        <Menu
          onClick={this.handleClick}
          style={{ width: 256 }}
          defaultSelectedKeys={["1"]}
          mode="inline"
        >
          <Menu.Item key="1">
            <PieChartOutlined />
            <Link to="/">Dashboard </Link>
          </Menu.Item>

          <Menu.Item key="2">
            <IdcardOutlined />
            <Link to="/organizations">Organizations </Link>
          </Menu.Item>

          <Menu.Item key="3">
            <UserOutlined />
            <Link to="/user">User</Link>
          </Menu.Item>

          <Menu.Item key="4">
            <MedicineBoxOutlined />
            <Link to="/adoptions">Adoptions</Link>
          </Menu.Item>

          <Menu.Item key="5"
            onClick={() => {
              localStorage.removeItem("token");
              this.props.history.push('/login');
            }}>
            <LoginOutlined />
            <span >Logout</span>
          </Menu.Item>
        </Menu>

    );
  }
}

export default withRouter(Nav);
import React, { Component } from 'react';


import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import api from '../Components/api';
import { withRouter, Redirect } from 'react-router-dom';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      token: "",
    }
  }

  onFinish = values => {


    fetch(api + "/signinAdmin",
      {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: values.username,
          password: values.password
        })
      })
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("token", data.token);
        this.props.history.push('/');

      })
      .catch((error) => {
        console.error('Error:', error);
      });

  };

  componentDidMount() {
    this.setState({ token: localStorage.getItem("token") })
  }

  render() {

    if (!this.state.token) {
      return (
        <div style={{ width: 500, height: 300, margin: "auto", marginTop: "10%", backgroundColor: "#f1f3f4", padding: "3%" }}>
          <Form
            name="normal_login"
            className="login-form"
            onFinish={this.onFinish}
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input your Username!',
                },
              ]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your Password!',
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
          </Button>
            </Form.Item>
          </Form>
        </div>
      );
    }

    else {
      return <Redirect to="/" />
    }
  }

}

export default withRouter(Login);

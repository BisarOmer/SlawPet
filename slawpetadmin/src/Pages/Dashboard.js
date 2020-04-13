import React, { Component } from 'react';

import { Statistic, Row, Col } from 'antd';
import { UsergroupAddOutlined, BarChartOutlined } from '@ant-design/icons'
import { Redirect } from 'react-router-dom';


export default class Dashboard extends Component {


  render() {

    var token = localStorage.getItem("token");
    
    if (token) {
      return (
        <>
          <Row gutter={10} style={{ margin: "5%", boxShadow: "0px 5px 10px rgba(0,0,0,0.16)", padding: "5%", }}>
            <Col span={12}>
              <Statistic title="Organizations" value={1128} prefix={<UsergroupAddOutlined />} />
            </Col>
            <Col span={12}>
              <Statistic title="Adopted" value={93} suffix="/ 100" />
            </Col>
          </Row>

          <Row gutter={10} style={{ margin: "5%", boxShadow: "0px 5px 10px rgba(0,0,0,0.16)", padding: "5%", }}>
            <Col span={12}>
              <Statistic title="Hawler" value={1128} prefix={<BarChartOutlined />} />
            </Col>
            <Col span={12}>
              <Statistic title="Duhok" value={1128} prefix={<BarChartOutlined />} />
            </Col>
            <Col span={12}>
              <Statistic title="Slemani" value={1128} prefix={<BarChartOutlined />} />
            </Col>
            <Col span={12}>
              <Statistic title="Kirkuk" value={1128} prefix={<BarChartOutlined />} />
            </Col>
          </Row>
        </>
      );
    }
    else {
      return <Redirect to="/login" />
    }

  }

}

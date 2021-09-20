import React from "react";
import { Layout, Menu } from "antd";

const { Header } = Layout;

export default () => (
        <Header>
            <div className="logo" />
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
                <Menu.Item key="1" style={{ background: "#7c73e6"}}>Contact list</Menu.Item>
            </Menu>
        </Header>
);
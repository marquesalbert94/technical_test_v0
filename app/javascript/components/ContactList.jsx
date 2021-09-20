import { Layout } from "antd";
import React from "react";
import Contacts from "./Contacts";
import Header from "./Header";

const { Content } = Layout;

export default () => (
    <Layout className="layout">
        <Header />
        <Content style={{ padding: "0 50px" }}>
            <div className="site-layout-content" style={{ margin: "100px auto" }}>
                <Contacts/>
            </div>
        </Content>
    </Layout>
);

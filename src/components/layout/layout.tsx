import React from 'react';
import {Layout as LayoutAntd, theme} from 'antd';
import Footer from "./footer";
import {Outlet} from 'react-router-dom';
import Header from "./header";

const { Content, Sider } = LayoutAntd;

const Layout: React.FC = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <LayoutAntd>
            <Header/>
            <Content style={{ padding: '0 50px', minHeight: "40px" }}>
                <div style={{ padding: 24, minHeight: 380, background: colorBgContainer, marginTop: 15 }}>
                    <Outlet />
                </div>
            </Content>
            <Footer/>
        </LayoutAntd>
    );
};

export default Layout;
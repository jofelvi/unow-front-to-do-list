import React from 'react';
import {Link} from "react-router-dom";
import {Layout as LayoutAntd} from "antd";
const { Header : HeaderAntd, Content, Sider } = LayoutAntd;

const Header = () => {

    return (
        <div>
            <HeaderAntd
                style={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 1,
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    background: "#40E0D0"
                }}
            >
                <div className="demo-logo" />
                <div style={{ display: "flex", justifyContent: "center", color: "white", }}>
                    <h2>To do App</h2>
                </div>
            </HeaderAntd>
        </div>
    )
}
export default Header;
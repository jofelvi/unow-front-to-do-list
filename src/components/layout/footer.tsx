import React from 'react';
import { Layout as LayoutAntd } from 'antd';

const { Footer: FooterAntd } = LayoutAntd;

const Footer: React.FC = () => {
    return (
            <FooterAntd style={{ textAlign: 'center' }}>Mi impresionante app TO-DO-LIST</FooterAntd>
    );
};

export default Footer;
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    ShoppingOutlined
} from '@ant-design/icons';
import {Button, Layout, Menu, theme} from 'antd';
import React, {useEffect, useState} from 'react';
import style from './Home.module.scss'
import {ProductTable} from "../../components";
import {useNavigate} from "react-router-dom";

const {Header, Sider, Content} = Layout;
const Home = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: {colorBgContainer},
    } = theme.useToken();
    const navigate=useNavigate()
const logout=()=>{
    localStorage.removeItem('jwt')
    localStorage.removeItem('sub')
    navigate('/login')

}

    return (
        <div className={style.home}>
            <Layout  style={{
                minHeight: '100vh',
            }}>
                <Sider trigger={null} collapsed={collapsed} width={250}>
                  <Button onClick={logout} type={'link'} danger size={'large'} style={{width:'100%'}}>
                      Log out
                  </Button>
                    <Menu

                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        items={[
                            {
                                key: '1',
                                icon: <ShoppingOutlined/>,
                                label: 'Product',
                            },

                        ]}
                    />
                </Sider>
                <Layout className="site-layout">
                    <Header
                        style={{
                            padding: '0 10px',
                            background: colorBgContainer,
                        }}
                    >
                        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: `${style.trigger}`,
                            onClick: () => setCollapsed(!collapsed),
                        })}
                    </Header>
                    <Content
                        style={{
                            padding: 24,
                            minHeight: 280,
                        }}
                    >
                        <ProductTable/>


                    </Content>
                </Layout>
            </Layout>
        </div>
    );
};

export default Home;
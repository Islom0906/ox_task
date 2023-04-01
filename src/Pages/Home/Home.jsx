import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import {Layout, Menu, theme} from 'antd';
import React, {useEffect, useState} from 'react';
import style from './Home.module.scss'
import ProductService from "../../service/product";

const {Header, Sider, Content} = Layout;
const Home = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: {colorBgContainer},
    } = theme.useToken();

    const getProduct = async () => {
        try {
            const {data} = await ProductService.getProduct()
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getProduct()
    }, [])

    return (
        <div className={style.home}>
            <Layout style={{height: '100vh'}}>
                <Sider trigger={null} collapsed={collapsed} width={250}>
                    <div className={style.logo}/>
                    <Menu

                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        items={[
                            {
                                key: '1',
                                icon: <UserOutlined/>,
                                label: 'nav 1',
                            },
                            {
                                key: '2',
                                icon: <VideoCameraOutlined/>,
                                label: 'nav 2',
                            },
                            {
                                key: '3',
                                icon: <UploadOutlined/>,
                                label: 'nav 3',
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
                        Content
                    </Content>
                </Layout>
            </Layout>
        </div>
    );
};

export default Home;
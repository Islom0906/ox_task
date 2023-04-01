import {Button, Checkbox, Form, Input, message} from "antd";
import style from './login.module.scss'
import AuthService from "../../service/auth";
import {useNavigate} from "react-router-dom";
import {useState} from "react";

const Login = () => {
    const [loader, setLoader] = useState(false)
    const navigate = useNavigate()
    const onFinish = async (values) => {
        localStorage.setItem('sub',values.subdomain)

        const formData = new FormData
        formData.append('_username', values.username)
        formData.append('_password', values.password)
        formData.append('_subdomain', values.subdomain)
        setLoader(true)
        try {
            const {data} = await AuthService.postLogin(formData, values.subdomain)
            localStorage.setItem('jwt', data.token)
            navigate('/')
            setLoader(false)
            message.success('You are logged in')
        } catch (error) {
            setLoader(false)

            console.log(error.response.data.message)
            message.error(error.response.data.message)
        }
        console.log('Success:', values);

    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    return (
        <div className={style.login}>

            <Form
                name="basic"
                labelCol={{
                    span: 24,
                }}
                wrapperCol={{
                    span: 24,
                }}
                style={{
                    maxWidth: 800,
                    width: 500,
                    padding: '0 20px'
                }}

                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Subdomain"
                    name="subdomain"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your subdomain!',
                        },
                    ]}
                >
                    <Input size={'large'}/>
                </Form.Item>
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input size={'large'}/>
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password size={'large'}/>
                </Form.Item>


                <Form.Item
                    wrapperCol={{
                        offset: 0,
                        span: 24,
                    }}

                >
                    <Button type="primary" htmlType="submit" size={'large'} style={{width: '100%'}} loading={loader} disabled={loader}>
                        Login
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Login;
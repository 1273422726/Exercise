import React from 'react'
import { Button, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import {Link} from 'react-router-dom'
import './css/Login.css'
import logoImage from '../assets/images/login.png'

export default function Login() {
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="login">
      <div className='login_box'>
        <img className='logoImg' src={logoImage} alt="" />
        <Form
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[
              {
                required: true,
                message: '请输入用户名！',
              },
            ]}
          >
            <Input
              size='large'
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="请输入用户名/手机号"
            />
          </Form.Item>

          <Form.Item
            label="密&nbsp;&nbsp;&nbsp;&nbsp;码"
            name="password"
            rules={[
              {
                required: true,
                message: '请输入密码！',
              },
            ]}
          >
            <Input.Password
              size='large'
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="请输入密码"
            />
          </Form.Item>

          <Form.Item>
            <Link to="/register"  >还没账号？立即注册</Link>
          </Form.Item>  
          <Form.Item>
            <Button size='large' type="primary" htmlType="submit" block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

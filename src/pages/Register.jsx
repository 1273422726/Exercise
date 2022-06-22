import React from 'react'
import { Button, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'
import './css/Login.css'
import logoImage from '../assets/images/login.png'
import {RegisterApi} from '../request/api'

export default function Register() {
  const onFinish = (values) => {
    console.log('Success:', values);
    RegisterApi({
      username: values.username,
      password: values.password
    }).then(res=>{
      console.log(res);
    })
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
          autoComplete="off"
        >
          <Form.Item
            label="用&nbsp;&nbsp;户&nbsp;&nbsp;名"
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
            label="密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码"
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

          <Form.Item
            name="confirm"
            label="确认密码"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: '请再次输入密码！',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('您输入的密码不一样，请重新输入！'));
                },
              }),
            ]}
          >
            <Input.Password
              size='large'
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="请再次输入密码"
            />
          </Form.Item>

          <Form.Item>
            <Link to="/login"  >已有账号？立即登录</Link>
          </Form.Item>
          <Form.Item>
            <Button size='large' type="primary" htmlType="submit" block>
              注册
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

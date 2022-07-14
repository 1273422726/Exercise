import React from 'react'
import { Button, Form, Input, message } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom'
import './css/Login.css'
import logoImage from '../assets/images/login.png'
import { RegisterApi } from '../request/api'    //接口引用

{/**  注册页面 */}

export default function Register() {
  const navigate = useNavigate();   //跳转
  const onFinish = (values) => {
    RegisterApi({     //接口调用传值
      username: values.username,
      password: values.password
    }).then(res => {    //接口状态返回
      if (res.errCode === 0) {    //注册成功提示
        message.success(res.message);
        setTimeout(() => {      //定时器
          navigate('/login')      //注册成功跳转登录页面
        }, 1500);
      }
      else {      //错误信息反馈提示
        message.error(res.message);
      }

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

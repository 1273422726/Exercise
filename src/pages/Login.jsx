import React from "react";
import { Button, Form, Input, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import "./css/Login.css";
import logoImage from "../assets/images/login.png";
import { LoginApi } from "../request/api";

{
  /**  登录页面 */
}

export default function Login() {
  const navigate = useNavigate(); //跳转
  const onFinish = (values) => {
    LoginApi({
      //接口调用传值
      username: values.username,
      password: values.password,
    }).then((res) => {
      //接口状态返回
      if (res.errCode === 0) {
        //登录成功提示
        message.success(res.message);
        //存储数据
        localStorage.setItem("avatar", res.data.avatar);
        localStorage.setItem("cms-token", res.data["cms-token"]);
        localStorage.setItem("editable", res.data.editable);
        localStorage.setItem("player", res.data.player);
        localStorage.setItem("username", res.data.username);

        setTimeout(() => {
          //定时器
          navigate("/list"); //登录成功跳转登录页面
        }, 1500);
      } else {
        //错误信息反馈提示
        message.error(res.message);
      }
    });
  };

  return (
    <div className="login">
      <div className="login_box">
        <img className="logoImg" src={logoImage} alt="" />
        <Form
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[
              {
                required: true,
                message: "请输入用户名！",
              },
            ]}
          >
            <Input
              size="large"
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
                message: "请输入密码！",
              },
            ]}
          >
            <Input.Password
              size="large"
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="请输入密码"
            />
          </Form.Item>

          <Form.Item>
            <Link to="/register">还没账号？立即注册</Link>
          </Form.Item>
          <Form.Item>
            <Button size="large" type="primary" htmlType="submit" block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

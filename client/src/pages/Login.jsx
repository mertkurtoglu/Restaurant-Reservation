import React from "react";
import { useNavigate } from "react-router-dom";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import axios from "axios";

const Login = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = (values) => {
    axios
      .post("http://localhost:8080/login", values, { withCredentials: true })
      .then((res) => {
        if (res.status === 200) {
          message.success("Login Successful");
          setTimeout(() => {
            navigate("/reservations");
          }, 1000);
        }
      })
      .catch((err) => {
        console.error("Login Failed:", err);
        form.resetFields();
        message.error("Login Failed");
      });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#f5f5f5",
      }}
    >
      <Form
        name="normal_login"
        className="login-form"
        form={form}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        style={{ padding: "30px", backgroundColor: "white" }}
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please input your Email!" }]}
          style={{ marginBottom: "20px" }}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
            style={{ fontSize: "18px", height: "50px" }}
          />
        </Form.Item>

        <Form.Item name="password" rules={[{ required: true, message: "Please input your Password!" }]}>
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
            style={{ fontSize: "18px", height: "50px" }}
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            style={{ fontSize: "18px", height: "50px", width: "100%" }}
          >
            Sign in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;

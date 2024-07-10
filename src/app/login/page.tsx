"use client";

import React, { useState } from "react";
import { Form, Input, Button, Card, Typography } from "antd";
import { useRouter } from "next/navigation";
import { loginUser } from "../actions/actions"; // Adjust the path if necessary

const { Title } = Typography;

const Login: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const response = await loginUser(values); // Call loginUser function from server actions

      if (response.access_token) {
        // Store token in localStorage or context as needed
        localStorage.setItem("access_token", response.access_token);
        router.push("/");
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card style={{ maxWidth: 400, margin: "auto", marginTop: 50 }}>
      <Title level={2} style={{ textAlign: "center" }}>
        Login
      </Title>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Login
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Login;

"use client";

import React, { useState } from "react";
import { Form, Input, Button, Card, Typography } from "antd";
import { useRouter } from "next/navigation";
import { registerUser } from "../actions/actions"; // Adjust the path if necessary

const { Title } = Typography;

const Signup: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: { username: string; password: string }) => {
    setLoading(true);
    try {
      // Call registerUser function from server actions
      const data = { ...values, role: "Admin" };
      const response = await registerUser(data);
      if (response) {
        router.push("/login");
      } else {
        console.error("Signup failed");
      }
    } catch (error) {
      console.error("An error occurred during signup:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card style={{ maxWidth: 400, margin: "auto", marginTop: 50 }}>
      <Title level={2} style={{ textAlign: "center" }}>
        Signup
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
            Signup
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Signup;

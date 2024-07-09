import { Form, Input, Button, Typography, Card } from "antd";

const { Title } = Typography;

interface SignupPageProps {
  onSignupSuccess: () => void;
}

export default function SignupPage({ onSignupSuccess }: SignupPageProps) {
  const onFinish = (values: any) => {
    // Perform signup logic here
    // If signup is successful, call the onSignupSuccess callback
    onSignupSuccess();
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card style={{ width: 400 }}>
        <Title level={2} style={{ textAlign: "center" }}>
          Signup
        </Title>
        <Form onFinish={onFinish}>
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Signup
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

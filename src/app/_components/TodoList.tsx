"use client";
import React, { useState } from "react";
import {
  List,
  Input,
  Button,
  Form,
  Typography,
  Space,
  Card,
  Row,
  Col,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { TodoItem, AddTodoFormProps, TodoItemComponentProps } from "../types";

const { Text, Title } = Typography;

const AddTodoForm: React.FC<AddTodoFormProps> = ({ onAdd }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = () => {
    if (inputValue.trim()) {
      onAdd(inputValue);
      setInputValue("");
    }
  };

  return (
    <Form layout="horizontal" onFinish={handleSubmit}>
      <Row gutter={16}>
        <Col flex={1}>
          <Form.Item style={{ marginBottom: "16px" }}>
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Add a new task"
              size="large"
            />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              icon={<PlusOutlined />}
              size="large"
            >
              Add
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

const TodoItemComponent: React.FC<TodoItemComponentProps> = ({
  item,
  onEdit,
  onDelete,
  onStartEdit,
  onCancelEdit,
}) => {
  const [editValue, setEditValue] = useState(item.text);

  return (
    <List.Item
      style={{
        backgroundColor: "white",
        marginBottom: "8px",
        padding: "12px",
        borderRadius: "4px",
      }}
      actions={[
        item.isEditing ? (
          <Space>
            <Button
              type="primary"
              icon={<CheckOutlined />}
              onClick={() => onEdit(item.id, editValue)}
              size="small"
            />
            <Button
              icon={<CloseOutlined />}
              onClick={() => onCancelEdit(item.id)}
              size="small"
            />
          </Space>
        ) : (
          <Space>
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => onStartEdit(item.id)}
            />
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
              onClick={() => onDelete(item.id)}
            />
          </Space>
        ),
      ]}
    >
      {item.isEditing ? (
        <Input
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onPressEnter={() => onEdit(item.id, editValue)}
        />
      ) : (
        <Text>{item.text}</Text>
      )}
    </List.Item>
  );
};

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);

  const addTodo = (text: string) => {
    setTodos([...todos, { id: Date.now(), text, isEditing: false }]);
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const startEditing = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: true } : todo
      )
    );
  };

  const saveEdit = (id: number, newText: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: newText, isEditing: false } : todo
      )
    );
  };

  const cancelEdit = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: false } : todo
      )
    );
  };

  return (
    <Card
      style={{
        maxWidth: "800px",
        margin: "40px auto",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      }}
    >
      <Title level={2} style={{ textAlign: "center", marginBottom: "24px" }}>
        Todo List
      </Title>
      <AddTodoForm onAdd={addTodo} />
      <List
        style={{
          backgroundColor: "#fafafa",
          padding: "16px",
          borderRadius: "8px",
        }}
        dataSource={todos}
        renderItem={(item) => (
          <TodoItemComponent
            key={item.id}
            item={item}
            onEdit={saveEdit}
            onDelete={deleteTodo}
            onStartEdit={startEditing}
            onCancelEdit={cancelEdit}
          />
        )}
      />
    </Card>
  );
};

export default TodoList;

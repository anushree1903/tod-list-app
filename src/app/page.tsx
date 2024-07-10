"use client";

import React, { useState, useEffect } from "react";
import { Table, Button, Form, Input, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  fetchTodos,
  createTodo,
  updateTodoById,
  deleteTodoById,
} from "./actions/actions";

interface Todo {
  id: number;
  title: string;
  description: string;
  status: string;
}

const HomePage = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchAllTodos();
  }, []);

  const fetchAllTodos = async () => {
    try {
      const data = await fetchTodos();
      setTodos(data);
    } catch (error) {
      console.error("Error fetching todos:", error);
      message.error("Failed to fetch todos");
    }
  };

  const handleCreateTodo = async (values: {
    title: string;
    description: string;
    status: string;
  }) => {
    try {
      const { title, description, status } = values;
      const newTodo: Omit<Todo, "id"> = { title, description, status };
      const data: Todo = await createTodo(newTodo);
      setTodos((prevTodos) => [...prevTodos, data]);
      form.resetFields();
      message.success("Todo created successfully");
    } catch (error) {
      console.error("Error creating todo:", error);
      message.error("Failed to create todo");
    }
  };

  const handleUpdateTodo = async (id: number, values: Partial<Todo>) => {
    try {
      const { title = "", description = "", status = "" } = values;
      const updatedTodo: Todo = { id, title, description, status };

      await updateTodoById(id, updatedTodo);

      const updatedTodos = todos.map((todo) =>
        todo.id === id ? { ...todo, ...updatedTodo } : todo
      );

      setTodos(updatedTodos);
      message.success("Todo updated successfully");
    } catch (error) {
      console.error("Error updating todo:", error);
      message.error("Failed to update todo");
    }
  };
  const handleDeleteTodo = async (id: number) => {
    try {
      await deleteTodoById(id);
      const updatedTodos = todos.filter((todo) => todo.id !== id);
      setTodos(updatedTodos);
      message.success("Todo deleted successfully");
    } catch (error) {
      console.error("Error deleting todo:", error);
      message.error("Failed to delete todo");
    }
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Todo) => (
        <>
          <Button
            icon={<EditOutlined />}
            onClick={() => {
              form.setFieldsValue(record);
              form.submit();
            }}
          />
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteTodo(record.id)}
          />
        </>
      ),
    },
  ];

  return (
    <div>
      <h1>Todo List</h1>
      <Form form={form} onFinish={handleCreateTodo}>
        <Form.Item
          name="title"
          rules={[{ required: true, message: "Please enter a title" }]}
        >
          <Input placeholder="Enter todo title" />
        </Form.Item>
        <Form.Item
          name="description"
          rules={[{ required: true, message: "Please enter a description" }]}
        >
          <Input placeholder="Enter todo description" />
        </Form.Item>
        <Form.Item
          name="status"
          rules={[{ required: true, message: "Please enter a status" }]}
        >
          <Input placeholder="Enter todo status" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Create Todo
          </Button>
        </Form.Item>
      </Form>
      <Table<Todo> columns={columns} dataSource={todos} rowKey="id" />
    </div>
  );
};

export default HomePage;

// serverActions.ts

import axios, { AxiosResponse } from 'axios';

const BASE_URL = 'https://todo-nestjs-nmdz.onrender.com';

interface Todo {
  id: number;
  title: string;
  description: string;
  status: string;
}

export interface User {
  id: number;
  username: string;
  password: string;
  role: string;
}

export interface LoginResponse {
  access_token: string;
}

export interface UserProfile {
  userId: number;
  username: string;
  role: string;
}

// Fetch all todos
export async function fetchTodos(): Promise<Todo[]> {
  try {
    const response: AxiosResponse<Todo[]> = await axios.get(`${BASE_URL}/todos`);
    return response.data;
  } catch (error) {
    console.error('Error fetching todos:', error);
    throw error;
  }
}

// Fetch a specific todo by ID
export async function fetchTodoById(id: number): Promise<Todo> {
  try {
    const response: AxiosResponse<Todo> = await axios.get(`${BASE_URL}/todos/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching todo with ID ${id}:`, error);
    throw error;
  }
}

// Update a specific todo
export async function updateTodoById(id: number, updatedTodo: Todo): Promise<Todo> {
  try {
    const response: AxiosResponse<Todo> = await axios.put(`${BASE_URL}/todos/${id}`, updatedTodo);
    return response.data;
  } catch (error) {
    console.error(`Error updating todo with ID ${id}:`, error);
    throw error;
  }
}

// Register a new user
export async function registerUser(user: Partial<User>): Promise<User> {
  try {
    const response: AxiosResponse<User> = await axios.post(`${BASE_URL}/auth/register`, user);
    return response.data;
  } catch (error: any) {
    console.log('Error registering user:', error.message);
    throw error;
  }
}

// Login a user
export async function loginUser(credentials: { username: string; password: string }): Promise<LoginResponse> {
  try {
    const response: AxiosResponse<LoginResponse> = await axios.post(`${BASE_URL}/auth/login`, credentials);
    return response.data;
  } catch (error) {
    console.error('Error logging in user:', error);
    throw error;
  }
}

// Get user profile
export async function getUserProfile(): Promise<UserProfile> {
  try {
    const response: AxiosResponse<UserProfile> = await axios.get(`${BASE_URL}/auth/profile`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
}

// Create a new todo
export async function createTodo(todo: Omit<Todo, 'id'>): Promise<Todo> {
  try {
    const response: AxiosResponse<Todo> = await axios.post(`${BASE_URL}/todos`, todo);
    return response.data;
  } catch (error) {
    console.error('Error creating todo:', error);
    throw error;
  }
}

// Delete a specific todo
export async function deleteTodoById(id: number): Promise<{ message: string }> {
  try {
    await axios.delete(`${BASE_URL}/todos/${id}`);
    return { message: 'Todo deleted successfully' };
  } catch (error) {
    console.error(`Error deleting todo with ID ${id}:`, error);
    throw error;
  }
}


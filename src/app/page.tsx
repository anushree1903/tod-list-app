// pages/index.tsx
"use client";
import { useState } from "react";
import SignupPage from "../app/_components/signup";
import LoginPage from "../app/_components/login";
import TodoList from "../app/_components/TodoList";

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const handleSignupSuccess = () => {
    setShowLogin(true);
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  return (
    <div>
      <main style={{ padding: "20px" }}>
        {!isAuthenticated ? (
          showLogin ? (
            <LoginPage onLoginSuccess={handleLoginSuccess} />
          ) : (
            <SignupPage onSignupSuccess={handleSignupSuccess} />
          )
        ) : (
          <TodoList />
        )}
      </main>
    </div>
  );
}

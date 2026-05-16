import React, { useState } from 'react';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  return isLogin ? (
    <LoginForm onSwitch={() => setIsLogin(false)} />
  ) : (
    <RegisterForm onSwitch={() => setIsLogin(true)} />
  );
};

export default AuthPage;
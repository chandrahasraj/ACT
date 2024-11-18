import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Roles } from '../models/Roles';
import { users } from '../dummyLoginData';
import { useAuth } from '../context/AuthContext';
import {
  StudentLoginContainer,
  StudentLoginForm,
  StudentLoginUsername,
  StudentLoginPassword,
  StudentLoginSubmit,
  StudentOverlay,
  StudentTitle,
} from './styles/StudentLoginStyles';

const StudentLogin: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const user = users.find(
      user =>
        user.username === username &&
        user.password === password &&
        user.role === Roles.Student
    );
    if (user) {
      login(user.username, Roles.Student);
      navigate('/dashboard');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <StudentLoginContainer>
      <StudentOverlay>
        <StudentTitle>Student Login</StudentTitle>
        <StudentLoginForm onSubmit={handleLogin}>
          <StudentLoginUsername
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUsername(e.target.value)
            }
            required
          />
          <StudentLoginPassword
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            required
          />
          <StudentLoginSubmit type="submit">Login</StudentLoginSubmit>
        </StudentLoginForm>
      </StudentOverlay>
    </StudentLoginContainer>
  );
};

export default StudentLogin;

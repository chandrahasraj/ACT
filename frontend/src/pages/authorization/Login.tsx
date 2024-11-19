import React, { useState, FormEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LoginBaseContainer,
  LoginContent,
  Title,
  LoginContainer,
  TeacherContainer,
  StudentContainer,
  FormInput,
  FormButton,
  ForgotPasswordLink,
  SignUpLink,
} from '../styles/LoginStyles';
import { FaChalkboardTeacher, FaUserGraduate } from 'react-icons/fa';
import Signup from './Signup';
import ForgotPassword from './ForgotPassword';

const Login: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showSignup, setShowSignup] = useState<boolean>(false);
  const [showForgotPassword, setShowForgotPassword] = useState<boolean>(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    const role =
      selectedRole === 'student' ? 'STANDARD_USER' : 'PRIVILEGED_USER';
    const apiUrl = `http://localhost:4000/login`;

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        alert('Invalid credentials');
        return;
      }

      const token = response.headers.get('authorization')?.split('Bearer')[1];
      if (token) {
        login(username, role, token);
        navigate('/dashboard');
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      // console.error('Login error:', error);
      alert('An error occurred during login.');
    }
  };

  if (showSignup) return <Signup setShowSignup={setShowSignup} />;
  if (showForgotPassword)
    return <ForgotPassword setShowForgotPassword={setShowForgotPassword} />;

  return (
    <LoginBaseContainer>
      <LoginContent>
        <LoginContainer>
          <Title>Login</Title>
          {!selectedRole && (
            <div className="role-selection">
              <TeacherContainer
                onClick={() => setSelectedRole('teacher')}
                isSelected={selectedRole === 'teacher'}>
                <FaChalkboardTeacher style={{ marginRight: '5px' }} />
                Teacher
              </TeacherContainer>
              <StudentContainer
                onClick={() => setSelectedRole('student')}
                isSelected={selectedRole === 'student'}>
                <FaUserGraduate style={{ marginRight: '5px' }} />
                Student
              </StudentContainer>
            </div>
          )}
          {selectedRole && (
            <form onSubmit={handleLogin}>
              <FormInput
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setUsername(e.target.value)
                }
                required
              />
              <FormInput
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
                required
              />
              <ForgotPasswordLink onClick={() => setShowForgotPassword(true)}>
                Forgot Password?
              </ForgotPasswordLink>
              <FormButton type="submit">Login</FormButton>
              <SignUpLink onClick={() => setShowSignup(true)}>
                Don't have an account? Sign Up
              </SignUpLink>
            </form>
          )}
        </LoginContainer>
      </LoginContent>
    </LoginBaseContainer>
  );
};

export default Login;

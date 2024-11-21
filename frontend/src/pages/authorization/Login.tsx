import React, { useState, FormEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LoginBaseContainer,
  LoginContent,
  LargeTitle,
  LoginContainer,
  FormInput,
  FormButton,
  ForgotPasswordLink,
  SignUpLink,
  ParentGridWithTwoColumns,
  LogoWrapper,
  MediumTitle,
  RoleButtonContainer,
  RoleButton,
  RoleGrid,
  RoleGridBottom,
  ExploreButton,
} from '../styles';
import { FaChalkboardTeacher, FaUserGraduate } from 'react-icons/fa';
import SignupFlow from './SignupFlow';
import ForgotPassword from './ForgotPassword';
import { Roles } from '../../models/Roles';
import AuthFlowImages from './AuthorizationFlowContent';
import logo from '../../assets/upshift_logo.png';

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

    const role = selectedRole === Roles.Student ? Roles.Student : Roles.Mentor;
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

  if (showSignup)
    return (
      <SignupFlow
        setShowSignup={setShowSignup}
        setSelectedRole={setSelectedRole}
      />
    );
  if (showForgotPassword)
    return <ForgotPassword setShowForgotPassword={setShowForgotPassword} />;

  return (
    <ParentGridWithTwoColumns>
      <LoginBaseContainer>
        <LogoWrapper>
          <img src={logo} alt="Logo" />
        </LogoWrapper>
        <LoginContent>
          <LoginContainer>
            <LargeTitle>Welcome to UpShift !</LargeTitle>
            <MediumTitle>Upshifting careers one course at a time</MediumTitle>
            {!selectedRole && (
              <RoleGrid>
                <RoleButtonContainer>
                  <RoleButton
                    isMentor={false}
                    onClick={() => setSelectedRole(Roles.Student)}>
                    <div>
                      Student
                      <br />
                      <span>Access the students' portal here.</span>
                    </div>
                    <FaUserGraduate />
                  </RoleButton>
                  <RoleButton
                    isMentor={true}
                    onClick={() => setSelectedRole(Roles.Mentor)}>
                    <div>
                      Mentor
                      <br />
                      <span>Exclusive to mentors or staff only.</span>
                    </div>
                    <FaChalkboardTeacher />
                  </RoleButton>
                </RoleButtonContainer>
                <RoleGridBottom>
                  <MediumTitle>Want to know more?</MediumTitle>
                  <ExploreButton>Explore More</ExploreButton>
                </RoleGridBottom>
              </RoleGrid>
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
      <AuthFlowImages />
    </ParentGridWithTwoColumns>
  );
};

export default Login;

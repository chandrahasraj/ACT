import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { users } from '../dummyLoginData';
import {
  LoginBaseContainer,
  BackgroundImage,
  LoginContent,
  Title,
  LoginContainer,
  TeacherContainer,
  StudentContainer,
  LoginFormWrapper,
  FormInput,
  FormButton,
  ImageSliderWrapper,
  Image,
  FormLabel,
  SliderButton,
  PasswordWrapper,
  EyeIcon,
  ForgotPasswordLink,
  SignUpLink,
  SuccessContainer,
} from './styles/LoginStyles';
import {
  FaChalkboardTeacher,
  FaUserGraduate,
  FaEye,
  FaEyeSlash,
} from 'react-icons/fa';

const Login: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordStep, setForgotPasswordStep] = useState(1);
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const [signupStep, setSignupStep] = useState(0);
  const [showSignup, setShowSignup] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [countdown, setCountdown] = useState(5);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [institution, setInstitution] = useState('');
  const [emailSignup, setEmailSignup] = useState('');
  const [dob, setDob] = useState('');

  const [usernameSignup, setUsernameSignup] = useState('');
  const [passwordSignup, setPasswordSignup] = useState('');
  const [confirmPasswordSignup, setConfirmPasswordSignup] = useState('');

  const [teamMembers, setTeamMembers] = useState([
    { fullName: '', emailId: '' },
  ]);

  const [mentorName, setMentorName] = useState('');
  const [mentorEmail, setMentorEmail] = useState('');

  const images = [
    'https://img.freepik.com/free-photo/abstract-luxury-gradient-blue-background-smooth-dark-blue-with-black-vignette-studio-banner_1258-56228.jpg?t=st=1725084993~exp=1725088593~hmac=eb2c1f07d3ae5a59449bda8560f02de5d90ad95e19964614922f2da7bb1e2100&w=740',
    'https://img.freepik.com/free-photo/abstract-luxury-gradient-blue-background-smooth-dark-blue-with-black-vignette-studio-banner_1258-63452.jpg?t=st=1725084934~exp=1725088534~hmac=17a1ab0daadd5e63a06b4227afcea6f6af23ea405f20cdda05d0a84680d7f3e4&w=996',
  ];

  const handleRoleSelection = (role: string) => {
    setSelectedRole(role);
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const role =
      selectedRole == 'student' ? 'STANDARD_USER' : 'PRIVILEGED_USER';
    // Construct API endpoint from environment variable
    const apiUrl = `http://localhost:4000/login`;

    // Call the backend API for login
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
        // role: role, // Send the selected role for validation (if needed)
      }),
    });
    console.log(response);

    if (!response.ok) {
      // Handle non-200 responses
      const errorData = await response.json();
      alert('Invalid credentials');
      console.error('Error:', errorData);
      throw new Error(errorData || 'Invalid credentials');
    }

    // Extract data from response
    const token = response.headers.get('authorization')?.split('Bearer')[1];
    if (token) {
      login(username, role, token);
      navigate('/dashboard');
    } else {
      alert('Invalid credentials');
    }
  };

  const nextImage = () => {
    setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      prevIndex => (prevIndex - 1 + images.length) % images.length
    );
  };

  useEffect(() => {
    if (showSuccess && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (showSuccess && countdown === 0) {
      window.location.reload();
    }
  }, [showSuccess, countdown, navigate]);

  useEffect(() => {
    const interval = setInterval(nextImage, 3000);
    return () => clearInterval(interval);
  }, []);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleForgotPassword = (e: FormEvent) => {
    e.preventDefault();
    if (forgotPasswordStep === 1) {
      setForgotPasswordStep(2);
    } else if (forgotPasswordStep === 2) {
      if (verificationCode === '1234') {
        setForgotPasswordStep(3);
      } else {
        alert('Invalid verification code');
      }
    } else if (forgotPasswordStep === 3) {
      if (newPassword === confirmPassword) {
        setForgotPasswordStep(4);
        setShowSuccess(true);
      } else {
        alert("Passwords don't match.");
      }
    }
  };

  const handleSignupNext = async (e: FormEvent) => {
    e.preventDefault();
    console.log(signupStep);
    if (signupStep < 3) {
      setSignupStep(prev => prev + 1);
    } else {
      try {
        console.log('Reached to call backend');
        const role =
          selectedRole == 'student' ? 'STANDARD_USER' : 'PRIVILEGED_USER';
        // Construct the API URL from environment variables
        const apiUrl = `http://localhost:4000/api/v1/user/signup`;
        // Call the backend API for signup
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstName,
            lastName,
            institution,
            email: emailSignup,
            dob,
            username: usernameSignup,
            password: passwordSignup,
            teamMembers,
            mentorName,
            mentorEmail,
            roles: [{ roleName: role }],
          }),
        });

        if (!response.ok) {
          throw new Error('Signup failed. Please try again.');
        }

        const data = await response.json();
        console.log('Signup successful:', data);

        // Show success message
        setShowSuccess(true);
      } catch (error: any) {
        console.error('Signup error:', error.message);
        alert(error.message);
      }
    }
  };

  const handleSignupBack = () => {
    setSignupStep(prev => prev - 1);
  };

  const addTeamMember = () => {
    if (teamMembers.length < 5) {
      setTeamMembers([...teamMembers, { fullName: '', emailId: '' }]);
    } else {
      alert('You can only add up to 5 team members.');
    }
  };

  const handleTeamMemberChange = (
    index: number,
    field: 'fullName' | 'emailId',
    value: string
  ) => {
    const updatedTeamMembers = [...teamMembers];
    updatedTeamMembers[index][field] = value;
    setTeamMembers(updatedTeamMembers);
  };

  return (
    <LoginBaseContainer>
      <LoginContent>
        {!showSignup && !showForgotPassword && !showSuccess && (
          <LoginContainer>
            <Title>Login</Title>
            {!selectedRole && (
              <div className="role-selection">
                <TeacherContainer
                  onClick={() => handleRoleSelection('teacher')}
                  isSelected={selectedRole === 'teacher'}>
                  <FaChalkboardTeacher style={{ marginRight: '5px' }} />
                  Teacher
                </TeacherContainer>
                <StudentContainer
                  onClick={() => handleRoleSelection('student')}
                  isSelected={selectedRole === 'student'}>
                  <FaUserGraduate style={{ marginRight: '5px' }} />
                  Student
                </StudentContainer>
              </div>
            )}
            {selectedRole && (
              <form onSubmit={handleLogin} className="login-form">
                <FormLabel>Username</FormLabel>
                <FormInput
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setUsername(e.target.value)
                  }
                  required
                />
                <PasswordWrapper>
                  <FormLabel>Password</FormLabel>
                  <FormInput
                    type={passwordVisible ? 'text' : 'password'}
                    placeholder="Password"
                    value={password}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setPassword(e.target.value)
                    }
                    required
                  />
                  <EyeIcon onClick={togglePasswordVisibility}>
                    {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                  </EyeIcon>
                </PasswordWrapper>
                <ForgotPasswordLink onClick={() => setShowForgotPassword(true)}>
                  Forgot Password?
                </ForgotPasswordLink>
                <FormButton type="submit">Login</FormButton>
              </form>
            )}
            {selectedRole && (
              <div className="footer-links">
                <SignUpLink onClick={() => setShowSignup(true)}>
                  Don't have an account? Sign Up
                </SignUpLink>
              </div>
            )}
          </LoginContainer>
        )}

        {showSignup && !showSuccess && (
          <LoginFormWrapper isVisible={showSignup}>
            {signupStep === 0 && (
              <>
                <h2>Sign Up - Step 1</h2>
                <form onSubmit={handleSignupNext}>
                  <FormLabel>First Name</FormLabel>
                  <FormInput
                    type="text"
                    value={firstName}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setFirstName(e.target.value)
                    }
                    required
                  />
                  <FormLabel>Last Name</FormLabel>
                  <FormInput
                    type="text"
                    value={lastName}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setLastName(e.target.value)
                    }
                    required
                  />
                  <FormLabel>Institution</FormLabel>
                  <FormInput
                    type="text"
                    value={institution}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setInstitution(e.target.value)
                    }
                    required
                  />
                  <FormLabel>Email</FormLabel>
                  <FormInput
                    type="email"
                    value={emailSignup}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setEmailSignup(e.target.value)
                    }
                    required
                  />
                  <FormLabel>Date of Birth</FormLabel>
                  <FormInput
                    type="date"
                    value={dob}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setDob(e.target.value)
                    }
                    required
                  />
                  <FormButton type="submit">Next</FormButton>
                </form>
              </>
            )}

            {signupStep === 1 && (
              <>
                <h2>Sign Up - Step 2</h2>
                <form onSubmit={handleSignupNext}>
                  <FormLabel>Username</FormLabel>
                  <FormInput
                    type="text"
                    value={usernameSignup}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setUsernameSignup(e.target.value)
                    }
                    required
                  />
                  <FormLabel>Password</FormLabel>
                  <FormInput
                    type="password"
                    value={passwordSignup}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setPasswordSignup(e.target.value)
                    }
                    required
                  />
                  <FormLabel>Confirm Password</FormLabel>
                  <FormInput
                    type="password"
                    value={confirmPasswordSignup}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setConfirmPasswordSignup(e.target.value)
                    }
                    required
                  />
                  <FormButton type="submit">Next</FormButton>
                  <FormButton type="button" onClick={handleSignupBack}>
                    Back
                  </FormButton>
                </form>
              </>
            )}

            {signupStep === 2 && (
              <>
                <h2>Sign Up - Step 3</h2>
                <form onSubmit={handleSignupNext}>
                  {teamMembers.map((member, index) => (
                    <div key={index}>
                      <FormLabel>Team Member {index + 1} - Full Name</FormLabel>
                      <FormInput
                        type="text"
                        value={member.fullName}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          handleTeamMemberChange(
                            index,
                            'fullName',
                            e.target.value
                          )
                        }
                      />
                      <FormLabel>Team Member {index + 1} - Email</FormLabel>
                      <FormInput
                        type="email"
                        value={member.emailId}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          handleTeamMemberChange(
                            index,
                            'emailId',
                            e.target.value
                          )
                        }
                      />
                    </div>
                  ))}
                  <FormButton type="button" onClick={addTeamMember}>
                    Add Team Member
                  </FormButton>
                  <FormButton type="submit">Next</FormButton>
                  <FormButton type="button" onClick={handleSignupBack}>
                    Back
                  </FormButton>
                </form>
              </>
            )}

            {signupStep === 3 && (
              <>
                <h2>Sign Up - Step 4</h2>
                <form onSubmit={handleSignupNext}>
                  <FormLabel>Mentor Name</FormLabel>
                  <FormInput
                    type="text"
                    value={mentorName}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setMentorName(e.target.value)
                    }
                    required
                  />
                  <FormLabel>Mentor Email</FormLabel>
                  <FormInput
                    type="email"
                    value={mentorEmail}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setMentorEmail(e.target.value)
                    }
                    required
                  />
                  <FormButton type="submit">Finish</FormButton>
                  <FormButton type="button" onClick={handleSignupBack}>
                    Back
                  </FormButton>
                </form>
              </>
            )}
          </LoginFormWrapper>
        )}

        {showForgotPassword && !showSuccess && (
          <LoginFormWrapper isVisible={showForgotPassword}>
            {forgotPasswordStep === 1 && (
              <>
                <h2>Forgot Password</h2>
                <form onSubmit={handleForgotPassword}>
                  <FormLabel>Email</FormLabel>
                  <FormInput
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setEmail(e.target.value)
                    }
                    required
                  />
                  <FormButton type="submit">Submit</FormButton>
                </form>
              </>
            )}
            {forgotPasswordStep === 2 && (
              <>
                <h2>Forgot Password - Step 2</h2>
                <form onSubmit={handleForgotPassword}>
                  <FormLabel>Verification Code</FormLabel>
                  <FormInput
                    type="text"
                    placeholder="Enter the code sent to your email"
                    value={verificationCode}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setVerificationCode(e.target.value)
                    }
                    required
                  />
                  <FormButton type="submit">Verify</FormButton>
                </form>
              </>
            )}
            {forgotPasswordStep === 3 && (
              <>
                <h2>Reset Password</h2>
                <form onSubmit={handleForgotPassword}>
                  <FormLabel>New Password</FormLabel>
                  <FormInput
                    type="password"
                    placeholder="Enter your new password"
                    value={newPassword}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setNewPassword(e.target.value)
                    }
                    required
                  />
                  <FormLabel>Confirm Password</FormLabel>
                  <FormInput
                    type="password"
                    placeholder="Confirm your new password"
                    value={confirmPassword}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setConfirmPassword(e.target.value)
                    }
                    required
                  />
                  <FormButton type="submit">Reset Password</FormButton>
                </form>
              </>
            )}
          </LoginFormWrapper>
        )}
        {showSuccess && (
          <SuccessContainer>
            <h2>Congratulations!</h2>
            <p>Your account setup/reset is complete.</p>
            <p>Redirecting to the login page in {countdown} seconds...</p>
            <p>
              Or click{' '}
              <a href="/" onClick={() => window.location.reload()}>
                here
              </a>{' '}
              to go now.
            </p>
          </SuccessContainer>
        )}
      </LoginContent>

      <ImageSliderWrapper>
        <BackgroundImage>
          <Image src={images[currentImageIndex]} />
        </BackgroundImage>
        <SliderButton onClick={prevImage}>◀</SliderButton>
        <SliderButton onClick={nextImage}>▶</SliderButton>
      </ImageSliderWrapper>
    </LoginBaseContainer>
  );
};

export default Login;

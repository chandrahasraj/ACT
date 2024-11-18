import styled from 'styled-components';

interface RoleOptionProps {
  isSelected: boolean;
}

interface LoginFormWrapperProps {
  isVisible: boolean;
}

export const LoginScreenWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
  background-color: #f5f5f5;
`;

export const RoleSelectionWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

export const RoleOption = styled.div<RoleOptionProps>`
  width: 220px;
  height: 60px;
  background-color: ${({ isSelected }) => (isSelected ? '#007bff' : '#333')};
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 8px;
  margin: 12px 0;
  transition: background-color 0.3s, transform 0.3s;
  border: ${({ isSelected }) => (isSelected ? '2px solid #0056b3' : '2px solid #007bff')};

  &:hover {
    background-color: #0056b3;
  }
`;

export const TeacherContainer = styled(RoleOption)``;
export const StudentContainer = styled(RoleOption)``;

export const LoginFormWrapper = styled.div<LoginFormWrapperProps>`
  display: ${({ isVisible }) => (isVisible ? 'flex' : 'none')};
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 400px;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

export const FormLabel = styled.label`
  color: #000;
  font-weight: bold;
  margin-bottom: 5px;
`;

export const FormInput = styled.input`
  width: 100%;
  padding: 15px;
  margin: 10px 0;
  border-radius: 5px;
  border: 1px solid #000;
  font-size: 16px;
  box-sizing: border-box;
`;

export const FormButton = styled.button`
  width: 100%;
  padding: 10px;
  margin-top: 20px;
  border-radius: 5px;
  border: 2px solid #000;
  background-color: #007bff;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  text-align: center;

  &:hover {
    background-color: #0056b3;
  }

  &:active {
    background-color: #003a75;
  }
`;

export const ForgotPasswordLink = styled.a`
  align-self: flex-end;
  color: #007bff;
  font-size: 14px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    text-decoration: underline;
  }
`;

export const SignUpLink = styled.a`
  display: block;
  text-align: center;
  color: #28a745;
  font-size: 18px;
  margin-top: 25px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export const PasswordWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const EyeIcon = styled.div`
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(0%);
  cursor: pointer;
  font-size: 20px;
  color: #000;

  &:hover {
    color: #007bff;
  }
`;

export const LoginBaseContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const ImageSliderWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const BackgroundImage = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.5s ease;
`;

export const Title = styled.h2`
  color: #000;
  margin-bottom: 20px;
  font-family: 'Arial', sans-serif;
  font-size: 24px;
`;

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const LoginContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
  padding: 40px;
  width: 100%;

  @media (max-width: 768px) {
    width: 100%;
    padding: 20px;
  }
`;

export const ForgotPasswordWrapper = styled.div`
  width: 100%;
  padding: 20px;
  text-align: center;
`;

export const ForgotPasswordTitle = styled.h3`
  color: #000;
  font-size: 20px;
  margin-bottom: 20px;
`;

export const ForgotPasswordInput = styled.input`
  width: 90%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #000;
  border-radius: 5px;
  font-size: 16px;
`;

// export const ContinueButton = styled(FormButton)`
//   max-width: 100%;
// `;

export const SliderButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  color: #fff;
  border: none;
  padding: 5px;
  cursor: pointer;
  font-size: 18px;
  border-radius: 50%;

  &:hover {
    color: #007bff;
  }

  &:first-of-type {
    left: 10px;
  }

  &:last-of-type {
    right: 10px;
  }
`;

export const CongratulationsPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  background-color: #e0ffe0;
  padding: 20px;
`;

export const CongratulationsMessage = styled.h2`
  font-size: 28px;
  color: #28a745;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
  font-family: 'Arial', sans-serif;
`;

export const CongratulationsDetails = styled.p`
  font-size: 18px;
  color: #333;
  margin-bottom: 40px;
  text-align: center;
  line-height: 1.5;
`;

export const ContinueButton = styled.button`
  padding: 12px 24px;
  font-size: 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  text-align: center;

  &:hover {
    background-color: #0056b3;
  }

  &:active {
    background-color: #003a75;
  }
`;

export const ConfettiWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
`;

export const SuccessContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20px;
  background: #f0f0f0;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  color: #333;

  h2 {
    font-size: 2rem;
    color: #007BFF;
  }

  p {
    margin-top: 10px;
    font-size: 1.2rem;
    color: #555;
  }

  a {
    color: #007BFF;
    text-decoration: underline;
    cursor: pointer;
  }

  button {
    margin-top: 20px;
    padding: 10px 20px;
    font-size: 1rem;
    color: #fff;
    background-color: #007BFF;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
`;

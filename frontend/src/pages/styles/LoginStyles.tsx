import styled from 'styled-components';

interface RoleOptionProps {
  isSelected: boolean;
}

interface LoginFormWrapperProps {
  isVisible: boolean;
}

export const AppContainer = styled.div`
  width: 100vw; /* Full viewport width */
  height: 100vh; /* Full viewport height */
  background-color: #f5f5f5; /* Light gray background for outer area */
  display: flex;
  align-items: center; /* Center AppWrapper vertically */
  justify-content: center; /* Center AppWrapper horizontally */
  overflow: hidden; /* Prevent scrollbars if content overflows */
`;

export const AppWrapper = styled.div`
  width: 100%;
  max-width: 1500px; /* Optional: Maximum width for smaller screens */
  margin: 0 auto; /* Center the wrapper horizontally */
  height: 100%; /* Full height to stretch to the screen */
  background-color: #ffffff; /* Focused white background */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); /* Optional shadow for focus */
  border-radius: 10px; /* Optional rounded corners */
  padding: 20px; /* Space inside the wrapper */
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (min-width: 1500px) {
    width: 75%; /* Restrict to 75% width only on screens larger than 1500px */
  }

  @media (max-width: 768px) {
    width: 90%; /* For smaller screens, make it 90% */
  }
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
  transition:
    background-color 0.3s,
    transform 0.3s;
  border: ${({ isSelected }) =>
    isSelected ? '2px solid #0056b3' : '2px solid #007bff'};

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
  justify-content: center;
  position: absolute; /* Ensures consistent positioning */
  top: 50%; /* Centers vertically */
  left: 50%; /* Centers horizontally */
  transform: translate(-50%, -50%); /* Centers the modal */
  width: 100%;
  max-width: 400px;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
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
  transform: translateY(-50%);
  cursor: pointer;
  font-size: 20px;
  color: #000;

  &:hover {
    color: #007bff;
  }
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
    color: #007bff;
  }

  p {
    margin-top: 10px;
    font-size: 1.2rem;
    color: #555;
  }

  a {
    color: #007bff;
    text-decoration: underline;
    cursor: pointer;
  }

  button {
    margin-top: 20px;
    padding: 10px 20px;
    font-size: 1rem;
    color: #fff;
    background-color: #007bff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
`;

export const ParentGridWithTwoColumns = styled.div`
  display: grid;
  grid-template-columns: 1fr 40%; /* Second column occupies 25% of the screen */
  height: 100vh; /* Full viewport height */
  width: 100%; /* Full viewport width */
`;

export const LoginBaseContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  grid-column: span 1; /* Occupies one column */
  height: 100%; /* Ensures it stretches to the full height of the column */
  width: 100%; /* Ensures it stretches to the full width of the column */
  padding: 20px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const LogoWrapper = styled.div`
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    max-width: 150px; /* Adjust logo size */
    height: auto;
    object-fit: contain;
  }
`;

export const RoleGrid = styled.div`
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  gap: 20px;
  width: 100%;
  max-width: 400px;
  margin-top: 20px;
`;

export const RoleButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px; /* Space between buttons */
  width: 100%;
  max-width: 400px;
`;

export const RoleButton = styled.div<{
  isMentor: boolean;
}>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  background-color: ${({ isMentor }) => (isMentor ? '#003A75' : '#F5F5F5')};
  color: ${({ isMentor }) => (isMentor ? '#ffffff' : '#333')};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${({ isMentor }) => (isMentor ? '#0056b3' : '#e0e0e0')};
  }

  span {
    font-size: 0.85rem;
    font-weight: normal;
    color: ${({ isMentor }) => (isMentor ? '#d0d0d0' : '#666')};
  }

  svg {
    font-size: 1.2rem;
    color: ${({ isMentor }) => (isMentor ? '#ffffff' : '#333')};
  }
`;

export const RoleGridBottom = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  width: 100%;
  max-width: 400px;
`;
export const ExploreButton = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: bold;
  color: #ffffff;
  background-color: #003a75; /* Blue background */
  border: none;
  border-radius: 20px; /* Rounded corners */
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    transform 0.2s ease;

  &:hover {
    background-color: #0056b3; /* Lighter blue on hover */
    transform: scale(1.05); /* Slight scaling effect */
  }

  &:active {
    background-color: #002a5e; /* Darker blue on click */
    transform: scale(0.98); /* Slight shrink on click */
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 4px #0056b3; /* Focus outline */
  }
`;

export const LoginContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 40px;
  //background-color: #f0f0f0;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
`;

export const ContentTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: bold;
  color: #007bff;
  margin-bottom: 10px;
`;

export const ContentText = styled.p`
  font-size: 1rem;
  color: #f3f2f2;
  margin-bottom: 20px;
`;

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const LoginLinkWrapper = styled.div`
  margin-top: 15px;
  font-size: 0.9rem;
  color: #555;
  text-align: center;

  a {
    color: #007bff;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

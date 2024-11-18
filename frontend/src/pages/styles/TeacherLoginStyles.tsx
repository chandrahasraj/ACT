import styled from 'styled-components';

const backgroundImage =
  'https://img.freepik.com/free-vector/background-realistic-abstract-technology-particle_23-2148431735.jpg?t=st=1724734277~exp=1724737877~hmac=96b4239f082ab4760a81ac4cad813e439f91bdfb8aa9775238d5169bba40eb2e&w=740';

export const TeacherLoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
`;

export const TeacherOverlay = styled.div`
  background: rgba(0, 0, 0, 0.5);
  padding: 20px;
  border-radius: 10px;
  width: 300px;
  text-align: center;
`;

export const TeacherTitle = styled.h2`
  color: #fff;
  margin-bottom: 20px;
`;

export const TeacherLoginForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const TeacherLoginUsername = styled.input`
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const TeacherLoginPassword = styled.input`
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const ForgotPasswordLink = styled.a`
  margin-bottom: 15px;
  color: #007bff;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const TeacherLoginSubmit = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

export const SignUpText = styled.p`
  margin-top: 15px;
  color: #fff;

  a {
    color: #007bff;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

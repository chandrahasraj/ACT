import styled from 'styled-components';

const backgroundImage =
  'https://img.freepik.com/free-vector/background-realistic-abstract-technology-particle_23-2148431735.jpg?t=st=1724734277~exp=1724737877~hmac=96b4239f082ab4760a81ac4cad813e439f91bdfb8aa9775238d5169bba40eb2e&w=740';

export const StudentLoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
`;

export const StudentOverlay = styled.div`
  background: rgba(0, 0, 0, 0.5);
  padding: 20px;
  border-radius: 10px;
  width: 300px;
  text-align: center;
`;

export const StudentTitle = styled.h2`
  color: #fff;
  margin-bottom: 20px;
`;

export const StudentLoginForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const StudentLoginUsername = styled.input`
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const StudentLoginPassword = styled.input`
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const StudentLoginSubmit = styled.button`
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

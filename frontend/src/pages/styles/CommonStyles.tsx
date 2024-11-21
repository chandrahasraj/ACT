import styled from 'styled-components';

export const ParentGridForSignup = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr; /* Two columns: 2/3 for signup, 1/3 for images */
  height: 100vh; /* Full screen height */
  width: 100%; /* Full screen width */
  background-color: #f5f5f5;
`;

export const LargeTitle = styled.h2`
  color: #304da8;
  margin-bottom: 5px;
  font-family: 'Arial', sans-serif;
  font-size: 48px;
`;

export const MediumTitle = styled.h2`
  color: #304da8;
  margin-bottom: 20px;
  font-family: 'Arial', sans-serif;
  font-size: 36px;
`;

export const ErrorMessage = styled.p`
  font-size: 0.9rem;
  color: red;
  margin: 5px 0 0 5px; /* Add spacing to position message correctly */
`;

export const ValidationNote = styled.span`
  display: block;
  margin-top: 0; /* Remove top margin to align with FormInput */
  font-size: 80%; /* Reduce font size by 20% */
  color: #666;
  font-family: 'Arial', sans-serif;
  line-height: 1.4; /* Adjust line height for better readability */
`;

export const GlobalErrorWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: #ff4d4d;
  color: white;
  text-align: center;
  padding: 10px 0;
  font-size: 1rem;
  font-weight: bold;
  z-index: 1000;
  animation: fadeOut 3s forwards;

  @keyframes fadeOut {
    0% {
      opacity: 1;
    }
    90% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;

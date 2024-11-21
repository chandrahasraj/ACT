import styled from 'styled-components';

export const SignupContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start; /* Align content to the left */
  padding: 40px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 90%;

  h2 {
    font-size: 1.8rem;
    color: #003a75;
    margin-bottom: 20px;
  }

  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 15px; /* Add spacing between form elements */
  }

  p {
    margin-top: 20px;
    font-size: 0.9rem;
    color: #333;

    a {
      color: #007bff;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

export const SignupLogoWrapper = styled.div`
  margin-bottom: 20px;

  img {
    max-width: 120px; /* Smaller logo size */
    height: auto;
    object-fit: contain;
  }
`;

export const SignupFormWrapper = styled.div<{ isVisible: boolean }>`
  display: ${({ isVisible }) => (isVisible ? 'flex' : 'none')};
  flex-direction: column;
  align-items: stretch;
  width: 100%;
  max-width: 400px;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

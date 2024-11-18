import styled from 'styled-components';

export const FooterFooter = styled.footer`
  background-color: #f9f9f9;
  padding: 20px;
  text-align: center;
  color: #000;
  font-family: 'Arial', sans-serif;
  position: relative;
  overflow: hidden;
  border-radius: 20px 20px 0 0;
  box-shadow: 0 -4px 8px rgba(0, 0, 0, 0.1);

  &::before {
    content: '';
    position: absolute;
    top: -20px;
    left: 0;
    width: 100%;
    height: 20px;
    background: inherit;
    border-radius: 20px 20px 0 0;
    z-index: -1;
  }
`;

export const FooterNewsContainer = styled.div`
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 15px;
  max-height: 70px;
  overflow: hidden;
  position: relative;
  margin-bottom: 15px;
  text-align: left;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const FooterNewsHeading = styled.h3`
  margin: 0 0 10px;
  font-size: 18px;
  font-weight: bold;
  margin-left: 10px;
  color: #000;
  background-color: #f0f0f0;
  padding-right: 10px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
  border-bottom: 1px solid #ccc;
`;

export const FooterNewsContent = styled.div`
  position: relative;
  top: 30px;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  animation: scrollUp 12s linear infinite;

  @keyframes scrollUp {
    0% {
      transform: translateY(100%);
    }
    100% {
      transform: translateY(-100%);
    }
  }
`;

export const FooterNewsItem = styled.div`
  font-size: 14px;
  padding: 10px 0;
  color: #333;
  flex: 0 0 auto;
`;

export const FooterText = styled.p`
  margin: 0;
  color: #333;
  font-size: 14px;
  transition: color 0.3s ease;

  &:hover {
    color: #007bff;
  }
`;

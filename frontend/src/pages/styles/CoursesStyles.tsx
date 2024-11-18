import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  padding: 20px;
  gap: 20px;
  flex-direction: row;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const TopicsColumn = styled.div`
  flex: 1;
  border-right: 2px solid #ddd;
  padding-right: 20px;
  min-width: 300px;

  @media (max-width: 768px) {
    border-right: none;
    padding-right: 0;
    border-bottom: 2px solid #ddd;
  }
`;

export const ContentColumn = styled.div`
  flex: 2;
  padding-left: 20px;
  min-width: 300px;

  @media (max-width: 768px) {
    padding-left: 0;
  }
`;

export const TopicsList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

export const TopicItem = styled.div`
  cursor: pointer;
  padding: 10px;
  border-bottom: 1px solid #ddd;
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  border-radius: 5px;
  background-color: #ffffff;
`;

export const TickMark = styled.span`
  margin-right: 10px;
`;

export const TopicInput = styled.input`
  border: none;
  background: none;
  font-size: 16px;
  outline: none;
  flex: 1;
`;

export const MarkCompleteButton = styled.button`
  margin-left: 10px;
  padding: 5px 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export const VideoContainer = styled.div`
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f9f9f9;
`;

export const Iframe = styled.iframe`
  border-radius: 5px;
`;

export const CongratulationsContainer = styled.div`
  text-align: center;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 5px;
`;

export const CongratulationsImage = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 8px;
`;

export const Placeholder = styled.p`
  padding: 20px;
  text-align: center;
`;

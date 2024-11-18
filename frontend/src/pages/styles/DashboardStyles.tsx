import styled from 'styled-components';

export const DS_H1 = styled.h1`
  margin-bottom: 20px;
  font-size: 24px;

  @media (max-width: 768px) {
    font-size: 20px;
    text-align: center;
  }
`;

export const DashboardPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export const DashboardContainer = styled.div`
  flex: 1;
  padding: 20px;
  text-align: center;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

export const DashboardCardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 15px;
  }
`;

export const DashboardCard = styled.div`
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

export const CalendarContainer = styled.div`
  margin-top: 20px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: left;

  @media (max-width: 768px) {
    padding: 15px;
  }

  & > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;

    @media (max-width: 768px) {
      flex-direction: column;
      align-items: stretch;
    }
  }

  & > ul {
    list-style-type: none;
    padding: 0;

    & > li {
      padding: 5px 0;
      border-bottom: 1px solid #ddd;
    }
  }
`;

export const DashboardTeamProgressContainer = styled.div`
  margin-top: 40px;
  text-align: left;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

export const DashboardSectionHeader = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

export const DashboardIdeaStatus = styled.div`
  margin-left: 20px;
  font-size: 16px;
  color: #555;
  flex: 1;

  @media (max-width: 768px) {
    margin-left: 0;
    margin-top: 10px;
    text-align: center;
  }
`;

export const DashboardTeamProgressRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: center;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const DashboardDropdown = styled.select`
  padding: 10px;
  font-size: 16px;
  border-radius: 4px;
  border: 1px solid #ccc;
  width: 200px;

  @media (max-width: 768px) {
    width: 100%;
    font-size: 14px;
  }
`;

export const DashboardButtonDivContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-left: auto;
  gap: 10px;

  @media (max-width: 768px) {
    justify-content: center;
    margin-left: 0;
    margin-top: 10px;
  }
`;

export const DashboardTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const DashboardTh = styled.th`
  border-bottom: 2px solid #ddd;
  padding: 10px;
  text-align: left;
  background-color: #f1f1f1;

  @media (max-width: 768px) {
    padding: 8px;
  }
`;

export const DashboardTd = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;

  @media (max-width: 768px) {
    padding: 8px;
  }
`;

export const DashboardSwitchButton = styled.button<{ $isDisabled: boolean }>(
  props => {
    const normalButton = `
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    border-radius: 4px;
    background-color: #007bff;
    color: #fff;
    border: none;
    transition: background-color 0.3s ease;
`;
    const disabledButton = `
    padding: 10px 20px;
    font-size: 16px;
    border-radius: 4px;
    background-color: #ccc;
    color: #666;
    cursor: not-allowed;
    border: none;
    `;

    return props.$isDisabled ? disabledButton : normalButton;
  }
);

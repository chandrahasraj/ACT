import React, { useState, useRef } from 'react';
import Calendar, { CalendarProps } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const CalendarSection = styled.div`
  flex: 1;
  margin-right: 20px;
  max-width: 400px;
`;

const EventsSection = styled.div`
  flex: 1;
  max-width: 400px;
`;

const CalendarContainer = styled.div`
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const EventList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-top: 20px;

  & > li {
    padding: 10px;
    border: 1px solid #ddd;
    margin-bottom: 10px;
    border-radius: 4px;
    background-color: #fff;
  }
`;

const Heading = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

interface Events {
  [key: string]: string[];
}

const CalendarComponent: React.FC = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [events] = useState<Events>({
    '2024-10-31': ['Halloween Party'],
    '2024-11-01': ['Project Deadline', 'Team Meeting'],
  });

  const calendarRef = useRef<typeof Calendar>(null);

  const handleDateChange: CalendarProps['onChange'] = value => {
    if (value instanceof Date) {
      setDate(value);
    } else if (Array.isArray(value) && value[0] instanceof Date) {
      setDate(value[0]);
    }
  };

  const formattedDate = date.toLocaleDateString('en-CA');

  return (
    <Container>
      <CalendarSection>
        <Heading>Calendar</Heading>
        <CalendarContainer>
          <Calendar
            ref={calendarRef}
            value={date}
            onChange={handleDateChange}
          />
        </CalendarContainer>
      </CalendarSection>
      <EventsSection>
        <Heading>Events</Heading>
        <EventList>
          <h4>Events for {formattedDate}</h4>
          {events[formattedDate] ? (
            events[formattedDate].map((event, index) => (
              <li key={index}>{event}</li>
            ))
          ) : (
            <li>No events</li>
          )}
        </EventList>
      </EventsSection>
    </Container>
  );
};

export default CalendarComponent;

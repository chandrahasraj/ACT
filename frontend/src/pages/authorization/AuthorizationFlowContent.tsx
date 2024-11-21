import React, { CSSProperties, useEffect, useState } from 'react';
import { AuthFlowContainer, DotsWrapper } from '../styles';

const AuthFlowContent: React.FC = () => {
  const [currentContentIndex, setCurrentContentIndex] = useState<number>(0);
  const content: {
    titles: string[];
    descriptions: string[];
    style: {
      titles: CSSProperties;
      descriptions: CSSProperties;
    };
  }[] = [
    {
      titles: ['Welcome to UNICEF', 'Our Mission'],
      descriptions: [
        'The UNICEF India and Inqui-Lab Foundation aims to design and create platforms ' +
          'that transform schools into places of creativity and innovation.',
        'We aim to make observation, research, creativity, collaboration, human-centered design, ' +
          "and problem-solving a core part of students' education.",
      ],
      style: {
        titles: { color: '#ffffff', fontSize: '1.5rem', fontWeight: 'bold' },
        descriptions: {
          color: '#e3e0e0',
          fontSize: '1rem',
          textAlign: 'justify' as CSSProperties['textAlign'],
        },
      },
    },
    {
      titles: ['2.5+ Million', '2.3+ Million', '2500+'],
      descriptions: [
        'Students/Learners registered worldwide.',
        'Teachers/Mentors registered',
        'Ideas shared',
      ],
      style: {
        titles: { color: '#ffffff', fontSize: '1.8rem', fontWeight: 'bold' },
        descriptions: { color: '#e3e0e0', fontSize: '1.2rem' },
      },
    },
    {
      titles: ['You Can Mentor Anyone'],
      descriptions: ['Join and guide learners across various fields.'],
      style: {
        titles: { color: '#ffffff', fontSize: '1.5rem', fontWeight: 'bold' },
        descriptions: { color: '#e3e0e0', fontSize: '1rem' },
      },
    },
    {
      titles: ['You Can Learn Anything'],
      descriptions: ['Explore topics from science to art and beyond.'],
      style: {
        titles: { color: '#ffffff', fontSize: '1.5rem', fontWeight: 'bold' },
        descriptions: { color: '#e3e0e0', fontSize: '1rem' },
      },
    },
  ];

  // Function to handle automatic rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentContentIndex(prevIndex => (prevIndex + 1) % content.length);
    }, 5000); // Rotate every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [content.length]);

  // Function to handle dot click
  const handleDotClick = (index: number) => {
    setCurrentContentIndex(index);
  };

  return (
    <AuthFlowContainer>
      <div>
        {content[currentContentIndex].titles.map((title, index) => (
          <div
            key={index}
            style={{
              marginBottom: '20px', // Add gap between title/description pairs
            }}>
            <h2 style={content[currentContentIndex].style.titles}>{title}</h2>
            <p style={content[currentContentIndex].style.descriptions}>
              {content[currentContentIndex].descriptions[index]}
            </p>
          </div>
        ))}
      </div>
      <DotsWrapper>
        {content.map((_, index) => (
          <button
            key={index}
            className={index === currentContentIndex ? 'active' : ''}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </DotsWrapper>
    </AuthFlowContainer>
  );
};

export default AuthFlowContent;

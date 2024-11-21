import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CourseTopic from './CourseTopic';
import {
  Container,
  TopicsColumn,
  ContentColumn,
  TopicsList,
  VideoContainer,
  Iframe,
  CongratulationsContainer,
  CongratulationsImage,
  Placeholder,
} from './styles';

const Courses: React.FC = () => {
  const [topics, setTopics] = useState([
    {
      id: 1,
      name: 'Introduction to React',
      videoUrl: 'https://www.youtube.com/embed/Ke90Tje7VS0',
    },
    {
      id: 2,
      name: 'React State Management',
      videoUrl: 'https://www.youtube.com/embed/35lXWvCuM8o',
    },
    {
      id: 3,
      name: 'React Routing',
      videoUrl: 'https://www.youtube.com/embed/Law7wfdg_ls',
    },
    {
      id: 4,
      name: 'Congratulations!',
      photoUrl: 'https://www.example.com/congratulations.jpg',
    },
  ]);
  const [currentTopic, setCurrentTopic] = useState<number | null>(null);
  const [completedTopics, setCompletedTopics] = useState<number[]>([]);

  const moveTopic = (fromIndex: number, toIndex: number) => {
    const updatedTopics = [...topics];
    const [movedTopic] = updatedTopics.splice(fromIndex, 1);
    updatedTopics.splice(toIndex, 0, movedTopic);
    setTopics(updatedTopics);
  };

  const updateTopic = (index: number, field: string, value: string) => {
    const updatedTopics = [...topics];
    updatedTopics[index] = { ...updatedTopics[index], [field]: value };
    setTopics(updatedTopics);
  };

  const markComplete = (topicId: number) => {
    if (!completedTopics.includes(topicId)) {
      setCompletedTopics([...completedTopics, topicId]);
    }
  };

  const handleTopicClick = (topicId: number) => {
    setCurrentTopic(topicId);
  };

  const currentTopicDetails =
    currentTopic !== null
      ? topics.find(topic => topic.id === currentTopic)
      : undefined;

  return (
    <>
      <Header />
      <DndProvider backend={HTML5Backend}>
        <Container>
          <TopicsColumn>
            <h2>Course Topics</h2>
            <TopicsList>
              {topics.map((topic, index) => (
                <CourseTopic
                  key={topic.id}
                  topic={topic}
                  index={index}
                  moveTopic={moveTopic}
                  updateTopic={updateTopic}
                  markComplete={markComplete}
                  completedTopics={completedTopics}
                  onClick={() => handleTopicClick(topic.id)}
                />
              ))}
            </TopicsList>
          </TopicsColumn>
          <ContentColumn>
            {currentTopicDetails ? (
              currentTopicDetails.id === 4 ? (
                <CongratulationsContainer>
                  <CongratulationsImage
                    src={currentTopicDetails.photoUrl}
                    alt="Congratulations"
                  />
                  <h3>Congratulations!</h3>
                  <p>You have completed the course. Well done!</p>
                </CongratulationsContainer>
              ) : (
                <VideoContainer>
                  <h3>{currentTopicDetails.name}</h3>
                  <Iframe
                    width="100%"
                    height="400px"
                    src={currentTopicDetails.videoUrl}
                    title={currentTopicDetails.name}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                  <button
                    style={{
                      marginLeft: '10px',
                      padding: '5px 10px',
                      backgroundColor: '#007bff',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                    }}
                    onClick={() => markComplete(currentTopicDetails.id)}>
                    Mark as Complete
                  </button>
                </VideoContainer>
              )
            ) : (
              <Placeholder>
                Please select a topic to view the content.
              </Placeholder>
            )}
          </ContentColumn>
        </Container>
      </DndProvider>
      <Footer />
    </>
  );
};

export default Courses;

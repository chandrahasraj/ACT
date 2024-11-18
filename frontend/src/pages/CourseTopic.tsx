import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import {
  TopicItem,
  TickMark,
  TopicInput,
  MarkCompleteButton,
} from './styles/CoursesStyles';

interface Topic {
  id: number;
  name: string;
  videoUrl?: string;
  photoUrl?: string;
}

interface CourseTopicProps {
  topic: Topic;
  index: number;
  moveTopic: (fromIndex: number, toIndex: number) => void;
  updateTopic: (index: number, field: string, value: string) => void;
  markComplete: (topicId: number) => void;
  completedTopics: number[];
  onClick?: () => void; 
}

const CourseTopic: React.FC<CourseTopicProps> = ({
  topic,
  index,
  moveTopic,
  updateTopic,
  markComplete,
  completedTopics,
  onClick,
}) => {
  const [, ref] = useDrag({
    type: 'TOPIC',
    item: { index },
  });

  const [, drop] = useDrop({
    accept: 'TOPIC',
    hover: (item: { index: number }) => {
      if (item.index !== index) {
        moveTopic(item.index, index);
        item.index = index;
      }
    },
  });

  // Add type for node
  const handleRef = (node: HTMLDivElement | null) => {
    if (node) {
      ref(drop(node));
    }
  };

  // Add type for event
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateTopic(index, 'name', e.target.value);
  };

  return (
    <TopicItem ref={handleRef} onClick={onClick}>
      <TickMark style={{ color: completedTopics.includes(topic.id) ? 'green' : 'black' }}>
        ✔
      </TickMark>
      <TopicInput
        type="text"
        value={topic.name}
        onChange={handleChange}
      />
      {topic.id !== 4 && (
        <MarkCompleteButton
          onClick={() => markComplete(topic.id)}
        >
          Mark as Complete
        </MarkCompleteButton>
      )}
    </TopicItem>
  );
};

export default CourseTopic;

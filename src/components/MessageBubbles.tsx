import React from 'react';
import './MessageBubbles.scss';

interface MessageBubbleProps {
  text: string;
  index: number;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ text, index }) => {
  return (
    <div
      className="message-bubble"
      style={{
        ['--delay' as any]: `${index * 800}ms`,
      }}
    >
      {text}
    </div>
  );
};

interface MessageBubblesProps {
  messages?: string[];
}

export const emilyMessages = [
  'Hey Job! It’s Emily here, your new digital co-worker.',
  'Before I can start working in your team, I still have a lot to learn. My coaches have set up a study list with all the knowledge resources I need. Help me get started!',
  'Below this message you will find my mandatory study list. This list contains all I need before I can start learning. Press each task to onboard me.',
];

export const MessageBubbles: React.FC<MessageBubblesProps> = ({ messages = emilyMessages }) => {
  return (
    <div className="message-bubble-container">
      {messages?.map((msg, idx) => (
        <MessageBubble key={idx} text={msg} index={idx} />
      ))}
    </div>
  );
};

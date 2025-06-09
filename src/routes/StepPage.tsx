import React from 'react';
import { useParams } from 'react-router-dom';

const StepPage: React.FC = () => {
  const { step, task } = useParams<{ step?: string; task?: string }>();

  return (
    <div style={{ paddingTop: '200px', color: 'black' }}>
      <h2>Current Step: {step}</h2>
      {task && <h3>Current Task: {task}</h3>}
    </div>
  );
};

export default StepPage;

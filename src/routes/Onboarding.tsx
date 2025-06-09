import React from 'react';

import './Onboarding.scss';
import { StudyList } from '../components/StudyList';
import animatedChar from '/animated.webm';
import animatedCharFallback from '/animated.mp4';

import Avatar from '../components/Avatar';
import { MessageBubbles } from '../components/MessageBubbles';
import { OnboardingProgress } from '../components/OnboardingProgress';

const Onboarding: React.FC = () => {
  return (
    <div className="onboarding">
      <div className="onboarding__wrapper">
        <OnboardingProgress percentage={100} tasksLeft={2} />
        <Avatar webmSrc={animatedChar} fallbackSrc={animatedCharFallback} />
        <MessageBubbles />
        <StudyList />
      </div>
    </div>
  );
};

export default Onboarding;

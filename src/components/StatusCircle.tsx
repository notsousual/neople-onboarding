import React from 'react';
import './StatusCircle.scss';
import { MdCheck } from 'react-icons/md';
import { BsThreeDots } from 'react-icons/bs';

export enum Status {
  NotStarted = 'not-started',
  InProgress = 'in-progress',
  Done = 'done',
}

interface StatusCircleProps {
  status: Status;
  isActive?: boolean;
}
export const StatusCircle: React.FC<StatusCircleProps> = ({ status, isActive = false }) => {
  const getInnerClass = () => {
    const base = 'status-circle__inner';
    if (isActive) return `${base} status-circle--active`;
    switch (status) {
      case 'done':
        return `${base} status-circle--done`;
      case 'in-progress':
        return `${base} status-circle--in-progress`;
      case 'not-started':
      default:
        return `${base} status-circle--not-started`;
    }
  };

  const renderIcon = () => {
    if (isActive) return null;

    switch (status) {
      case Status.Done:
        return <MdCheck size={12} />;
      case Status.InProgress:
        return <BsThreeDots size={12} />;
      default:
        return null;
    }
  };
  return (
    <div className="status-circle">
      <div className={getInnerClass()}>{renderIcon()}</div>
    </div>
  );
};

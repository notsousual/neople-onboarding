import React from 'react';
import { Status, StatusCircle } from './StatusCircle';
import { useNavigate } from 'react-router-dom';
import './StudyList.scss';
import { StudyListButton } from './StudyListButton';

export type StudyItemType = {
  title: string;
  status: Status;
  isActive?: boolean;
};

const studyItems: StudyItemType[] = [
  { title: 'Tone of voice guidelines', status: Status.Done },
  { title: 'FAQ’s', status: Status.InProgress },
  { title: 'Example tickets', status: Status.InProgress },
  { title: 'Blog pages', status: Status.NotStarted },
  { title: 'Work instructions', status: Status.NotStarted },
];

const statusLabelMap: Record<Status, string> = {
  [Status.NotStarted]: 'Teach',
  [Status.InProgress]: 'Continue',
  [Status.Done]: 'Reteach',
};

export const StudyList: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="study-list" aria-labelledby="study-list-heading">
      <h2 id="study-list-heading" className="study-header">
        Study list
      </h2>

      <ul className="study-list__ul">
        {studyItems.map((item) => {
          const route = `/onboarding/${encodeURIComponent(item.title)}`;
          const label = statusLabelMap[item.status];

          return (
            <li key={item.title} className="study-item">
              <StatusCircle status={item.status} isActive={item.isActive} aria-hidden={true} />
              <div className="study-wrapper" aria-label={`${item.title} status: ${label}`}>
                <p className="study-title">{item.title}</p>
                <StudyListButton onClick={() => navigate(route)}>{label}</StudyListButton>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

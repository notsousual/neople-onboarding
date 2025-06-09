import React from 'react';
import { MdSchool } from 'react-icons/md';
import './StudyListButton.scss';

type StudyListButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

export const StudyListButton: React.FC<StudyListButtonProps> = ({
  children,
  type = 'button',
  role = 'button',
  'aria-label': ariaLabel = `Go to ${children} study module`,
  ...props
}) => (
  <button className="study-list-button" type={type} role={role} aria-label={ariaLabel} {...props}>
    <span className="study-list-button__label">{children}</span>
    <MdSchool size={16} />
  </button>
);

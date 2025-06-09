import React from 'react';
import { FiLogOut } from 'react-icons/fi';
import './LogOut.scss';

interface LogOutProps extends React.HTMLAttributes<HTMLButtonElement> {
  user: { name: string; initial: string };
}

const LogOut: React.FC<LogOutProps> = ({ user, className = '', ...props }) => {
  return (
    <button className={`logout-button ${className}`.trim()} {...props}>
      <span>Log out</span>
      <FiLogOut className="logout-button__icon" />
      <div className="logout-button__avatar">{user.initial}</div>
    </button>
  );
};

export default LogOut;

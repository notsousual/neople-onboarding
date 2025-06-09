import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StepTabs from './StepTabs';
import LogOut from './LogOut';
import './TopNav.scss';

import { ReactComponent as NeopleLogo } from '../assets/neople.svg';
import { mockMap, user } from '../constants';

import { FiMenu, FiX } from 'react-icons/fi'; // icon set

interface TopNavProps {
  currentUser: { name: string; initial: string };
  steps: Map<string, string>;
}

const TopNav: React.FC<TopNavProps> = ({ currentUser = user, steps = mockMap }) => {
  const navRef = useRef<HTMLDivElement | null>(null);
  const spacerRef = useRef<HTMLDivElement | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const updateSpacerHeight = () => {
      if (navRef.current && spacerRef.current) {
        spacerRef.current.style.height = `${navRef.current.offsetHeight}px`;
      }
    };

    updateSpacerHeight();

    const resizeObserver = new ResizeObserver(updateSpacerHeight);
    if (navRef.current) resizeObserver.observe(navRef.current);

    return () => resizeObserver.disconnect();
  }, []);

  const stepKeys = Array.from(steps.keys());

  const toggleMenu = () => setIsMobileMenuOpen((prev) => !prev);

  return (
    <>
      <header ref={navRef} className="top-nav">
        <NeopleLogo />
        <StepTabs steps={steps} className="top-nav__hide-mobile" />
        <LogOut user={currentUser} className="top-nav__hide-mobile" />
        <button
          className="top-nav__menu-button"
          onClick={toggleMenu}
          aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-navigation"
        >
          {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </header>

      {isMobileMenuOpen && (
        <nav id="mobile-navigation" className="top-nav__mobile-menu" aria-label="Mobile menu">
          <ul>
            {stepKeys.map((step) => (
              <li key={step}>
                <button
                  onClick={() => {
                    navigate(`/${step}`);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  {steps.get(step)}
                </button>
              </li>
            ))}
          </ul>
          <LogOut user={currentUser} />
        </nav>
      )}

      <div ref={spacerRef} className="top-nav-spacer" />
    </>
  );
};

export default TopNav;

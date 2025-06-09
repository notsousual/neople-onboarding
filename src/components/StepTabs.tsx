import React, { useRef, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './StepTabs.scss';

interface StepTabsProps extends React.HTMLAttributes<HTMLElement> {
  steps: Map<string, string>;
}

const StepTabs: React.FC<StepTabsProps> = ({ steps, ...props }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentStep = decodeURIComponent(location.pathname.split('/')[1] || '');
  const [blobStyle, setBlobStyle] = useState({ left: 0, width: 0 });
  const tabRefs = useRef<(HTMLLIElement | null)[]>([]);
  const stepKeys = Array.from(steps.keys());

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 935);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 935);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const index = stepKeys.findIndex((s) => s === currentStep);
    const tab = tabRefs.current[index];
    if (tab) {
      const rect = tab.getBoundingClientRect();
      const parentRect = tab.parentElement!.getBoundingClientRect();
      setBlobStyle({ left: rect.left - parentRect.left, width: rect.width });
    }
  }, [currentStep, steps, isMobile]);

  const handleClick = (step: string) => navigate(`/${step}`);
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => navigate(`/${e.target.value}`);

  return (
    <nav {...props}>
      {isMobile ? (
        <select className="step-tabs__dropdown" name={'learning steps navigation'} value={currentStep} onChange={handleSelectChange}>
          {stepKeys.map((step) => (
            <option key={step} value={step}>
              {steps.get(step)}
            </option>
          ))}
        </select>
      ) : (
        <ul className="step-tabs">
          <div className="step-tabs__blob" style={blobStyle}></div>
          {stepKeys.map((step, index) => (
            <li
              key={step}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              className={`step-tabs__tab ${step === currentStep ? 'active' : ''}`}
              onClick={() => handleClick(step)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleClick(step)}
            >
              {steps.get(step)}
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default StepTabs;

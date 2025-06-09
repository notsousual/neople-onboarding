import React from 'react';
import './OnboardingProgress.scss';
import { ReactComponent as ArrowRight } from '../assets/arrowRight.svg';

interface OnboardingProgressProps {
  percentage: number; // 0–100
  tasksLeft: number;
  name?: string;
}

export const gradientStops = [
  { stop: 0, color: '#EA3863' },
  { stop: 18, color: '#FF8437' },
  { stop: 41, color: '#FFE600' },
  { stop: 67, color: '#96D50D' },
  { stop: 87, color: '#00CC18' },
];

const getColorAtPercentage = (percentage: number): string => {
  if (percentage <= gradientStops[0].stop) return gradientStops[0].color;
  if (percentage >= gradientStops[gradientStops.length - 1].stop) return gradientStops[gradientStops.length - 1].color;

  for (let i = 0; i < gradientStops.length - 1; i++) {
    const start = gradientStops[i];
    const end = gradientStops[i + 1];
    if (percentage >= start.stop && percentage <= end.stop) {
      const ratio = (percentage - start.stop) / (end.stop - start.stop);
      const interpolate = (start: number, end: number) => Math.round(start + (end - start) * ratio);
      const startRGB = hexToRgb(start.color);
      const endRGB = hexToRgb(end.color);
      if (!startRGB || !endRGB) return start.color;
      return `rgb(${interpolate(startRGB.r, endRGB.r)}, ${interpolate(startRGB.g, endRGB.g)}, ${interpolate(startRGB.b, endRGB.b)})`;
    }
  }
  return gradientStops[0].color;
};

const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

export const isProgressionSectionDone = (currentIndex: number, totalIndices: number, percentage: number): boolean => {
  const threshold = ((currentIndex + 1) / totalIndices) * 100;
  return percentage >= threshold;
};

const sections = ['Rookie', 'Trainee', 'Competent'];
const indexToClassName = ['first', 'second', 'third'];

export const OnboardingProgress: React.FC<OnboardingProgressProps> = ({ percentage, tasksLeft, name = 'Emily' }) => {
  const currentColor = getColorAtPercentage(percentage);

  return (
    <section className="onboarding-progress" aria-labelledby="onboarding-progress-heading" role="region">
      <div className="onboarding-progress__header">
        <h2 id="onboarding-progress-heading">{name} – onboarding progress</h2>
        <div className="onboarding-progress__status-box" aria-live="polite">
          <p className="percent" aria-label={`Progress: ${percentage}%`}>
            {percentage}%
          </p>
          <p className="tasks" aria-label={`${tasksLeft} tasks remaining`}>
            ~ {tasksLeft} tasks to go
          </p>
          <div className="dot" style={{ backgroundColor: currentColor }} aria-hidden="true" />
        </div>
      </div>

      <div className="progress-track-wrapper" role="list" aria-label="Progress stages">
        {sections.map((label, index) => {
          const done = isProgressionSectionDone(index, sections.length, percentage);
          const stageClass = indexToClassName[index] || indexToClassName[0];
          const statusText = done ? 'completed' : 'not completed';

          return (
            <div
              key={index}
              role="listitem"
              className={`progress-track progress-track--${stageClass} ${done ? 'progress-track--done' : ''}`}
              aria-label={`Stage ${index + 1}: ${label}, ${statusText}`}
            >
              {index === sections.length - 1 && (
                <div
                  className="progress-fill"
                  style={{ width: `${Math.max((index + 1) * 100 - percentage * 3, 0)}%` }}
                  aria-hidden="true"
                />
              )}
              <p aria-hidden="true">
                {label} {done ? '✓' : ''}
              </p>
            </div>
          );
        })}

        <ArrowRight className="onboarding-progress__arrow" role="presentation" aria-hidden="true" />

        <button
          className="onboarding-progress__ready-state"
          disabled={percentage < 100}
          aria-disabled={percentage < 100}
          aria-label={percentage < 100 ? `Training not available, ${tasksLeft} tasks left` : 'Ready for training. All tasks completed'}
        >
          Ready for training 🎉
          <span className="onboarding-progress__ready-state--disabled" aria-hidden="true">
            ⛔️
          </span>
        </button>
      </div>
    </section>
  );
};

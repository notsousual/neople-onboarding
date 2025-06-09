import React from 'react';
import './Avatar.scss';

interface AvatarProps {
  webmSrc: string;
  fallbackSrc?: string;
}

const isSafariOnApple = () => {
  const ua = navigator.userAgent;
  const isSafari = /^((?!chrome|android).)*safari/i.test(ua) || !!navigator.vendor?.includes('Apple');
  const isiOS = /iPhone|iPad|iPod/.test(ua);
  const isMac = /Macintosh/.test(ua);

  return isSafari && (isiOS || isMac);
};

const Avatar: React.FC<AvatarProps> = ({ webmSrc, fallbackSrc }) => {
  const useFallback = fallbackSrc && isSafariOnApple();
  const finalSrc = useFallback ? fallbackSrc : webmSrc;

  return (
    <div className="avatar">
      <div className="video-avatar">
        <video className="video-avatar__video" src={finalSrc} autoPlay loop muted playsInline />
      </div>
      <p>Emily</p>
    </div>
  );
};

export default Avatar;

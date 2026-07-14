import { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { PlayArrow as PlayArrowIcon } from '@mui/icons-material';
import { SCREEN } from '../../const';
import landingVideo from '../../images/landing/landing.mov';

const COLORS = {
  blue: '#1B5BB5',
  blueDark: '#0A2D5E',
  white: '#FFFFFF',
};

const Widget = styled.div<{ $expanded: boolean; $hovered: boolean }>`
  position: fixed;
  left: 2.4rem;
  bottom: 2.4rem;
  z-index: 1500;
  transition:
    width 0.35s ease,
    height 0.35s ease,
    transform 0.35s ease,
    box-shadow 0.25s ease;

  @media (max-width: ${SCREEN.SMALL}px) {
    left: 1.6rem;
    bottom: 1.6rem;
  }

  ${({ $expanded, $hovered }) =>
    $expanded
      ? css`
          width: 31.5rem;
          height: 56rem;
          transform: none;
        `
      : css`
          width: 12.5rem;
          height: 22.2rem;
          transform: scale(${$hovered ? 1.06 : 1});
        `}
`;

const VideoShell = styled.div<{ $expanded: boolean }>`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: ${({ $expanded }) => ($expanded ? '1.6rem' : '1.2rem')};
  background: ${COLORS.blueDark};
  cursor: pointer;
  box-shadow: ${({ $expanded }) => ($expanded ? '0 2rem 5.6rem rgba(7, 30, 63, 0.42)' : '0 1.2rem 3.2rem rgba(7, 30, 63, 0.28)')};
`;

const VideoElement = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  pointer-events: none;
`;

const CloseIconMark = () => (
  <svg width="10" height="10" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path
      d="M2.5 2.5L11.5 11.5M11.5 2.5L2.5 11.5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const MinimizeIconMark = () => (
  <svg width="10" height="10" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M2.5 7H11.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const ControlButton = styled.button<{ $expanded: boolean }>`
  position: absolute;
  top: ${({ $expanded }) => ($expanded ? '-0.8rem' : '-0.6rem')};
  right: ${({ $expanded }) => ($expanded ? '-0.8rem' : '-0.6rem')};
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ $expanded }) => ($expanded ? '2.4rem' : '2rem')};
  height: ${({ $expanded }) => ($expanded ? '2.4rem' : '2rem')};
  border: none;
  border-radius: 50%;
  background: #151d32;
  color: ${COLORS.white};
  cursor: pointer;
  box-shadow: 0 0.6rem 1.6rem rgba(8, 14, 28, 0.34);
  transition:
    transform 0.2s ease,
    background 0.2s ease,
    opacity 0.2s ease;

  &:hover {
    transform: scale(1.1);
    background: #1f2940;
  }
`;

const PlayOverlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(7, 30, 63, 0.28);
  pointer-events: none;
`;

const PlayButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 7.2rem;
  height: 7.2rem;
  border-radius: 50%;
  background: ${COLORS.white};
  color: ${COLORS.blueDark};
  box-shadow: 0 1.2rem 3.2rem rgba(7, 30, 63, 0.28);

  svg {
    font-size: 4.8rem;
    margin-left: 0.4rem;
  }
`;

export const StickyVideo = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isVisible) return;

    video.muted = !isExpanded;
    video.playsInline = true;
    video.loop = true;

    if (!isPaused) {
      void video.play().catch(() => undefined);
    }
  }, [isExpanded, isPaused, isVisible]);

  if (!isVisible) return null;

  const handleVideoClick = () => {
    const video = videoRef.current;
    if (!video) return;

    if (!isExpanded) {
      setIsExpanded(true);
      setIsPaused(false);
      video.currentTime = 0;
      video.muted = false;
      void video.play().catch(() => undefined);
      return;
    }

    if (video.paused) {
      void video.play().catch(() => undefined);
      setIsPaused(false);
      return;
    }

    video.pause();
    setIsPaused(true);
  };

  const handleClose = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setIsVisible(false);
    setIsExpanded(false);
    setIsPaused(false);
  };

  const handleMinimize = (event?: { stopPropagation: () => void }) => {
    event?.stopPropagation();

    const video = videoRef.current;
    setIsExpanded(false);
    setIsPaused(false);

    if (video) {
      video.currentTime = 0;
      video.muted = true;
      void video.play().catch(() => undefined);
    }
  };

  const showCloseButton = isExpanded || isHovered;

  return (
    <Widget
      $expanded={isExpanded}
      $hovered={isHovered}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {showCloseButton && (
        <ControlButton
          type="button"
          $expanded={isExpanded}
          aria-label={isExpanded ? 'Свернуть видео' : 'Закрыть видео'}
          onClick={(event) => (isExpanded ? handleMinimize(event) : handleClose(event))}
        >
          {isExpanded ? <MinimizeIconMark /> : <CloseIconMark />}
        </ControlButton>
      )}

      <VideoShell $expanded={isExpanded} onClick={handleVideoClick}>
        <VideoElement ref={videoRef} src={landingVideo} autoPlay loop muted playsInline />

        {isExpanded && isPaused && (
          <PlayOverlay>
            <PlayButton>
              <PlayArrowIcon aria-hidden />
            </PlayButton>
          </PlayOverlay>
        )}
      </VideoShell>
    </Widget>
  );
};

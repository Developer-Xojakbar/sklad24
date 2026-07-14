import { useEffect, useRef, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import {
  Close as CloseIcon,
  PlayArrow as PlayArrowIcon,
  Remove as RemoveIcon,
} from '@mui/icons-material';
import { SCREEN } from '../../const';
import landingVideo from '../../images/landing/landing.mov';

const COLORS = {
  blue: '#1B5BB5',
  blueDark: '#0A2D5E',
  white: '#FFFFFF',
};

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1490;
  background: rgba(7, 30, 63, 0.62);
  animation: ${fadeIn} 0.25s ease;
`;

const Widget = styled.div<{ $expanded: boolean; $hovered: boolean }>`
  position: fixed;
  z-index: 1500;
  transition:
    width 0.35s ease,
    height 0.35s ease,
    transform 0.25s ease,
    left 0.35s ease,
    bottom 0.35s ease,
    box-shadow 0.25s ease;

  ${({ $expanded, $hovered }) =>
    $expanded
      ? css`
          left: 50%;
          bottom: 50%;
          transform: translate(-50%, 50%);
          width: min(42rem, calc(100vw - 3.2rem));
          height: min(74rem, calc(100vh - 4rem));
        `
      : css`
          left: 2.4rem;
          bottom: 2.4rem;
          width: 11.5rem;
          height: 20.5rem;
          transform: scale(${ $hovered ? 1.06 : 1 });
          box-shadow: 0 1.2rem 3.2rem rgba(7, 30, 63, 0.28);

          @media (max-width: ${SCREEN.SMALL}px) {
            left: 1.6rem;
            bottom: 1.6rem;
            width: 9.6rem;
            height: 17rem;
          }
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
  box-shadow: ${({ $expanded }) =>
    $expanded ? '0 2rem 5.6rem rgba(7, 30, 63, 0.42)' : 'none'};
`;

const VideoElement = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  pointer-events: none;
`;

const ControlButton = styled.button<{ $expanded: boolean }>`
  position: absolute;
  top: ${({ $expanded }) => ($expanded ? '1.2rem' : '-0.8rem')};
  right: ${({ $expanded }) => ($expanded ? '1.2rem' : '-0.8rem')};
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3.2rem;
  height: 3.2rem;
  border: none;
  border-radius: 50%;
  background: rgba(7, 30, 63, 0.88);
  color: ${COLORS.white};
  cursor: pointer;
  box-shadow: 0 0.4rem 1.2rem rgba(7, 30, 63, 0.35);
  transition:
    transform 0.2s ease,
    background 0.2s ease,
    opacity 0.2s ease;

  svg {
    font-size: ${({ $expanded }) => ($expanded ? '2.2rem' : '1.8rem')};
  }

  &:hover {
    transform: scale(1.06);
    background: ${COLORS.blue};
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
      video.muted = true;
      void video.play().catch(() => undefined);
    }
  };

  const showCloseButton = isExpanded || isHovered;

  return (
    <>
      {isExpanded && <Backdrop onClick={() => handleMinimize()} aria-hidden />}

      <Widget
        $expanded={isExpanded}
        $hovered={isHovered}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <VideoShell $expanded={isExpanded} onClick={handleVideoClick}>
          {showCloseButton && (
            <ControlButton
              type="button"
              $expanded={isExpanded}
              aria-label={isExpanded ? 'Свернуть видео' : 'Закрыть видео'}
              onClick={(event) => (isExpanded ? handleMinimize(event) : handleClose(event))}
            >
              {isExpanded ? <RemoveIcon aria-hidden /> : <CloseIcon aria-hidden />}
            </ControlButton>
          )}

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
    </>
  );
};

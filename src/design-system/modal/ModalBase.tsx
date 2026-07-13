import { useEffect, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.6rem;
  background: rgba(7, 30, 63, 0.72);
  backdrop-filter: blur(0.4rem);
`;

const Dialog = styled.div`
  position: relative;
  width: 100%;
  max-width: 56rem;
  max-height: calc(100vh - 3.2rem);
  overflow-y: auto;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1.2rem;
  right: 1.2rem;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3.6rem;
  height: 3.6rem;
  border: none;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.12);
  color: #ffffff;
  font-size: 2.4rem;
  line-height: 1;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

interface ModalBaseProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  ariaLabelledBy?: string;
}

export const ModalBase = ({ isOpen, onClose, children, ariaLabelledBy }: ModalBaseProps) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <Overlay
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <Dialog role="dialog" aria-modal="true" aria-labelledby={ariaLabelledBy}>
        <CloseButton type="button" aria-label="Закрыть" onClick={onClose}>
          ×
        </CloseButton>
        {children}
      </Dialog>
    </Overlay>,
    document.body,
  );
};

import { useSyncExternalStore } from 'react';
import styled from 'styled-components';
import { CheckCircleOutlined as CheckCircleOutlinedIcon } from '@mui/icons-material';
import { ModalBase } from './ModalBase';
import { createModalController } from './modal-controller';

const TEXT = {
  title: 'Заявка отправлена!',
  subtitle: 'Мы свяжемся с вами в ближайшее время',
  close: 'Отлично',
} as const;

export const sendSignUpSuccessModal = createModalController({});

const Card = styled.div`
  background: #0a2d5e;
  border-radius: 0.8rem;
  padding: 4rem 3.6rem 3.2rem;
  text-align: center;
  box-shadow: 0 1.6rem 4.8rem rgba(7, 30, 63, 0.35);

  @media (max-width: 768px) {
    padding: 3.2rem 2rem 2.4rem;
  }
`;

const IconWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 7.2rem;
  height: 7.2rem;
  margin: 0 auto 2rem;
  border-radius: 50%;
  background: rgba(255, 204, 0, 0.14);
  color: #ffcc00;

  svg {
    font-size: 4.8rem;
  }
`;

const Title = styled.h2`
  margin: 0 0 1.2rem;
  font-size: 2.4rem;
  font-weight: 800;
  line-height: 1.2;
  color: #ffffff;
`;

const Subtitle = styled.p`
  margin: 0 0 2.8rem;
  font-size: 1.5rem;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.88);
`;

const CloseButton = styled.button`
  min-width: 18rem;
  padding: 1.4rem 2.8rem;
  border: none;
  border-radius: 0.4rem;
  background: #ffcc00;
  font-family: inherit;
  font-size: 1.4rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: #0a2d5e;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

export const SendSignUpSuccessModal = () => {
  const modal = useSyncExternalStore(
    sendSignUpSuccessModal.subscribe,
    sendSignUpSuccessModal.snapshot,
    sendSignUpSuccessModal.snapshot,
  );

  return (
    <ModalBase
      isOpen={modal.isOpen}
      onClose={() => sendSignUpSuccessModal.close()}
      ariaLabelledBy="send-sign-up-success-modal-title"
    >
      <Card>
        <IconWrap>
          <CheckCircleOutlinedIcon aria-hidden />
        </IconWrap>
        <Title id="send-sign-up-success-modal-title">{TEXT.title}</Title>
        <Subtitle>{TEXT.subtitle}</Subtitle>
        <CloseButton type="button" onClick={() => sendSignUpSuccessModal.close()}>
          {TEXT.close}
        </CloseButton>
      </Card>
    </ModalBase>
  );
};

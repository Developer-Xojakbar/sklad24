import { FormEvent, useEffect, useState, useSyncExternalStore } from 'react';
import styled from 'styled-components';
import { Telegram as TelegramIcon } from '@mui/icons-material';
import { ModalBase } from './ModalBase';
import { createModalController } from './modal-controller';
import { sendSignUpSuccessModal } from './SendSignUpSuccessModal';

const TELEGRAM_LINK = 'https://t.me/Sklad24_uz';

const getTelegramUrl = (name: string, phone: string) => {
  const message = `Здравствуйте!

  📦 Хочу арендовать склад.
  
  👤 Имя: ${name}
  📞 Телефон: ${phone}`;

  return `${TELEGRAM_LINK}?text=${message}`;
};

const TEXT = {
  title: 'Оставьте заявку',
  subtitle: 'Мы свяжемся с вами в ближайшее время',
  namePlaceholder: 'Ваше имя',
  phonePlaceholder: 'Телефон',
  areaPlaceholder: 'Какая площадь вам нужна?',
  submit: 'Отправить заявку',
  telegramHint: 'Не хотите заполнять форму? Напишите нам в Telegram — ответим за 5 минут!',
  validation: 'Заполните имя и телефон',
} as const;

export const sendSignUpModal = createModalController({
  phone: null as string | null,
  name: null as string | null,
});

const Card = styled.div`
  background: #0a2d5e;
  border-radius: 0.8rem;
  padding: 3.2rem 3.6rem 2.8rem;
  box-shadow: 0 1.6rem 4.8rem rgba(7, 30, 63, 0.35);

  @media (max-width: 768px) {
    padding: 2.4rem 2rem 2rem;
  }
`;

const Title = styled.h2`
  margin: 0 0 0.8rem;
  font-size: 2.4rem;
  font-weight: 800;
  line-height: 1.2;
  text-transform: uppercase;
  color: #ffcc00;
`;

const Subtitle = styled.p`
  margin: 0 0 2.4rem;
  font-size: 1.5rem;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.92);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const FieldRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 1.4rem 1.6rem;
  border: none;
  border-radius: 0.4rem;
  background: #ffffff;
  font-family: inherit;
  font-size: 1.4rem;
  color: #131523;

  &::placeholder {
    color: #7e84a3;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 1.4rem 1.6rem;
  border: none;
  border-radius: 0.4rem;
  background: #ffffff;
  font-family: inherit;
  font-size: 1.4rem;
  color: #131523;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8' fill='none'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%235A607F' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1.6rem center;
  padding-right: 4rem;

  &:invalid {
    color: #7e84a3;
  }

  option {
    color: #131523;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  margin-top: 0.4rem;
  padding: 1.6rem 2rem;
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

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ErrorText = styled.p`
  margin: 0;
  font-size: 1.3rem;
  color: #ff8a8a;
`;

const TelegramHint = styled.a`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-top: 2rem;
  color: rgba(255, 255, 255, 0.88);
  font-size: 1.3rem;
  line-height: 1.5;
  text-decoration: none;
  transition: color 0.2s;

  &:hover {
    color: #ffffff;
  }
`;

const TelegramIconWrap = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 2.8rem;
  height: 2.8rem;
  border-radius: 50%;
  background: #1b5bb5;
  color: #ffffff;

  svg {
    font-size: 1.6rem;
  }
`;

const buildTelegramMessage = (name: string, phone: string, area: string) => {
  const lines = ['Новая заявка с сайта Sklad24:', `Имя: ${name}`, `Телефон: ${phone}`];

  if (area) {
    lines.push(`Площадь: ${area}`);
  }

  return lines.join('\n');
};

export const SendSignUpModal = () => {
  const modal = useSyncExternalStore(
    sendSignUpModal.subscribe,
    sendSignUpModal.snapshot,
    sendSignUpModal.snapshot,
  );

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [area, setArea] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!modal.isOpen) return;

    setName(modal.name ?? '');
    setPhone(modal.phone ?? '');
    setArea('');
    setError('');
  }, [modal.isOpen, modal.name, modal.phone]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = name.trim();
    const trimmedPhone = phone.trim();

    if (!trimmedName || !trimmedPhone) {
      setError(TEXT.validation);
      return;
    }

    const message = buildTelegramMessage(trimmedName, trimmedPhone, area);
    window.open(getTelegramUrl(trimmedName, trimmedPhone), '_blank', 'noopener,noreferrer');

    sendSignUpModal.close();
    sendSignUpSuccessModal.open();
  };

  return (
    <ModalBase
      isOpen={modal.isOpen}
      onClose={() => sendSignUpModal.close()}
      ariaLabelledBy="send-sign-up-modal-title"
    >
      <Card>
        <Title id="send-sign-up-modal-title">{TEXT.title}</Title>
        <Subtitle>{TEXT.subtitle}</Subtitle>

        <Form onSubmit={handleSubmit}>
          <FieldRow>
            <Input
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder={TEXT.namePlaceholder}
              autoComplete="name"
            />
            <Input
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              placeholder={TEXT.phonePlaceholder}
              type="tel"
              autoComplete="tel"
            />
          </FieldRow>

          {error && <ErrorText>{error}</ErrorText>}

          <SubmitButton type="submit">{TEXT.submit}</SubmitButton>
        </Form>

        <TelegramHint href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer">
          <TelegramIconWrap>
            <TelegramIcon aria-hidden />
          </TelegramIconWrap>
          <span>{TEXT.telegramHint}</span>
        </TelegramHint>
      </Card>
    </ModalBase>
  );
};

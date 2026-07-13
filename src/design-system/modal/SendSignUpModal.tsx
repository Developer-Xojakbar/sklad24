import { FormEvent, useEffect, useState, useSyncExternalStore } from 'react';
import styled from 'styled-components';
import { Telegram as TelegramIcon } from '@mui/icons-material';
import PhoneInput, { type Value } from 'react-phone-number-input';
import ru from 'react-phone-number-input/locale/ru';
import 'react-phone-number-input/style.css';
import { getPhoneDigits, isValidPhone, toPhoneValue } from '../../utils';
import { telegramService } from '../../service';
import { ModalBase } from './ModalBase';
import { createModalController } from './modal-controller';
import { sendSignUpSuccessModal } from './SendSignUpSuccessModal';

const TELEGRAM_LINK = 'https://t.me/Sklad24_uz';

const TEXT = {
  title: 'Оставьте заявку',
  subtitle: 'Мы свяжемся с вами в ближайшее время',
  namePlaceholder: 'Ваше имя',
  phonePlaceholder: 'Введите номер телефона',
  submit: 'Отправить заявку',
  telegramHint: 'Не хотите заполнять форму? Напишите нам в Telegram — ответим за 5 минут!',
  nameRequired: 'Введите имя',
  phoneRequired: 'Введите телефон',
  phoneInvalid: 'Введите корректный номер телефона',
  submitError: 'Не удалось отправить заявку. Попробуйте позже.',
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

const PhoneInputWrap = styled.div`
  width: 100%;

  .PhoneInput {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    width: 100%;
    padding: 1.2rem 1.6rem;
    border: none;
    border-radius: 0.4rem;
    background: #ffffff;
  }

  .PhoneInputInput {
    flex: 1;
    min-width: 0;
    border: none;
    padding: 0.2rem 0;
    font-family: inherit;
    font-size: 1.4rem;
    color: #131523;
    background: transparent;

    &::placeholder {
      color: #7e84a3;
    }
  }

  .PhoneInputCountry {
    align-self: center;
  }

  .PhoneInputCountrySelect {
    font-family: inherit;
    font-size: 1.3rem;
    color: #131523;
  }

  .PhoneInputCountryIcon {
    width: 2.4rem;
    height: 1.6rem;
    box-shadow: none;
    background-color: transparent;
  }

  .PhoneInputCountryIconImg {
    display: block;
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

export const SendSignUpModal = () => {
  const modal = useSyncExternalStore(
    sendSignUpModal.subscribe,
    sendSignUpModal.snapshot,
    sendSignUpModal.snapshot,
  );

  const [name, setName] = useState('');
  const [phone, setPhone] = useState<Value>();
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!modal.isOpen) return;

    setName(modal.name ?? '');
    setPhone(toPhoneValue(modal.phone));
    setError('');
  }, [modal.isOpen, modal.name, modal.phone]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = name.trim();
    const phoneDigits = getPhoneDigits(phone ?? '');

    if (!trimmedName) {
      setError(TEXT.nameRequired);
      return;
    }

    if (!phoneDigits) {
      setError(TEXT.phoneRequired);
      return;
    }

    if (!isValidPhone(phone)) {
      setError(TEXT.phoneInvalid);
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      await telegramService.signup(trimmedName, phoneDigits);

      sendSignUpModal.close();
      sendSignUpSuccessModal.open();
    } catch {
      setError(TEXT.submitError);
    } finally {
      setIsSubmitting(false);
    }
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

        <Form onSubmit={handleSubmit} noValidate>
          <FieldRow>
            <Input
              value={name}
              onChange={(event) => {
                setName(event.target.value);
                if (error) setError('');
              }}
              placeholder={TEXT.namePlaceholder}
              autoComplete="name"
              required
            />
            <PhoneInputWrap>
              <PhoneInput
                international
                defaultCountry="UZ"
                countryCallingCodeEditable={true}
                labels={ru}
                placeholder={TEXT.phonePlaceholder}
                value={phone}
                onChange={(value) => {
                  setPhone(value);
                  if (error) setError('');
                }}
              />
            </PhoneInputWrap>
          </FieldRow>

          {error && <ErrorText>{error}</ErrorText>}

          <SubmitButton type="submit" disabled={isSubmitting}>
            {TEXT.submit}
          </SubmitButton>
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

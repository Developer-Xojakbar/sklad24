import styled from 'styled-components';
import { SCREEN } from '../../const';

const Container = styled.div`
  display: inline-flex;
  flex-direction: column;
  width: max-content;
`;

const Title = styled.div<{ $isInverted?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;

  font-family: 'Inter', sans-serif;
  font-size: 4rem;
  font-weight: 900;
  line-height: 1;
  letter-spacing: -0.1rem;

  & > *:nth-child(1) {
    color: ${({ $isInverted }) => ($isInverted ? '#fff' : '#111827')} !important;
  }

  @media (max-width: ${SCREEN.MEDIUM}px) {
    font-size: 3rem;
    letter-spacing: -0.08rem;
    justify-content: left;
  }

  @media (max-width: ${SCREEN.SMALL}px) {
    font-size: 2.4rem;
    letter-spacing: -0.06rem;
  }
`;

const Word = styled.span`
  color: #111827;
`;

const Number = styled.span`
  color: #2563eb;
`;

const Subtitle = styled.span<{ $isInverted?: boolean }>`
  margin-top: 0.6rem;

  font-family: 'Inter', sans-serif;
  font-size: 1.15rem;
  font-weight: 600;
  letter-spacing: 0rem;
  text-transform: uppercase;

  color: ${({ $isInverted }) => ($isInverted ? '#E5E7EB' : '#6b7280')};

  @media (max-width: ${SCREEN.MEDIUM}px) {
    margin-top: 0.5rem;
    font-size: 1rem;
  }

  @media (max-width: ${SCREEN.SMALL}px) {
    margin-top: 0.4rem;
    font-size: 0.85rem;
  }
`;

interface LogoProps {
  isInverted?: boolean;
}

export const Logo = ({ isInverted = false, ...props }: LogoProps) => {
  return (
    <Container {...props}>
      <Title $isInverted={isInverted} aria-label="Sklad24 — индивидуальное хранение">
        <Word>SKLAD</Word>
        <Number>24</Number>
      </Title>

      <Subtitle $isInverted={isInverted}>ИНДИВИДУАЛЬНОЕ ХРАНЕНИЕ</Subtitle>
    </Container>
  );
};

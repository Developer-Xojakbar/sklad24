import styled from 'styled-components';

const Container = styled.div`
  display: inline-flex;
  flex-direction: column;
`;

const Title = styled.h1<{ isInverted?: boolean }>`
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
    color: ${({ isInverted }) => (isInverted ? '#fff' : '#111827')} !important;
  }
`;

const Word = styled.span`
  color: #111827;
`;

const Number = styled.span`
  color: #2563eb;
`;

const Subtitle = styled.span<{ isInverted?: boolean }>`
  margin-top: 0.6rem;

  font-family: 'Inter', sans-serif;
  font-size: 1.15rem;
  font-weight: 600;
  letter-spacing: 0rem;
  text-transform: uppercase;

  color: ${({ isInverted }) => (isInverted ? '#E5E7EB' : '#6b7280')};
`;

interface LogoProps {
  isInverted?: boolean;
}

export const Logo = ({ isInverted = false, ...props }: LogoProps) => {
  return (
    <Container {...props}>
      <Title isInverted={isInverted}>
        <Word>SKLAD</Word>
        <Number>24</Number>
      </Title>

      <Subtitle isInverted={isInverted}>ИНДИВИДУАЛЬНОЕ ХРАНЕНИЕ</Subtitle>
    </Container>
  );
};

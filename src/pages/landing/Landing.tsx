import {
  StickyVideo,
  SendSignUpModal,
  SendSignUpSuccessModal,
  sendSignUpModal,
} from '../../design-system';
import {
  LandingScroll,
  LandingMain,
  Navbar,
  HeroSection,
  BenefitsSection,
  ContainerSizesSection,
  UseCasesSection,
  HowItWorksSection,
  LocationContactSection,
  FAQSection,
  LandingFooter,
  FloatingTelegramButton,
} from './LandingComponents';
import { CONTACT } from '../../const';

export const Landing = () => {
  const handleSendSignUpClick = () => {
    sendSignUpModal.phone = null;
    sendSignUpModal.name = null;
    sendSignUpModal.open();
  };

  const handleOpenTelegram = () => {
    window.open(CONTACT.TELEGRAM_LINK, '_blank');
  };

  return (
    <>
      <LandingScroll id="landing-scroll">
        <Navbar handleSendSignUpClick={handleSendSignUpClick} />
        <LandingMain>
          <HeroSection
            handleSendSignUpClick={handleSendSignUpClick}
            handleOpenTelegram={handleOpenTelegram}
          />
          <BenefitsSection />
          <ContainerSizesSection handleSendSignUpClick={handleSendSignUpClick} />
          <UseCasesSection />
          <HowItWorksSection />
          <LocationContactSection handleSendSignUpClick={handleSendSignUpClick} />
          <FAQSection />
        </LandingMain>
        <LandingFooter handleOpenTelegram={handleOpenTelegram} />
        <FloatingTelegramButton />
        <StickyVideo />
      </LandingScroll>
      <SendSignUpModal />
      <SendSignUpSuccessModal />
    </>
  );
};

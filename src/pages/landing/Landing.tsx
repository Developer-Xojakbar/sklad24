// import {
//   SendSignUpModal,
//   SendSignUpSuccessModal,
//   sendSignUpModal,
//   sendSignUpSuccessModal,
// } from '../../design-system';
import {
  LandingScroll,
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
  CONTACT,
} from './LandingComponents';

export const Landing = () => {
  const handleSendSignUpClick = () => {
    // sendSignUpModal.price = null;
    // sendSignUpModal.number = null;
    // sendSignUpModal.withCategory = true;
    // sendSignUpModal.submitClick = () => {
    //   sendSignUpSuccessModal.open();
    // };
    // sendSignUpModal.open();
  };

  const handleOpenTelegram = () => {
    window.open(CONTACT.TELEGRAM_LINK, '_blank');
  };

  return (
    <>
      <LandingScroll id="landing-scroll">
        <Navbar handleSendSignUpClick={handleSendSignUpClick} />
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
        <LandingFooter handleOpenTelegram={handleOpenTelegram} />
        <FloatingTelegramButton />
      </LandingScroll>
      {/* <SendSignUpModal />
      <SendSignUpSuccessModal /> */}
    </>
  );
};

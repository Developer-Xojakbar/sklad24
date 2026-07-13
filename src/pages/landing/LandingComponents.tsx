import { useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import {
  ShieldOutlined as ShieldOutlinedIcon,
  Inventory2Outlined as Inventory2OutlinedIcon,
  WaterDropOutlined as WaterDropOutlinedIcon,
  ViewInArOutlined as ViewInArOutlinedIcon,
  CalendarMonthOutlined as CalendarMonthOutlinedIcon,
  PaymentsOutlined as PaymentsOutlinedIcon,
  HomeOutlined as HomeOutlinedIcon,
  ShoppingCartOutlined as ShoppingCartOutlinedIcon,
  CategoryOutlined as CategoryOutlinedIcon,
  BuildOutlined as BuildOutlinedIcon,
  PrintOutlined as PrintOutlinedIcon,
  DirectionsCarOutlined as DirectionsCarOutlinedIcon,
  ArrowForward as ArrowForwardIcon,
  ArrowForwardIos as ArrowForwardIosIcon,
  Telegram as TelegramIcon,
  PhoneOutlined as PhoneOutlinedIcon,
  InfoOutlined as InfoOutlinedIcon,
  ExpandMore as ExpandMoreIcon,
  Instagram as InstagramIcon,
  FacebookOutlined as FacebookOutlinedIcon,
  PhotoCameraOutlined as PhotoCameraOutlinedIcon,
  DescriptionOutlined as DescriptionOutlinedIcon,
  HandshakeOutlined as HandshakeOutlinedIcon,
  LockOutlined as LockOutlinedIcon,
  Menu as MenuIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { Logo } from './Logo';
import { scrollFromToAnimation } from '../../utils';
import { SCREEN, CONTACT } from '../../const';
import HERO_BG from '../../images/landing/hero-bg.jpg';
import CONTAINER_6M from '../../images/landing/container-6m.png';
import CONTAINER_12M from '../../images/landing/container-12m.png';

const COLORS = {
  blue: '#1B5BB5',
  blueDark: '#0A2D5E',
  blueDarker: '#071E3F',
  yellow: '#FFCC00',
  yellowDark: '#E6B800',
  lightBg: '#F4F6FA',
  textMuted: '#5A607F',
  white: '#FFFFFF',
};

const TEXT = {
  nav: {
    advantages: 'Преимущества',
    containers: 'Контейнеры',
    howItWorks: 'Как это работает',
    prices: 'Цены',
    faq: 'FAQ',
  },
  navbar: {
    callMeBack: 'Перезвоните мне',
    submitRequest: 'Оставить заявку',
    callAriaLabel: 'Позвонить',
    closeMenu: 'Закрыть меню',
    openMenu: 'Открыть меню',
  },
  hero: {
    badge: 'Индивидуальное хранение',
    titleWhite: 'Аренда контейнера',
    titleYellow1: 'Под склад',
    titleYellow2: 'в Ташкенте',
    subtitle:
      'Аренда контейнера под склад в Ташкенте — надёжное хранение вещей, товаров и оборудования в сухих герметичных контейнерах на охраняемой территории 24/7.',
    features: {
      security: {
        line1: 'Охраняемая',
        line2: 'территория 24/7',
      },
      surveillance: {
        line1: 'Видеонаблюдение',
        line2: 'по всей территории',
      },
      containers: {
        line1: 'Сухие, герметичные',
        line2: 'контейнеры',
      },
    },
    telegram: 'Написать в Telegram',
    sizeCard: {
      title: 'Разные размеры',
      sizes: '6, 12, 15, 30 м²',
      subtitle: 'Под любые задачи',
    },
    circleBadge: {
      prefix: 'от',
      suffixLine1: 'месяца',
      suffixLine2: 'аренда',
    },
  },
  benefits: {
    title: 'Ваше имущество в надёжных руках',
    items: {
      security: {
        title: 'Безопасность',
        text: 'Охрана и видеонаблюдение 24/7 на всей территории',
      },
      dryContainers: {
        title: 'Сухие контейнеры',
        text: 'Герметичные контейнеры защищают от влаги и пыли',
      },
      convenientSizes: {
        title: 'Удобные размеры',
        text: 'От 3 до 30 м² — выберите подходящий объём',
      },
      flexibleTerms: {
        title: 'Гибкие условия',
        text: 'Аренда от 1 месяца без длительных обязательств',
      },
      fairPrices: {
        title: 'Честные цены',
        text: 'Прозрачная стоимость без скрытых платежей',
      },
    },
  },
  containers: {
    title: 'Выберите нужный размер',
    items: {
      sixMeters: {
        tag: '6 метров',
        title: '20 футов',
        imageAlt: 'Аренда 6-метрового контейнера под склад в Ташкенте — 15 м²',
        specs: {
          volume: 'Объём: 33 м³',
          area: 'Площадь: 15 м²',
          description: 'Подходит для хранения вещей, товаров, документов, мебели, оборудования',
        },
      },
      twelveMeters: {
        tag: '12 метров (40 ft)',
        title: '40 футов',
        imageAlt: 'Аренда 12-метрового контейнера под склад в Ташкенте — 30 м²',
        specs: {
          volume: 'Объём: 67 м³',
          area: 'Площадь: 30 м²',
          description: 'Подходит для хранения большого объема товаров, материалов, оборудования',
        },
      },
    },
    priceFrom: 'от {{price}}',
    priceUnit: 'сум/мес',
    select: 'Выбрать',
    sizesNote: 'Также доступны размеры: 15 м², 30 м², 45 м², 60 м² - уточняйте у менеджера',
  },
  useCases: {
    title: 'Кто использует наши контейнеры',
    items: {
      personal: 'Личные вещи и мебель',
      ecommerce: 'Товары интернет-магазинов',
      construction: 'Строительные материалы',
      equipment: 'Оборудование и инструменты',
      office: 'Офисная техника',
      seasonal: 'Сезонные вещи и шины',
    },
  },
  howItWorks: {
    title: 'Как это работает',
    steps: {
      submitRequest: 'Оставьте заявку на сайте или по телефону',
      chooseSize: 'Выберите подходящий размер контейнера',
      signAgreement: 'Подпишите договор аренды',
      useContainer: 'Пользуйтесь контейнером столько, сколько нужно',
    },
  },
  location: {
    mapTitle: 'Расположение на карте',
    openInGoogleMaps: 'Открыть в Google Maps',
    title: 'Удобное расположение',
    address: 'Узбекистан, г. Ташкент, Сергелийский район, улица Хонабод',
    description:
      'Удобный подъезд для грузового транспорта. Контейнеры расположены на охраняемой территории с круглосуточным видеонаблюдением.',
  },
  faq: {
    title: 'Частые вопросы',
    items: {
      rentalCost: {
        question: 'Сколько стоит аренда контейнера?',
        answer:
          'Стоимость зависит от размера контейнера. Аренда 6-метрового контейнера — от 1 200 000 сум/мес, 12-метрового — от 1 800 000 сум/мес.',
      },
      siteGuarded: {
        question: 'Есть ли охрана на территории?',
        answer:
          'Да, территория охраняется круглосуточно. Установлено видеонаблюдение по всей площадке.',
      },
      businessStorage: {
        question: 'Можно ли хранить товары для бизнеса?',
        answer:
          'Да, наши контейнеры подходят как для личных вещей, так и для товаров интернет-магазинов и бизнеса.',
      },
      minimumPeriod: {
        question: 'На какой минимальный срок можно арендовать?',
        answer:
          'Минимальный срок аренды — 1 месяц. Вы можете продлевать аренду на любой удобный период.',
      },
      siteAccess: {
        question: 'Как попасть на территорию?',
        answer:
          'После подписания договора вы получите доступ к своему контейнеру. Подъезд удобен для грузового транспорта.',
      },
    },
  },
  footer: {
    description:
      'Аренда контейнера под склад в Ташкенте. Безопасное хранение ваших вещей на охраняемой территории с видеонаблюдением 24/7.',
    navigation: 'Навигация',
    contacts: 'Контакты',
    address: 'г. Ташкент, Сергелийский район, улица Хонабод',
    hours: 'Ежедневно: 08:00 — 20:00',
    telegram: 'Написать в Telegram',
    followUs: 'Мы в соцсетях',
    telegramAriaLabel: 'Telegram',
    instagramAriaLabel: 'Instagram',
    facebookAriaLabel: 'Facebook',
    copyright: '© 2026 SKLAD24. Все права защищены',
  },
  floatingTelegram: {
    ariaLabel: 'Написать в Telegram',
  },
} as const;

const NAV_LINKS = [
  { id: 'advantages' },
  { id: 'containers' },
  { id: 'how-it-works' },
  { id: 'prices' },
  { id: 'faq' },
] as const;

const getNavLabel = (id: (typeof NAV_LINKS)[number]['id']) => {
  switch (id) {
    case 'advantages':
      return TEXT.nav.advantages;
    case 'containers':
      return TEXT.nav.containers;
    case 'how-it-works':
      return TEXT.nav.howItWorks;
    case 'prices':
      return TEXT.nav.prices;
    case 'faq':
      return TEXT.nav.faq;
  }
};

const scrollTo = (e: React.MouseEvent, id: string) => {
  e.preventDefault();
  scrollFromToAnimation('landing-scroll', id);
};

// ─── Layout ───────────────────────────────────────────────────────────────────

export const LandingScroll = styled.div`
  width: 100%;
  height: calc(var(--vh, 1vh) * 100);
  overflow-x: hidden;
  background-color: ${COLORS.white};
`;

export const LandingMain = styled.main`
  display: block;
  width: 100%;
`;

export const Section = styled.section<{ $bg?: 'white' | 'gray' }>`
  padding: 8rem 0;

  ${({ $bg }) =>
    $bg === 'gray' &&
    css`
      background-color: ${COLORS.lightBg};
    `}

  @media (max-width: ${SCREEN.MEDIUM}px) {
    padding: 6rem 0;
  }

  @media (max-width: ${SCREEN.SMALL}px) {
    padding: 4.8rem 0;
  }
`;

export const SectionInner = styled.div<{ $maxWidth?: 'outer' | 'inner' }>`
  max-width: 132rem;
  margin: 0 auto;
  padding: 0 4rem;

  ${({ $maxWidth }) =>
    $maxWidth === 'outer' &&
    css`
      max-width: 140rem;
    `}

  @media (max-width: ${SCREEN.MEDIUM}px) {
    padding: 0 2rem;
  }

  @media (max-width: ${SCREEN.SMALL}px) {
    padding: 0 1.6rem;
  }
`;

export const SectionTitle = styled.h2`
  font-size: 3.2rem;
  font-weight: 700;
  line-height: 1.2;
  text-align: center;
  text-transform: uppercase;
  color: ${COLORS.blueDark};
  margin-bottom: 5rem;

  @media (max-width: ${SCREEN.SMALL}px) {
    font-size: 2.2rem;
    margin-bottom: 3.2rem;
  }
`;

// ─── Buttons ──────────────────────────────────────────────────────────────────

const BaseButton = styled.button<{ $variant: 'yellow' | 'blue' | 'outline' | 'white' }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  border: none;
  border-radius: 0.4rem;
  font-family: inherit;
  font-size: 1.4rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  cursor: pointer;
  transition:
    opacity 0.2s,
    transform 0.2s;
  white-space: nowrap;

  &:hover {
    opacity: 0.88;
    transform: translateY(-1px);
  }

  ${({ $variant }) =>
    $variant === 'yellow' &&
    css`
      background-color: ${COLORS.yellow};
      color: ${COLORS.blueDark};
      padding: 1.4rem 2.8rem;

      @media (max-width: ${SCREEN.SMALL}px) {
        width: 100%;
        padding: 1.4rem 2rem;
      }
    `}

  ${({ $variant }) =>
    $variant === 'blue' &&
    css`
      background-color: ${COLORS.blue};
      color: ${COLORS.white};
      padding: 1.4rem 2.4rem;

      @media (max-width: ${SCREEN.SMALL}px) {
        width: 100%;
        padding: 1.4rem 2rem;
      }
    `}

  ${({ $variant }) =>
    $variant === 'outline' &&
    css`
      background-color: transparent;
      color: ${COLORS.blue};
      border: 0.15rem solid ${COLORS.blue};
      padding: 1.2rem 2.4rem;
    `}

  ${({ $variant }) =>
    $variant === 'white' &&
    css`
      background-color: ${COLORS.white};
      color: ${COLORS.blue};
      padding: 1.2rem 2rem;
    `}
`;

// ─── Navbar ───────────────────────────────────────────────────────────────────

const NavbarBase = styled.header`
  position: sticky;
  top: 0;
  z-index: 1000;
  background: ${COLORS.white};
  box-shadow: 0 0.2rem 1.2rem rgba(10, 45, 94, 0.08);
`;

const NavbarInner = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 3rem;
  max-width: 132rem;
  margin: 0 auto;
  padding: 1.6rem 4rem;
  min-height: 7.2rem;

  @media (max-width: ${SCREEN.MEDIUM}px) {
    grid-template-columns: 1fr auto;
    gap: 1.2rem;
    padding: 1.2rem 1.6rem;
    min-height: 6rem;
  }
`;

// const NavbarLogo = styled(LogoBase).attrs({})`
//   /* & {
//     width: auto;
//     margin-left: 0;
//     padding: 0;
//     border-bottom: none;
//     height: auto;
//     grid-template-columns: max-content max-content;
//   }

//   & > div:first-child {
//     width: 5rem;
//     height: 4.4rem;
//     margin-left: 0;
//   }

//   & > *:nth-child(2) {
//     font-size: var(--font-size-6);
//     line-height: var(--line-height-6);
//   }

//   @media (max-width: ${SCREEN.MEDIUM}px) {
//     & > div:first-child {
//       width: 3.6rem;
//       height: 3.2rem;
//     }

//     & > *:nth-child(2) {
//       font-size: var(--font-size-4);
//       line-height: var(--line-height-4);
//     }
//   } */
// `;

const NavLinks = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2.8rem;
  flex-wrap: wrap;

  @media (max-width: ${SCREEN.MEDIUM}px) {
    display: none;
  }
`;

const NavLink = styled.a`
  font-size: 1.4rem;
  font-weight: 500;
  color: ${COLORS.blueDark};
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: ${COLORS.blue};
  }
`;

const NavbarActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;

  @media (max-width: ${SCREEN.MEDIUM}px) {
    gap: 0.8rem;
  }
`;

const NavbarDesktopActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;

  @media (max-width: ${SCREEN.MEDIUM}px) {
    display: none;
  }
`;

const NavbarMobileActions = styled.div`
  display: none;
  align-items: center;
  gap: 0.8rem;

  @media (max-width: ${SCREEN.MEDIUM}px) {
    display: flex;
  }
`;

const NavbarTabletPhone = styled.div`
  display: none;

  @media (max-width: ${SCREEN.MEDIUM}px) and (min-width: ${SCREEN.SMALL + 1}px) {
    display: flex;
  }
`;

const NavbarMobilePhoneIcon = styled.div`
  display: none;

  @media (max-width: ${SCREEN.SMALL}px) {
    display: flex;
  }
`;

const NavbarIconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: 4rem;
  border: none;
  background: transparent;
  color: ${COLORS.blue};
  cursor: pointer;
  padding: 0;

  svg {
    font-size: 2.6rem;
  }
`;

const MobileMenuOverlay = styled.div<{ $open: boolean }>`
  display: none;

  @media (max-width: ${SCREEN.MEDIUM}px) {
    display: ${({ $open }) => ($open ? 'block' : 'none')};
    position: fixed;
    inset: 0;
    top: 6rem;
    z-index: 999;
    background: ${COLORS.white};
    padding: 2.4rem 1.6rem;
    overflow-y: auto;
  }
`;

const MobileMenuLinks = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  margin-bottom: 2.4rem;
`;

const MobileMenuLink = styled.a`
  display: block;
  padding: 1.4rem 0;
  font-size: 1.6rem;
  font-weight: 600;
  color: ${COLORS.blueDark};
  border-bottom: 0.1rem solid rgba(27, 91, 181, 0.1);
`;

const MobileMenuFooter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

const PhoneBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const PhoneIconWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${COLORS.blue};

  svg {
    font-size: 2.4rem;
  }
`;

const PhoneInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

const PhoneNumber = styled.a`
  font-size: 1.5rem;
  font-weight: 700;
  color: #131523;
  white-space: nowrap;
`;

const CallbackLink = styled.button`
  font-size: 1.2rem;
  color: ${COLORS.blue};
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
`;

export const Navbar = ({ handleSendSignUpClick }: { handleSendSignUpClick: () => void }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavClick = (e: React.MouseEvent, id: string) => {
    scrollTo(e, id);
    setMenuOpen(false);
  };

  return (
    <NavbarBase>
      <NavbarInner>
        <Logo />

        <NavLinks>
          {NAV_LINKS.map(({ id }) => (
            <NavLink key={id} href={`#${id}`} onClick={(e) => scrollTo(e, id)}>
              {getNavLabel(id)}
            </NavLink>
          ))}
        </NavLinks>

        <NavbarActions>
          <NavbarDesktopActions>
            <PhoneBlock>
              <PhoneIconWrap>
                <PhoneOutlinedIcon />
              </PhoneIconWrap>
              <PhoneInfo>
                <PhoneNumber href={`tel:${CONTACT.PHONE_NUMBER}`}>
                  {CONTACT.PHONE_FORMAT}
                </PhoneNumber>
                <CallbackLink type="button" onClick={(e) => scrollTo(e, 'contacts')}>
                  {TEXT.navbar.callMeBack}
                </CallbackLink>
              </PhoneInfo>
            </PhoneBlock>
            <BaseButton $variant="blue" type="button" onClick={handleSendSignUpClick}>
              {TEXT.navbar.submitRequest}
            </BaseButton>
          </NavbarDesktopActions>

          <NavbarMobileActions>
            <NavbarTabletPhone>
              <PhoneBlock>
                <PhoneIconWrap>
                  <PhoneOutlinedIcon />
                </PhoneIconWrap>
                <PhoneInfo>
                  <PhoneNumber href={`tel:${CONTACT.PHONE_NUMBER}`}>
                    {CONTACT.PHONE_FORMAT}
                  </PhoneNumber>
                  <CallbackLink type="button" onClick={(e) => scrollTo(e, 'contacts')}>
                    {TEXT.navbar.callMeBack}
                  </CallbackLink>
                </PhoneInfo>
              </PhoneBlock>
            </NavbarTabletPhone>
            <NavbarMobilePhoneIcon>
              <NavbarIconButton
                as="a"
                href={`tel:${CONTACT.PHONE_NUMBER}`}
                aria-label={TEXT.navbar.callAriaLabel}
              >
                <PhoneOutlinedIcon />
              </NavbarIconButton>
            </NavbarMobilePhoneIcon>
            <NavbarIconButton
              type="button"
              aria-label={menuOpen ? TEXT.navbar.closeMenu : TEXT.navbar.openMenu}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <CloseIcon /> : <MenuIcon />}
            </NavbarIconButton>
          </NavbarMobileActions>
        </NavbarActions>
      </NavbarInner>

      <MobileMenuOverlay $open={menuOpen}>
        <MobileMenuLinks>
          {NAV_LINKS.map(({ id }) => (
            <MobileMenuLink key={id} href={`#${id}`} onClick={(e) => handleNavClick(e, id)}>
              {getNavLabel(id)}
            </MobileMenuLink>
          ))}
        </MobileMenuLinks>
        <MobileMenuFooter>
          <BaseButton
            $variant="blue"
            type="button"
            onClick={() => {
              setMenuOpen(false);
              handleSendSignUpClick();
            }}
          >
            {TEXT.navbar.submitRequest}
          </BaseButton>
        </MobileMenuFooter>
      </MobileMenuOverlay>
    </NavbarBase>
  );
};

// ─── Hero ─────────────────────────────────────────────────────────────────────

const HeroBase = styled.section``;

const HeroInner = styled(SectionInner).attrs({ $maxWidth: 'outer' as const })`
  max-width: 132rem;
  padding: 0;

  @media (max-width: ${SCREEN.SMALL}px) {
    padding: 0;
  }
`;

const HeroGrid = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 42% 58%;
  overflow: hidden;
  border-radius: 0 0 0.4rem 0.4rem;
  box-shadow: 0 1.2rem 3.6rem rgba(7, 30, 63, 0.28);
  background:
    linear-gradient(
      90deg,
      rgba(10, 45, 94, 0.94) 0%,
      rgba(10, 45, 94, 0.88) 38%,
      rgba(10, 45, 94, 0.45) 58%,
      rgba(10, 45, 94, 0.12) 78%,
      rgba(10, 45, 94, 0) 100%
    ),
    url(${HERO_BG}) center / cover no-repeat;

  @media (max-width: ${SCREEN.MEDIUM}px) {
    grid-template-columns: 1fr;
  }

  @media (max-width: ${SCREEN.SMALL}px) {
    grid-template-columns: 1fr;
    min-height: auto;
    border-radius: 0;
    background:
      linear-gradient(
        180deg,
        rgba(10, 45, 94, 0.92) 0%,
        rgba(10, 45, 94, 0.82) 55%,
        rgba(10, 45, 94, 0.55) 100%
      ),
      url(${HERO_BG}) center / cover no-repeat;
  }
`;

const HeroLeftPanel = styled.div`
  padding: 2.4rem 4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 2;

  @media (max-width: ${SCREEN.MEDIUM}px) {
    padding: 2.4rem 1.6rem 2rem;
  }
`;

const HeroRightPanel = styled.div`
  position: relative;
  z-index: 1;
  min-height: 20rem;

  @media (max-width: ${SCREEN.MEDIUM}px) {
    min-height: 0;
    order: 3;
  }
`;

const HeroBadge = styled.span`
  display: inline-block;
  align-self: flex-start;
  background: ${COLORS.yellow};
  color: #131523;
  font-size: 1.1rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  padding: 0.5rem 1.2rem;
  border-radius: 0.2rem;
  margin-bottom: 2.4rem;
`;

const HeroTitle = styled.h1`
  font-size: 4.4rem;
  font-weight: 800;
  line-height: 1.12;
  text-transform: uppercase;
  margin-bottom: 2rem;

  span {
    display: block;

    &.yellow {
      color: ${COLORS.yellow};
    }

    &.white {
      color: ${COLORS.white};
    }
  }

  @media (max-width: ${SCREEN.MEDIUM}px) {
    padding-right: 16rem;
  }

  @media (max-width: ${SCREEN.SMALL}px) {
    font-size: 2.8rem;
    margin-bottom: 1.6rem;
    padding-right: 12rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.5rem;
  line-height: 1.55;
  color: rgba(255, 255, 255, 0.92);
  max-width: 52rem;
  margin-bottom: 3rem;

  @media (max-width: ${SCREEN.SMALL}px) {
    font-size: 1.4rem;
    margin-bottom: 2rem;
  }
`;

const HeroFeatures = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 3.6rem;
  width: min-content;

  @media (max-width: ${SCREEN.SMALL}px) {
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    gap: 1.2rem;
    margin-bottom: 2.4rem;
  }
`;

const HeroFeatureIcon = styled.div`
  width: 4.6rem;
  height: 4.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  svg {
    font-size: 4.6rem;
    color: ${COLORS.white};
  }

  @media (max-width: ${SCREEN.SMALL}px) {
    width: 3.6rem;
    height: 3.6rem;

    svg {
      font-size: 3.2rem;
    }
  }
`;

const HeroFeature = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 1.2rem;
  width: max-content;
  padding-right: 1.2rem;
  margin-right: 1.2rem;

  &:not(:last-child)::after {
    content: '';
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 0.1rem;
    height: 4.6rem;
    background: rgba(255, 255, 255, 0.35);
  }

  &:last-child {
    padding-right: 0;
    margin-right: 0;
  }

  span {
    font-size: 1.25rem;
    line-height: 1.35;
    font-weight: 500;
    color: ${COLORS.white};
    white-space: normal;
  }

  @media (max-width: ${SCREEN.SMALL}px) {
    width: 100%;
    padding-right: 0;
    margin-right: 0;

    &:not(:last-child)::after {
      display: none;
    }

    span br {
      display: none;
    }
  }
`;

const HeroButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1.6rem;
  width: max-content;

  @media (max-width: ${SCREEN.SMALL}px) {
    flex-direction: column;
    width: 100%;
    gap: 1.2rem;
  }
`;

const HeroTelegramButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 1.2rem;
  background: transparent;
  border: 0.15rem solid ${COLORS.white};
  border-radius: 0.4rem;
  padding: 1.1rem 2rem;
  color: ${COLORS.white};
  font-family: inherit;
  font-size: 1.3rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.88;
  }

  @media (max-width: ${SCREEN.SMALL}px) {
    width: 100%;
    padding: 1.4rem 2rem;
  }
`;

const HeroTelegramIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: ${COLORS.white};
  flex-shrink: 0;

  svg {
    font-size: 2.2rem;
  }
`;

const heroBadgeBorderRotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const HeroCircleBadge = styled.div`
  position: absolute;
  top: 7rem;
  left: calc(46% - 7.5rem);
  width: 15rem;
  height: 15rem;
  border-radius: 50%;
  background: ${COLORS.white};
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  z-index: 5;
  box-shadow: 0 0.6rem 2rem rgba(0, 0, 0, 0.12);
  padding: 1rem;
  isolation: isolate;

  &::before {
    content: '';
    position: absolute;
    inset: -0.25rem;
    border-radius: 50%;
    border: 0.5rem dashed ${COLORS.blue};
    animation: ${heroBadgeBorderRotate} 18s linear infinite;
    pointer-events: none;
  }

  & > * {
    position: relative;
    z-index: 1;
  }

  .prefix {
    font-size: 1.5rem;
    font-weight: 600;
    color: ${COLORS.blue};
    text-transform: lowercase;
    line-height: 1;
    margin-bottom: 0.2rem;
  }

  .number {
    font-size: 5.6rem;
    font-weight: 800;
    color: ${COLORS.blue};
    line-height: 0.9;
  }

  .suffix {
    font-size: 1.5rem;
    font-weight: 700;
    color: ${COLORS.blue};
    text-transform: uppercase;
    line-height: 1.25;
    margin-top: 0.4rem;
  }

  @media (max-width: ${SCREEN.MEDIUM}px) {
    top: 1.6rem;
    left: auto;
    right: 1.6rem;
  }

  @media (max-width: ${SCREEN.SMALL}px) {
    top: 1.6rem;
    left: auto;
    right: 1.6rem;
    width: 11rem;
    height: 11rem;

    .prefix {
      font-size: 1.2rem;
    }

    .number {
      font-size: 4rem;
    }

    .suffix {
      font-size: 1.1rem;
    }
  }
`;

const HeroSizeCard = styled.div`
  position: absolute;
  left: 20rem;
  bottom: 2.4rem;
  background: rgba(10, 45, 94, 0.94);
  color: ${COLORS.white};
  border-radius: 0.6rem;
  padding: 1.8rem 2.2rem;
  display: flex;
  gap: 1.4rem;
  align-items: center;
  z-index: 4;
  box-shadow:
    0 1rem 2.8rem rgba(130, 130, 130, 0.35),
    0 0.4rem 1.2rem rgba(0, 0, 0, 0.18);

  svg {
    font-size: 5rem;
    color: ${COLORS.white};
    flex-shrink: 0;
  }

  @media (max-width: ${SCREEN.MEDIUM}px) {
    position: static;
    left: auto;
    bottom: auto;
    width: calc(100% - 3.2rem);
    margin: 0 1.6rem 1.6rem;
    padding: 1.4rem 1.6rem;

    svg {
      font-size: 3.6rem;
    }
  }
`;

const HeroSizeCardText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  strong {
    font-size: 1.3rem;
    font-weight: 700;
    line-height: 1.3;
    text-transform: uppercase;
  }

  span {
    font-size: 1.3rem;
    font-weight: 500;
    line-height: 1.3;
  }
`;

export const HeroSection = ({
  handleSendSignUpClick,
  handleOpenTelegram,
}: {
  handleSendSignUpClick: () => void;
  handleOpenTelegram: () => void;
}) => (
  <HeroBase id="hero">
    <HeroInner>
      <HeroGrid>
        <HeroLeftPanel>
          <HeroBadge>{TEXT.hero.badge}</HeroBadge>
          <HeroTitle>
            <span className="white">{TEXT.hero.titleWhite}</span>
            <span className="yellow">{TEXT.hero.titleYellow1}</span>
            <span className="yellow">{TEXT.hero.titleYellow2}</span>
          </HeroTitle>
          <HeroSubtitle>{TEXT.hero.subtitle}</HeroSubtitle>

          <HeroFeatures>
            <HeroFeature>
              <HeroFeatureIcon>
                <ShieldOutlinedIcon />
              </HeroFeatureIcon>
              <span>
                {TEXT.hero.features.security.line1}
                <br />
                {TEXT.hero.features.security.line2}
              </span>
            </HeroFeature>
            <HeroFeature>
              <HeroFeatureIcon>
                <PhotoCameraOutlinedIcon />
              </HeroFeatureIcon>
              <span>
                {TEXT.hero.features.surveillance.line1}
                <br />
                {TEXT.hero.features.surveillance.line2}
              </span>
            </HeroFeature>
            <HeroFeature>
              <HeroFeatureIcon>
                <Inventory2OutlinedIcon />
              </HeroFeatureIcon>
              <span>
                {TEXT.hero.features.containers.line1}
                <br />
                {TEXT.hero.features.containers.line2}
              </span>
            </HeroFeature>
          </HeroFeatures>

          <HeroButtons>
            <BaseButton $variant="yellow" type="button" onClick={handleSendSignUpClick}>
              {TEXT.navbar.submitRequest}
              <ArrowForwardIcon sx={{ fontSize: '1.8rem' }} />
            </BaseButton>
            <HeroTelegramButton type="button" onClick={handleOpenTelegram}>
              <HeroTelegramIcon>
                <TelegramIcon />
              </HeroTelegramIcon>
              {TEXT.hero.telegram}
            </HeroTelegramButton>
          </HeroButtons>
        </HeroLeftPanel>

        <HeroRightPanel>
          <HeroSizeCard>
            <Inventory2OutlinedIcon />
            <HeroSizeCardText>
              <strong>{TEXT.hero.sizeCard.title}</strong>
              <span>{TEXT.hero.sizeCard.sizes}</span>
              <strong>{TEXT.hero.sizeCard.subtitle}</strong>
            </HeroSizeCardText>
          </HeroSizeCard>
        </HeroRightPanel>

        <HeroCircleBadge>
          <span className="prefix">{TEXT.hero.circleBadge.prefix}</span>
          <span className="number">1</span>
          <span className="suffix">
            {TEXT.hero.circleBadge.suffixLine1}
            <br />
            {TEXT.hero.circleBadge.suffixLine2}
          </span>
        </HeroCircleBadge>
      </HeroGrid>
    </HeroInner>
  </HeroBase>
);

// ─── Benefits ─────────────────────────────────────────────────────────────────

const BenefitsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 2rem;

  @media (max-width: ${SCREEN.MEDIUM}px) {
    grid-template-columns: repeat(6, 1fr);

    & > *:nth-child(1) {
      grid-column: 1 / 3;
    }

    & > *:nth-child(2) {
      grid-column: 3 / 5;
    }

    & > *:nth-child(3) {
      grid-column: 5 / 7;
    }

    & > *:nth-child(4) {
      grid-column: 2 / 4;
    }

    & > *:nth-child(5) {
      grid-column: 4 / 6;
    }
  }

  @media (max-width: ${SCREEN.SMALL}px) {
    grid-template-columns: 1fr;
    gap: 1.2rem;

    & > *:nth-child(n) {
      grid-column: auto;
    }
  }
`;

const BenefitCard = styled.div`
  background: ${COLORS.white};
  border-radius: 0.8rem;
  padding: 3rem 2rem;
  text-align: center;
  box-shadow: 0 0.4rem 2rem rgba(10, 45, 94, 0.06);
  border: 0.1rem solid rgba(27, 91, 181, 0.08);
  transition:
    transform 0.2s,
    box-shadow 0.2s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 0.8rem 2.4rem rgba(10, 45, 94, 0.1);
  }

  @media (max-width: ${SCREEN.SMALL}px) {
    display: flex;
    align-items: flex-start;
    gap: 1.6rem;
    text-align: left;
    padding: 2rem 1.6rem;

    &:hover {
      transform: none;
    }
  }
`;

const BenefitIcon = styled.div`
  width: 5.6rem;
  height: 5.6rem;
  margin: 0 auto 1.6rem;
  border-radius: 50%;
  background: rgba(27, 91, 181, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${COLORS.blue};

  svg {
    font-size: 2.8rem;
  }

  @media (max-width: ${SCREEN.SMALL}px) {
    width: 4.8rem;
    height: 4.8rem;
    margin: 0;
    flex-shrink: 0;

    svg {
      font-size: 2.4rem;
    }
  }
`;

const BenefitContent = styled.div`
  @media (max-width: ${SCREEN.SMALL}px) {
    flex: 1;
  }
`;

const BenefitTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 700;
  text-transform: uppercase;
  color: ${COLORS.blueDark};
  margin-bottom: 1rem;

  @media (max-width: ${SCREEN.SMALL}px) {
    margin-bottom: 0.4rem;
  }
`;

const BenefitText = styled.p`
  font-size: 1.3rem;
  line-height: 1.5;
  color: ${COLORS.textMuted};
`;

export const BenefitsSection = () => (
  <Section id="advantages">
    <SectionInner>
      <SectionTitle>{TEXT.benefits.title}</SectionTitle>
      <BenefitsGrid>
        <BenefitCard key="security">
          <BenefitIcon>
            <ShieldOutlinedIcon />
          </BenefitIcon>
          <BenefitContent>
            <BenefitTitle>{TEXT.benefits.items.security.title}</BenefitTitle>
            <BenefitText>{TEXT.benefits.items.security.text}</BenefitText>
          </BenefitContent>
        </BenefitCard>
        <BenefitCard key="dryContainers">
          <BenefitIcon>
            <WaterDropOutlinedIcon />
          </BenefitIcon>
          <BenefitContent>
            <BenefitTitle>{TEXT.benefits.items.dryContainers.title}</BenefitTitle>
            <BenefitText>{TEXT.benefits.items.dryContainers.text}</BenefitText>
          </BenefitContent>
        </BenefitCard>
        <BenefitCard key="convenientSizes">
          <BenefitIcon>
            <ViewInArOutlinedIcon />
          </BenefitIcon>
          <BenefitContent>
            <BenefitTitle>{TEXT.benefits.items.convenientSizes.title}</BenefitTitle>
            <BenefitText>{TEXT.benefits.items.convenientSizes.text}</BenefitText>
          </BenefitContent>
        </BenefitCard>
        <BenefitCard key="flexibleTerms">
          <BenefitIcon>
            <CalendarMonthOutlinedIcon />
          </BenefitIcon>
          <BenefitContent>
            <BenefitTitle>{TEXT.benefits.items.flexibleTerms.title}</BenefitTitle>
            <BenefitText>{TEXT.benefits.items.flexibleTerms.text}</BenefitText>
          </BenefitContent>
        </BenefitCard>
        <BenefitCard key="fairPrices">
          <BenefitIcon>
            <PaymentsOutlinedIcon />
          </BenefitIcon>
          <BenefitContent>
            <BenefitTitle>{TEXT.benefits.items.fairPrices.title}</BenefitTitle>
            <BenefitText>{TEXT.benefits.items.fairPrices.text}</BenefitText>
          </BenefitContent>
        </BenefitCard>
      </BenefitsGrid>
    </SectionInner>
  </Section>
);

// ─── Container sizes ──────────────────────────────────────────────────────────

const ContainerCards = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 3rem;

  @media (max-width: ${SCREEN.MEDIUM}px) {
    grid-template-columns: 1fr;
    gap: 2.4rem;
  }

  @media (max-width: ${SCREEN.SMALL}px) {
    gap: 2rem;
  }
`;

const ContainerCard = styled.div`
  background: ${COLORS.white};
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 0.4rem 2.4rem rgba(10, 45, 94, 0.08);
  border: 0.1rem solid rgba(27, 91, 181, 0.1);
  padding: 2.4rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;

  @media (max-width: ${SCREEN.MEDIUM}px) {
    padding: 2rem;
    gap: 2rem;
  }

  @media (max-width: ${SCREEN.SMALL}px) {
    padding: 1.6rem;
    gap: 1.6rem;
  }
`;

const ContainerMain = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-areas:
    'tag image'
    'title image'
    'specs image';
  gap: 2rem;
  align-items: start;
  flex-grow: 1;

  @media (max-width: ${SCREEN.MEDIUM}px) {
    gap: 1.6rem;
  }

  @media (max-width: ${SCREEN.SMALL}px) {
    grid-template-columns: 1fr;
    grid-template-areas:
      'tag'
      'title'
      'image'
      'specs';
  }
`;

const ContainerImage = styled.div<{ $flip?: boolean }>`
  grid-area: image;
  height: 18rem;
  background: ${COLORS.white};
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    transform: ${({ $flip }) => ($flip ? 'scaleX(-1)' : 'none')};
  }

  @media (max-width: ${SCREEN.MEDIUM}px) {
    height: 16rem;
  }

  @media (max-width: ${SCREEN.SMALL}px) {
    height: 16rem;
  }
`;

const ContainerTag = styled.span`
  grid-area: tag;
  align-self: flex-start;
  background: ${COLORS.blue};
  color: ${COLORS.white};
  font-size: 1.2rem;
  font-weight: 700;
  text-transform: uppercase;
  padding: 0.6rem 1.2rem;
  border-radius: 0.3rem;
  width: fit-content;
`;

const ContainerTitle = styled.h3`
  grid-area: title;
  font-size: 2.4rem;
  font-weight: 700;
  color: #131523;
  line-height: 1.2;

  @media (max-width: ${SCREEN.MEDIUM}px) {
    font-size: 2.2rem;
  }

  @media (max-width: ${SCREEN.SMALL}px) {
    font-size: 2rem;
  }
`;

const ContainerSpecs = styled.ul`
  grid-area: specs;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  li {
    display: flex;
    align-items: flex-start;
    gap: 0.8rem;
    font-size: 1.4rem;
    color: ${COLORS.textMuted};
    line-height: 1.45;

    svg {
      font-size: 1.8rem;
      color: ${COLORS.blue};
      flex-shrink: 0;
      margin-top: 0.1rem;
    }
  }
`;

const ContainerFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.6rem;

  @media (max-width: ${SCREEN.MEDIUM}px) {
    gap: 1.2rem;
  }

  @media (max-width: ${SCREEN.SMALL}px) {
    flex-direction: column;
    align-items: stretch;
    gap: 1.2rem;
  }
`;

const ContainerPrice = styled.p`
  font-size: 2rem;
  font-weight: 700;
  color: ${COLORS.blueDark};
  margin: 0;

  span {
    font-size: 1.4rem;
    font-weight: 500;
    color: ${COLORS.textMuted};
  }

  @media (max-width: ${SCREEN.MEDIUM}px) {
    font-size: 1.9rem;
  }

  @media (max-width: ${SCREEN.SMALL}px) {
    font-size: 1.8rem;
  }
`;

const SizesNote = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  margin-top: 3rem;
  font-size: 1.8rem;
  color: ${COLORS.textMuted};

  svg {
    color: ${COLORS.blue};
    font-size: 2.4rem;
  }

  @media (max-width: ${SCREEN.MEDIUM}px) {
    margin-top: 2.4rem;
    font-size: 1.6rem;

    svg {
      font-size: 2.2rem;
    }
  }

  @media (max-width: ${SCREEN.SMALL}px) {
    margin-top: 2rem;
    font-size: 1.4rem;
    text-align: center;

    svg {
      font-size: 2rem;
      flex-shrink: 0;
    }
  }
`;

export const ContainerSizesSection = ({
  handleSendSignUpClick,
}: {
  handleSendSignUpClick: () => void;
}) => (
  <Section id="containers" $bg="gray">
    <SectionInner>
      <SectionTitle>{TEXT.containers.title}</SectionTitle>
      <ContainerCards id="prices">
        <ContainerCard key="sixMeters">
          <ContainerMain>
            <ContainerTag>{TEXT.containers.items.sixMeters.tag}</ContainerTag>
            <ContainerTitle>{TEXT.containers.items.sixMeters.title}</ContainerTitle>
            <ContainerImage>
              <img
                src={CONTAINER_6M}
                alt={TEXT.containers.items.sixMeters.imageAlt}
                loading="lazy"
                decoding="async"
                width={640}
                height={360}
              />
            </ContainerImage>
            <ContainerSpecs>
              <li>
                <ViewInArOutlinedIcon />
                <span>{TEXT.containers.items.sixMeters.specs.volume}</span>
              </li>
              <li>
                <ViewInArOutlinedIcon />
                <span>{TEXT.containers.items.sixMeters.specs.area}</span>
              </li>
              <li>
                <ViewInArOutlinedIcon />
                <span>{TEXT.containers.items.sixMeters.specs.description}</span>
              </li>
            </ContainerSpecs>
          </ContainerMain>
          <ContainerFooter>
            <ContainerPrice>
              от 900 000 <span>{TEXT.containers.priceUnit}</span>
            </ContainerPrice>
            <BaseButton $variant="blue" type="button" onClick={handleSendSignUpClick}>
              {TEXT.containers.select}
              <ArrowForwardIcon sx={{ fontSize: '1.8rem' }} />
            </BaseButton>
          </ContainerFooter>
        </ContainerCard>

        <ContainerCard key="twelveMeters">
          <ContainerMain>
            <ContainerTag>{TEXT.containers.items.twelveMeters.tag}</ContainerTag>
            <ContainerTitle>{TEXT.containers.items.twelveMeters.title}</ContainerTitle>
            <ContainerImage $flip>
              <img
                src={CONTAINER_12M}
                alt={TEXT.containers.items.twelveMeters.imageAlt}
                loading="lazy"
                decoding="async"
                width={640}
                height={360}
              />
            </ContainerImage>
            <ContainerSpecs>
              <li>
                <ViewInArOutlinedIcon />
                <span>{TEXT.containers.items.twelveMeters.specs.volume}</span>
              </li>
              <li>
                <ViewInArOutlinedIcon />
                <span>{TEXT.containers.items.twelveMeters.specs.area}</span>
              </li>
              <li>
                <ViewInArOutlinedIcon />
                <span>{TEXT.containers.items.twelveMeters.specs.description}</span>
              </li>
            </ContainerSpecs>
          </ContainerMain>
          <ContainerFooter>
            <ContainerPrice>
              от 1 400 000 <span>{TEXT.containers.priceUnit}</span>
            </ContainerPrice>
            <BaseButton $variant="blue" type="button" onClick={handleSendSignUpClick}>
              {TEXT.containers.select}
              <ArrowForwardIcon sx={{ fontSize: '1.8rem' }} />
            </BaseButton>
          </ContainerFooter>
        </ContainerCard>
      </ContainerCards>
      <SizesNote>
        <InfoOutlinedIcon />
        {TEXT.containers.sizesNote}
      </SizesNote>
    </SectionInner>
  </Section>
);

// ─── Use cases ────────────────────────────────────────────────────────────────

const UseCasesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 2rem;

  @media (max-width: ${SCREEN.MEDIUM}px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 1.6rem;
  }

  @media (max-width: ${SCREEN.SMALL}px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.2rem;
  }
`;

const UseCaseCard = styled(BenefitCard)`
  @media (max-width: ${SCREEN.MEDIUM}px) {
    padding: 2.4rem 1.6rem;

    ${BenefitIcon} {
      width: 5rem;
      height: 5rem;
      margin-bottom: 1.2rem;

      svg {
        font-size: 2.6rem;
      }
    }

    ${BenefitText} {
      font-size: 1.25rem;
      line-height: 1.4;
    }
  }

  @media (max-width: ${SCREEN.SMALL}px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 1.6rem 1rem;
    gap: 1rem;

    ${BenefitIcon} {
      width: 4.8rem;
      height: 4.8rem;
      margin: 0;

      svg {
        font-size: 2.4rem;
      }
    }

    ${BenefitText} {
      font-size: 1.3rem;
    }
  }
`;

export const UseCasesSection = () => (
  <Section>
    <SectionInner>
      <SectionTitle>{TEXT.useCases.title}</SectionTitle>
      <UseCasesGrid>
        <UseCaseCard key="personal">
          <BenefitIcon>
            <HomeOutlinedIcon />
          </BenefitIcon>
          <BenefitText>{TEXT.useCases.items.personal}</BenefitText>
        </UseCaseCard>
        <UseCaseCard key="ecommerce">
          <BenefitIcon>
            <ShoppingCartOutlinedIcon />
          </BenefitIcon>
          <BenefitText>{TEXT.useCases.items.ecommerce}</BenefitText>
        </UseCaseCard>
        <UseCaseCard key="construction">
          <BenefitIcon>
            <CategoryOutlinedIcon />
          </BenefitIcon>
          <BenefitText>{TEXT.useCases.items.construction}</BenefitText>
        </UseCaseCard>
        <UseCaseCard key="equipment">
          <BenefitIcon>
            <BuildOutlinedIcon />
          </BenefitIcon>
          <BenefitText>{TEXT.useCases.items.equipment}</BenefitText>
        </UseCaseCard>
        <UseCaseCard key="office">
          <BenefitIcon>
            <PrintOutlinedIcon />
          </BenefitIcon>
          <BenefitText>{TEXT.useCases.items.office}</BenefitText>
        </UseCaseCard>
        <UseCaseCard key="seasonal">
          <BenefitIcon>
            <DirectionsCarOutlinedIcon />
          </BenefitIcon>
          <BenefitText>{TEXT.useCases.items.seasonal}</BenefitText>
        </UseCaseCard>
      </UseCasesGrid>
    </SectionInner>
  </Section>
);

// ─── How it works ─────────────────────────────────────────────────────────────

const StepsRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 0;

  @media (max-width: ${SCREEN.SMALL}px) {
    flex-direction: column;
    align-items: stretch;
    gap: 0;
  }
`;

const StepItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 22rem;
  flex: 1;

  @media (max-width: ${SCREEN.SMALL}px) {
    flex-direction: row;
    align-items: center;
    text-align: left;
    gap: 1.6rem;
    max-width: none;
  }
`;

const StepCircle = styled.div`
  width: 5.6rem;
  height: 5.6rem;
  border-radius: 50%;
  background: ${COLORS.blue};
  color: ${COLORS.white};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.6rem;
  flex-shrink: 0;

  svg {
    font-size: 2.8rem;
  }

  @media (max-width: ${SCREEN.SMALL}px) {
    width: 4.8rem;
    height: 4.8rem;
    margin-bottom: 0;

    svg {
      font-size: 2.4rem;
    }
  }
`;

const StepText = styled.p`
  font-size: 1.4rem;
  line-height: 1.5;
  color: ${COLORS.blueDark};
  font-weight: 500;

  @media (max-width: ${SCREEN.SMALL}px) {
    flex: 1;
  }
`;

const StepArrow = styled.div`
  display: flex;
  align-items: center;
  padding-top: 1.6rem;
  color: ${COLORS.blue};
  opacity: 0.5;

  svg {
    font-size: 2rem;
  }

  @media (max-width: ${SCREEN.SMALL}px) {
    justify-content: center;
    padding: 0.5rem 0;
    width: 4.8rem;

    svg {
      transform: rotate(90deg);
    }
  }
`;

export const HowItWorksSection = () => (
  <Section id="how-it-works" $bg="gray">
    <SectionInner>
      <SectionTitle>{TEXT.howItWorks.title}</SectionTitle>
      <StepsRow>
        <StepItem>
          <StepCircle>
            <DescriptionOutlinedIcon />
          </StepCircle>
          <StepText>{TEXT.howItWorks.steps.submitRequest}</StepText>
        </StepItem>
        <StepArrow>
          <ArrowForwardIosIcon />
        </StepArrow>
        <StepItem>
          <StepCircle>
            <Inventory2OutlinedIcon />
          </StepCircle>
          <StepText>{TEXT.howItWorks.steps.chooseSize}</StepText>
        </StepItem>
        <StepArrow>
          <ArrowForwardIosIcon />
        </StepArrow>
        <StepItem>
          <StepCircle>
            <HandshakeOutlinedIcon />
          </StepCircle>
          <StepText>{TEXT.howItWorks.steps.signAgreement}</StepText>
        </StepItem>
        <StepArrow>
          <ArrowForwardIosIcon />
        </StepArrow>
        <StepItem>
          <StepCircle>
            <LockOutlinedIcon />
          </StepCircle>
          <StepText>{TEXT.howItWorks.steps.useContainer}</StepText>
        </StepItem>
      </StepsRow>
    </SectionInner>
  </Section>
);

// ─── Location & Contact ───────────────────────────────────────────────────────

const LOCATION_MAPS_LINK = 'https://maps.app.goo.gl/DQrB9kXBRPtNfNJm6';
const LOCATION_MAPS_COORDS = '41.2188356,69.2750915';

const getLocationMapsEmbed = () => {
  return `https://www.google.com/maps?q=${LOCATION_MAPS_COORDS}&hl=ru&z=17&output=embed`;
};

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr min-content;
  gap: 4rem;
  align-items: stretch;

  @media (max-width: ${SCREEN.SMALL}px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const MapBlock = styled.div`
  border-radius: 1rem;
  overflow: hidden;
  position: relative;
  max-height: 36rem;
  height: 100%;
  min-height: 36rem;
  background: ${COLORS.lightBg};

  @media (max-width: ${SCREEN.SMALL}px) {
    min-height: 24rem;
    max-height: 24rem;
    height: 24rem;
  }
`;

const MapIframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: 0;
  display: block;
  pointer-events: none;
`;

const MapLink = styled.a`
  position: absolute;
  inset: 0;
  z-index: 1;
  cursor: pointer;
`;

const LocationTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: 700;
  text-transform: uppercase;
  color: ${COLORS.white};
`;

const LocationText = styled.p`
  font-size: 1.4rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.85);
`;

const ContactFormCard = styled.div`
  background: ${COLORS.blueDark};
  border-radius: 1rem;
  padding: 3.2rem;
  color: ${COLORS.white};
  height: 100%;
  max-height: 36rem;
  min-width: 32rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (max-width: ${SCREEN.SMALL}px) {
    min-width: unset;
    max-height: none;
    height: auto;
    padding: 2.4rem 1.6rem;
  }
`;

const ContactSubmitButton = styled(BaseButton)`
  width: 100%;
  margin-top: auto;
`;

export const LocationContactSection = ({
  handleSendSignUpClick,
}: {
  handleSendSignUpClick: () => void;
}) => (
  <Section id="contacts">
    <SectionInner>
      <ContactGrid>
        <MapBlock>
          <MapIframe
            title={TEXT.location.mapTitle}
            src={getLocationMapsEmbed()}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
          <MapLink
            href={LOCATION_MAPS_LINK}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={TEXT.location.openInGoogleMaps}
          />
        </MapBlock>

        <ContactFormCard>
          <LocationTitle>{TEXT.location.title}</LocationTitle>
          <LocationText>
            {TEXT.location.address}
            <br />
            <br />
            {TEXT.location.description}
          </LocationText>
          <ContactSubmitButton $variant="yellow" type="button" onClick={handleSendSignUpClick}>
            {TEXT.navbar.submitRequest}
          </ContactSubmitButton>
        </ContactFormCard>
      </ContactGrid>
    </SectionInner>
  </Section>
);

// ─── FAQ ──────────────────────────────────────────────────────────────────────

const FAQList = styled.div`
  max-width: 96rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const FAQItem = styled.div<{ $open: boolean }>`
  background: ${COLORS.white};
  border-radius: 0.6rem;
  border: 0.1rem solid rgba(27, 91, 181, 0.12);
  overflow: hidden;
`;

const FAQQuestionHeading = styled.h3`
  margin: 0;
  font: inherit;
`;

const FAQQuestionButton = styled.button<{ $open: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.6rem;
  padding: 1.8rem 2.4rem;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  font-family: inherit;
  font-size: 1.5rem;
  font-weight: 600;
  color: ${COLORS.blueDark};

  svg {
    font-size: 2.4rem;
    color: ${COLORS.blue};
    transition: transform 0.2s;
    transform: rotate(${({ $open }) => ($open ? '180deg' : '0')});
    flex-shrink: 0;
  }

  @media (max-width: ${SCREEN.SMALL}px) {
    padding: 1.6rem;
    font-size: 1.4rem;
    gap: 1.2rem;
  }
`;

const FAQAnswer = styled.div<{ $open: boolean }>`
  max-height: ${({ $open }) => ($open ? '20rem' : '0')};
  overflow: hidden;
  transition: max-height 0.3s ease;

  p {
    padding: 0 2.4rem 1.8rem;
    font-size: 1.4rem;
    line-height: 1.6;
    color: ${COLORS.textMuted};
  }

  @media (max-width: ${SCREEN.SMALL}px) {
    p {
      padding: 0 1.6rem 1.6rem;
      font-size: 1.3rem;
    }
  }
`;

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <Section id="faq" $bg="gray">
      <SectionInner>
        <SectionTitle>{TEXT.faq.title}</SectionTitle>
        <FAQList>
          <FAQItem $open={openIndex === 0}>
            <FAQQuestionHeading>
              <FAQQuestionButton
                type="button"
                $open={openIndex === 0}
                aria-expanded={openIndex === 0}
                onClick={() => setOpenIndex(openIndex === 0 ? null : 0)}
              >
                {TEXT.faq.items.rentalCost.question}
                <ExpandMoreIcon aria-hidden />
              </FAQQuestionButton>
            </FAQQuestionHeading>
            <FAQAnswer $open={openIndex === 0}>
              <p>{TEXT.faq.items.rentalCost.answer}</p>
            </FAQAnswer>
          </FAQItem>
          <FAQItem $open={openIndex === 1}>
            <FAQQuestionHeading>
              <FAQQuestionButton
                type="button"
                $open={openIndex === 1}
                aria-expanded={openIndex === 1}
                onClick={() => setOpenIndex(openIndex === 1 ? null : 1)}
              >
                {TEXT.faq.items.siteGuarded.question}
                <ExpandMoreIcon aria-hidden />
              </FAQQuestionButton>
            </FAQQuestionHeading>
            <FAQAnswer $open={openIndex === 1}>
              <p>{TEXT.faq.items.siteGuarded.answer}</p>
            </FAQAnswer>
          </FAQItem>
          <FAQItem $open={openIndex === 2}>
            <FAQQuestionHeading>
              <FAQQuestionButton
                type="button"
                $open={openIndex === 2}
                aria-expanded={openIndex === 2}
                onClick={() => setOpenIndex(openIndex === 2 ? null : 2)}
              >
                {TEXT.faq.items.businessStorage.question}
                <ExpandMoreIcon aria-hidden />
              </FAQQuestionButton>
            </FAQQuestionHeading>
            <FAQAnswer $open={openIndex === 2}>
              <p>{TEXT.faq.items.businessStorage.answer}</p>
            </FAQAnswer>
          </FAQItem>
          <FAQItem $open={openIndex === 3}>
            <FAQQuestionHeading>
              <FAQQuestionButton
                type="button"
                $open={openIndex === 3}
                aria-expanded={openIndex === 3}
                onClick={() => setOpenIndex(openIndex === 3 ? null : 3)}
              >
                {TEXT.faq.items.minimumPeriod.question}
                <ExpandMoreIcon aria-hidden />
              </FAQQuestionButton>
            </FAQQuestionHeading>
            <FAQAnswer $open={openIndex === 3}>
              <p>{TEXT.faq.items.minimumPeriod.answer}</p>
            </FAQAnswer>
          </FAQItem>
          <FAQItem $open={openIndex === 4}>
            <FAQQuestionHeading>
              <FAQQuestionButton
                type="button"
                $open={openIndex === 4}
                aria-expanded={openIndex === 4}
                onClick={() => setOpenIndex(openIndex === 4 ? null : 4)}
              >
                {TEXT.faq.items.siteAccess.question}
                <ExpandMoreIcon aria-hidden />
              </FAQQuestionButton>
            </FAQQuestionHeading>
            <FAQAnswer $open={openIndex === 4}>
              <p>{TEXT.faq.items.siteAccess.answer}</p>
            </FAQAnswer>
          </FAQItem>
        </FAQList>
      </SectionInner>
    </Section>
  );
};

// ─── Footer ───────────────────────────────────────────────────────────────────

const FooterBase = styled.footer`
  background: ${COLORS.blueDarker};
  color: ${COLORS.white};
  padding: 6rem 0 3rem;

  @media (max-width: ${SCREEN.MEDIUM}px) {
    padding: 5rem 0 2.8rem;
  }

  @media (max-width: ${SCREEN.SMALL}px) {
    padding: 4rem 0 2.4rem;
  }
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr max-content;
  gap: 4rem;
  margin-bottom: 4rem;

  @media (max-width: ${SCREEN.MEDIUM}px) {
    grid-template-columns: 1fr 1fr;
    gap: 3rem 2.4rem;
    margin-bottom: 3.2rem;
  }

  @media (max-width: ${SCREEN.SMALL}px) {
    grid-template-columns: 1fr;
    gap: 3rem;
    margin-bottom: 3rem;
  }
`;

const FooterLogo = styled.div`
  margin: -1rem 0 2rem;

  @media (max-width: ${SCREEN.MEDIUM}px) {
    margin: -0.5rem 0 2.3rem;
  }

  @media (max-width: ${SCREEN.SMALL}px) {
    margin-bottom: 0;
  }
`;

const FooterDesc = styled.p`
  font-size: 1.3rem;
  line-height: 1.6;
  opacity: 0.75;
  max-width: 28rem;

  @media (max-width: ${SCREEN.MEDIUM}px) {
    max-width: none;
  }

  @media (max-width: ${SCREEN.SMALL}px) {
    margin-top: 1.6rem;
  }
`;

const FooterHeading = styled.h4`
  font-size: 1.4rem;
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 1.6rem;
  letter-spacing: 0.04em;

  @media (max-width: ${SCREEN.MEDIUM}px) {
    margin-bottom: 1.2rem;
  }
`;

const FooterLinks = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  a {
    font-size: 1.3rem;
    color: rgba(255, 255, 255, 0.75);
    cursor: pointer;
    transition: color 0.2s;

    &:hover {
      color: ${COLORS.white};
    }
  }
`;

const FooterContactItem = styled.p`
  font-size: 1.3rem;
  line-height: 1.7;
  opacity: 0.75;
  margin-bottom: 0.4rem;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1.2rem;
`;

const SocialButton = styled.a`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  border: 0.15rem solid rgba(255, 255, 255, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${COLORS.white};
  transition:
    background 0.2s,
    border-color 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: ${COLORS.white};
  }

  svg {
    font-size: 2rem;
  }
`;

const FooterBottom = styled.div`
  border-top: 0.1rem solid rgba(255, 255, 255, 0.12);
  padding-top: 2.4rem;
  text-align: center;
  font-size: 1.2rem;
  opacity: 0.6;

  @media (max-width: ${SCREEN.MEDIUM}px) {
    padding-top: 2rem;
  }
`;

export const LandingFooter = ({ handleOpenTelegram }: { handleOpenTelegram: () => void }) => (
  <FooterBase>
    <SectionInner>
      <FooterGrid>
        <div>
          <FooterLogo>
            <Logo isInverted />
          </FooterLogo>
          <FooterDesc>{TEXT.footer.description}</FooterDesc>
        </div>

        <div>
          <FooterHeading>{TEXT.footer.navigation}</FooterHeading>
          <FooterLinks>
            {NAV_LINKS.map(({ id }) => (
              <li key={id}>
                <a href={`#${id}`} onClick={(e) => scrollTo(e, id)}>
                  {getNavLabel(id)}
                </a>
              </li>
            ))}
          </FooterLinks>
        </div>

        <div>
          <FooterHeading>{TEXT.footer.contacts}</FooterHeading>
          <FooterContactItem>
            <a href={`tel:${CONTACT.PHONE_NUMBER}`} style={{ color: 'inherit' }}>
              {CONTACT.PHONE_FORMAT}
            </a>
          </FooterContactItem>
          <FooterContactItem>{TEXT.footer.address}</FooterContactItem>
          <FooterContactItem>{TEXT.footer.hours}</FooterContactItem>
          <div style={{ marginTop: '1.6rem' }}>
            <BaseButton $variant="white" type="button" onClick={handleOpenTelegram}>
              <TelegramIcon sx={{ fontSize: '1.6rem' }} />
              {TEXT.footer.telegram}
            </BaseButton>
          </div>
        </div>

        <div>
          <FooterHeading>{TEXT.footer.followUs}</FooterHeading>
          <SocialLinks>
            <SocialButton
              href={CONTACT.TELEGRAM_LINK}
              aria-label={TEXT.footer.telegramAriaLabel}
              target="_blank"
            >
              <TelegramIcon />
            </SocialButton>
            <SocialButton href="#" aria-label={TEXT.footer.instagramAriaLabel}>
              <InstagramIcon />
            </SocialButton>
            <SocialButton href="#" aria-label={TEXT.footer.facebookAriaLabel}>
              <FacebookOutlinedIcon />
            </SocialButton>
          </SocialLinks>
        </div>
      </FooterGrid>

      <FooterBottom>{TEXT.footer.copyright}</FooterBottom>
    </SectionInner>
  </FooterBase>
);

// ─── Floating Telegram ────────────────────────────────────────────────────────

const FloatingTelegram = styled.a`
  position: fixed;
  right: 2.4rem;
  bottom: 2.4rem;
  width: 5.6rem;
  height: 5.6rem;
  border-radius: 50%;
  background: ${COLORS.blue};
  color: ${COLORS.white};
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0.4rem 1.6rem rgba(27, 91, 181, 0.4);
  z-index: 999;
  transition:
    transform 0.2s,
    box-shadow 0.2s;

  &:hover {
    transform: scale(1.08);
    box-shadow: 0 0.6rem 2rem rgba(27, 91, 181, 0.5);
  }

  svg {
    font-size: 2.8rem;
  }

  @media (max-width: ${SCREEN.SMALL}px) {
    right: 1.6rem;
    bottom: 1.6rem;
    width: 5rem;
    height: 5rem;

    svg {
      font-size: 2.4rem;
    }
  }
`;

export const FloatingTelegramButton = () => (
  <FloatingTelegram
    href={CONTACT.TELEGRAM_LINK}
    aria-label={TEXT.floatingTelegram.ariaLabel}
    target="_blank"
  >
    <TelegramIcon />
  </FloatingTelegram>
);

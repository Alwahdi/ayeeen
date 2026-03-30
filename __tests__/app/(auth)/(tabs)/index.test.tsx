import { render, screen } from '@testing-library/react-native';

import HomeScreen from '@/app/(auth)/(tabs)/index';

const mockPush = jest.fn();

jest.mock('@clerk/expo', () => ({
  useUser: () => ({
    user: {
      firstName: 'Ahmad',
      fullName: 'Ahmad Alwahdi',
      primaryEmailAddress: { emailAddress: 'ahmad@test.com' },
    },
    isLoaded: true,
  }),
}));

jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: mockPush,
    replace: jest.fn(),
    back: jest.fn(),
  }),
}));

describe('HomeScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the user greeting', () => {
    render(<HomeScreen />);

    expect(screen.getByText('Ahmad')).toBeTruthy();
  });

  it('displays the greeting based on time of day', () => {
    render(<HomeScreen />);

    // Greeting text is in a separate Text element (e.g., "Good Morning 👋")
    const greetings = ['Good Morning', 'Good Afternoon', 'Good Evening'];
    const found = greetings.some((g) => {
      try {
        screen.getByText(new RegExp(g));
        return true;
      } catch {
        return false;
      }
    });
    expect(found).toBe(true);
  });

  it('renders the hero card', () => {
    render(<HomeScreen />);

    expect(screen.getByText(/How can I help/)).toBeTruthy();
    expect(screen.getByText('Ask Ayeeen')).toBeTruthy();
  });

  it('renders the Arabic hero text', () => {
    render(<HomeScreen />);

    expect(screen.getByText(/كيف يمكنني مساعدتك/)).toBeTruthy();
  });

  it('renders the features section', () => {
    render(<HomeScreen />);

    expect(screen.getByText('Features')).toBeTruthy();
    expect(screen.getByText(/المميزات/)).toBeTruthy();
  });

  it('renders all feature cards', () => {
    render(<HomeScreen />);

    expect(screen.getByText('Object Detection')).toBeTruthy();
    expect(screen.getByText('Text Reader')).toBeTruthy();
    expect(screen.getByText('Scene Description')).toBeTruthy();
    expect(screen.getByText('Voice Assistant')).toBeTruthy();
    expect(screen.getByText('Navigation')).toBeTruthy();
    expect(screen.getByText('Product Scanner')).toBeTruthy();
    expect(screen.getByText('Fashion Advisor')).toBeTruthy();
    expect(screen.getByText('Remote Help')).toBeTruthy();
  });

  it('renders Arabic titles for all features', () => {
    render(<HomeScreen />);

    expect(screen.getByText('التعرف على الأشياء')).toBeTruthy();
    expect(screen.getByText('قارئ النصوص')).toBeTruthy();
    expect(screen.getByText('وصف المشهد')).toBeTruthy();
    expect(screen.getByText('المساعد الصوتي')).toBeTruthy();
    expect(screen.getByText('التنقل')).toBeTruthy();
    expect(screen.getByText('قارئ المنتجات')).toBeTruthy();
    expect(screen.getByText('مستشار الأزياء')).toBeTruthy();
    expect(screen.getByText('المساعدة عن بُعد')).toBeTruthy();
  });

  it('shows "Coming Soon" badges on upcoming features', () => {
    render(<HomeScreen />);

    const comingSoonBadges = screen.getAllByText('Coming Soon');
    // Navigation, Product Scanner, Fashion Advisor, Remote Help
    expect(comingSoonBadges.length).toBe(4);
  });

  it('renders user initial in profile button', () => {
    render(<HomeScreen />);

    expect(screen.getByText('A')).toBeTruthy();
  });

  it('renders the eye emoji in hero section', () => {
    render(<HomeScreen />);

    expect(screen.getByText('👁️')).toBeTruthy();
  });
});

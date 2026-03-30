import { render, screen } from '@testing-library/react-native';

import SettingsScreen from '@/app/(auth)/(tabs)/settings';

const mockSignOut = jest.fn();
const mockReplace = jest.fn();

jest.mock('@clerk/expo', () => ({
  useAuth: () => ({
    isSignedIn: true,
    isLoaded: true,
    signOut: mockSignOut,
  }),
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
    push: jest.fn(),
    replace: mockReplace,
    back: jest.fn(),
  }),
}));

describe('SettingsScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the user profile info', () => {
    render(<SettingsScreen />);

    expect(screen.getByText('Ahmad Alwahdi')).toBeTruthy();
    expect(screen.getByText('ahmad@test.com')).toBeTruthy();
  });

  it('renders the user initial avatar', () => {
    render(<SettingsScreen />);

    expect(screen.getByText('A')).toBeTruthy();
  });

  it('renders General settings section', () => {
    render(<SettingsScreen />);

    expect(screen.getByText('General')).toBeTruthy();
    expect(screen.getByText('Language')).toBeTruthy();
    expect(screen.getByText('Speech Settings')).toBeTruthy();
    expect(screen.getByText('Haptic Feedback')).toBeTruthy();
    expect(screen.getByText('Appearance')).toBeTruthy();
  });

  it('renders Accessibility settings section', () => {
    render(<SettingsScreen />);

    expect(screen.getByText('Accessibility')).toBeTruthy();
    expect(screen.getByText('Text Size')).toBeTruthy();
    expect(screen.getByText('Speech Rate')).toBeTruthy();
    expect(screen.getByText('Verbosity')).toBeTruthy();
  });

  it('renders About section', () => {
    render(<SettingsScreen />);

    expect(screen.getByText('About')).toBeTruthy();
    expect(screen.getByText('About Ayeeen')).toBeTruthy();
    expect(screen.getByText('Help & Support')).toBeTruthy();
    expect(screen.getByText('Privacy Policy')).toBeTruthy();
  });

  it('renders Arabic labels for settings items', () => {
    render(<SettingsScreen />);

    expect(screen.getByText('اللغة')).toBeTruthy();
    expect(screen.getByText('إعدادات الصوت')).toBeTruthy();
    expect(screen.getByText('الاهتزاز')).toBeTruthy();
    expect(screen.getByText('المظهر')).toBeTruthy();
    expect(screen.getByText('حجم الخط')).toBeTruthy();
    expect(screen.getByText('سرعة القراءة')).toBeTruthy();
    expect(screen.getByText('مستوى التفصيل')).toBeTruthy();
  });

  it('renders current setting values', () => {
    render(<SettingsScreen />);

    expect(screen.getByText('English')).toBeTruthy();
    expect(screen.getByText('On')).toBeTruthy();
    expect(screen.getByText('System')).toBeTruthy();
    expect(screen.getByText('Large')).toBeTruthy();
    expect(screen.getByText('Detailed')).toBeTruthy();
  });

  it('renders the sign-out button', () => {
    render(<SettingsScreen />);

    expect(screen.getByText('Sign Out')).toBeTruthy();
    expect(screen.getByText('تسجيل الخروج')).toBeTruthy();
  });

  it('renders the version info', () => {
    render(<SettingsScreen />);

    expect(screen.getByText('عين — Ayeeen v1.0.0')).toBeTruthy();
  });

  it('has accessibility labels on settings items', () => {
    render(<SettingsScreen />);

    expect(screen.getByLabelText('Language - اللغة')).toBeTruthy();
    expect(screen.getByLabelText('Speech Settings - إعدادات الصوت')).toBeTruthy();
    expect(screen.getByLabelText('Sign Out - تسجيل الخروج')).toBeTruthy();
  });
});

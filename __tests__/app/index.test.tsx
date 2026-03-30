import { fireEvent, render, screen } from '@testing-library/react-native';

import WelcomeScreen from '@/app/index';

// Override useAuth for this test to simulate signed-out state
jest.mock('@clerk/expo', () => ({
  useAuth: () => ({
    isSignedIn: false,
    isLoaded: true,
  }),
}));

const mockPush = jest.fn();
const mockReplace = jest.fn();
jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: mockPush,
    replace: mockReplace,
    back: jest.fn(),
  }),
  Link: ({ children }: { children: React.ReactNode }) => children,
}));

describe('WelcomeScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the app branding correctly', () => {
    render(<WelcomeScreen />);

    expect(screen.getByText('عين')).toBeTruthy();
    expect(screen.getByText('Ayeeen')).toBeTruthy();
    expect(screen.getByText('👁️')).toBeTruthy();
  });

  it('renders the app description', () => {
    render(<WelcomeScreen />);

    expect(screen.getByText(/Your AI-Powered/)).toBeTruthy();
    expect(screen.getByText(/Vision Assistant/)).toBeTruthy();
  });

  it('renders the Arabic description', () => {
    render(<WelcomeScreen />);

    expect(screen.getByText(/مساعدك الذكي للرؤية/)).toBeTruthy();
  });

  it('renders navigation buttons', () => {
    render(<WelcomeScreen />);

    expect(screen.getByText('Get Started')).toBeTruthy();
    expect(screen.getByText('I have an account')).toBeTruthy();
  });

  it('renders terms of service text', () => {
    render(<WelcomeScreen />);

    expect(screen.getByText(/Terms of Service/)).toBeTruthy();
  });

  it('navigates to sign-up when "Get Started" is pressed', () => {
    render(<WelcomeScreen />);

    const getStartedButton = screen.getByText('Get Started');
    fireEvent.press(getStartedButton);

    expect(mockPush).toHaveBeenCalledWith('/sign-up');
  });

  it('navigates to sign-in when "I have an account" is pressed', () => {
    render(<WelcomeScreen />);

    const signInButton = screen.getByText('I have an account');
    fireEvent.press(signInButton);

    expect(mockPush).toHaveBeenCalledWith('/sign-in');
  });
});

import { fireEvent, render, screen, waitFor } from '@testing-library/react-native';

import SignInScreen from '@/app/sign-in';

const mockCreate = jest.fn().mockResolvedValue({});
const mockPassword = jest.fn().mockResolvedValue({});
const mockFinalize = jest.fn().mockResolvedValue({});
const mockPush = jest.fn();
const mockReplace = jest.fn();
const mockBack = jest.fn();

jest.mock('@clerk/expo', () => ({
  useSignIn: () => ({
    signIn: {
      create: mockCreate,
      password: mockPassword,
      finalize: mockFinalize,
    },
    isLoaded: true,
  }),
}));

jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: mockPush,
    replace: mockReplace,
    back: mockBack,
  }),
  Link: ({ children }: { children: React.ReactNode }) => children,
}));

describe('SignInScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the sign-in form header', () => {
    render(<SignInScreen />);

    expect(screen.getByText('Welcome back')).toBeTruthy();
    expect(screen.getByText(/مرحباً بعودتك/)).toBeTruthy();
  });

  it('renders email and password fields', () => {
    render(<SignInScreen />);

    expect(screen.getByLabelText('Email address')).toBeTruthy();
    expect(screen.getByLabelText('Password')).toBeTruthy();
  });

  it('renders the sign-in button', () => {
    render(<SignInScreen />);

    expect(screen.getByText('Sign In')).toBeTruthy();
  });

  it('renders the back button', () => {
    render(<SignInScreen />);

    expect(screen.getByText('← Back')).toBeTruthy();
  });

  it('renders the sign-up link', () => {
    render(<SignInScreen />);

    expect(screen.getByText(/Don't have an account/)).toBeTruthy();
    expect(screen.getByText('Sign Up')).toBeTruthy();
  });

  it('allows entering email and password', () => {
    render(<SignInScreen />);

    const emailInput = screen.getByLabelText('Email address');
    const passwordInput = screen.getByLabelText('Password');

    fireEvent.changeText(emailInput, 'user@test.com');
    fireEvent.changeText(passwordInput, 'password123');

    expect(emailInput.props.value).toBe('user@test.com');
    expect(passwordInput.props.value).toBe('password123');
  });

  it('calls sign-in flow when form is submitted', async () => {
    render(<SignInScreen />);

    const emailInput = screen.getByLabelText('Email address');
    const passwordInput = screen.getByLabelText('Password');
    const signInButton = screen.getByText('Sign In');

    fireEvent.changeText(emailInput, 'user@test.com');
    fireEvent.changeText(passwordInput, 'password123');
    fireEvent.press(signInButton);

    await waitFor(() => {
      expect(mockCreate).toHaveBeenCalledWith({ identifier: 'user@test.com' });
    });

    await waitFor(() => {
      expect(mockPassword).toHaveBeenCalledWith({
        password: 'password123',
        identifier: 'user@test.com',
      });
    });

    await waitFor(() => {
      expect(mockFinalize).toHaveBeenCalled();
    });
  });

  it('displays error when sign-in fails', async () => {
    mockCreate.mockResolvedValueOnce({
      error: { message: 'Invalid email address' },
    });

    render(<SignInScreen />);

    const emailInput = screen.getByLabelText('Email address');
    const passwordInput = screen.getByLabelText('Password');
    const signInButton = screen.getByText('Sign In');

    fireEvent.changeText(emailInput, 'bad@email');
    fireEvent.changeText(passwordInput, 'pass');
    fireEvent.press(signInButton);

    await waitFor(() => {
      expect(screen.getByText('Invalid email address')).toBeTruthy();
    });
  });

  it('displays error when password is incorrect', async () => {
    mockCreate.mockResolvedValueOnce({});
    mockPassword.mockResolvedValueOnce({
      error: { message: 'Invalid credentials.' },
    });

    render(<SignInScreen />);

    const emailInput = screen.getByLabelText('Email address');
    const passwordInput = screen.getByLabelText('Password');
    const signInButton = screen.getByText('Sign In');

    fireEvent.changeText(emailInput, 'user@test.com');
    fireEvent.changeText(passwordInput, 'wrongpass');
    fireEvent.press(signInButton);

    await waitFor(() => {
      expect(screen.getByText('Invalid credentials.')).toBeTruthy();
    });
  });

  it('handles unexpected errors gracefully', async () => {
    mockCreate.mockRejectedValueOnce(new Error('Network error'));

    render(<SignInScreen />);

    const emailInput = screen.getByLabelText('Email address');
    const passwordInput = screen.getByLabelText('Password');
    const signInButton = screen.getByText('Sign In');

    fireEvent.changeText(emailInput, 'user@test.com');
    fireEvent.changeText(passwordInput, 'password123');
    fireEvent.press(signInButton);

    await waitFor(() => {
      expect(screen.getByText('An unexpected error occurred. Please try again.')).toBeTruthy();
    });
  });

  it('navigates back when back button is pressed', () => {
    render(<SignInScreen />);

    const backButton = screen.getByText('← Back');
    fireEvent.press(backButton);

    expect(mockBack).toHaveBeenCalled();
  });
});

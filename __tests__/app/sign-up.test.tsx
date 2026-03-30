import { fireEvent, render, screen, waitFor } from '@testing-library/react-native';

import SignUpScreen from '@/app/sign-up';

const mockPasswordFn = jest.fn().mockResolvedValue({});
const mockSendEmailCode = jest.fn().mockResolvedValue({});
const mockVerifyEmailCode = jest.fn().mockResolvedValue({});
const mockFinalize = jest.fn().mockResolvedValue({});
const mockPush = jest.fn();
const mockReplace = jest.fn();
const mockBack = jest.fn();

jest.mock('@clerk/expo', () => ({
  useSignUp: () => ({
    signUp: {
      password: mockPasswordFn,
      verifications: {
        sendEmailCode: mockSendEmailCode,
        verifyEmailCode: mockVerifyEmailCode,
      },
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

describe('SignUpScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the sign-up form header', () => {
    render(<SignUpScreen />);

    const createAccountTexts = screen.getAllByText('Create Account');
    expect(createAccountTexts.length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(/أنشئ حسابك/)).toBeTruthy();
  });

  it('renders email and password fields', () => {
    render(<SignUpScreen />);

    expect(screen.getByLabelText('Email address')).toBeTruthy();
    expect(screen.getByLabelText('Password')).toBeTruthy();
  });

  it('renders the create account button', () => {
    render(<SignUpScreen />);

    // "Create Account" appears both as header text and button text
    const createAccountTexts = screen.getAllByText('Create Account');
    expect(createAccountTexts.length).toBe(2);
  });

  it('renders the back button', () => {
    render(<SignUpScreen />);

    expect(screen.getByText('← Back')).toBeTruthy();
  });

  it('renders the sign-in link', () => {
    render(<SignUpScreen />);

    expect(screen.getByText(/Already have an account/)).toBeTruthy();
    expect(screen.getByText('Sign In')).toBeTruthy();
  });

  it('allows entering email and password', () => {
    render(<SignUpScreen />);

    const emailInput = screen.getByLabelText('Email address');
    const passwordInput = screen.getByLabelText('Password');

    fireEvent.changeText(emailInput, 'newuser@test.com');
    fireEvent.changeText(passwordInput, 'securepass123');

    expect(emailInput.props.value).toBe('newuser@test.com');
    expect(passwordInput.props.value).toBe('securepass123');
  });

  it('starts sign-up flow and shows verification screen', async () => {
    render(<SignUpScreen />);

    const emailInput = screen.getByLabelText('Email address');
    const passwordInput = screen.getByLabelText('Password');

    fireEvent.changeText(emailInput, 'newuser@test.com');
    fireEvent.changeText(passwordInput, 'securepass123');

    // Find and press the Create Account button (not the header text)
    const buttons = screen.getAllByText('Create Account');
    // The button text is inside a Pressable
    const createButton = buttons[buttons.length - 1];
    fireEvent.press(createButton);

    await waitFor(() => {
      expect(mockPasswordFn).toHaveBeenCalledWith({
        emailAddress: 'newuser@test.com',
        password: 'securepass123',
      });
    });

    await waitFor(() => {
      expect(mockSendEmailCode).toHaveBeenCalled();
    });

    // After successful sign-up, should show verification screen
    await waitFor(() => {
      expect(screen.getByText('Verify Email')).toBeTruthy();
    });
  });

  it('shows verification code input after successful sign-up', async () => {
    render(<SignUpScreen />);

    const emailInput = screen.getByLabelText('Email address');
    const passwordInput = screen.getByLabelText('Password');

    fireEvent.changeText(emailInput, 'user@test.com');
    fireEvent.changeText(passwordInput, 'pass123');

    const buttons = screen.getAllByText('Create Account');
    fireEvent.press(buttons[buttons.length - 1]);

    await waitFor(() => {
      expect(screen.getByLabelText('Verification code')).toBeTruthy();
    });

    await waitFor(() => {
      expect(screen.getByText('Verify & Continue')).toBeTruthy();
    });
  });

  it('verifies email code and completes sign-up', async () => {
    render(<SignUpScreen />);

    // Step 1: Fill sign-up form
    const emailInput = screen.getByLabelText('Email address');
    const passwordInput = screen.getByLabelText('Password');

    fireEvent.changeText(emailInput, 'user@test.com');
    fireEvent.changeText(passwordInput, 'pass123');

    const buttons = screen.getAllByText('Create Account');
    fireEvent.press(buttons[buttons.length - 1]);

    // Step 2: Enter verification code
    await waitFor(() => {
      expect(screen.getByLabelText('Verification code')).toBeTruthy();
    });

    const codeInput = screen.getByLabelText('Verification code');
    fireEvent.changeText(codeInput, '123456');

    const verifyButton = screen.getByText('Verify & Continue');
    fireEvent.press(verifyButton);

    await waitFor(() => {
      expect(mockVerifyEmailCode).toHaveBeenCalledWith({ code: '123456' });
    });

    await waitFor(() => {
      expect(mockFinalize).toHaveBeenCalled();
    });
  });

  it('displays error when sign-up fails', async () => {
    mockPasswordFn.mockResolvedValueOnce({
      error: { message: 'Email already exists' },
    });

    render(<SignUpScreen />);

    const emailInput = screen.getByLabelText('Email address');
    const passwordInput = screen.getByLabelText('Password');

    fireEvent.changeText(emailInput, 'existing@test.com');
    fireEvent.changeText(passwordInput, 'pass123');

    const buttons = screen.getAllByText('Create Account');
    fireEvent.press(buttons[buttons.length - 1]);

    await waitFor(() => {
      expect(screen.getByText('Email already exists')).toBeTruthy();
    });
  });

  it('handles unexpected errors gracefully', async () => {
    mockPasswordFn.mockRejectedValueOnce(new Error('Network error'));

    render(<SignUpScreen />);

    const emailInput = screen.getByLabelText('Email address');
    const passwordInput = screen.getByLabelText('Password');

    fireEvent.changeText(emailInput, 'user@test.com');
    fireEvent.changeText(passwordInput, 'pass123');

    const buttons = screen.getAllByText('Create Account');
    fireEvent.press(buttons[buttons.length - 1]);

    await waitFor(() => {
      expect(screen.getByText('An unexpected error occurred. Please try again.')).toBeTruthy();
    });
  });

  it('navigates back when back button is pressed', () => {
    render(<SignUpScreen />);

    const backButton = screen.getByText('← Back');
    fireEvent.press(backButton);

    expect(mockBack).toHaveBeenCalled();
  });
});

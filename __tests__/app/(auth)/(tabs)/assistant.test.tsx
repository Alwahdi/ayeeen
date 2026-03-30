import { render, screen } from '@testing-library/react-native';

import AssistantScreen from '@/app/(auth)/(tabs)/assistant';

jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  }),
}));

describe('AssistantScreen', () => {
  it('renders the screen header', () => {
    render(<AssistantScreen />);

    expect(screen.getByText('Voice Assistant')).toBeTruthy();
    expect(screen.getByText('المساعد الصوتي')).toBeTruthy();
  });

  it('renders the voice visualization area', () => {
    render(<AssistantScreen />);

    expect(screen.getByText('👁️')).toBeTruthy();
  });

  it('renders the instruction text', () => {
    render(<AssistantScreen />);

    expect(screen.getByText('Tap the mic to start')).toBeTruthy();
    expect(screen.getByText(/اضغط على المايكروفون/)).toBeTruthy();
  });

  it('renders quick action chips', () => {
    render(<AssistantScreen />);

    expect(screen.getByText("What's in front?")).toBeTruthy();
    expect(screen.getByText('Read this text')).toBeTruthy();
    expect(screen.getByText('Describe scene')).toBeTruthy();
  });

  it('renders the mic button with proper accessibility', () => {
    render(<AssistantScreen />);

    const micButton = screen.getByLabelText('Start listening - ابدأ الاستماع');
    expect(micButton).toBeTruthy();
    expect(micButton.props.accessibilityRole).toBe('button');
  });

  it('renders the hold-to-speak hint', () => {
    render(<AssistantScreen />);

    expect(screen.getByText('Hold to speak continuously')).toBeTruthy();
  });

  it('has accessibility labels on quick action chips', () => {
    render(<AssistantScreen />);

    expect(screen.getByLabelText("What's in front? - ما أمامي؟")).toBeTruthy();
    expect(screen.getByLabelText('Read this text - اقرأ لي هذا')).toBeTruthy();
    expect(screen.getByLabelText('Describe scene - صف لي المشهد')).toBeTruthy();
  });
});

import { render, screen } from '@testing-library/react-native';

import CameraScreen from '@/app/(auth)/(tabs)/camera';

describe('CameraScreen', () => {
  it('renders the camera placeholder', () => {
    render(<CameraScreen />);

    expect(screen.getByText('Vision Camera')).toBeTruthy();
    expect(screen.getByText('كاميرا الرؤية')).toBeTruthy();
  });

  it('renders the camera permission notice', () => {
    render(<CameraScreen />);

    expect(
      screen.getByText('Camera permissions will be requested when you start using vision features')
    ).toBeTruthy();
  });

  it('renders mode selector buttons', () => {
    render(<CameraScreen />);

    expect(screen.getByText('Detect')).toBeTruthy();
    expect(screen.getByText('Read')).toBeTruthy();
    expect(screen.getByText('Describe')).toBeTruthy();
  });

  it('renders the capture button with accessibility', () => {
    render(<CameraScreen />);

    const captureButton = screen.getByLabelText('Capture photo for analysis');
    expect(captureButton).toBeTruthy();
    expect(captureButton.props.accessibilityRole).toBe('button');
  });

  it('has accessibility labels on mode buttons', () => {
    render(<CameraScreen />);

    expect(screen.getByLabelText('Detect')).toBeTruthy();
    expect(screen.getByLabelText('Read')).toBeTruthy();
    expect(screen.getByLabelText('Describe')).toBeTruthy();
  });
});

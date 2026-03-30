export const Colors = {
  // Primary purple gradient palette
  primary: {
    50: '#F5F3FF',
    100: '#EDE9FE',
    200: '#DDD6FE',
    300: '#C4B5FD',
    400: '#A78BFA',
    500: '#8B5CF6',
    600: '#7C3AED',
    700: '#6D28D9',
    800: '#5B21B6',
    900: '#4C1D95',
  },
  // Accent colors
  accent: {
    teal: '#2DD4BF',
    pink: '#F472B6',
    amber: '#FBBF24',
    sky: '#38BDF8',
  },
  // Neutral palette
  neutral: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#E5E5E5',
    300: '#D4D4D4',
    400: '#A3A3A3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
  },
  // Semantic colors
  success: '#22C55E',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',
  // Background
  background: {
    light: '#FFFFFF',
    dark: '#0F0B1A',
    card: 'rgba(255, 255, 255, 0.08)',
    cardLight: 'rgba(124, 58, 237, 0.06)',
  },
  // Text
  text: {
    primary: '#171717',
    secondary: '#525252',
    tertiary: '#A3A3A3',
    inverse: '#FFFFFF',
    accent: '#7C3AED',
  },
  // Gradient presets
  gradients: {
    primary: ['#7C3AED', '#A855F7', '#C084FC'] as const,
    dark: ['#1A0B2E', '#2D1B69', '#44337A'] as const,
    card: ['rgba(124, 58, 237, 0.1)', 'rgba(168, 85, 247, 0.05)'] as const,
    sunset: ['#7C3AED', '#EC4899', '#F59E0B'] as const,
  },
} as const;

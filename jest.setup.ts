/* eslint-disable @typescript-eslint/no-require-imports */
// Jest setup file for Ayeeen app tests

// Expo 54's winter runtime installs lazy globals (structuredClone, URL, etc.)
// via Object.defineProperty with getters that do dynamic require() calls.
// When Jest accesses these globals during test execution, the dynamic require
// fails with "import outside of scope" error. Fix by replacing the lazy
// getters with actual values before any test code runs.
Object.defineProperty(globalThis, '__ExpoImportMetaRegistry', {
  value: { url: 'http://localhost:8081' },
  configurable: true,
  enumerable: true,
  writable: true,
});

// Ensure structuredClone is a real function, not a lazy getter
if (typeof globalThis.structuredClone !== 'function') {
  globalThis.structuredClone = (val: unknown) => JSON.parse(JSON.stringify(val));
} else {
  // Force evaluation and replace the lazy getter with the resolved value
  try {
    const fn = globalThis.structuredClone;
    Object.defineProperty(globalThis, 'structuredClone', {
      value: fn,
      configurable: true,
      enumerable: true,
      writable: true,
    });
  } catch {
    globalThis.structuredClone = (val: unknown) => JSON.parse(JSON.stringify(val));
  }
}

// Mock expo-router
jest.mock('expo-router', () => {
  const actual = jest.requireActual('expo-router');
  return {
    ...actual,
    useRouter: () => ({
      push: jest.fn(),
      replace: jest.fn(),
      back: jest.fn(),
      canGoBack: jest.fn(() => true),
    }),
    useLocalSearchParams: () => ({}),
    useSegments: () => [],
    Link: ({ children }: { children: React.ReactNode }) => children,
    Redirect: () => null,
    Slot: () => null,
    Stack: Object.assign(({ children }: { children?: React.ReactNode }) => children ?? null, {
      Screen: () => null,
    }),
    Tabs: Object.assign(({ children }: { children?: React.ReactNode }) => children ?? null, {
      Screen: () => null,
    }),
  };
});

// Mock @clerk/expo
jest.mock('@clerk/expo', () => ({
  useAuth: () => ({
    isSignedIn: false,
    isLoaded: true,
    signOut: jest.fn(),
    userId: null,
  }),
  useUser: () => ({
    user: {
      firstName: 'Test',
      fullName: 'Test User',
      primaryEmailAddress: { emailAddress: 'test@example.com' },
    },
    isLoaded: true,
  }),
  useSignIn: () => ({
    signIn: {
      create: jest.fn().mockResolvedValue({}),
      password: jest.fn().mockResolvedValue({}),
      finalize: jest.fn().mockResolvedValue({}),
    },
    isLoaded: true,
  }),
  useSignUp: () => ({
    signUp: {
      password: jest.fn().mockResolvedValue({}),
      verifications: {
        sendEmailCode: jest.fn().mockResolvedValue({}),
        verifyEmailCode: jest.fn().mockResolvedValue({}),
      },
      finalize: jest.fn().mockResolvedValue({}),
    },
    isLoaded: true,
  }),
  ClerkProvider: ({ children }: { children: React.ReactNode }) => children,
  ClerkLoaded: ({ children }: { children: React.ReactNode }) => children,
}));

// Mock expo-linear-gradient
jest.mock('expo-linear-gradient', () => {
  const { View } = require('react-native');
  return {
    LinearGradient: ({
      children,
      ...props
    }: {
      children?: React.ReactNode;
      [key: string]: unknown;
    }) => {
      const { colors: _colors, start: _start, end: _end, ...viewProps } = props;
      return require('react').createElement(
        View,
        { ...viewProps, testID: 'linear-gradient' },
        children
      );
    },
  };
});

// Mock expo-splash-screen
jest.mock('expo-splash-screen', () => ({
  preventAutoHideAsync: jest.fn(),
  hideAsync: jest.fn(),
}));

// Mock expo-status-bar
jest.mock('expo-status-bar', () => ({
  StatusBar: () => null,
}));

// Mock expo-haptics
jest.mock('expo-haptics', () => ({
  impactAsync: jest.fn(),
  notificationAsync: jest.fn(),
  selectionAsync: jest.fn(),
}));

// Mock expo-secure-store
jest.mock('expo-secure-store', () => ({
  getItemAsync: jest.fn(),
  setItemAsync: jest.fn(),
  deleteItemAsync: jest.fn(),
}));

// Mock react-native-safe-area-context
jest.mock('react-native-safe-area-context', () => {
  const inset = { top: 0, right: 0, bottom: 0, left: 0 };
  return {
    SafeAreaProvider: ({ children }: { children: React.ReactNode }) => children,
    SafeAreaView: ({ children }: { children: React.ReactNode }) => children,
    useSafeAreaInsets: () => inset,
    useSafeAreaFrame: () => ({ x: 0, y: 0, width: 390, height: 844 }),
  };
});

// Mock react-native-gesture-handler
jest.mock('react-native-gesture-handler', () => {
  const { View } = require('react-native');
  return {
    GestureHandlerRootView: ({
      children,
      ...props
    }: {
      children?: React.ReactNode;
      [key: string]: unknown;
    }) => require('react').createElement(View, props, children),
    Swipeable: View,
    DrawerLayout: View,
    State: {},
    PanGestureHandler: View,
    TapGestureHandler: View,
    FlingGestureHandler: View,
    ForceTouchGestureHandler: View,
    LongPressGestureHandler: View,
    ScrollView: require('react-native').ScrollView,
    FlatList: require('react-native').FlatList,
  };
});

// Mock react-native-reanimated
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

// Mock @expo/vector-icons
jest.mock('@expo/vector-icons', () => {
  const { Text } = require('react-native');
  const Icon = ({ name, ...props }: { name: string; [key: string]: unknown }) =>
    require('react').createElement(Text, { ...props, testID: `icon-${name}` }, name);
  return {
    Ionicons: Icon,
    MaterialIcons: Icon,
    FontAwesome: Icon,
  };
});

// Mock react-native-worklets
jest.mock('react-native-worklets', () => ({}));

// Mock nativewind / global.css
jest.mock('../global.css', () => {}, { virtual: true });
jest.mock('./global.css', () => {}, { virtual: true });

// Mock expo-constants
jest.mock('expo-constants', () => ({
  default: {
    expoConfig: {
      extra: {
        eas: { projectId: 'test' },
      },
    },
  },
}));

// Mock expo-updates
jest.mock('expo-updates', () => ({
  checkForUpdateAsync: jest.fn(),
  fetchUpdateAsync: jest.fn(),
  reloadAsync: jest.fn(),
  isEnabled: false,
}));

// Mock lucide-react-native
jest.mock('lucide-react-native', () => {
  const { Text } = require('react-native');
  return new Proxy(
    {},
    {
      get: (_target: unknown, name: string) => {
        if (name === '__esModule') return true;
        return (props: Record<string, unknown>) =>
          require('react').createElement(
            Text,
            { ...props, testID: `lucide-${String(name)}` },
            String(name)
          );
      },
    }
  );
});

// Suppress specific warnings in tests
const originalWarn = console.warn;
console.warn = (...args: unknown[]) => {
  const message = typeof args[0] === 'string' ? args[0] : '';
  if (
    message.includes('NativeWind') ||
    message.includes('Animated') ||
    message.includes('useNativeDriver')
  ) {
    return;
  }
  originalWarn.call(console, ...args);
};

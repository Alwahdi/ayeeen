# 🔵 خطة تنفيذ تطبيق "عين" (Ayeeen) - Implementation Plan

## نظرة عامة | Overview

**عين** هو تطبيق مدعوم بالذكاء الاصطناعي يساعد الأشخاص المكفوفين على "رؤية" العالم من حولهم عن طريق وصف البيئة، قراءة النصوص، التعرف على الأشخاص والأشياء، والتنقل بأمان.

**Ayeeen** is an AI-powered mobile application that helps visually impaired people "see" the world around them by describing the environment, reading text, recognizing people and objects, and navigating safely.

---

## ✅ Current Implementation Status

### What's Already Built

| Component | Status | Details |
|---|---|---|
| **Project Scaffold** | ✅ Complete | React Native 0.81.5 + Expo 54 + TypeScript 5.9 |
| **Authentication** | ✅ Complete | Clerk v3.1.5 with Signals API, sign-in/sign-up/email verification |
| **File-based Routing** | ✅ Complete | Expo Router with `(auth)/(tabs)` layout groups |
| **Auth Guard** | ✅ Complete | Protected routes redirect unsigned users to welcome |
| **Tab Navigation** | ✅ Complete | 4 tabs: Home, Assistant, Vision, Settings |
| **Welcome Screen** | ✅ Complete | Hero card, "Get Started" & "I have account" buttons |
| **Sign-In/Sign-Up** | ✅ Complete | Email/password auth with Clerk Signals API |
| **Home Dashboard** | ✅ Complete | Greeting, hero card, 8 feature cards (4 ready, 4 coming soon) |
| **Voice Assistant** | 🏗️ UI Shell | Mic button, quick action chips, visualization rings (no logic) |
| **Vision Camera** | 🏗️ UI Shell | Mode selector (Detect/Read/Describe), capture button (no camera) |
| **Settings** | ✅ Complete | Profile, language, speech rate, accessibility, about, sign-out |
| **Styling** | ✅ Complete | Tailwind CSS 4 + NativeWind with purple gradient theme |
| **Token Management** | ✅ Complete | Secure token cache via expo-secure-store |
| **Test Suite** | ✅ Complete | 61 tests across 9 files (Jest + Testing Library) |
| **CI/CD** | ✅ Complete | 3 GitHub Actions workflows (test, preview, production) |
| **EAS Build** | ✅ Complete | Configured for iOS + Android builds |
| **Color System** | ✅ Complete | Full design token system in `constants/Colors.ts` |

### What's NOT Built Yet

| Component | Status | Notes |
|---|---|---|
| **Voice Engine (TTS/STT)** | ❌ Not started | No `expo-speech` or audio recording |
| **Camera Integration** | ❌ Not started | No `expo-camera`, just placeholder UI |
| **AI Services** | ❌ Not started | No OpenAI/Gemini integration |
| **OCR** | ❌ Not started | No ML Kit or cloud OCR |
| **Scene Description** | ❌ Not started | No AI vision pipeline |
| **Face Recognition** | ❌ Not started | No face detection/embedding system |
| **GPS Navigation** | ❌ Not started | No `expo-location` or mapping |
| **Indoor Navigation** | ❌ Not started | No BLE/beacon support |
| **Remote Assistance** | ❌ Not started | No WebRTC or signaling server |
| **Barcode Scanner** | ❌ Not started | No barcode scanning |
| **Fashion Advisor** | ❌ Not started | No color/outfit analysis |
| **State Management** | ❌ Not started | No Zustand or global store |
| **Localization (i18n)** | ❌ Not started | Hardcoded strings, no i18n framework |
| **Onboarding** | ❌ Not started | No first-run tutorial |
| **Offline Support** | ❌ Not started | No local caching or offline ML |

---

## 📋 Current Tech Stack

| Category | Technology | Version |
|---|---|---|
| **Framework** | React Native + Expo | 0.81.5 + Expo 54 |
| **Language** | TypeScript | 5.9.2 |
| **Styling** | Tailwind CSS + NativeWind | 4.1.13 + preview |
| **Authentication** | Clerk | 3.1.5 (Signals API) |
| **Routing** | Expo Router | 55.0.8 (file-based) |
| **Package Manager** | npm (CI) | package-lock.json committed |
| **CI/CD** | GitHub Actions + EAS Build | 3 workflows |
| **Testing** | Jest + Testing Library | 30.3.0 + 13.3.3 |
| **Icons** | Ionicons + Lucide | via @expo/vector-icons |
| **Animations** | React Native Reanimated | 4.1.1 |
| **Platforms** | iOS, Android, Web | All supported |

### Current Dependencies (21 production + 11 dev)

**Production:** `@clerk/expo`, `expo`, `expo-router`, `expo-haptics`, `expo-linear-gradient`, `expo-secure-store`, `expo-font`, `expo-constants`, `expo-linking`, `expo-splash-screen`, `expo-status-bar`, `expo-system-ui`, `expo-updates`, `lucide-react-native`, `nativewind`, `postcss`, `@tailwindcss/postcss`, `react`, `react-dom`, `react-native`, `react-native-css`, `react-native-gesture-handler`, `react-native-reanimated`, `react-native-safe-area-context`, `react-native-screens`, `react-native-svg`, `react-native-web`, `react-native-worklets`

**Dev:** `@babel/core`, `@testing-library/react-native`, `@types/jest`, `@types/react`, `eslint`, `eslint-config-expo`, `eslint-config-prettier`, `jest`, `jest-expo`, `prettier`, `prettier-plugin-tailwindcss`, `react-test-renderer`, `tailwindcss`, `typescript`

---

## 🏗️ Architecture Overview

```
┌──────────────────────────────────────────────────────────────────────┐
│                         عين (Ayeeen) App                             │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌────────────────────────────────────────────────────────────────┐  │
│  │                     Presentation Layer                         │  │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────────┐  │  │
│  │  │ Voice UI │ │ Camera   │ │ Nav UI   │ │ Settings/Profile │  │  │
│  │  │ (Tabs)   │ │ UI       │ │          │ │                  │  │  │
│  │  └────┬─────┘ └────┬─────┘ └────┬─────┘ └────────┬─────────┘  │  │
│  └───────┼─────────────┼────────────┼────────────────┼────────────┘  │
│          │             │            │                │                │
│  ┌───────▼─────────────▼────────────▼────────────────▼────────────┐  │
│  │                    Custom React Hooks                           │  │
│  │  useVoiceCommand · useCamera · useSpeech · useLocation ·       │  │
│  │  useAIVision · useOCR · useAccessibility · useHaptic           │  │
│  └────────────────────────────┬───────────────────────────────────┘  │
│                               │                                      │
│  ┌────────────────────────────▼───────────────────────────────────┐  │
│  │                   Core Services Layer                           │  │
│  │  ┌─────────────┐ ┌─────────────┐ ┌────────────┐ ┌──────────┐  │  │
│  │  │ Speech      │ │ Camera      │ │ Location   │ │ State    │  │  │
│  │  │ Engine      │ │ Manager     │ │ Manager    │ │ Store    │  │  │
│  │  │ (TTS+STT)  │ │ (expo-cam)  │ │ (GPS+BLE)  │ │ (Zustand)│  │  │
│  │  └─────────────┘ └─────────────┘ └────────────┘ └──────────┘  │  │
│  └────────────────────────────┬───────────────────────────────────┘  │
│                               │                                      │
│  ┌────────────────────────────▼───────────────────────────────────┐  │
│  │                    AI Services Layer                             │  │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐          │  │
│  │  │ Vision   │ │ OCR      │ │ Face     │ │ Scene    │          │  │
│  │  │ AI       │ │ Service  │ │ Recog.   │ │ Desc.    │          │  │
│  │  ├──────────┤ ├──────────┤ ├──────────┤ ├──────────┤          │  │
│  │  │ Barcode  │ │ Fashion  │ │ Distance │ │ Narrator │          │  │
│  │  │ Scanner  │ │ Advisor  │ │ Estimator│ │ Mode     │          │  │
│  │  └──────────┘ └──────────┘ └──────────┘ └──────────┘          │  │
│  └────────────────────────────┬───────────────────────────────────┘  │
│                               │                                      │
│  ┌────────────────────────────▼───────────────────────────────────┐  │
│  │                  Backend / External APIs                         │  │
│  │  ┌──────────────┐ ┌──────────────┐ ┌──────────────────────┐    │  │
│  │  │ Cloud AI     │ │ WebRTC       │ │ Product Database     │    │  │
│  │  │ GPT-4V /     │ │ Signaling    │ │ (Open Food Facts)    │    │  │
│  │  │ Gemini Pro   │ │ Server       │ │                      │    │  │
│  │  └──────────────┘ └──────────────┘ └──────────────────────┘    │  │
│  │  ┌──────────────┐ ┌──────────────┐ ┌──────────────────────┐    │  │
│  │  │ Google STT   │ │ Mapbox /     │ │ Clerk Auth           │    │  │
│  │  │ (Whisper)    │ │ Google Maps  │ │ (already integrated) │    │  │
│  │  └──────────────┘ └──────────────┘ └──────────────────────┘    │  │
│  └────────────────────────────────────────────────────────────────┘  │
│                                                                      │
│  ┌────────────────────────────────────────────────────────────────┐  │
│  │                    Local Storage Layer                          │  │
│  │  ┌──────────────┐ ┌──────────────┐ ┌──────────────────────┐    │  │
│  │  │ SQLite       │ │ SecureStore  │ │ FileSystem Cache     │    │  │
│  │  │ (faces,prefs)│ │ (tokens)     │ │ (images, responses)  │    │  │
│  │  └──────────────┘ └──────────────┘ └──────────────────────┘    │  │
│  └────────────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────────┘
```

---

## 📁 Target Project Structure

> Files marked ✅ exist. Files marked 🆕 need to be created.

```
ayeeen/
├── app/                                    # Expo Router (file-based routing)
│   ├── _layout.tsx                         # ✅ Root layout (Clerk + SafeArea + Gesture)
│   ├── index.tsx                           # ✅ Welcome screen
│   ├── sign-in.tsx                         # ✅ Sign-in screen
│   ├── sign-up.tsx                         # ✅ Sign-up screen
│   ├── (auth)/                             # ✅ Protected route group
│   │   ├── _layout.tsx                     # ✅ Auth guard layout
│   │   ├── (tabs)/                         # ✅ Tab navigation
│   │   │   ├── _layout.tsx                 # ✅ Tab layout (Home, Assistant, Vision, Settings)
│   │   │   ├── index.tsx                   # ✅ Home dashboard
│   │   │   ├── assistant.tsx               # ✅ Voice assistant (UI shell → needs logic)
│   │   │   ├── camera.tsx                  # ✅ Camera screen (UI shell → needs camera)
│   │   │   └── settings.tsx                # ✅ Settings screen
│   │   ├── scene-description.tsx           # 🆕 Full scene description view
│   │   ├── face-recognition.tsx            # 🆕 Face registration & management
│   │   ├── remote-assist.tsx               # 🆕 Remote video call assistance
│   │   ├── barcode-scanner.tsx             # 🆕 Barcode/product scanner
│   │   └── fashion-advisor.tsx             # 🆕 Color & outfit advisor
│   └── onboarding.tsx                      # 🆕 First-run voice-guided tutorial
│
├── components/                             # Reusable UI components
│   ├── EditScreenInfo.tsx                  # ✅ (placeholder, can be removed)
│   ├── ScreenContent.tsx                   # ✅ (placeholder, can be removed)
│   ├── ui/                                 # 🆕 Accessible base components
│   │   ├── AccessibleText.tsx              # 🆕 Dynamic font sizing, screen reader
│   │   ├── VoiceButton.tsx                 # 🆕 Large haptic-feedback button (min 48x48dp)
│   │   ├── HapticFeedback.tsx              # 🆕 Haptic feedback wrapper
│   │   ├── LoadingPulse.tsx                # 🆕 Haptic pulse loading (no visual spinner)
│   │   └── AccessibleModal.tsx             # 🆕 Voice-announced modal
│   ├── camera/                             # 🆕 Camera components
│   │   ├── CameraView.tsx                  # 🆕 Camera wrapper with permissions
│   │   ├── ObjectOverlay.tsx               # 🆕 Bounding box overlay
│   │   ├── CaptureButton.tsx               # 🆕 Large accessible capture button
│   │   └── ModeSelector.tsx                # 🆕 Camera mode selector (Detect/Read/Describe)
│   ├── voice/                              # 🆕 Voice components
│   │   ├── VoiceCommandListener.tsx        # 🆕 Background voice command listener
│   │   ├── VoiceResponse.tsx               # 🆕 TTS response + visualization
│   │   ├── VoiceIndicator.tsx              # 🆕 Active listening indicator
│   │   └── QuickActionChips.tsx            # 🆕 Preset voice command buttons
│   ├── navigation/                         # 🆕 Navigation components
│   │   ├── NavigationMap.tsx               # 🆕 Map with voice directions
│   │   ├── CompassView.tsx                 # 🆕 Heading indicator
│   │   └── ObstacleAlert.tsx               # 🆕 Urgency-escalating alert
│   └── remote/                             # 🆕 Remote assistance components
│       ├── VideoCall.tsx                   # 🆕 WebRTC video call UI
│       └── VolunteerList.tsx               # 🆕 Available volunteers list
│
├── services/                               # 🆕 Business logic & APIs
│   ├── ai/                                 # 🆕 AI service layer
│   │   ├── vision.ts                       # 🆕 GPT-4V / Gemini Vision wrapper
│   │   ├── ocr.ts                          # 🆕 OCR (on-device ML Kit + cloud)
│   │   ├── scene-description.ts            # 🆕 Scene description with 3 modes
│   │   ├── object-detection.ts             # 🆕 Object detection + distance estimation
│   │   ├── face-recognition.ts             # 🆕 Face detect/embed/match
│   │   ├── fashion-advisor.ts              # 🆕 Color/outfit analysis
│   │   ├── barcode.ts                      # 🆕 Barcode scan + product lookup
│   │   └── prompts.ts                      # 🆕 Arabic AI prompt templates
│   ├── speech/                             # 🆕 Voice engine
│   │   ├── tts.ts                          # 🆕 Text-to-Speech (expo-speech)
│   │   ├── stt.ts                          # 🆕 Speech-to-Text (audio + cloud API)
│   │   └── voice-commands.ts               # 🆕 Command parser + fuzzy matcher
│   ├── navigation/                         # 🆕 Navigation services
│   │   ├── gps-navigation.ts               # 🆕 Outdoor GPS + turn-by-turn
│   │   ├── indoor-navigation.ts            # 🆕 BLE beacon navigation
│   │   └── obstacle-detection.ts           # 🆕 Real-time obstacle alerts
│   ├── communication/                      # 🆕 Remote assistance
│   │   ├── webrtc.ts                       # 🆕 WebRTC video calling
│   │   └── signaling.ts                    # 🆕 Signaling server client
│   └── storage/                            # 🆕 Local data management
│       ├── face-database.ts                # 🆕 SQLite face embeddings store
│       ├── preferences.ts                  # 🆕 User preferences (speech rate, language)
│       └── cache.ts                        # 🆕 Image + response cache
│
├── hooks/                                  # 🆕 Custom React hooks
│   ├── useCamera.ts                        # 🆕 Camera lifecycle + capture
│   ├── useVoiceCommand.ts                  # 🆕 Voice command registration + listening
│   ├── useSpeech.ts                        # 🆕 TTS with queue + priority
│   ├── useLocation.ts                      # 🆕 GPS tracking + heading
│   ├── useAIVision.ts                      # 🆕 Image → AI analysis pipeline
│   ├── useOCR.ts                           # 🆕 Image → text extraction
│   ├── useAccessibility.ts                 # 🆕 Screen reader + dynamic font
│   └── useHaptic.ts                        # 🆕 Haptic patterns (tap, pulse, alert)
│
├── store/                                  # 🆕 Zustand state management
│   ├── app-store.ts                        # 🆕 Global state (language, theme, settings)
│   ├── camera-store.ts                     # 🆕 Camera mode, processing state
│   ├── voice-store.ts                      # 🆕 Listening state, command history
│   └── navigation-store.ts                 # 🆕 Route, position, destination
│
├── types/                                  # 🆕 TypeScript definitions
│   ├── ai.ts                               # 🆕 Vision, OCR, face types
│   ├── navigation.ts                       # 🆕 Route, position, obstacle types
│   ├── voice.ts                            # 🆕 Command, TTS, STT types
│   └── app.ts                              # 🆕 General app types
│
├── utils/                                  # 🆕 Pure utility functions
│   ├── image-processing.ts                 # 🆕 Resize, compress, base64
│   ├── distance-calculator.ts              # 🆕 Object-size-based distance estimation
│   ├── arabic-tts.ts                       # 🆕 Arabic text normalization for TTS
│   └── accessibility.ts                    # 🆕 Touch target validation, contrast
│
├── localization/                           # 🆕 i18n
│   ├── i18n.ts                             # 🆕 i18next configuration
│   ├── ar.json                             # 🆕 Arabic translations
│   └── en.json                             # 🆕 English translations
│
├── constants/                              # Existing
│   └── Colors.ts                           # ✅ Full color system
│
├── lib/                                    # Existing
│   └── auth.ts                             # ✅ Clerk token cache
│
├── assets/                                 # Existing + new
│   ├── icon.png                            # ✅
│   ├── splash.png                          # ✅
│   ├── adaptive-icon.png                   # ✅
│   ├── favicon.png                         # ✅
│   └── sounds/                             # 🆕 Audio feedback
│       ├── alert.mp3                       # 🆕 Obstacle/danger alert
│       ├── success.mp3                     # 🆕 Action complete
│       ├── listening.mp3                   # 🆕 Voice command start
│       └── navigation-beep.mp3             # 🆕 Turn instruction beep
│
├── __tests__/                              # Existing + expand
│   ├── app/                                # ✅ 3 test files
│   ├── app/(auth)/(tabs)/                  # ✅ 4 test files
│   ├── constants/                          # ✅ Colors tests
│   ├── lib/                                # ✅ Auth tests
│   ├── services/                           # 🆕 Service tests
│   │   ├── speech/                         # 🆕 TTS, STT, voice command tests
│   │   ├── ai/                             # 🆕 Vision, OCR, scene tests
│   │   └── navigation/                     # 🆕 GPS, obstacle tests
│   ├── hooks/                              # 🆕 Hook tests
│   └── components/                         # 🆕 Component tests
│
├── App.tsx                                 # ✅ Entry point
├── app.json                                # ✅ Expo config
├── package.json                            # ✅ Dependencies
├── tsconfig.json                           # ✅ TypeScript config
├── babel.config.js                         # ✅ Babel config
├── jest.config.js                          # ✅ Jest config
├── jest.setup.ts                           # ✅ Jest mocks
├── jest.expo-winter-mock.js                # ✅ Expo 54 runtime mock
├── metro.config.js                         # ✅ Metro + NativeWind
├── eslint.config.js                        # ✅ ESLint config
├── prettier.config.js                      # ✅ Prettier config
├── postcss.config.mjs                      # ✅ PostCSS config
├── global.css                              # ✅ Tailwind imports
├── eas.json                                # ✅ EAS Build config
└── IMPLEMENTATION_PLAN.md                  # ✅ This file
```

---

## 📦 New Dependencies Required

### Phase 0-1: Foundation + Voice Engine

| Package | Purpose | Expo SDK? | Install Command |
|---|---|---|---|
| `expo-speech` | Text-to-Speech | ✅ Yes | `npx expo install expo-speech` |
| `expo-av` | Audio recording for STT | ✅ Yes | `npx expo install expo-av` |
| `expo-file-system` | File management, caching | ✅ Yes | `npx expo install expo-file-system` |
| `expo-localization` | Device locale detection | ✅ Yes | `npx expo install expo-localization` |
| `i18next` + `react-i18next` | i18n framework | npm | `npm install i18next react-i18next` |
| `zustand` | State management | npm | `npm install zustand` |

### Phase 2: Camera + Object Recognition

| Package | Purpose | Install Command |
|---|---|---|
| `expo-camera` | Camera access + barcode | `npx expo install expo-camera` |
| `expo-image-manipulator` | Image preprocessing | `npx expo install expo-image-manipulator` |
| `openai` | GPT-4 Vision API | `npm install openai` |

### Phase 3: OCR

| Package | Purpose | Install Command |
|---|---|---|
| `react-native-mlkit-ocr` | On-device OCR | `npm install react-native-mlkit-ocr` |

### Phase 5: Face Recognition

| Package | Purpose | Install Command |
|---|---|---|
| `expo-sqlite` | Local face embedding storage | `npx expo install expo-sqlite` |
| `expo-face-detector` | Face detection (if available) | `npx expo install expo-face-detector` |

### Phase 6: Navigation

| Package | Purpose | Install Command |
|---|---|---|
| `expo-location` | GPS tracking | `npx expo install expo-location` |
| `expo-sensors` | Accelerometer/gyroscope | `npx expo install expo-sensors` |
| `react-native-maps` | Map display | `npm install react-native-maps` |
| `@mapbox/mapbox-sdk` | Turn-by-turn routing | `npm install @mapbox/mapbox-sdk` |

### Phase 7: Remote Assistance

| Package | Purpose | Install Command |
|---|---|---|
| `react-native-webrtc` | Video calling | `npm install react-native-webrtc` |
| `socket.io-client` | Signaling transport | `npm install socket.io-client` |

### Phase 2+: API State & Caching (install when AI services begin)

| Package | Purpose | Install Command |
|---|---|---|
| `@tanstack/react-query` | Server state + API response caching (used from Phase 2 onward for caching AI vision, OCR, and product lookup responses) | `npm install @tanstack/react-query` |

> **Note:** While listed under Phase 2, manual in-memory caching can be used in early phases. Install `@tanstack/react-query` when the number of API endpoints grows and cache invalidation becomes complex.

---

## 🚀 Implementation Phases

---

### Phase 0: Foundation & Infrastructure (Week 1-2) 🏗️

> **Goal:** Set up shared infrastructure that all features depend on.

#### 0.1 State Management (Zustand)
```typescript
// store/app-store.ts
import { create } from 'zustand';

interface AppState {
  language: 'ar' | 'en';
  speechRate: number;           // 0.5 - 2.0
  verbosity: 'brief' | 'normal' | 'detailed';
  hapticIntensity: 'light' | 'medium' | 'heavy';
  highContrastMode: boolean;
  isFirstLaunch: boolean;

  setLanguage: (lang: 'ar' | 'en') => void;
  setSpeechRate: (rate: number) => void;
  setVerbosity: (level: 'brief' | 'normal' | 'detailed') => void;
  setHapticIntensity: (intensity: 'light' | 'medium' | 'heavy') => void;
  toggleHighContrast: () => void;
  completeOnboarding: () => void;
}
```

**Tasks:**
- [ ] Install `zustand`
- [ ] Create `store/app-store.ts` with global settings state
- [ ] Create `store/camera-store.ts` with camera mode + processing state
- [ ] Create `store/voice-store.ts` with listening state + command history
- [ ] Persist settings to AsyncStorage/SecureStore
- [ ] Wire existing Settings screen to Zustand store

#### 0.2 Localization (i18n)
```typescript
// localization/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';

i18n.use(initReactI18next).init({
  resources: { ar: { translation: arTranslations }, en: { translation: enTranslations } },
  lng: Localization.locale.startsWith('ar') ? 'ar' : 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});
```

**Tasks:**
- [ ] Install `i18next`, `react-i18next`, `expo-localization`
- [ ] Create `localization/i18n.ts` with Arabic-first config
- [ ] Create `localization/ar.json` with ~200 Arabic strings covering all screens
- [ ] Create `localization/en.json` with matching English strings
- [ ] Replace ALL hardcoded strings in existing screens with `t()` calls
- [ ] Add i18n provider to `app/_layout.tsx`
- [ ] Set RTL layout direction when language is Arabic

#### 0.3 Accessible UI Components
```typescript
// components/ui/AccessibleText.tsx
interface AccessibleTextProps {
  children: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  priority?: 'normal' | 'high';    // high = announced immediately
  language?: 'ar' | 'en';
}

// components/ui/VoiceButton.tsx
interface VoiceButtonProps {
  onPress: () => void;
  label: string;
  labelAr: string;
  hapticType?: 'light' | 'medium' | 'heavy';
  size?: 'regular' | 'large' | 'xlarge';  // min 48x48dp
}
```

**Tasks:**
- [ ] Create `components/ui/AccessibleText.tsx` with dynamic sizing + screen reader
- [ ] Create `components/ui/VoiceButton.tsx` with haptic feedback + large targets
- [ ] Create `components/ui/HapticFeedback.tsx` wrapper component
- [ ] Create `components/ui/LoadingPulse.tsx` (haptic pulse instead of visual spinner)
- [ ] Create `hooks/useHaptic.ts` with predefined patterns (tap, alert, success, error)
- [ ] Create `hooks/useAccessibility.ts` with screen reader helpers
- [ ] Ensure all existing screens use minimum 48x48dp touch targets
- [ ] Add `accessibilityLabel` (Arabic) and `accessibilityHint` to ALL interactive elements

#### 0.4 Type Definitions
**Tasks:**
- [ ] Create `types/ai.ts` (VisionResult, DetectedObject, OCRResult, SceneDescription)
- [ ] Create `types/voice.ts` (VoiceCommand, TTSOptions, STTResult)
- [ ] Create `types/navigation.ts` (Route, Position, Obstacle)
- [ ] Create `types/app.ts` (AppSettings, UserPreferences)

#### 0.5 Environment & Configuration
**Tasks:**
- [ ] Add new env vars to `.env.example`:
  - `EXPO_PUBLIC_OPENAI_API_KEY` (GPT-4 Vision)
  - `EXPO_PUBLIC_GOOGLE_CLOUD_API_KEY` (STT + Cloud Vision)
  - `EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN` (Navigation)
- [ ] Create `services/api-config.ts` for centralized API configuration
- [ ] Add env var validation on app startup
- [ ] Update `app.json` plugins list for new Expo packages

---

### Phase 1: Voice Engine (TTS + STT + Commands) (Week 2-3) 🗣️

> **Priority: HIGHEST** — Voice is the PRIMARY interaction method for blind users.
> Every subsequent feature depends on the voice engine.

#### 1.1 Text-to-Speech (TTS) Service

```typescript
// services/speech/tts.ts
import * as Speech from 'expo-speech';

interface TTSOptions {
  language?: 'ar' | 'en';
  rate?: number;         // 0.5 - 2.0 (default 1.0)
  pitch?: number;        // 0.5 - 2.0 (default 1.0)
  priority?: 'normal' | 'urgent';  // urgent interrupts current speech
}

class TTSService {
  private queue: Array<{ text: string; options: TTSOptions }> = [];
  private isSpeaking = false;

  async speak(text: string, options?: TTSOptions): Promise<void>;
  stop(): void;
  pause(): void;
  resume(): void;
  setDefaultLanguage(lang: 'ar' | 'en'): void;
  setDefaultRate(rate: number): void;
  isCurrentlySpeaking(): boolean;
  getQueueLength(): number;
  clearQueue(): void;
}

export const tts = new TTSService();
```

**Detailed Implementation:**
- [ ] Install `expo-speech`
- [ ] Create `services/speech/tts.ts`:
  - Message queue with FIFO processing
  - Priority system: `urgent` messages interrupt current speech and jump queue
  - Arabic voice selection (prefer `ar-SA` Saudi Arabic voice)
  - English fallback voice
  - Rate/pitch persistence from Zustand store
  - Haptic pulse on speech start/stop
  - Auto-detect language from text content (Arabic chars → ar, else → en)
- [ ] Create `hooks/useSpeech.ts`:
  - `speak(text, options)` — queue a message
  - `speakNow(text)` — urgent, interrupt current
  - `stop()` — stop and clear queue
  - `isSpeaking` — reactive state
  - `queueLength` — number of pending messages
- [ ] Test: Arabic TTS with multiple voices
- [ ] Test: Queue management with priority interrupts
- [ ] Test: Rate/pitch adjustment

#### 1.2 Speech-to-Text (STT) Service

```typescript
// services/speech/stt.ts
import { Audio } from 'expo-av';

interface STTResult {
  text: string;
  confidence: number;
  language: 'ar' | 'en';
  isFinal: boolean;
}

class STTService {
  private recording: Audio.Recording | null = null;

  async startListening(): Promise<void>;
  stopListening(): Promise<STTResult>;
  cancelListening(): void;
  isListening(): boolean;
  onPartialResult(callback: (text: string) => void): void;
  onFinalResult(callback: (result: STTResult) => void): void;
  onError(callback: (error: Error) => void): void;
}

export const stt = new STTService();
```

**Detailed Implementation:**
- [ ] Install `expo-av`
- [ ] Create `services/speech/stt.ts`:
  - Audio recording using `expo-av` (Audio.Recording)
  - Recording format: WAV or M4A (compatible with cloud STT APIs)
  - Send audio to cloud API for transcription:
    - **Option A:** Google Cloud Speech-to-Text (best Arabic support)
    - **Option B:** OpenAI Whisper API (good accuracy, simpler API)
  - Arabic language recognition (primary)
  - Partial results streaming (if supported by chosen API)
  - Background noise handling (minimum amplitude threshold)
  - Auto-stop after silence (2s timeout)
  - Maximum recording duration (30s safety limit)
- [ ] Create `hooks/useVoiceCommand.ts`:
  - `startListening()` → shows listening indicator + haptic
  - `stopListening()` → processes result → executes command
  - `isListening` — reactive state
  - `lastCommand` — last recognized text
  - `lastResult` — last action result
- [ ] Audio permission handling with voice explanation
- [ ] Test: Arabic voice recognition accuracy
- [ ] Test: Background noise handling
- [ ] Test: Timeout and cancel behavior

#### 1.3 Voice Command Parser & Router

```typescript
// services/speech/voice-commands.ts

interface VoiceCommand {
  id: string;
  patterns: {
    ar: string[];    // Arabic trigger phrases
    en: string[];    // English trigger phrases
  };
  action: () => Promise<void>;
  description: {
    ar: string;
    en: string;
  };
  category: 'vision' | 'reading' | 'navigation' | 'assistance' | 'settings' | 'general';
}

// Command Registry:
const commands: VoiceCommand[] = [
  {
    id: 'detect-objects',
    patterns: {
      ar: ['ما الذي أمامي', 'ماذا أمامي', 'ما هذا', 'تعرف على الأشياء'],
      en: ["what's in front", 'what is this', 'detect objects', 'what do you see'],
    },
    action: () => triggerObjectDetection(),
    description: { ar: 'التعرف على الأشياء أمام الكاميرا', en: 'Identify objects in front of camera' },
    category: 'vision',
  },
  {
    id: 'read-text',
    patterns: {
      ar: ['اقرأ لي هذا', 'اقرأ النص', 'ما المكتوب', 'قراءة'],
      en: ['read this', 'read text', 'what does it say', 'read'],
    },
    action: () => triggerOCR(),
    description: { ar: 'قراءة النص الموجود أمام الكاميرا', en: 'Read text from camera' },
    category: 'reading',
  },
  {
    id: 'describe-scene',
    patterns: {
      ar: ['صف لي المشهد', 'وصف المكان', 'أين أنا', 'ما حولي'],
      en: ['describe scene', 'describe surroundings', 'where am I', 'what is around me'],
    },
    action: () => triggerSceneDescription(),
    description: { ar: 'وصف المشهد الكامل حولك', en: 'Describe the full scene around you' },
    category: 'vision',
  },
  {
    id: 'narrator-mode',
    patterns: {
      ar: ['صف لي ماذا يحدث الآن', 'وضع الراوي', 'احكي لي'],
      en: ['narrate', 'narrator mode', 'tell me what is happening'],
    },
    action: () => triggerNarratorMode(),
    description: { ar: 'سرد ما يحدث حولك بأسلوب قصصي', en: 'Narrate surroundings cinematically' },
    category: 'vision',
  },
  {
    id: 'scan-barcode',
    patterns: {
      ar: ['ما هذا المنتج', 'امسح الباركود', 'تعرف على المنتج'],
      en: ['scan barcode', 'what product', 'scan product'],
    },
    action: () => triggerBarcodeScan(),
    description: { ar: 'مسح الباركود والتعرف على المنتج', en: 'Scan barcode to identify product' },
    category: 'reading',
  },
  {
    id: 'fashion-check',
    patterns: {
      ar: ['كيف ملابسي', 'هل ملابسي متناسقة', 'ألوان ملابسي'],
      en: ['how do I look', 'check my outfit', 'fashion check', 'color match'],
    },
    action: () => triggerFashionAdvisor(),
    description: { ar: 'تحليل تناسق الملابس والألوان', en: 'Analyze outfit color coordination' },
    category: 'assistance',
  },
  {
    id: 'call-volunteer',
    patterns: {
      ar: ['اتصل بمتطوع', 'أحتاج مساعدة', 'ساعدني'],
      en: ['call volunteer', 'need help', 'remote help', 'call for help'],
    },
    action: () => triggerRemoteAssist(),
    description: { ar: 'الاتصال بمتطوع للمساعدة', en: 'Call a volunteer for live help' },
    category: 'assistance',
  },
  {
    id: 'navigate',
    patterns: {
      ar: ['ساعدني في التنقل', 'خذني إلى', 'أريد الذهاب'],
      en: ['navigate to', 'take me to', 'directions to', 'help me navigate'],
    },
    action: () => triggerNavigation(),
    description: { ar: 'بدء التوجيه الصوتي للتنقل', en: 'Start voice-guided navigation' },
    category: 'navigation',
  },
  {
    id: 'help',
    patterns: {
      ar: ['مساعدة', 'ما الأوامر المتاحة', 'ماذا يمكنك فعله'],
      en: ['help', 'what can you do', 'list commands', 'available commands'],
    },
    action: () => listAllCommands(),
    description: { ar: 'عرض جميع الأوامر الصوتية المتاحة', en: 'List all available commands' },
    category: 'general',
  },
];

class VoiceCommandParser {
  matchCommand(text: string): VoiceCommand | null;   // fuzzy match
  getAllCommands(): VoiceCommand[];
  getCommandsByCategory(category: string): VoiceCommand[];
}
```

**Detailed Implementation:**
- [ ] Create `services/speech/voice-commands.ts`:
  - Command registry with Arabic + English patterns
  - Fuzzy matching using normalized text comparison (handle Arabic diacritics, common misspellings)
  - Levenshtein distance for approximate matches (threshold: 70% similarity)
  - Extract parameters from commands (e.g., "خذني إلى المسجد" → destination="المسجد")
  - Confirmation system: speak "جاري تنفيذ..." before action
  - Error handling: "لم أفهم الأمر، حاول مرة أخرى" + list similar commands
- [ ] Wire voice commands to screen navigation and features
- [ ] Implement "help" command that speaks all available commands
- [ ] Write comprehensive tests for Arabic fuzzy matching

#### 1.4 Update Voice Assistant Screen

**Tasks:**
- [ ] Replace static UI in `app/(auth)/(tabs)/assistant.tsx` with working logic:
  - Mic button: tap → start listening, tap again → stop & process
  - Voice visualization: animate rings while listening
  - Quick action chips: trigger specific commands on tap
  - Show last command text and response
  - Continuous mode: hold mic button for ongoing listening
- [ ] Add voice-first tutorial on first visit: "مرحباً بك في عين. اضغط على المايكروفون وقل ما تريد"

---

### Phase 2: Camera & Object Recognition (Week 3-5) 📷

> **Feature 1: التعرف على الأشياء أمام الكاميرا**
>
> Output examples:
> - "أمامك كرسي على بُعد مترين."
> - "شخص يقترب منك من اليمين."

#### 2.1 Camera Service

```typescript
// hooks/useCamera.ts
interface UseCameraReturn {
  // State
  isReady: boolean;
  hasPermission: boolean | null;
  facing: 'front' | 'back';
  isProcessing: boolean;
  lastCapture: string | null;  // image URI

  // Actions
  requestPermission: () => Promise<boolean>;
  capturePhoto: () => Promise<string>;      // returns URI
  toggleFacing: () => void;
  startContinuousCapture: (intervalMs: number) => void;
  stopContinuousCapture: () => void;

  // Camera ref
  cameraRef: React.RefObject<CameraView>;
}
```

**Tasks:**
- [ ] Install `expo-camera`, `expo-image-manipulator`
- [ ] Create `hooks/useCamera.ts`:
  - Permission request with voice explanation ("يحتاج التطبيق للوصول إلى الكاميرا لمساعدتك في الرؤية")
  - Photo capture with haptic feedback
  - Image compression before AI upload (max 1024px, JPEG 80%)
  - Front/back camera toggle
  - Continuous capture mode (every 2-3s for real-time detection)
  - Battery-aware: reduce frame rate when battery < 20%
- [ ] Create `components/camera/CameraView.tsx`:
  - Fullscreen camera preview
  - Accessibility overlay (screen reader announces camera state)
  - Flash control
  - Zoom control
- [ ] Create `components/camera/CaptureButton.tsx`:
  - 80x80dp minimum (extra large for blind users)
  - Strong haptic on capture
  - Pulsing border while processing
- [ ] Update `app/(auth)/(tabs)/camera.tsx` with real camera integration
- [ ] Update `app.json` with camera plugin
- [ ] Update jest mocks for expo-camera

#### 2.2 AI Vision Service (Object Detection)

```typescript
// services/ai/vision.ts
import OpenAI from 'openai';

interface DetectedObject {
  name: string;              // "chair"
  nameArabic: string;        // "كرسي"
  confidence: number;        // 0.0 - 1.0
  position: {
    direction: 'أمامك' | 'على يمينك' | 'على يسارك' | 'خلفك';
    distance?: string;       // "مترين" | "قريب جداً"
  };
  isApproaching?: boolean;   // for moving objects
  urgency: 'info' | 'warning' | 'danger';
}

interface VisionResult {
  objects: DetectedObject[];
  summary: string;           // "أمامك كرسي وطاولة، وشخص على يمينك"
  timestamp: number;
}

// AI Prompt Template (Arabic-first):
const OBJECT_DETECTION_PROMPT = `
أنت مساعد بصري لشخص كفيف. حلل الصورة وأعطي وصفاً دقيقاً بالعربية.

لكل شيء تراه، أذكر:
1. اسم الشيء
2. موقعه التقريبي (أمام، يمين، يسار)
3. المسافة التقريبية (بالأمتار)
4. هل يتحرك نحو الشخص؟

ابدأ بالأشياء الأقرب والأهم أولاً.
رد بصيغة JSON.
`;
```

**Tasks:**
- [ ] Install `openai`
- [ ] Create `services/ai/vision.ts`:
  - GPT-4 Vision API integration (or Google Gemini Vision)
  - Arabic-first prompt engineering for object detection
  - Distance estimation from object size ratios
  - Directional placement (left/right/center using image quadrants)
  - Urgency classification (moving objects → warning/danger)
  - Response caching (same scene within 5s → return cached)
  - Error handling: "عذراً، لم أتمكن من تحليل الصورة. حاول مرة أخرى."
- [ ] Create `services/ai/prompts.ts`:
  - Centralized Arabic prompt templates
  - Prompt variants for different verbosity levels
- [ ] Create `hooks/useAIVision.ts`:
  - `analyzeImage(uri)` → VisionResult
  - `isAnalyzing` state
  - Auto-speak results via TTS
  - Error handling with voice feedback
- [ ] Create `utils/image-processing.ts`:
  - Resize image for API upload (max 1024px)
  - Convert to base64 for API
  - Calculate image quadrants for directional detection
- [ ] Create `utils/distance-calculator.ts`:
  - Estimate distance from known object sizes
  - Arabic distance descriptions ("قريب جداً", "متر واحد", "مترين", "بعيد")

#### 2.3 Real-Time Detection Mode

**Tasks:**
- [ ] Implement periodic frame capture in camera screen (every 2-3s)
- [ ] Smart change detection: compare current frame to previous, only re-analyze if >30% different
- [ ] Priority alerts for approaching objects (haptic + urgent TTS)
- [ ] Battery optimization:
  - Reduce capture rate when device is stationary (use accelerometer)
  - Pause continuous mode when battery < 15%
- [ ] User-controlled start/stop for continuous mode

---

### Phase 3: OCR Text Reader (Week 5-6) 📖

> **Feature 2: قارئ النصوص**
>
> Reads text from: books, signs, screens, official documents, money, bills
> Can summarize long content.

#### 3.1 OCR Service

```typescript
// services/ai/ocr.ts

interface OCRResult {
  fullText: string;
  blocks: TextBlock[];
  language: 'ar' | 'en' | 'mixed';
  confidence: number;
  documentType?: 'book' | 'sign' | 'bill' | 'receipt' | 'medicine' | 'currency' | 'general';
}

interface TextBlock {
  text: string;
  boundingBox: { x: number; y: number; width: number; height: number };
  confidence: number;
}

interface CurrencyResult {
  denomination: string;      // "100"
  currency: string;          // "ريال سعودي"
  confidence: number;
}

class OCRService {
  // On-device OCR (fast, no internet)
  async recognizeTextOnDevice(imageUri: string): Promise<OCRResult>;

  // Cloud OCR (higher accuracy, handles complex layouts)
  async recognizeTextCloud(imageUri: string): Promise<OCRResult>;

  // Auto-select: try on-device first, fallback to cloud
  async recognizeText(imageUri: string): Promise<OCRResult>;

  // Specialized readers
  async recognizeCurrency(imageUri: string): Promise<CurrencyResult>;
  async summarizeText(text: string, maxSentences?: number): Promise<string>;
  async detectDocumentType(imageUri: string): Promise<string>;
}
```

**Tasks:**
- [ ] Install `react-native-mlkit-ocr` (on-device) or evaluate `expo-camera` OCR
- [ ] Create `services/ai/ocr.ts`:
  - **On-device OCR** (ML Kit): fast, offline, good for simple text
  - **Cloud OCR** (Google Cloud Vision or GPT-4V): better for complex layouts, Arabic handwriting
  - Hybrid approach: try on-device first, fallback to cloud for low confidence
  - Arabic text recognition with RTL handling
  - English and mixed-language text support
  - Document structure detection (headers, paragraphs, lists, tables)
  - Currency recognition (Saudi Riyal notes: 1, 5, 10, 50, 100, 500)
- [ ] Create `hooks/useOCR.ts`:
  - `recognizeText(imageUri)` → OCRResult
  - `isProcessing` state
  - Auto-speak full text or summary
  - Handle partial text (pages): "اقرأ المزيد" / "Read more"
- [ ] Text summarization via AI (for documents >200 words):
  - Call GPT-4 to summarize in Arabic
  - Offer both full reading and summary
- [ ] Create specialized readers:
  - **Bill/Invoice**: Extract total, due date, biller name
  - **Medicine label**: Drug name, dosage, warnings (HIGH PRIORITY FOR SAFETY)
  - **Sign reader**: Quick read with directional context

#### 3.2 OCR UI Integration

**Tasks:**
- [ ] Add "Read" mode to camera screen:
  - Auto-detect when text is visible (text highlight overlay)
  - Auto-capture when text is stable (2s no movement)
  - Flash-aware: suggest turning on flashlight for dark areas
- [ ] Reading controls:
  - "أعد القراءة" (re-read)
  - "لخص النص" (summarize)
  - "اقرأ أبطأ / أسرع" (speed control)
- [ ] Copy-to-clipboard with voice confirmation

---

### Phase 4: Scene Description + Smart Narrator (Week 6-7) 🌍

> **Feature 4: وصف المشهد الكامل**
> **Feature 10: وضع الراوي الذكي**
>
> "أنت في حديقة، هناك أطفال يلعبون، أشجار على الجانبين، وكلب يركض."

#### 4.1 Scene Description Service

```typescript
// services/ai/scene-description.ts

type DescriptionMode = 'brief' | 'detailed' | 'narrator';

interface SceneDescription {
  mode: DescriptionMode;
  description: string;
  keyElements: string[];     // ["حديقة", "أطفال", "أشجار", "كلب"]
  atmosphere?: string;       // "جو مشمس ودافئ"
  safety?: string;           // "المنطقة آمنة" or "احذر: حركة سيارات"
}

// Arabic Prompt Templates:
const PROMPTS = {
  brief: `صف لي هذه الصورة في جملة واحدة بالعربية. كن مختصراً ومفيداً.`,

  detailed: `أنت مساعد بصري لشخص كفيف. صف الصورة بالتفصيل بالعربية.
    اذكر:
    1. المكان العام (غرفة، شارع، حديقة...)
    2. الأشياء المهمة وموقعها (أمام، يمين، يسار)
    3. الأشخاص وما يفعلونه
    4. الإضاءة والجو العام
    5. أي مخاطر محتملة
    ابدأ بالأهم.`,

  narrator: `أنت راوي محترف. صف هذا المشهد بأسلوب أدبي جميل بالعربية.
    اجعل الوصف حيوياً وممتعاً، كأنك تسرد مشهداً من فيلم.
    استخدم التشبيهات والصور البلاغية.
    اذكر الأصوات والروائح المتوقعة.
    اجعل الشخص يشعر وكأنه يرى المشهد.`
};
```

**Tasks:**
- [ ] Create `services/ai/scene-description.ts`:
  - Three modes: brief (1 sentence), detailed (full paragraph), narrator (cinematic)
  - Arabic-first with natural, conversational language
  - Spatial relationships in all descriptions
  - Weather/lighting/atmosphere description
  - People's activities and approximate emotions
  - Safety assessment (note hazards, traffic, obstacles)
  - Scene change detection: compare current to previous scene, only describe differences
- [ ] Narrator Mode (الراوي الذكي):
  - Rich, literary Arabic descriptions
  - Include sensory details: sounds, expected smells, temperature
  - Periodic auto-updates in continuous mode (every 10s)
  - Follow-up questions: "أخبرني أكثر عن..." → focused description of specific element
- [ ] Create `app/(auth)/scene-description.tsx` dedicated screen:
  - Full-screen camera with scene description overlay
  - Mode switcher (Brief / Detailed / Narrator)
  - "صف مرة أخرى" (Describe again) button
  - Follow-up question input

---

### Phase 5: Face Recognition (Week 7-8) 👤

> **Feature 3: التعرف على الوجوه (اختياري)**
>
> "أخوك أحمد يقف أمامك."

#### 5.1 Face Recognition Service

```typescript
// services/ai/face-recognition.ts

interface KnownPerson {
  id: string;
  name: string;
  nameArabic: string;
  relationship: string;    // "أخ", "أخت", "صديق", "زميل", "أب", "أم"
  faceEmbeddings: number[][]; // multiple angles stored
  registeredAt: Date;
  lastSeen?: Date;
}

interface DetectedFace {
  boundingBox: BoundingBox;
  landmarks?: FaceLandmark[];
  matchedPerson?: KnownPerson;
  matchConfidence?: number;
  direction: string;        // "أمامك", "على يمينك"
}

class FaceRecognitionService {
  // Detection
  async detectFaces(imageUri: string): Promise<DetectedFace[]>;

  // Registration
  async registerPerson(name: string, relationship: string, images: string[]): Promise<KnownPerson>;
  async addFaceImages(personId: string, images: string[]): Promise<void>;

  // Identification
  async identifyFaces(imageUri: string): Promise<DetectedFace[]>;

  // Management
  async listKnownPeople(): Promise<KnownPerson[]>;
  async deletePerson(personId: string): Promise<void>;
  async updatePerson(personId: string, updates: Partial<KnownPerson>): Promise<void>;
}
```

**Tasks:**
- [ ] Install `expo-sqlite` for local face embedding storage
- [ ] Create `services/ai/face-recognition.ts`:
  - Face detection using ML Kit or Google Vision API
  - Face embedding generation (convert face to vector)
  - Cosine similarity matching (threshold: 0.7)
  - Local SQLite storage for all face data (NEVER upload face data)
  - Multi-angle registration (front, left profile, right profile)
  - Handle multiple faces in single frame
- [ ] Create `services/storage/face-database.ts`:
  - SQLite schema for people and embeddings
  - CRUD operations for known persons
  - Efficient vector search for matching
- [ ] Create `app/(auth)/face-recognition.tsx`:
  - Voice-guided registration flow:
    1. "ما اسم هذا الشخص؟" → voice input
    2. "ما علاقتك به؟" → relationship selection
    3. "التقط صورة من الأمام... الآن من اليمين... الآن من اليسار"
  - Management: list, edit, delete known people (voice-controlled)
- [ ] Privacy: prominently display that face data is stored locally only
- [ ] Write tests for face matching accuracy

---

### Phase 6: Navigation System (Week 8-10) 🧭

> **Feature 6: وضع التنقل (خارجي وداخلي)**
>
> Voice-guided walking directions using GPS + optional BLE for indoors.

#### 6.1 Outdoor GPS Navigation

```typescript
// services/navigation/gps-navigation.ts
import * as Location from 'expo-location';

interface Route {
  origin: Position;
  destination: Position;
  destinationName: string;
  totalDistance: string;       // "كيلومتر واحد"
  totalDuration: string;      // "15 دقيقة مشياً"
  steps: NavigationStep[];
  currentStepIndex: number;
}

interface NavigationStep {
  instruction: string;         // "انعطف يميناً بعد 50 متراً"
  distance: string;
  direction: 'straight' | 'left' | 'right' | 'u-turn' | 'arrive';
  streetName?: string;
}

class GPSNavigationService {
  async searchDestination(query: string): Promise<Place[]>;
  async startNavigation(destination: Place): Promise<Route>;
  getCurrentInstruction(): string;
  getDistanceToNextStep(): string;
  stopNavigation(): void;
  onStepChange(callback: (step: NavigationStep) => void): void;
  onArrival(callback: () => void): void;
}
```

**Tasks:**
- [ ] Install `expo-location`, `expo-sensors`, `react-native-maps`, `@mapbox/mapbox-sdk`
- [ ] Create `services/navigation/gps-navigation.ts`:
  - GPS tracking with high accuracy
  - Mapbox/Google Maps routing API for directions
  - Turn-by-turn voice directions in Arabic
  - Distance countdown: "50 متراً... 30 متراً... 10 أمتار... انعطف يميناً الآن"
  - POI announcements: "مسجد على يمينك", "مطعم على يسارك"
  - ETA updates: "وصولك خلال 10 دقائق"
  - Offline route caching (download route data)
  - Re-routing when off track
- [ ] Create `hooks/useLocation.ts`:
  - Real-time position + heading tracking
  - Background location updates
  - Geofence alerts
  - Permission handling with voice explanation
- [ ] Voice-based destination search:
  - "خذني إلى المسجد" → search nearby mosques
  - "أقرب صيدلية" → nearest pharmacy
  - Confirm destination before starting navigation

#### 6.2 Indoor Navigation (Optional/Future)

**Tasks:**
- [ ] Evaluate BLE beacon options (iBeacon/Eddystone)
- [ ] Create `services/navigation/indoor-navigation.ts`:
  - BLE beacon scanning
  - Triangulation for position within buildings
  - Floor detection
  - Voice guidance: "الباب على يسارك", "الدرج أمامك"
- [ ] This is a **stretch goal** for the MVP — requires physical beacon infrastructure

#### 6.3 Obstacle Detection During Navigation

**Tasks:**
- [ ] Create `services/navigation/obstacle-detection.ts`:
  - Use camera during navigation for real-time obstacle detection
  - Escalating urgency system:
    - >3m: quiet info
    - 1-3m: medium haptic + voice warning
    - <1m: strong haptic + urgent voice: "احذر! عائق أمامك!"
  - Specific obstacle types: steps, curbs, poles, cars
  - Moving object warnings with direction: "سيارة تقترب من اليسار"
- [ ] Create `components/navigation/ObstacleAlert.tsx`:
  - Urgency-based haptic patterns
  - Voice alert with directional info

---

### Phase 7: Remote Assistance (Week 10-11) 📞

> **Feature 7: وضع المساعدة عن بُعد**
>
> Video call with a friend or volunteer for live manual assistance.

#### 7.1 WebRTC Video Call

```typescript
// services/communication/webrtc.ts

interface CallSession {
  id: string;
  remoteUser: { name: string; role: 'volunteer' | 'contact' };
  status: 'connecting' | 'connected' | 'disconnected';
  startTime: Date;
  duration: number;
}

class RemoteAssistService {
  async callVolunteer(): Promise<CallSession>;
  async callContact(contactId: string): Promise<CallSession>;
  endCall(): void;
  toggleMute(): void;
  shareCamera(): void;  // Share blind user's camera feed
  isCallActive(): boolean;
  onRemoteAudioReceived(callback: (audio: ArrayBuffer) => void): void;
}
```

**Tasks:**
- [ ] Install `react-native-webrtc`, `socket.io-client`
- [ ] Create `services/communication/webrtc.ts`:
  - WebRTC peer connection setup
  - Camera stream sharing (blind user's camera → helper's screen)
  - Audio-only for the blind user (saves bandwidth + no visual needed)
  - Call quality monitoring
  - Auto-reconnect on network disruption
- [ ] Create `services/communication/signaling.ts`:
  - Socket.io connection to signaling server
  - Room management
  - ICE candidate exchange
- [ ] Create `app/(auth)/remote-assist.tsx`:
  - "اتصل بمتطوع" button (calls available volunteer)
  - "اتصل بجهة اتصال" (calls saved emergency contacts)
  - During call: camera shared, blind user hears helper
  - End call button with voice confirmation
- [ ] Create `components/remote/VideoCall.tsx`:
  - Minimal UI for blind user (mostly audio interaction)
  - Camera indicator (so user knows camera is active)
  - Mute toggle

**⚠️ Backend Required:** This feature needs a signaling server. Options:
1. Build custom Node.js + Socket.io server
2. Use a managed service (Twilio, Agora, Daily.co)
3. Integrate with **Be My Eyes** API if available

---

### Phase 8: Barcode & Product Scanner (Week 11-12) 🏷️

> **Feature 9: قارئ الباركود والمنتجات**
>
> "هذا نسكافيه كلاسيك 100 غرام."

#### 8.1 Barcode Scanner

```typescript
// services/ai/barcode.ts

interface ProductInfo {
  barcode: string;
  name: string;
  nameArabic: string;
  brand: string;
  category: string;
  weight: string;
  description: string;
  ingredients?: string[];
  allergens?: string[];
  nutritionFacts?: { calories: string; protein: string; sugar: string; fat: string };
  expiryDate?: string;
  price?: string;
}

class BarcodeService {
  // Scan using expo-camera barcode scanner
  async scanBarcode(cameraRef: CameraView): Promise<string>;

  // Lookup product info
  async lookupProduct(barcode: string): Promise<ProductInfo | null>;

  // Read product via AI (when barcode fails)
  async identifyProductByImage(imageUri: string): Promise<ProductInfo | null>;
}
```

**Tasks:**
- [ ] Use `expo-camera` barcode scanning (built-in, no extra dependency)
- [ ] Create `services/ai/barcode.ts`:
  - Support: EAN-13, EAN-8, UPC-A, UPC-E, QR Code, Code 128
  - Product lookup via **Open Food Facts API** (free, open source)
  - Fallback: GPT-4V to identify product from image if barcode fails
  - Arabic product name translation
  - Ingredient reading with allergen warnings (nuts, gluten, dairy)
  - Expiry date detection and warnings
- [ ] Create `app/(auth)/barcode-scanner.tsx`:
  - Camera in barcode scanning mode
  - Auto-detect and read barcode
  - Announce product details immediately
  - "هل تريد معرفة المكونات؟" (Do you want ingredients?)
  - Voice-controlled: "ما هذا المنتج؟" triggers scanning

---

### Phase 9: Fashion & Color Advisor (Week 12-13) 👔

> **Feature 8: مستشار الألوان والأزياء**
>
> "القميص أزرق والبنطال أسود، الإطلالة جيدة."

#### 9.1 Fashion Advisor

```typescript
// services/ai/fashion-advisor.ts

interface ClothingItem {
  type: string;          // "قميص", "بنطال", "فستان", "حذاء"
  color: string;         // "أزرق فاتح"
  pattern: string;       // "سادة", "مخطط", "منقط"
}

interface OutfitAnalysis {
  items: ClothingItem[];
  colorHarmony: 'ممتاز' | 'جيد' | 'ضعيف';
  overallFeedback: string;     // "الإطلالة أنيقة ومتناسقة"
  suggestions?: string[];       // ["جرب حذاء بني مع هذا الطقم"]
  occasion?: string;            // "مناسب للعمل" | "مناسب للخروج"
}

// Arabic Color Names Map:
const ARABIC_COLORS: Record<string, string> = {
  'red': 'أحمر', 'light red': 'أحمر فاتح', 'dark red': 'أحمر غامق',
  'blue': 'أزرق', 'light blue': 'أزرق فاتح', 'navy': 'كحلي',
  'green': 'أخضر', 'olive': 'زيتي', 'lime': 'أخضر ليموني',
  'yellow': 'أصفر', 'gold': 'ذهبي',
  'orange': 'برتقالي',
  'purple': 'بنفسجي', 'violet': 'بنفسجي فاتح',
  'pink': 'وردي', 'hot pink': 'فوشي',
  'brown': 'بني', 'beige': 'بيج', 'tan': 'رملي',
  'black': 'أسود', 'white': 'أبيض', 'gray': 'رمادي',
  'cream': 'كريمي', 'maroon': 'خمري', 'teal': 'سماوي',
};
```

**Tasks:**
- [ ] Create `services/ai/fashion-advisor.ts`:
  - GPT-4V analysis of outfit photos
  - Arabic color naming (30+ color names with shades)
  - Color harmony evaluation (complementary, analogous, triadic)
  - Pattern detection (solid, striped, plaid, floral, etc.)
  - Occasion suggestions (work, casual, formal, sport)
  - Season-appropriate recommendations
  - Save favorite outfits with voice labels
- [ ] Create `app/(auth)/fashion-advisor.tsx`:
  - Camera to capture outfit
  - Immediate color + harmony feedback
  - "كيف ملابسي؟" voice trigger
  - Wardrobe history (recent outfits)

---

### Phase 10: Settings, Onboarding & Polish (Week 13-14) ⚙️

#### 10.1 Enhanced Settings

**Tasks:**
- [ ] Connect existing settings UI to Zustand store:
  - Speech rate slider (0.5x - 2.0x) with live preview
  - Language toggle (Arabic ↔ English) with immediate switch
  - Verbosity level (brief/normal/detailed) for descriptions
  - Haptic feedback intensity (light/medium/heavy/off)
  - High contrast mode toggle
  - Default camera mode (detect/read/describe)
  - Emergency contacts management
  - Face recognition database management (list/delete faces)
- [ ] About section:
  - App version
  - Open source licenses
  - Privacy policy link
  - Contact support (voice-activated email)

#### 10.2 Voice-Guided Onboarding

**Tasks:**
- [ ] Create `app/onboarding.tsx`:
  - Triggered on first launch (check `isFirstLaunch` in store)
  - Steps (all voice-guided with haptic):
    1. Welcome: "مرحباً بك في عين. سأكون عيونك في هذا العالم."
    2. Permissions: Camera, Microphone, Location — explain each
    3. Voice tutorial: "جرب قول: ما الذي أمامي"
    4. Feature tour: brief description of each feature
    5. Settings: speech rate, language, verbosity preferences
    6. Optional: Register family faces
  - Skip option: "تخطي" at any point
  - Re-accessible from Settings

#### 10.3 Error Handling & Edge Cases

**Tasks:**
- [ ] Network errors: "لا يوجد اتصال بالإنترنت. بعض الميزات قد لا تعمل."
- [ ] API rate limits: queue and retry with backoff
- [ ] Camera errors: voice feedback with troubleshooting steps
- [ ] Low battery warnings: "البطارية منخفضة (15%). بعض الميزات ستتوقف لتوفير الطاقة."
- [ ] App crash recovery: save state and restore on restart
- [ ] Offline mode: on-device OCR + cached product data + TTS all work offline

---

## 🔧 Backend Requirements

### Option A: Lightweight Backend (Recommended for MVP)

```
Services needed:
├── AI Proxy API (Express/Fastify)
│   ├── /api/vision/analyze      → forwards to OpenAI/Gemini
│   ├── /api/speech/transcribe   → forwards to Google STT/Whisper
│   ├── /api/products/lookup     → Open Food Facts + cache
│   └── /api/navigation/route    → Mapbox/Google Maps
│
├── WebRTC Signaling (Socket.io)
│   ├── Room creation/joining
│   ├── ICE candidate exchange
│   └── Call state management
│
└── Data Storage
    ├── User preferences (Clerk metadata)
    ├── Volunteer registry (PostgreSQL)
    └── Call history (PostgreSQL)
```

**Rationale:** API proxy keeps API keys server-side (more secure than embedding in app).

### Option B: Serverless (Alternative)

```
├── Vercel Serverless Functions
│   ├── AI API proxy
│   └── Product lookup
├── Clerk (Auth - already integrated)
├── Cloudflare Workers (WebRTC signaling)
└── Supabase (Volunteer DB)
```

### WebRTC Signaling Server (Required for Phase 7)

The Remote Assistance feature (Phase 7) requires a persistent WebSocket/Socket.io server for WebRTC signaling. This cannot be serverless — it needs long-lived connections.

**Recommended Options:**
1. **Managed Service (Fastest):** Use [Daily.co](https://daily.co), [Twilio Video](https://twilio.com/video), or [Agora](https://agora.io) — handles signaling, TURN/STUN, and call quality automatically. Free tiers available.
2. **Self-hosted (Full Control):** Node.js + Socket.io on a small VPS (e.g., Railway, Render, DigitalOcean). Requires TURN server (coturn) for NAT traversal.
3. **Hybrid:** Managed TURN/STUN servers (Twilio Network Traversal) + custom signaling on serverless (Cloudflare Durable Objects support WebSockets).

**Deployment requirements:**
- WebSocket support (not plain HTTP)
- Low latency (< 200ms for signaling)
- SSL/TLS encryption
- Scales to concurrent calls (start: 10, target: 100+)

### API Keys Required

| Service | Purpose | Estimated Cost | Free Tier |
|---|---|---|---|
| **OpenAI GPT-4V** | Vision, scene desc, fashion | ~$0.01-0.03/image | $5 credit |
| **Google Cloud STT** | Arabic speech recognition | ~$0.006/15s | 60 min/month |
| **Google Cloud Vision** | OCR fallback | ~$1.50/1000 images | 1000/month |
| **Mapbox** | Navigation & routing | ~$0.50/1000 requests | 100k/month |
| **Open Food Facts** | Product database | Free | Unlimited |
| **Clerk** | Authentication | Free | 10k MAU |

---

## 🧪 Testing Strategy

### Current Test Coverage ✅
- 61 tests across 9 test suites
- Coverage: Auth flows, screen rendering, navigation, accessibility, constants, utilities
- Framework: Jest 30 + @testing-library/react-native

### Tests To Add (per phase)

#### Phase 0 Tests
- [ ] Zustand store tests (settings persist, reset, defaults)
- [ ] i18n tests (Arabic translations complete, fallback works)
- [ ] Accessible component tests (touch targets ≥ 48dp, labels present)

#### Phase 1 Tests
- [ ] TTS service tests (queue, priority, language detection)
- [ ] Voice command parser tests (Arabic fuzzy matching, threshold tuning)
- [ ] Command registration + routing tests

#### Phase 2 Tests
- [ ] Camera hook tests (permission, capture, facing toggle)
- [ ] AI Vision service tests (mock API, prompt format, response parsing)
- [ ] Distance calculator tests (known object sizes)
- [ ] Image processing tests (resize, compress, base64)

#### Phase 3 Tests
- [ ] OCR service tests (on-device + cloud + hybrid)
- [ ] Currency recognition tests
- [ ] Text summarization tests

#### Phase 4 Tests
- [ ] Scene description tests (3 modes, prompt engineering)
- [ ] Change detection tests

#### Phase 5 Tests
- [ ] Face database CRUD tests
- [ ] Cosine similarity matching tests
- [ ] Multi-face detection tests

#### Phase 6 Tests
- [ ] GPS navigation step generation tests
- [ ] Obstacle urgency classification tests

#### Phase 8 Tests
- [ ] Barcode parsing tests (all formats)
- [ ] Product lookup API tests

#### Phase 9 Tests
- [ ] Arabic color naming tests
- [ ] Color harmony evaluation tests

### Accessibility Tests (Cross-Phase)
- [ ] VoiceOver (iOS) + TalkBack (Android) testing every screen
- [ ] Screen reader announcement accuracy
- [ ] Touch target size verification (automated)
- [ ] Navigation order correctness
- [ ] All actions have audio/haptic feedback

### End-to-End Tests (Maestro)
- [ ] Full voice command flow: speak → recognize → execute → respond
- [ ] Camera → AI → TTS pipeline
- [ ] OCR → read aloud pipeline
- [ ] Navigation: set destination → follow → arrive

---

## ♿ Accessibility Guidelines (Critical)

### Core Principles
1. **Voice-First**: Every feature accessible via voice commands alone
2. **No Visual Dependency**: UI is for sighted helpers; core = audio + haptics
3. **Arabic-First**: Primary language is Arabic with English support
4. **Immediate Feedback**: Every action has audio or haptic confirmation
5. **Error Tolerance**: Fuzzy matching for imprecise voice commands
6. **Battery Awareness**: Inform user of battery level periodically

### Interaction Patterns
| Gesture | Action |
|---|---|
| Single tap on mic | Start/stop voice command |
| Double-tap anywhere | Trigger main action (describe what's in front) |
| Long press mic | Continuous listening mode |
| Swipe left/right | Switch between tabs |
| Swipe up/down | Adjust speech rate |
| Shake device | Cancel/go back |
| Three-finger tap | Emergency: call saved contact |

### Implementation Rules
- All buttons: `accessibilityLabel` (Arabic) + `accessibilityHint`
- All state changes: announced via TTS
- Loading: haptic pulses (NOT visual spinners)
- Errors: spoken with suggested fix
- Minimum touch target: 48x48dp (prefer 56x56dp)
- High contrast: 4.5:1 minimum ratio (where visual UI exists)
- Screen reader navigation order: logical, top-to-bottom

---

## 📊 Performance Targets

| Metric | Target | Measurement |
|---|---|---|
| App launch → Voice ready | < 3 seconds | Time to first voice command acceptance |
| Photo capture → AI description | < 5 seconds | Including network roundtrip |
| OCR capture → Text read | < 3 seconds | On-device: <1s, Cloud: <3s |
| Voice command → Action start | < 2 seconds | Including STT + command matching |
| Barcode scan → Product info | < 3 seconds | Including API lookup |
| Scene description (brief) | < 5 seconds | GPT-4V response time |
| Scene description (narrator) | < 8 seconds | Longer prompt, richer response |
| Navigation instruction update | < 1 second | Real-time GPS processing |
| Battery drain (active use) | < 15%/hour | With camera + continuous AI |
| Battery drain (idle/listening) | < 5%/hour | Voice command listening only |
| App size | < 100 MB | Including on-device ML models |
| Offline OCR response | < 1 second | ML Kit on-device |

---

## 🗓️ Development Timeline

| Phase | Weeks | Duration | Features | Dependencies |
|---|---|---|---|---|
| **Phase 0** | 1-2 | 2 weeks | Zustand, i18n, accessible UI components, types | None |
| **Phase 1** | 2-3 | 2 weeks | TTS, STT, voice commands, assistant screen | Phase 0 |
| **Phase 2** | 3-5 | 2 weeks | Camera, AI vision, object detection | Phase 0, 1 |
| **Phase 3** | 5-6 | 1.5 weeks | OCR (on-device + cloud), text reader | Phase 2 |
| **Phase 4** | 6-7 | 1.5 weeks | Scene description, narrator mode | Phase 2 |
| **Phase 5** | 7-8 | 1.5 weeks | Face recognition, SQLite storage | Phase 2 |
| **Phase 6** | 8-10 | 2 weeks | GPS navigation, obstacle detection | Phase 0, 1 |
| **Phase 7** | 10-11 | 1.5 weeks | WebRTC remote assist | Backend needed |
| **Phase 8** | 11-12 | 1 week | Barcode scanner, product lookup | Phase 2 |
| **Phase 9** | 12-13 | 1 week | Fashion/color advisor | Phase 2 |
| **Phase 10** | 13-14 | 1.5 weeks | Settings, onboarding, polish | All phases |
| **Testing** | 14-16 | 2 weeks | Accessibility audit, beta testing, fixes | All phases |

**Total: 16 weeks (4 months)**

### Milestone Checkpoints

| Milestone | Week | Deliverable |
|---|---|---|
| **M1: Voice MVP** | Week 3 | App speaks Arabic, accepts voice commands |
| **M2: Camera MVP** | Week 5 | Camera captures → AI describes objects |
| **M3: Reader MVP** | Week 6 | OCR reads text + bills + signs |
| **M4: Full Vision** | Week 8 | Scene description + face recognition |
| **M5: Navigator** | Week 10 | GPS navigation with voice directions |
| **M6: Feature Complete** | Week 14 | All 10 features functional |
| **M7: Beta Release** | Week 16 | Tested with real blind users |

---

## ❓ Clarifying Questions

Before starting implementation, the following decisions should be made:

### Technical Decisions (Must Answer Before Phase 1)

1. **AI Provider Priority:**
   - **Option A:** OpenAI GPT-4V (best quality, higher cost ~$0.03/image)
   - **Option B:** Google Gemini Pro Vision (good quality, cheaper ~$0.001/image)
   - **Option C:** Hybrid (GPT-4V for scene/fashion, Gemini for object detection/OCR)
   - **Recommendation:** Start with OpenAI GPT-4V for consistency, optimize cost later

2. **Speech-to-Text Provider:**
   - **Option A:** Google Cloud Speech-to-Text (best Arabic accuracy, ~$0.006/15s)
   - **Option B:** OpenAI Whisper API (good accuracy, simpler, ~$0.006/min)
   - **Option C:** On-device (no cost, but lower Arabic accuracy)
   - **Recommendation:** Google Cloud STT for best Arabic support, with Whisper fallback

3. **Backend Architecture:**
   - **Option A:** Custom Node.js + Express server (full control)
   - **Option B:** Vercel Serverless + Supabase (faster to deploy, lower maintenance)
   - **Option C:** Firebase Functions + Firestore (tight Google ecosystem integration)
   - **Recommendation:** Option B for MVP speed, migrate to Option A when scaling

4. **Offline Support Priority:**
   - What should work offline? OCR (ML Kit) + TTS (built-in) + cached product data?
   - Is offline navigation needed? (requires pre-downloaded maps)

### Product Decisions (Must Answer Before Phase 0)

5. **Target Region:** Saudi Arabia / Gulf / all Arabic-speaking countries?
   - Affects: default dialect, currency recognition, product databases, map coverage

6. **Volunteer System:**
   - **Option A:** Build from scratch (full control, more work)
   - **Option B:** Integrate Be My Eyes (established, less control)
   - **Option C:** Simple contacts-only (call saved friends/family, no volunteer matching)
   - **Recommendation:** Option C for MVP, expand to Option A/B later

7. **Monetization Model:**
   - Free with premium features? Monthly subscription? Completely free?
   - This affects: API cost management, feature gating, backend complexity

8. **Face Recognition Privacy:**
   - All data stored locally (current plan) — any regulatory concerns?
   - Should there be an explicit consent flow for face registration?

### Platform Decisions

9. **Platform Priority:** iOS first, Android first, or simultaneous?
   - Note: Expo supports both, but testing effort is doubled for simultaneous

10. **Minimum OS Versions:**
    - iOS: 15.1+ (for latest VoiceOver features)? or 13+?
    - Android: API 26 (Android 8)? or higher?

---

## 📝 Implementation Notes

### What We're Building On (Strong Foundation)
- ✅ Authentication is production-ready (Clerk + secure tokens)
- ✅ Navigation structure is clean (Expo Router with auth guards)
- ✅ UI design is polished (purple gradient theme, consistent styling)
- ✅ Test infrastructure is solid (Jest + Testing Library, 61 existing tests)
- ✅ CI/CD is configured (3 GitHub Actions workflows + EAS)
- ✅ All 10 feature cards are shown on the home screen (ready for implementation)

### Key Technical Risks
1. **Arabic STT Accuracy**: Arabic speech recognition is less mature than English. Test thoroughly with dialects.
2. **AI API Latency**: GPT-4V takes 2-5s per request. Mitigate with caching and optimistic UI.
3. **Battery Drain**: Continuous camera + AI will drain battery fast. Need aggressive optimization.
4. **App Size**: On-device ML models (ML Kit OCR, face detection) can be 20-50MB each.
5. **WebRTC Complexity**: Video calling is complex. Consider using a managed service (Twilio/Agora).
6. **Arabic NLP**: Fuzzy matching for Arabic voice commands needs careful tuning for dialectal variations.

### Development Best Practices
- Test with VoiceOver/TalkBack from **Day 1** of each phase
- Every new screen gets Arabic + English translations immediately
- Every new service gets unit tests before integration
- Every AI prompt gets documented in `services/ai/prompts.ts`
- Run `npm test` and `npx eslint . && npx prettier -c .` before every commit
- Use Expo Go for rapid iteration, EAS Build for production testing

### Partner Organizations (Recommend Reaching Out)
- Saudi Authority for Intellectual Property (for app store approval)
- Saudi Association for the Blind
- Be My Eyes (potential integration partner)
- Arabic accessibility testing services

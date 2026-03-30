# 🔵 خطة تنفيذ تطبيق "عين" (Ayeeen) - Implementation Plan

## نظرة عامة | Overview

**عين** هو تطبيق مدعوم بالذكاء الاصطناعي يساعد الأشخاص المكفوفين على "رؤية" العالم من حولهم عن طريق وصف البيئة، قراءة النصوص، التعرف على الأشخاص والأشياء، والتنقل بأمان.

**Ayeeen** is an AI-powered mobile application that helps visually impaired people "see" the world around them by describing the environment, reading text, recognizing people and objects, and navigating safely.

---

## 📋 Current Tech Stack

| Category | Technology |
|---|---|
| **Framework** | React Native 0.81.5 + Expo 54 |
| **Language** | TypeScript 5.9 |
| **Styling** | Tailwind CSS 4 + NativeWind |
| **Authentication** | Clerk |
| **Package Manager** | Bun |
| **CI/CD** | GitHub Actions + EAS Build |
| **Platforms** | iOS, Android, Web |

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                    عين (Ayeeen) App                      │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │  Voice UI    │  │  Camera UI   │  │  Navigation  │  │
│  │  Layer       │  │  Layer       │  │  UI Layer    │  │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘  │
│         │                 │                  │          │
│  ┌──────▼─────────────────▼──────────────────▼───────┐  │
│  │              Core Services Layer                   │  │
│  │  ┌─────────┐ ┌─────────┐ ┌──────────┐ ┌────────┐ │  │
│  │  │ Speech  │ │ Camera  │ │ Location │ │ State  │ │  │
│  │  │ Engine  │ │ Manager │ │ Manager  │ │ Store  │ │  │
│  │  └─────────┘ └─────────┘ └──────────┘ └────────┘ │  │
│  └──────────────────────┬────────────────────────────┘  │
│                         │                               │
│  ┌──────────────────────▼────────────────────────────┐  │
│  │              AI Services Layer                     │  │
│  │  ┌─────────┐ ┌─────────┐ ┌──────────┐ ┌────────┐ │  │
│  │  │ Vision  │ │  OCR    │ │ Face     │ │ Scene  │ │  │
│  │  │ AI      │ │ Service │ │ Recog.   │ │ Desc.  │ │  │
│  │  └─────────┘ └─────────┘ └──────────┘ └────────┘ │  │
│  └──────────────────────┬────────────────────────────┘  │
│                         │                               │
│  ┌──────────────────────▼────────────────────────────┐  │
│  │              Backend / API Layer                    │  │
│  │  ┌──────────────┐  ┌──────────────┐               │  │
│  │  │ Cloud AI     │  │  WebRTC      │               │  │
│  │  │ (GPT-4V /   │  │  (Remote     │               │  │
│  │  │  Gemini)    │  │   Assist)    │               │  │
│  │  └──────────────┘  └──────────────┘               │  │
│  └───────────────────────────────────────────────────┘  │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 📦 Required New Dependencies

### Core Dependencies

| Package | Purpose | Version |
|---|---|---|
| `expo-camera` | Camera access for object/text/face recognition | ~16.x |
| `expo-speech` | Text-to-Speech for reading descriptions to user | ~13.x |
| `expo-av` | Audio recording for voice commands | ~15.x |
| `expo-location` | GPS navigation | ~18.x |
| `expo-haptics` | Haptic feedback for notifications | ~14.x |
| `expo-image-manipulator` | Image preprocessing before AI analysis | ~13.x |
| `expo-barcode-scanner` | Barcode/QR code scanning | via expo-camera |
| `expo-file-system` | File management for cached images/data | ~18.x |
| `expo-sensors` | Accelerometer/Gyroscope for motion detection | ~14.x |

### AI & ML Dependencies

| Package | Purpose |
|---|---|
| `openai` | GPT-4 Vision API for scene description, object recognition |
| `@google-cloud/vision` (or REST API) | Google Cloud Vision for OCR, object detection |
| `expo-ml-kit` (or `react-native-mlkit-ocr`) | On-device OCR processing |
| `react-native-vision-camera` | Advanced camera features (optional, for real-time processing) |

### Navigation Dependencies

| Package | Purpose |
|---|---|
| `react-native-maps` | Map display for navigation |
| `@mapbox/mapbox-sdk` | Turn-by-turn navigation |
| `expo-bluetooth` (or `react-native-ble-plx`) | Indoor navigation via Bluetooth beacons |

### Communication Dependencies

| Package | Purpose |
|---|---|
| `react-native-webrtc` | Video calling for remote assistance |
| `socket.io-client` | Real-time communication |

### State & Storage

| Package | Purpose |
|---|---|
| `zustand` | Lightweight state management |
| `@tanstack/react-query` | Server state & API caching |
| `expo-sqlite` | Local database for face data, preferences |

### Accessibility

| Package | Purpose |
|---|---|
| `react-native-accessibility-engine` | Accessibility testing |

---

## 📁 Proposed Project Structure

```
ayeeen/
├── app/                          # Expo Router screens (file-based routing)
│   ├── _layout.tsx               # Root layout with providers
│   ├── index.tsx                 # Home / Main screen
│   ├── (tabs)/                   # Tab navigation
│   │   ├── _layout.tsx           # Tab layout
│   │   ├── camera.tsx            # Camera/Vision screen
│   │   ├── reader.tsx            # OCR Reader screen
│   │   ├── navigate.tsx          # Navigation screen
│   │   └── settings.tsx          # Settings screen
│   ├── scene-description.tsx     # Full scene description
│   ├── face-recognition.tsx      # Face recognition setup
│   ├── remote-assist.tsx         # Remote assistance video call
│   ├── barcode-scanner.tsx       # Barcode/product scanner
│   └── fashion-advisor.tsx       # Color & fashion advisor
│
├── components/                   # Reusable UI components
│   ├── ui/                       # Base UI components
│   │   ├── Button.tsx
│   │   ├── VoiceButton.tsx       # Large, accessible voice button
│   │   ├── HapticFeedback.tsx
│   │   └── AccessibleText.tsx
│   ├── camera/
│   │   ├── CameraView.tsx        # Camera wrapper component
│   │   ├── ObjectOverlay.tsx     # Object detection overlay
│   │   └── CaptureButton.tsx     # Accessible capture button
│   ├── voice/
│   │   ├── VoiceCommandListener.tsx  # Always-on voice listener
│   │   ├── VoiceResponse.tsx     # TTS response component
│   │   └── VoiceIndicator.tsx    # Visual/haptic voice indicator
│   ├── navigation/
│   │   ├── NavigationMap.tsx     # Map with voice directions
│   │   ├── CompassView.tsx       # Direction indicator
│   │   └── ObstacleAlert.tsx     # Obstacle warning component
│   └── remote/
│       ├── VideoCall.tsx         # WebRTC video call component
│       └── VolunteerList.tsx     # Available volunteers list
│
├── services/                     # Business logic & API services
│   ├── ai/
│   │   ├── vision.ts            # AI Vision API (GPT-4V / Gemini)
│   │   ├── ocr.ts               # OCR service (on-device + cloud)
│   │   ├── scene-description.ts # Scene description service
│   │   ├── object-detection.ts  # Object detection & distance estimation
│   │   ├── face-recognition.ts  # Face recognition service
│   │   ├── fashion-advisor.ts   # Color/fashion analysis
│   │   └── barcode.ts           # Barcode lookup service
│   ├── speech/
│   │   ├── tts.ts               # Text-to-Speech service
│   │   ├── stt.ts               # Speech-to-Text service
│   │   └── voice-commands.ts    # Voice command parser & handler
│   ├── navigation/
│   │   ├── gps-navigation.ts    # Outdoor GPS navigation
│   │   ├── indoor-navigation.ts # Indoor BLE/AR navigation
│   │   └── obstacle-detection.ts # Real-time obstacle alerts
│   ├── communication/
│   │   ├── webrtc.ts            # WebRTC service
│   │   └── signaling.ts         # WebRTC signaling server client
│   └── storage/
│       ├── face-database.ts     # Local face data storage
│       ├── preferences.ts       # User preferences
│       └── cache.ts             # Image & response cache
│
├── hooks/                        # Custom React hooks
│   ├── useCamera.ts             # Camera management hook
│   ├── useVoiceCommand.ts       # Voice command hook
│   ├── useSpeech.ts             # TTS hook
│   ├── useLocation.ts           # Location tracking hook
│   ├── useAIVision.ts           # AI vision analysis hook
│   ├── useOCR.ts                # OCR hook
│   ├── useAccessibility.ts      # Accessibility utilities hook
│   └── useHaptic.ts             # Haptic feedback hook
│
├── store/                        # State management
│   ├── app-store.ts             # Global app state (Zustand)
│   ├── camera-store.ts          # Camera state
│   ├── navigation-store.ts      # Navigation state
│   └── voice-store.ts           # Voice command state
│
├── utils/                        # Utility functions
│   ├── image-processing.ts      # Image manipulation utilities
│   ├── distance-calculator.ts   # Distance estimation from camera
│   ├── arabic-tts.ts            # Arabic language TTS utilities
│   ├── accessibility.ts         # Accessibility helper functions
│   └── constants.ts             # App-wide constants
│
├── types/                        # TypeScript type definitions
│   ├── ai.ts                    # AI service types
│   ├── navigation.ts            # Navigation types
│   ├── voice.ts                 # Voice command types
│   └── app.ts                   # General app types
│
├── localization/                 # Internationalization
│   ├── ar.json                  # Arabic translations
│   ├── en.json                  # English translations
│   └── i18n.ts                  # i18n configuration
│
├── assets/                       # Static assets
│   ├── sounds/                  # Audio feedback sounds
│   │   ├── alert.mp3
│   │   ├── success.mp3
│   │   └── navigation-beep.mp3
│   ├── icon.png
│   ├── splash.png
│   └── adaptive-icon.png
│
├── __tests__/                    # Test files
│   ├── services/
│   ├── hooks/
│   └── components/
│
├── App.tsx                       # Entry point
├── app.json                      # Expo config
├── package.json
├── tsconfig.json
└── IMPLEMENTATION_PLAN.md        # This file
```

---

## 🚀 Implementation Phases

### Phase 0: Foundation & Infrastructure (Week 1-2)

#### 0.1 Project Setup & Configuration
- [ ] Install Expo Router for file-based navigation
- [ ] Set up Zustand for state management
- [ ] Set up TanStack Query for API state management
- [ ] Configure environment variables for API keys (`.env`)
- [ ] Set up localization (Arabic + English) with `expo-localization` + `i18next`
- [ ] Configure accessibility defaults (large touch targets, screen reader support)

#### 0.2 Accessibility-First Foundation
- [ ] Implement `AccessibleText` component with dynamic font sizing
- [ ] Implement `VoiceButton` - large, haptic-feedback buttons
- [ ] Set up accessibility labels throughout the app (Arabic + English)
- [ ] Implement high-contrast mode support
- [ ] Ensure all interactive elements have minimum 48x48dp touch targets
- [ ] Test with VoiceOver (iOS) and TalkBack (Android) from Day 1

#### 0.3 Core UI Layout
- [ ] Implement tab-based navigation (Camera, Reader, Navigate, Settings)
- [ ] Design simplified, minimal UI (blind-friendly: large buttons, voice-first)
- [ ] Implement gesture support (swipe left/right between features)
- [ ] Implement haptic feedback system

---

### Phase 1: Voice Engine & Speech (Week 2-3) 🗣️

> **Priority: HIGHEST** — Voice is the primary interaction method for blind users.

#### 1.1 Text-to-Speech (TTS) Service
```typescript
// services/speech/tts.ts
interface TTSService {
  speak(text: string, language?: 'ar' | 'en'): Promise<void>;
  stop(): void;
  setRate(rate: number): void;
  setLanguage(lang: 'ar' | 'en'): void;
  isSpeaking(): boolean;
}
```
- [ ] Implement TTS using `expo-speech`
- [ ] Support Arabic (primary) and English
- [ ] Configurable speech rate, pitch, and volume
- [ ] Queue management for multiple messages
- [ ] Priority interruption system (urgent messages override queue)
- [ ] Haptic pulse when speech starts/stops

#### 1.2 Speech-to-Text (STT) - Voice Commands
```typescript
// services/speech/stt.ts
interface STTService {
  startListening(): Promise<void>;
  stopListening(): void;
  onResult(callback: (text: string) => void): void;
  isListening(): boolean;
}
```
- [ ] Implement STT using `expo-av` audio recording + cloud API (Google Speech-to-Text / Whisper)
- [ ] Support Arabic voice recognition
- [ ] Implement wake word detection ("يا عين" / "Ya Ayeeen")
- [ ] Continuous listening mode with keyword detection
- [ ] Handle background noise filtering

#### 1.3 Voice Command System
```typescript
// services/speech/voice-commands.ts
interface VoiceCommand {
  patterns: string[];        // Arabic + English trigger phrases
  action: () => Promise<void>;
  description: string;
}

// Supported commands:
// "ما الذي أمامي؟" → Trigger object detection
// "اقرأ لي هذا" → Trigger OCR
// "صف لي المشهد" → Trigger scene description
// "ساعدني في التنقل" → Open navigation
// "اتصل بمتطوع" → Open remote assistance
// "ما هذا المنتج؟" → Trigger barcode scan
// "كيف ملابسي؟" → Trigger fashion advisor
```
- [ ] Implement command parser with fuzzy matching for Arabic
- [ ] Register all voice commands with descriptions
- [ ] Implement "help" command that lists all available commands
- [ ] Add confirmation feedback ("جاري تنفيذ الأمر...")

---

### Phase 2: Camera & Object Recognition (Week 3-5) 📷

> **Feature 1: التعرف على الأشياء أمام الكاميرا**

#### 2.1 Camera Service
```typescript
// hooks/useCamera.ts
interface CameraState {
  isReady: boolean;
  facing: 'front' | 'back';
  capturedImage: string | null;
  isProcessing: boolean;
}
```
- [ ] Set up `expo-camera` with permissions handling
- [ ] Implement camera preview with accessible controls
- [ ] Implement photo capture with haptic feedback
- [ ] Implement continuous frame capture mode (for real-time detection)
- [ ] Handle camera orientation and focus

#### 2.2 AI Vision Service
```typescript
// services/ai/vision.ts
interface VisionService {
  analyzeImage(imageUri: string): Promise<VisionResult>;
  detectObjects(imageUri: string): Promise<DetectedObject[]>;
  estimateDistance(object: DetectedObject): Promise<string>;
}

interface DetectedObject {
  name: string;
  nameArabic: string;
  confidence: number;
  boundingBox: BoundingBox;
  estimatedDistance?: string;  // "مترين" / "2 meters"
  direction?: string;          // "أمامك" / "يمينك" / "يسارك"
}
```
- [ ] Integrate GPT-4 Vision API (or Google Gemini Vision) for image analysis
- [ ] Implement object detection with Arabic descriptions
- [ ] Implement distance estimation using object size heuristics
- [ ] Implement directional descriptions (front, left, right)
- [ ] Generate natural Arabic descriptions: "أمامك كرسي على بُعد مترين"
- [ ] Cache recent results to reduce API calls
- [ ] Implement offline fallback with on-device ML Kit

#### 2.3 Real-Time Object Detection Mode
- [ ] Implement periodic frame capture (every 2-3 seconds)
- [ ] Smart change detection (only describe when scene changes significantly)
- [ ] Priority alerts for approaching objects/people
- [ ] Battery optimization (reduce frame rate when stationary)

---

### Phase 3: OCR Text Reader (Week 5-6) 📖

> **Feature 2: قارئ النصوص**

#### 3.1 OCR Service
```typescript
// services/ai/ocr.ts
interface OCRService {
  recognizeText(imageUri: string): Promise<OCRResult>;
  recognizeCurrency(imageUri: string): Promise<CurrencyResult>;
  summarizeText(text: string): Promise<string>;
}

interface OCRResult {
  fullText: string;
  blocks: TextBlock[];
  language: string;
  confidence: number;
}
```
- [ ] Implement on-device OCR using ML Kit (fast, no internet needed)
- [ ] Implement cloud OCR fallback (Google Cloud Vision) for complex text
- [ ] Support Arabic text recognition (RTL handling)
- [ ] Support English and mixed-language text
- [ ] Implement currency recognition (Saudi Riyal, USD, EUR, etc.)
- [ ] Implement document structure detection (headers, paragraphs, lists)

#### 3.2 Text Reading UI
- [ ] Camera viewfinder with text detection overlay
- [ ] Auto-capture when text is detected and stable
- [ ] Read text aloud automatically after capture
- [ ] Implement text summarization for long documents (via AI API)
- [ ] "اقرأ أكثر" / "Read more" for paginated reading
- [ ] Copy text to clipboard functionality

#### 3.3 Specialized Readers
- [ ] **Bill/Invoice reader**: Extract total amount, due date, etc.
- [ ] **Medicine label reader**: Read medication names, dosage, warnings
- [ ] **Sign/Banner reader**: Quick read of signs with directional context

---

### Phase 4: Scene Description (Week 6-7) 🌍

> **Feature 4: وصف المشهد الكامل**
> **Feature 10: وضع الراوي الذكي**

#### 4.1 Scene Description Service
```typescript
// services/ai/scene-description.ts
interface SceneDescriptionService {
  describeScene(imageUri: string, mode: 'brief' | 'detailed' | 'narrator'): Promise<string>;
  describeChanges(prevImage: string, currImage: string): Promise<string>;
}
```
- [ ] Implement comprehensive scene description using GPT-4 Vision
- [ ] Three description modes:
  - **Brief**: Quick 1-sentence summary ("أنت في مطبخ")
  - **Detailed**: Full description of the scene
  - **Narrator (الراوي الذكي)**: Cinematic, immersive storytelling description
- [ ] Arabic-first descriptions with natural language
- [ ] Include spatial relationships: "على يمينك... أمامك... خلفك..."
- [ ] Describe weather, lighting, and atmosphere
- [ ] Describe people's activities and emotions
- [ ] Implement scene change detection (auto-describe when entering new space)

#### 4.2 Smart Narrator Mode (الراوي الذكي)
```
Prompt engineering for cinematic descriptions:
"أنت في حديقة جميلة، الأشجار تصطف على الجانبين وأوراقها تتراقص مع النسيم.
أمامك أطفال يلعبون بالكرة ويضحكون بمرح. على اليمين، كلب صغير يركض
خلف فراشة. الشمس تتسلل من بين الغيوم وتضيء المكان بضوء دافئ."
```
- [ ] Design specialized prompts for narrator mode
- [ ] Implement continuous narration (periodic updates)
- [ ] Allow user to ask follow-up questions: "أخبرني أكثر عن الأطفال"
- [ ] Emotion and mood detection in scenes

---

### Phase 5: Face Recognition (Week 7-8) 👤

> **Feature 3: التعرف على الوجوه (اختياري)**

#### 5.1 Face Recognition Service
```typescript
// services/ai/face-recognition.ts
interface FaceRecognitionService {
  detectFaces(imageUri: string): Promise<DetectedFace[]>;
  identifyFace(faceData: FaceData): Promise<KnownPerson | null>;
  registerFace(name: string, imageUris: string[]): Promise<void>;
  deleteFace(personId: string): Promise<void>;
}

interface KnownPerson {
  id: string;
  name: string;
  relationship: string;  // "أخ" / "صديق" / "زميل"
  lastSeen?: Date;
}
```
- [ ] Implement face detection using ML Kit Face Detection
- [ ] Implement face encoding/embedding generation
- [ ] Store face embeddings locally (expo-sqlite) for privacy
- [ ] Implement face matching algorithm (cosine similarity)
- [ ] Registration flow: "هذا أخي أحمد" → Capture multiple angles
- [ ] Recognition output: "أخوك أحمد يقف أمامك"
- [ ] Handle multiple faces in one frame
- [ ] Privacy controls: all face data stored locally, never uploaded

#### 5.2 Face Registration UI
- [ ] Guided face capture: "التقط صورة من الأمام... الآن من اليمين..."
- [ ] Voice-based name and relationship input
- [ ] Manage known faces (list, edit, delete) via voice

---

### Phase 6: Navigation System (Week 8-10) 🧭

> **Feature 6: وضع التنقل**

#### 6.1 Outdoor GPS Navigation
```typescript
// services/navigation/gps-navigation.ts
interface NavigationService {
  startNavigation(destination: string): Promise<Route>;
  getCurrentPosition(): Promise<Position>;
  getNextInstruction(): string;  // "انعطف يميناً بعد 50 متراً"
  stopNavigation(): void;
}
```
- [ ] Implement GPS tracking with `expo-location`
- [ ] Integrate mapping API (Mapbox / Google Maps) for routing
- [ ] Voice-based destination input: "خذني إلى المسجد"
- [ ] Turn-by-turn voice directions in Arabic
- [ ] Continuous distance updates: "وصولك خلال 5 دقائق"
- [ ] Crosswalk and traffic signal detection (AI-powered)
- [ ] Points of Interest (POI) announcements: "مطعم على يمينك"

#### 6.2 Indoor Navigation
- [ ] Bluetooth Low Energy (BLE) beacon support
- [ ] Floor/room detection using beacon triangulation
- [ ] Voice guidance inside buildings: "الباب على يسارك"
- [ ] Staircase and elevator detection
- [ ] Integration with building maps (future: AR-based)

#### 6.3 Obstacle Detection During Navigation
- [ ] Real-time camera-based obstacle detection
- [ ] Haptic + voice alerts: "احذر! عائق أمامك على بُعد متر"
- [ ] Escalating urgency (gentle vibration → strong vibration → voice alert)
- [ ] Step/curb detection
- [ ] Moving object warnings (cars, bikes, people)

---

### Phase 7: Remote Assistance (Week 10-11) 📞

> **Feature 7: وضع المساعدة عن بُعد**

#### 7.1 WebRTC Video Call Service
```typescript
// services/communication/webrtc.ts
interface RemoteAssistService {
  callVolunteer(): Promise<CallSession>;
  callContact(contactId: string): Promise<CallSession>;
  endCall(): void;
  shareCamera(): void;
}
```
- [ ] Implement WebRTC video calling using `react-native-webrtc`
- [ ] Backend signaling server (Socket.io / WebSocket)
- [ ] Volunteer matching system
- [ ] Camera sharing (blind user's camera → volunteer's screen)
- [ ] Voice-only mode for the blind user (no video display needed)
- [ ] Call quality monitoring and auto-reconnect
- [ ] End-to-end encryption for privacy

#### 7.2 Volunteer System
- [ ] Volunteer registration and verification
- [ ] Availability status tracking
- [ ] Rating system for quality assurance
- [ ] Emergency contacts as priority callers

---

### Phase 8: Barcode & Product Scanner (Week 11-12) 🏷️

> **Feature 9: قارئ الباركود والمنتجات**

#### 8.1 Barcode Scanner Service
```typescript
// services/ai/barcode.ts
interface BarcodeService {
  scanBarcode(imageUri: string): Promise<BarcodeResult>;
  lookupProduct(barcode: string): Promise<ProductInfo>;
}

interface ProductInfo {
  name: string;
  nameArabic: string;
  brand: string;
  description: string;
  weight: string;
  price?: string;
  ingredients?: string[];
  allergens?: string[];
  expiryDate?: string;
}
```
- [ ] Implement barcode scanning using expo-camera barcode scanner
- [ ] Support barcode types: EAN-13, EAN-8, UPC-A, UPC-E, QR Code
- [ ] Product database lookup (Open Food Facts API / custom database)
- [ ] Read product details aloud: "هذا نسكافيه كلاسيك 100 غرام"
- [ ] Ingredient and allergen warnings for food products
- [ ] Expiry date detection and warnings

---

### Phase 9: Fashion & Color Advisor (Week 12-13) 👔

> **Feature 8: مستشار الألوان والأزياء**

#### 9.1 Fashion Advisor Service
```typescript
// services/ai/fashion-advisor.ts
interface FashionAdvisorService {
  analyzeOutfit(imageUri: string): Promise<OutfitAnalysis>;
  suggestCombination(items: ClothingItem[]): Promise<string>;
}

interface OutfitAnalysis {
  items: ClothingItem[];
  colorHarmony: 'excellent' | 'good' | 'poor';
  feedback: string;        // "القميص أزرق والبنطال أسود، الإطلالة جيدة"
  suggestions?: string[];
}
```
- [ ] Implement clothing detection and color recognition using AI Vision
- [ ] Color naming in Arabic: "أزرق فاتح", "أحمر غامق", "بيج"
- [ ] Color harmony analysis (complementary, analogous, etc.)
- [ ] Outfit appropriateness suggestions
- [ ] Pattern detection (striped, plaid, solid, etc.)
- [ ] Season-appropriate clothing suggestions
- [ ] Save favorite outfits with voice labels

---

### Phase 10: Settings & Personalization (Week 13-14) ⚙️

#### 10.1 User Settings
- [ ] Speech rate adjustment (slow, normal, fast)
- [ ] Preferred language (Arabic, English, bilingual)
- [ ] Verbosity level (brief, normal, detailed)
- [ ] Haptic feedback intensity
- [ ] Default camera mode
- [ ] Emergency contacts
- [ ] Face recognition database management

#### 10.2 Onboarding Flow
- [ ] Voice-guided tutorial for first-time users
- [ ] Feature discovery: explain each feature with examples
- [ ] Permission requests with clear explanations
- [ ] Accessibility settings configuration
- [ ] Face registration for family members

---

## 🔧 Backend Requirements

### API Server (Optional - for features requiring backend)

```
Backend Stack:
- Node.js + Express / Fastify
- PostgreSQL (user accounts, volunteer system)
- Redis (caching, session management)
- Socket.io (WebRTC signaling, real-time events)
- AWS S3 / Cloudflare R2 (temporary image storage)
```

#### Required Backend APIs:
1. **Authentication** → Already handled by Clerk
2. **AI Proxy API** → Secure API key management for OpenAI/Google
3. **Product Database** → Barcode to product info lookup
4. **Volunteer System** → Matching, availability, ratings
5. **WebRTC Signaling** → Call setup and management
6. **Analytics** → Usage patterns for improvement (anonymized)

### API Keys Required:
| Service | Purpose | Estimated Cost |
|---|---|---|
| OpenAI GPT-4 Vision | Scene description, object recognition | ~$0.01-0.03/image |
| Google Cloud Vision | OCR, object detection | Free tier: 1000/month |
| Google Speech-to-Text | Arabic voice recognition | Free tier: 60 min/month |
| Mapbox / Google Maps | Navigation & routing | Free tier available |
| Open Food Facts | Product database | Free (open source) |

---

## 🧪 Testing Strategy

### Unit Tests
- [ ] Voice command parser tests (Arabic + English)
- [ ] Distance estimation algorithm tests
- [ ] Color naming utility tests
- [ ] Text summarization tests

### Integration Tests
- [ ] Camera → AI Vision → TTS pipeline
- [ ] Voice Command → Action → Response pipeline
- [ ] OCR → Text Processing → TTS pipeline
- [ ] Barcode → Product Lookup → TTS pipeline

### Accessibility Tests
- [ ] VoiceOver (iOS) compatibility for every screen
- [ ] TalkBack (Android) compatibility for every screen
- [ ] Screen reader announcement accuracy
- [ ] Touch target size verification (minimum 48x48dp)
- [ ] Color contrast ratios (where applicable)

### End-to-End Tests
- [ ] Full user journey: Open app → Voice command → Get response
- [ ] Navigation flow: Set destination → Follow directions → Arrive
- [ ] OCR flow: Point camera → Detect text → Read aloud

---

## ♿ Accessibility Guidelines (Critical)

### Design Principles
1. **Voice-First**: Every feature must be accessible via voice commands alone
2. **No Visual Dependency**: UI is for sighted helpers only; core functionality via audio + haptics
3. **Arabic-First**: Primary language is Arabic with English support
4. **Immediate Feedback**: Every action must have audio or haptic confirmation
5. **Error Tolerance**: Forgive imprecise voice commands (fuzzy matching)
6. **Battery Awareness**: Inform user of battery level periodically

### Implementation Rules
- All buttons must have `accessibilityLabel` and `accessibilityHint` in Arabic
- All state changes must be announced via TTS
- Loading states must use haptic pulses (not visual spinners)
- Errors must be spoken aloud with suggested actions
- Double-tap anywhere on screen to trigger main action
- Shake device to cancel/go back
- Three-finger tap for emergency call

---

## 📊 Performance Targets

| Metric | Target |
|---|---|
| App launch → Ready for voice | < 3 seconds |
| Photo capture → AI description | < 5 seconds |
| OCR capture → Text read | < 3 seconds |
| Voice command → Response | < 2 seconds |
| Barcode scan → Product info | < 3 seconds |
| Battery drain (active use) | < 15%/hour |
| Offline OCR response | < 1 second |

---

## 🗓️ Development Timeline Summary

| Phase | Duration | Features |
|---|---|---|
| **Phase 0** | Week 1-2 | Foundation, navigation, accessibility setup |
| **Phase 1** | Week 2-3 | Voice engine (TTS + STT + Commands) |
| **Phase 2** | Week 3-5 | Camera & Object Recognition |
| **Phase 3** | Week 5-6 | OCR Text Reader |
| **Phase 4** | Week 6-7 | Scene Description + Smart Narrator |
| **Phase 5** | Week 7-8 | Face Recognition |
| **Phase 6** | Week 8-10 | Navigation (GPS + Indoor) |
| **Phase 7** | Week 10-11 | Remote Assistance (Video Call) |
| **Phase 8** | Week 11-12 | Barcode & Product Scanner |
| **Phase 9** | Week 12-13 | Fashion & Color Advisor |
| **Phase 10** | Week 13-14 | Settings, Onboarding, Polish |
| **Testing** | Week 14-16 | Full testing, accessibility audit, beta |

**Total Estimated Duration: 16 weeks (4 months)**

---

## ❓ Clarifying Questions

Before starting implementation, the following questions need answers:

### Technical Decisions
1. **AI Provider**: Should we use OpenAI (GPT-4 Vision) or Google (Gemini) as the primary AI provider? Or a hybrid approach?
2. **Backend**: Should we build a custom backend, or use a BaaS (Backend-as-a-Service) like Supabase/Firebase?
3. **Offline Support**: How important is offline functionality? Should OCR and basic object detection work without internet?
4. **On-device vs Cloud ML**: Priority between speed (on-device) and accuracy (cloud)?

### Product Decisions
5. **Target Region**: Is the primary market Saudi Arabia / Gulf countries, or all Arabic-speaking countries?
6. **Volunteer System**: Should the remote assistance feature use existing platforms (like Be My Eyes integration) or build from scratch?
7. **Monetization**: Free with premium features? Subscription? Completely free?
8. **Face Recognition Privacy**: Are users comfortable with local face storage? Any regional regulations to consider?

### Platform Decisions
9. **Platform Priority**: iOS first, Android first, or both simultaneously?
10. **Minimum OS Versions**: What are the minimum supported iOS/Android versions?
11. **Tablet Support**: Should the app support iPads and Android tablets?

---

## 📝 Notes

- The existing Clerk authentication setup can be leveraged for user accounts
- The Expo + React Native stack is well-suited for this project with excellent camera and sensor support
- NativeWind/Tailwind can be used for the helper UI, but the primary interface should be voice/haptic
- EAS Build pipeline is already configured for production builds
- Consider partnering with accessibility organizations for testing with real blind users

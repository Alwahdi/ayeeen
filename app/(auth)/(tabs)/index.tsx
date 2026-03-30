import { Ionicons } from '@expo/vector-icons';
import type { IconProps } from '@expo/vector-icons/build/createIconSet';
import { useUser } from '@clerk/expo';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Colors } from '@/constants/Colors';

type IoniconsName = IconProps<string>['name'];

interface Feature {
  id: string;
  title: string;
  titleAr: string;
  description: string;
  icon: IoniconsName;
  color: string;
  gradient: readonly [string, string, ...string[]];
  comingSoon?: boolean;
}

const features: Feature[] = [
  {
    id: 'object-detection',
    title: 'Object Detection',
    titleAr: 'التعرف على الأشياء',
    description: 'Identify objects and estimate distances around you',
    icon: 'scan-outline',
    color: Colors.primary[600],
    gradient: ['#7C3AED', '#A855F7'],
  },
  {
    id: 'text-reader',
    title: 'Text Reader',
    titleAr: 'قارئ النصوص',
    description: 'Read text from books, signs, bills and documents',
    icon: 'document-text-outline',
    color: Colors.accent.teal,
    gradient: ['#0D9488', '#2DD4BF'],
  },
  {
    id: 'scene-description',
    title: 'Scene Description',
    titleAr: 'وصف المشهد',
    description: 'Get a detailed description of your surroundings',
    icon: 'image-outline',
    color: Colors.accent.pink,
    gradient: ['#DB2777', '#F472B6'],
  },
  {
    id: 'voice-assistant',
    title: 'Voice Assistant',
    titleAr: 'المساعد الصوتي',
    description: 'Control everything with your voice',
    icon: 'mic-outline',
    color: Colors.accent.sky,
    gradient: ['#0284C7', '#38BDF8'],
  },
  {
    id: 'navigation',
    title: 'Navigation',
    titleAr: 'التنقل',
    description: 'Navigate safely with voice guidance',
    icon: 'compass-outline',
    color: Colors.accent.amber,
    gradient: ['#D97706', '#FBBF24'],
    comingSoon: true,
  },
  {
    id: 'barcode-scanner',
    title: 'Product Scanner',
    titleAr: 'قارئ المنتجات',
    description: 'Scan barcodes to identify products',
    icon: 'barcode-outline',
    color: Colors.success,
    gradient: ['#16A34A', '#22C55E'],
    comingSoon: true,
  },
  {
    id: 'fashion-advisor',
    title: 'Fashion Advisor',
    titleAr: 'مستشار الأزياء',
    description: 'Get color and outfit matching advice',
    icon: 'shirt-outline',
    color: Colors.error,
    gradient: ['#DC2626', '#F87171'],
    comingSoon: true,
  },
  {
    id: 'remote-assist',
    title: 'Remote Help',
    titleAr: 'المساعدة عن بُعد',
    description: 'Connect with volunteers for live assistance',
    icon: 'videocam-outline',
    color: Colors.info,
    gradient: ['#2563EB', '#60A5FA'],
    comingSoon: true,
  },
];

function FeatureCard({ feature }: { feature: Feature }) {
  return (
    <Pressable
      className="mb-4 overflow-hidden rounded-2xl active:scale-[0.97]"
      style={{ width: '48%' }}
      accessibilityLabel={`${feature.title} - ${feature.titleAr}`}
      accessibilityHint={feature.description}
      accessibilityRole="button">
      <LinearGradient
        colors={feature.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="p-5"
        style={{ minHeight: 150 }}>
        <View className="mb-3 h-12 w-12 items-center justify-center rounded-xl bg-white/20">
          <Ionicons name={feature.icon as never} size={24} color="white" />
        </View>
        <Text className="mb-1 text-base font-bold text-white">{feature.title}</Text>
        <Text className="text-xs text-white/70">{feature.titleAr}</Text>
        {feature.comingSoon ? (
          <View className="mt-2 self-start rounded-full bg-white/20 px-2 py-1">
            <Text className="text-[10px] font-semibold text-white">Coming Soon</Text>
          </View>
        ) : null}
      </LinearGradient>
    </Pressable>
  );
}

export default function HomeScreen() {
  const { user } = useUser();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const greeting = getGreeting();
  const firstName = user?.firstName ?? 'Friend';

  return (
    <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-6 pt-6 pb-4">
          <View className="mb-6 flex-row items-center justify-between">
            <View className="flex-1">
              <Text className="text-sm text-neutral-500">{greeting} 👋</Text>
              <Text className="text-2xl font-bold text-neutral-900">{firstName}</Text>
            </View>
            <Pressable
              onPress={() => router.push('/(auth)/(tabs)/settings')}
              className="h-12 w-12 items-center justify-center rounded-full bg-purple-50"
              accessibilityLabel="Profile settings"
              accessibilityRole="button">
              <Text className="text-xl">{getInitial(firstName)}</Text>
            </Pressable>
          </View>
        </View>

        {/* Hero Card */}
        <View className="mx-6 mb-8">
          <LinearGradient
            colors={Colors.gradients.primary}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="overflow-hidden rounded-3xl p-6">
            <View className="flex-row items-center justify-between">
              <View className="flex-1 pr-4">
                <Text className="mb-2 text-2xl font-bold text-white">
                  How can I help{'\n'}you today?
                </Text>
                <Text className="mb-4 text-sm text-purple-100">كيف يمكنني مساعدتك اليوم؟</Text>
                <Pressable
                  onPress={() => router.push('/(auth)/(tabs)/assistant')}
                  className="flex-row items-center self-start rounded-full bg-white/20 px-5 py-3 active:bg-white/30"
                  accessibilityLabel="Start voice assistant"
                  accessibilityRole="button">
                  <Ionicons name="mic" size={18} color="white" />
                  <Text className="ml-2 font-semibold text-white">Ask Ayeeen</Text>
                </Pressable>
              </View>
              <View className="h-24 w-24 items-center justify-center rounded-full bg-white/10">
                <Text className="text-5xl">👁️</Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Features Section */}
        <View className="px-6">
          <Text className="mb-1 text-lg font-bold text-neutral-900">Features</Text>
          <Text className="mb-5 text-sm text-neutral-500">المميزات — اختر ما تريد</Text>

          <View className="flex-row flex-wrap justify-between">
            {features.map((feature) => (
              <FeatureCard key={feature.id} feature={feature} />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning';
  if (hour < 18) return 'Good Afternoon';
  return 'Good Evening';
}

function getInitial(name: string): string {
  return name.charAt(0).toUpperCase();
}

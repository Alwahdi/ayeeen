import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Colors } from '@/constants/Colors';

export default function AssistantScreen() {
  const insets = useSafeAreaInsets();

  return (
    <LinearGradient
      colors={Colors.gradients.dark}
      style={{ flex: 1 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}>
      <View
        className="flex-1 items-center justify-between px-8"
        style={{ paddingTop: insets.top + 20, paddingBottom: insets.bottom + 20 }}>
        {/* Header */}
        <View className="w-full items-center">
          <Text className="text-2xl font-bold text-white">Voice Assistant</Text>
          <Text className="mt-1 text-base text-purple-200/70">المساعد الصوتي</Text>
        </View>

        {/* Center - Voice visualization */}
        <View className="items-center">
          {/* Outer glow ring */}
          <View className="h-56 w-56 items-center justify-center rounded-full bg-purple-500/10">
            <View className="h-44 w-44 items-center justify-center rounded-full bg-purple-500/20">
              <View className="h-32 w-32 items-center justify-center rounded-full bg-purple-500/30">
                <Text className="text-6xl">👁️</Text>
              </View>
            </View>
          </View>

          <Text className="mt-8 text-center text-xl font-semibold text-white">
            Tap the mic to start
          </Text>
          <Text className="mt-2 text-center text-base text-purple-200/60">
            اضغط على المايكروفون للبدء
          </Text>
        </View>

        {/* Bottom controls */}
        <View className="w-full items-center">
          {/* Quick action chips */}
          <View className="mb-8 flex-row flex-wrap justify-center gap-2">
            {[
              { label: "What's in front?", labelAr: 'ما أمامي؟' },
              { label: 'Read this text', labelAr: 'اقرأ لي هذا' },
              { label: 'Describe scene', labelAr: 'صف لي المشهد' },
            ].map((chip) => (
              <Pressable
                key={chip.label}
                className="rounded-full border border-white/15 bg-white/5 px-4 py-3 active:bg-white/10"
                accessibilityLabel={`${chip.label} - ${chip.labelAr}`}
                accessibilityRole="button">
                <Text className="text-sm text-purple-200">{chip.label}</Text>
              </Pressable>
            ))}
          </View>

          {/* Mic button */}
          <Pressable
            className="h-20 w-20 items-center justify-center rounded-full bg-white active:scale-95 active:opacity-90"
            accessibilityLabel="Start listening - ابدأ الاستماع"
            accessibilityRole="button"
            accessibilityHint="Tap to activate voice commands">
            <Ionicons name="mic" size={32} color={Colors.primary[700]} />
          </Pressable>

          <Text className="mt-4 text-xs text-purple-300/50">Hold to speak continuously</Text>
        </View>
      </View>
    </LinearGradient>
  );
}

import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function CameraScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-black" style={{ paddingTop: insets.top }}>
      {/* Camera placeholder */}
      <View className="flex-1 items-center justify-center bg-neutral-900">
        <View className="items-center">
          <View className="mb-6 h-24 w-24 items-center justify-center rounded-full bg-white/10">
            <Ionicons name="eye-outline" size={48} color="white" />
          </View>
          <Text className="mb-2 text-xl font-bold text-white">Vision Camera</Text>
          <Text className="mb-1 text-base text-neutral-400">كاميرا الرؤية</Text>
          <Text className="max-w-xs text-center text-sm text-neutral-500">
            Camera permissions will be requested when you start using vision features
          </Text>
        </View>
      </View>

      {/* Bottom controls */}
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.9)']}
        className="px-6 pt-12 pb-8"
        style={{ paddingBottom: insets.bottom + 20 }}>
        {/* Mode selector */}
        <View className="mb-6 flex-row justify-center gap-6">
          {[
            { id: 'detect', label: 'Detect', icon: 'scan-outline' as const },
            { id: 'read', label: 'Read', icon: 'document-text-outline' as const },
            { id: 'describe', label: 'Describe', icon: 'image-outline' as const },
          ].map((mode) => (
            <Pressable
              key={mode.id}
              className="items-center"
              accessibilityLabel={mode.label}
              accessibilityRole="button">
              <View className="mb-2 h-14 w-14 items-center justify-center rounded-full bg-white/10">
                <Ionicons name={mode.icon} size={24} color="white" />
              </View>
              <Text className="text-xs text-neutral-400">{mode.label}</Text>
            </Pressable>
          ))}
        </View>

        {/* Capture button */}
        <View className="items-center">
          <Pressable
            className="h-20 w-20 items-center justify-center rounded-full border-4 border-white active:scale-95"
            accessibilityLabel="Capture photo for analysis"
            accessibilityRole="button">
            <View className="h-16 w-16 rounded-full bg-white" />
          </Pressable>
        </View>
      </LinearGradient>
    </View>
  );
}

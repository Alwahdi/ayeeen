import { useAuth } from '@clerk/expo';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Colors } from '@/constants/Colors';

export default function WelcomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { isSignedIn } = useAuth();

  useEffect(() => {
    if (isSignedIn) {
      router.replace('/(auth)/(tabs)');
    }
  }, [isSignedIn, router]);

  return (
    <LinearGradient
      colors={Colors.gradients.dark}
      style={{ flex: 1 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}>
      <View
        className="flex-1 items-center justify-between px-8"
        style={{ paddingTop: insets.top + 40, paddingBottom: insets.bottom + 20 }}>
        {/* Top section - Logo and branding */}
        <View className="items-center">
          <View className="mb-6 h-28 w-28 items-center justify-center rounded-full bg-white/10">
            <Text className="text-6xl">👁️</Text>
          </View>
          <Text className="mb-2 text-center text-5xl font-bold text-white">عين</Text>
          <Text className="mb-1 text-center text-xl font-semibold text-purple-200">Ayeeen</Text>
        </View>

        {/* Middle section - Description */}
        <View className="items-center">
          <Text className="mb-4 text-center text-3xl leading-tight font-bold text-white">
            Your AI-Powered{'\n'}Vision Assistant
          </Text>
          <Text className="max-w-xs text-center text-base leading-relaxed text-purple-200/80">
            مساعدك الذكي للرؤية — يساعدك على فهم العالم من حولك باستخدام الذكاء الاصطناعي
          </Text>
        </View>

        {/* Bottom section - Buttons */}
        <View className="w-full">
          <Pressable
            onPress={() => router.push('/sign-up')}
            className="mb-4 w-full items-center rounded-2xl bg-white px-8 py-5 active:opacity-80">
            <Text className="text-lg font-bold text-purple-700">Get Started</Text>
          </Pressable>

          <Pressable
            onPress={() => router.push('/sign-in')}
            className="w-full items-center rounded-2xl border-2 border-white/20 px-8 py-5 active:opacity-80">
            <Text className="text-lg font-semibold text-white">I have an account</Text>
          </Pressable>

          <Text className="mt-6 text-center text-xs text-purple-300/60">
            By continuing, you agree to our Terms of Service
          </Text>
        </View>
      </View>
    </LinearGradient>
  );
}

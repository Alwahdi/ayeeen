import { useSignIn } from '@clerk/expo';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Colors } from '@/constants/Colors';

export default function SignInScreen() {
  const { signIn } = useSignIn();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onSignIn = useCallback(async () => {
    setError('');
    setLoading(true);

    try {
      // Step 1: Create the sign-in with the identifier
      const createResult = await signIn.create({ identifier: email });
      if (createResult.error) {
        setError(createResult.error.message ?? 'An error occurred.');
        return;
      }

      // Step 2: Submit the password
      const passwordResult = await signIn.password({ password, identifier: email });
      if (passwordResult.error) {
        setError(passwordResult.error.message ?? 'Invalid credentials.');
        return;
      }

      // Step 3: Finalize to set the session active
      const finalizeResult = await signIn.finalize();
      if (finalizeResult.error) {
        setError(finalizeResult.error.message ?? 'Failed to complete sign in.');
        return;
      }
      router.replace('/(auth)/(tabs)');
    } catch {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [email, password, signIn, router]);

  return (
    <LinearGradient
      colors={Colors.gradients.dark}
      style={{ flex: 1 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1">
        <View
          className="flex-1 justify-between px-8"
          style={{ paddingTop: insets.top + 20, paddingBottom: insets.bottom + 20 }}>
          {/* Header */}
          <View>
            <Pressable onPress={() => router.back()} className="mb-8 active:opacity-60">
              <Text className="text-lg text-purple-300">← Back</Text>
            </Pressable>

            <Text className="mb-2 text-4xl font-bold text-white">Welcome back</Text>
            <Text className="text-lg text-purple-200/70">مرحباً بعودتك — سجّل دخولك</Text>
          </View>

          {/* Form */}
          <View className="flex-1 justify-center">
            {error ? (
              <View className="mb-4 rounded-xl bg-red-500/20 px-4 py-3">
                <Text className="text-center text-sm text-red-300">{error}</Text>
              </View>
            ) : null}

            <View className="mb-4">
              <Text className="mb-2 text-sm font-medium text-purple-200">Email</Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="your@email.com"
                placeholderTextColor="rgba(196, 181, 253, 0.4)"
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                className="rounded-xl border border-white/10 bg-white/5 px-5 py-4 text-base text-white"
                accessibilityLabel="Email address"
                accessibilityHint="Enter your email address to sign in"
              />
            </View>

            <View className="mb-6">
              <Text className="mb-2 text-sm font-medium text-purple-200">Password</Text>
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="••••••••"
                placeholderTextColor="rgba(196, 181, 253, 0.4)"
                secureTextEntry
                className="rounded-xl border border-white/10 bg-white/5 px-5 py-4 text-base text-white"
                accessibilityLabel="Password"
                accessibilityHint="Enter your password to sign in"
              />
            </View>

            <Pressable
              onPress={onSignIn}
              disabled={loading || !email || !password}
              className="mb-4 items-center rounded-2xl bg-white px-8 py-5 active:opacity-80 disabled:opacity-50">
              {loading ? (
                <ActivityIndicator color={Colors.primary[700]} />
              ) : (
                <Text className="text-lg font-bold text-purple-700">Sign In</Text>
              )}
            </Pressable>
          </View>

          {/* Footer */}
          <View className="items-center">
            <Text className="text-base text-purple-200/60">
              {"Don't have an account? "}
              <Link href="/sign-up" asChild>
                <Text className="font-semibold text-white">Sign Up</Text>
              </Link>
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

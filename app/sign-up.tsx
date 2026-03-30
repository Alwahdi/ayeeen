import { useSignUp } from '@clerk/expo';
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

export default function SignUpScreen() {
  const { signUp } = useSignUp();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onSignUp = useCallback(async () => {
    setError('');
    setLoading(true);

    try {
      // Step 1: Create the sign-up with email and password
      const result = await signUp.password({
        emailAddress: email,
        password,
      });

      if (result.error) {
        setError(result.error.message ?? 'An error occurred. Please try again.');
        return;
      }

      // Step 2: Send email verification code
      const verifyResult = await signUp.verifications.sendEmailCode();
      if (verifyResult.error) {
        setError(verifyResult.error.message ?? 'Failed to send verification code.');
        return;
      }

      setPendingVerification(true);
    } catch {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [email, password, signUp]);

  const onVerify = useCallback(async () => {
    setError('');
    setLoading(true);

    try {
      // Step 3: Verify the email code
      const result = await signUp.verifications.verifyEmailCode({ code });
      if (result.error) {
        setError(result.error.message ?? 'Verification failed. Please try again.');
        return;
      }

      // Step 4: Finalize to set the session active
      if (signUp.status === 'complete') {
        const finalizeResult = await signUp.finalize();
        if (finalizeResult.error) {
          setError(finalizeResult.error.message ?? 'Failed to complete sign up.');
          return;
        }
        router.replace('/(auth)/(tabs)');
      }
    } catch {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [code, signUp, router]);

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

            {!pendingVerification ? (
              <>
                <Text className="mb-2 text-4xl font-bold text-white">Create Account</Text>
                <Text className="text-lg text-purple-200/70">أنشئ حسابك — وابدأ رحلتك مع عين</Text>
              </>
            ) : (
              <>
                <Text className="mb-2 text-4xl font-bold text-white">Verify Email</Text>
                <Text className="text-lg text-purple-200/70">
                  تحقق من بريدك الإلكتروني — أدخل الرمز
                </Text>
              </>
            )}
          </View>

          {/* Form */}
          <View className="flex-1 justify-center">
            {error ? (
              <View className="mb-4 rounded-xl bg-red-500/20 px-4 py-3">
                <Text className="text-center text-sm text-red-300">{error}</Text>
              </View>
            ) : null}

            {!pendingVerification ? (
              <>
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
                    accessibilityHint="Enter your email address to create an account"
                  />
                </View>

                <View className="mb-6">
                  <Text className="mb-2 text-sm font-medium text-purple-200">Password</Text>
                  <TextInput
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Create a strong password"
                    placeholderTextColor="rgba(196, 181, 253, 0.4)"
                    secureTextEntry
                    className="rounded-xl border border-white/10 bg-white/5 px-5 py-4 text-base text-white"
                    accessibilityLabel="Password"
                    accessibilityHint="Create a password for your account"
                  />
                </View>

                <Pressable
                  onPress={onSignUp}
                  disabled={loading || !email || !password}
                  className="items-center rounded-2xl bg-white px-8 py-5 active:opacity-80 disabled:opacity-50">
                  {loading ? (
                    <ActivityIndicator color={Colors.primary[700]} />
                  ) : (
                    <Text className="text-lg font-bold text-purple-700">Create Account</Text>
                  )}
                </Pressable>
              </>
            ) : (
              <>
                <View className="mb-2 items-center">
                  <View className="mb-4 h-20 w-20 items-center justify-center rounded-full bg-white/10">
                    <Text className="text-4xl">✉️</Text>
                  </View>
                  <Text className="mb-6 max-w-xs text-center text-base text-purple-200/70">
                    {'We sent a verification code to\n'}
                    <Text className="font-semibold text-white">{email}</Text>
                  </Text>
                </View>

                <View className="mb-6">
                  <TextInput
                    value={code}
                    onChangeText={setCode}
                    placeholder="Enter verification code"
                    placeholderTextColor="rgba(196, 181, 253, 0.4)"
                    keyboardType="number-pad"
                    className="rounded-xl border border-white/10 bg-white/5 px-5 py-4 text-center text-2xl tracking-widest text-white"
                    accessibilityLabel="Verification code"
                    accessibilityHint="Enter the 6-digit code sent to your email"
                  />
                </View>

                <Pressable
                  onPress={onVerify}
                  disabled={loading || !code}
                  className="items-center rounded-2xl bg-white px-8 py-5 active:opacity-80 disabled:opacity-50">
                  {loading ? (
                    <ActivityIndicator color={Colors.primary[700]} />
                  ) : (
                    <Text className="text-lg font-bold text-purple-700">Verify & Continue</Text>
                  )}
                </Pressable>
              </>
            )}
          </View>

          {/* Footer */}
          <View className="items-center">
            <Text className="text-base text-purple-200/60">
              {'Already have an account? '}
              <Link href="/sign-in" asChild>
                <Text className="font-semibold text-white">Sign In</Text>
              </Link>
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

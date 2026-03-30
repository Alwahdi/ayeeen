import { Ionicons } from '@expo/vector-icons';
import { useAuth, useUser } from '@clerk/expo';
import { useRouter } from 'expo-router';
import { Alert, Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Colors } from '@/constants/Colors';

interface SettingsItemProps {
  icon: string;
  label: string;
  labelAr: string;
  value?: string;
  onPress?: () => void;
  danger?: boolean;
}

function SettingsItem({ icon, label, labelAr, value, onPress, danger }: SettingsItemProps) {
  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center border-b border-neutral-100 px-6 py-4 active:bg-neutral-50"
      accessibilityLabel={`${label} - ${labelAr}`}
      accessibilityRole="button">
      <View
        className="mr-4 h-10 w-10 items-center justify-center rounded-xl"
        style={{ backgroundColor: danger ? Colors.error + '15' : Colors.primary[50] }}>
        <Ionicons
          name={icon as never}
          size={20}
          color={danger ? Colors.error : Colors.primary[600]}
        />
      </View>
      <View className="flex-1">
        <Text className={`text-base font-medium ${danger ? 'text-red-600' : 'text-neutral-900'}`}>
          {label}
        </Text>
        <Text className="text-xs text-neutral-400">{labelAr}</Text>
      </View>
      {value ? <Text className="text-sm text-neutral-500">{value}</Text> : null}
      <Ionicons name="chevron-forward" size={18} color={Colors.neutral[300]} className="ml-2" />
    </Pressable>
  );
}

export default function SettingsScreen() {
  const { user } = useUser();
  const { signOut } = useAuth();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleSignOut = () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign Out',
        style: 'destructive',
        onPress: async () => {
          await signOut();
          router.replace('/');
        },
      },
    ]);
  };

  return (
    <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="items-center px-6 pt-8 pb-6">
          <View className="mb-4 h-20 w-20 items-center justify-center rounded-full bg-purple-100">
            <Text className="text-3xl">
              {user?.firstName ? user.firstName.charAt(0).toUpperCase() : '👤'}
            </Text>
          </View>
          <Text className="text-xl font-bold text-neutral-900">{user?.fullName ?? 'User'}</Text>
          <Text className="mt-1 text-sm text-neutral-500">
            {user?.primaryEmailAddress?.emailAddress ?? ''}
          </Text>
        </View>

        {/* General Section */}
        <View className="mb-2 px-6 pt-4">
          <Text className="mb-1 text-sm font-semibold tracking-wider text-neutral-400">
            General
          </Text>
        </View>

        <SettingsItem icon="language-outline" label="Language" labelAr="اللغة" value="English" />
        <SettingsItem
          icon="volume-high-outline"
          label="Speech Settings"
          labelAr="إعدادات الصوت"
          value="Normal"
        />
        <SettingsItem
          icon="hand-left-outline"
          label="Haptic Feedback"
          labelAr="الاهتزاز"
          value="On"
        />
        <SettingsItem icon="contrast-outline" label="Appearance" labelAr="المظهر" value="System" />

        {/* Accessibility Section */}
        <View className="mb-2 px-6 pt-6">
          <Text className="mb-1 text-sm font-semibold tracking-wider text-neutral-400">
            Accessibility
          </Text>
        </View>

        <SettingsItem icon="text-outline" label="Text Size" labelAr="حجم الخط" value="Large" />
        <SettingsItem
          icon="speedometer-outline"
          label="Speech Rate"
          labelAr="سرعة القراءة"
          value="Normal"
        />
        <SettingsItem
          icon="chatbubble-outline"
          label="Verbosity"
          labelAr="مستوى التفصيل"
          value="Detailed"
        />

        {/* About Section */}
        <View className="mb-2 px-6 pt-6">
          <Text className="mb-1 text-sm font-semibold tracking-wider text-neutral-400">About</Text>
        </View>

        <SettingsItem icon="information-circle-outline" label="About Ayeeen" labelAr="عن عين" />
        <SettingsItem icon="help-circle-outline" label="Help & Support" labelAr="المساعدة والدعم" />
        <SettingsItem
          icon="shield-checkmark-outline"
          label="Privacy Policy"
          labelAr="سياسة الخصوصية"
        />

        {/* Sign Out */}
        <View className="mt-4">
          <SettingsItem
            icon="log-out-outline"
            label="Sign Out"
            labelAr="تسجيل الخروج"
            onPress={handleSignOut}
            danger
          />
        </View>

        {/* Version */}
        <View className="items-center px-6 pt-6 pb-8">
          <Text className="text-xs text-neutral-300">عين — Ayeeen v1.0.0</Text>
        </View>
      </ScrollView>
    </View>
  );
}

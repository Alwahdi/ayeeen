import * as SecureStore from 'expo-secure-store';
import type { TokenCache } from '@clerk/expo';

const createTokenCache = (): TokenCache => {
  return {
    getToken: async (key: string) => {
      try {
        const item = await SecureStore.getItemAsync(key);
        return item;
      } catch {
        await SecureStore.deleteItemAsync(key);
        return null;
      }
    },
    saveToken: async (key: string, token: string) => {
      await SecureStore.setItemAsync(key, token);
    },
    clearToken: async (key: string) => {
      await SecureStore.deleteItemAsync(key);
    },
  };
};

export const tokenCache = createTokenCache();

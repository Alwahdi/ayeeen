import { tokenCache } from '@/lib/auth';
import * as SecureStore from 'expo-secure-store';

jest.mock('expo-secure-store');

const mockedSecureStore = jest.mocked(SecureStore);

describe('tokenCache', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getToken', () => {
    it('retrieves a token from SecureStore', async () => {
      mockedSecureStore.getItemAsync.mockResolvedValue('mock-token');

      const result = await tokenCache.getToken('auth-key');

      expect(mockedSecureStore.getItemAsync).toHaveBeenCalledWith('auth-key');
      expect(result).toBe('mock-token');
    });

    it('returns null when token does not exist', async () => {
      mockedSecureStore.getItemAsync.mockResolvedValue(null);

      const result = await tokenCache.getToken('missing-key');

      expect(result).toBeNull();
    });

    it('deletes the key and returns null on error', async () => {
      mockedSecureStore.getItemAsync.mockRejectedValue(new Error('Storage error'));

      const result = await tokenCache.getToken('corrupt-key');

      expect(mockedSecureStore.deleteItemAsync).toHaveBeenCalledWith('corrupt-key');
      expect(result).toBeNull();
    });
  });

  describe('saveToken', () => {
    it('saves a token to SecureStore', async () => {
      await tokenCache.saveToken('auth-key', 'new-token');

      expect(mockedSecureStore.setItemAsync).toHaveBeenCalledWith('auth-key', 'new-token');
    });
  });

  describe('clearToken', () => {
    it('removes a token from SecureStore', async () => {
      await tokenCache.clearToken('auth-key');

      expect(mockedSecureStore.deleteItemAsync).toHaveBeenCalledWith('auth-key');
    });
  });
});

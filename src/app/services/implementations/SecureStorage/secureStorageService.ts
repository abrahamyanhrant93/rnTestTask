import RNSecureStorage, {ACCESSIBLE} from 'rn-secure-storage';
import {ISecureStorageService} from '../../interfaces';

class SecureStorageService implements ISecureStorageService {
  /* Set a value in SecureStorage */
  async setItem(key: string, value: string): Promise<void> {
    try {
      await RNSecureStorage.setItem(key, value, {
        accessible: ACCESSIBLE.WHEN_UNLOCKED,
      });
    } catch (error) {
      console.error(`Failed to set item with key: ${key}`, error);
      throw new Error(`Could not store data: ${error}`);
    }
  }

  /* Get a value from SecureStorage */
  async getItem(key: string): Promise<string | null> {
    try {
      const value = await RNSecureStorage.getItem(key);
      return value;
    } catch (error) {
      console.error(`Failed to retrieve item with key: ${key}`, error);
      throw new Error(`Could not retrieve data: ${error}`);
    }
  }

  /** Reset storage */
  async resetStorage(): Promise<void> {
    try {
      await RNSecureStorage.clear();
    } catch (error) {
      console.error(`Failed to clear data from RNSecureStorage`, error);
      throw new Error(`Could not retrieve data: ${error}`);
    }
  }

  /* Remove an item from RNSecureStorage */
  async removeItem(key: string): Promise<void> {
    try {
      await RNSecureStorage.removeItem(key);
    } catch (error) {
      console.error(`Failed to remove item with key: ${key}`, error);
      throw new Error(`Could not remove data: ${error}`);
    }
  }

  /* Check if an item exists in SecureStorage */
  async containsItem(key: string): Promise<boolean | null> {
    try {
      const exists = await RNSecureStorage.exist(key);
      return exists;
    } catch (error) {
      console.error(
        `Failed to check existence of item with key: ${key}`,
        error,
      );
      throw new Error(`Could not check item existence: ${error}`);
    }
  }
}

export default SecureStorageService;

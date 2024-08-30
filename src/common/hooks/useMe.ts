import SecureStorageService from 'src/app/services/implementations/SecureStorage/secureStorageService';

const RNSecureStorageService = new SecureStorageService();

export const useMe = () => {
  const getUser = async () => {
    const user = await RNSecureStorageService.getItem('user');
    return JSON.parse(user || '');
  };
  return {
    user: getUser(),
  };
};

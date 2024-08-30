import React, {createContext, useContext} from 'react';

type TAuthContext = {
  onLogin: (data: TLoginDTO) => Promise<void>;
  onLogout: () => Promise<void>;
  onSignUp: (data: TLoginDTO) => Promise<void>;
  errorMessage: TErrorMessage;
  status: TAuthStatus;
};

const AuthContext = createContext<TAuthContext>({} as TAuthContext);

import {useState} from 'react';
import SecureStorageService from 'src/app/services/implementations/SecureStorage/secureStorageService';
import DatabaseManager from 'src/app/services/implementations/SQL/sqlStorageService';

const db = new DatabaseManager();
const RNSecureStorageService = new SecureStorageService();

export type TAuthStatus = 'authorized' | 'unauthorized';
export type TLoginDTO = {
  email: string;
  username: string;
};
export type TErrorMessage = string | null;

export const useAuthentication = () => {
  const [status, setStatus] = useState<TAuthStatus>('unauthorized');
  const [errorMessage, setErrorMessage] = useState<TErrorMessage>(null);

  const onLogin = async (data: TLoginDTO) => {
    const foundUser = await db.findUser(data.username, data.email);
    if (foundUser) {
      await RNSecureStorageService.setItem('user', JSON.stringify(data));
      setStatus('authorized');

      setErrorMessage(null);
    } else {
      setErrorMessage('Invalid email or username');
    }
  };
  const onSignUp = async (data: TLoginDTO) => {
    const {username, email} = data;
    const userList = await db.getAllUsers();
    const usernameExists = userList.find(user => user.username === username);
    const emailAlreadyExist = userList.find(user => user.email === email);
    const errorMessage = usernameExists ? username : email;
    if (emailAlreadyExist || usernameExists) {
      setStatus('unauthorized');
      setErrorMessage(`User ${errorMessage} already registered`);
    } else {
      setErrorMessage(null);
      await db.registerUser(data.username, data.email);
      await RNSecureStorageService.setItem('user', JSON.stringify(data));
      setStatus('authorized');
    }
  };

  const onLogout = async () => {
    await RNSecureStorageService.resetStorage();
    setStatus('unauthorized');
  };

  return {onLogin, onLogout, onSignUp, errorMessage, status};
};

export const AuthProvider = ({children}: React.PropsWithChildren) => {
  const auth = useAuthentication();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

import {SetStateAction} from 'react';

interface IContext {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<SetStateAction<boolean>>;
}

export type {IContext};

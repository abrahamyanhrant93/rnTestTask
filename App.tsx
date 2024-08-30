import {NavigationContainer} from '@react-navigation/native';
import {ThemeProvider} from '@shopify/restyle';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import 'react-native-get-random-values';
import {AuthProvider} from './src/app/components/AuthProvider/AuthContext';
import AppNavigator from './src/app/navigation/AppNavigator';
import {NavigationService} from './src/app/services/implementations/Navigation/NavigationService';
import DatabaseManager from './src/app/services/implementations/SQL/sqlStorageService';
import SecureStorageService from './src/app/services/implementations/SecureStorage/secureStorageService';
import {theme} from './src/app/styles/theme';
import {useDeviceTheme} from './src/common/hooks';

const dbManager = new DatabaseManager();
const RNSecureStorageService = new SecureStorageService();
const AppNavigationService = new NavigationService();

const queryClient = new QueryClient();

function App(): React.JSX.Element {
  const {isDarkMode} = useDeviceTheme();
  const barStyle = isDarkMode ? 'dark-content' : 'light-content';

  const initDB = async () => {
    await dbManager.initializeDB();
    await dbManager.createTables();
    /** @helperForDev For fast clearing data from secure storage and sql db  */
    // await dbManager.dropTables();
    // await RNSecureStorageService.resetStorage();
  };

  useEffect(() => {
    initDB();
  }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <QueryClientProvider client={queryClient}>
        <StatusBar
          animated
          hidden={false}
          barStyle={barStyle}
          backgroundColor="transparent"
          translucent={false}
        />
        <ThemeProvider theme={theme}>
          <AuthProvider>
            <NavigationContainer ref={AppNavigationService.ref}>
              <AppNavigator />
            </NavigationContainer>
          </AuthProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}

export default App;
//

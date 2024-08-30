module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['module:@react-native/babel-preset', '@babel/preset-typescript'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          extensions: [
            '.ios.js',
            '.android.js',
            '.windows.js',
            '.native.js',
            '.js',
            '.jsx',
            '.ts',
            '.tsx',
            '.json',
          ],
          alias: {
            '@services': ['.src/services'],
            '@assets': ['./src/assets'],
            '@images': ['./src/assets/images/*'],
            '@utils': ['src/common/utils'],
            '@typings': ['src/common/typings'],
            '@hooks': ['./src/common/hooks'],
            '@constants': ['src/constants'],
            '@ui-kit': ['./src/ui-kit'],
            '@ui-modules': ['./src/ui-modules'],
            '@ui-modules/*': ['./src/ui-modules/*'],
            '@navigators': 'src/app/navigators',
            '@screens': ['src/app/screens'],
          },
          cwd: 'packagejson',
        },
      ],
      'react-native-reanimated/plugin',
    ],
  };
};

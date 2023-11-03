module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['.'],
          extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
          alias: {
            '@/app': './src/app',
            '@/assets': './src/assets',
            '@/common': './src/common',
            '@/components': './src/components',
            '@/features': './src/features',
            '@/lib': './src/lib',
            '@/navigation': './src/navigation',
            '@/providers': './src/providers',
            '@/screens': './src/screens',
            '@/theme': './src/theme',
            '@/appTypes': './src/types',
            '@/recoil': './src/recoil',
            '@/styles': './src/styles',
          },
        },
      ],
      'react-native-reanimated/plugin',
    ],
  };
};

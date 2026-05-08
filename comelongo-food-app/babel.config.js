module.exports = {
    presets: [
        ['module:@react-native/babel-preset'],
        'nativewind/babel',
    ],
    plugins: [
        ['module:react-native-dotenv'],
        [
            'module-resolver',
            {
                extensions: ['.ios.js', '.android.js', '.ios.jsx', '.android.jsx', '.js', '.jsx', '.json', '.ts', '.tsx'],
                root: ['.'],
                alias: {
                    '@src': './src',
                    '@config': './src/config',
                    '@assets': './src/assets',
                    '@core': './src/core',
                    '@domain': './src/domain',
                    '@infrastructure': './src/infrastructure',
                    '@presentation': './src/presentation',
                },
            },
        ],
        'react-native-reanimated/plugin',
    ],
};

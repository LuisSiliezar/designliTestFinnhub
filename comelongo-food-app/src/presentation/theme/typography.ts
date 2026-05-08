import { Platform } from 'react-native';

export const typography = {
    display: Platform.select({
        ios: 'DM Serif Display',
        android: 'DMSerifDisplay-Regular',
        default: 'serif',
    }),
    ui: Platform.select({
        ios: 'Plus Jakarta Sans',
        android: 'PlusJakartaSans-Regular',
        default: 'System',
    }),
    mono: Platform.select({
        ios: 'JetBrains Mono',
        android: 'JetBrainsMono-Regular',
        default: 'monospace',
    }),
} as const;

export const fontSize = {
    xs: 10,
    sm: 12,
    base: 14,
    md: 16,
    lg: 18,
    xl: 22,
    xxl: 28,
    display: 38,
} as const;

export const fontWeight = {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    black: '800',
} as const;

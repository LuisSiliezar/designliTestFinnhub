import React from 'react';
import { Pressable, StyleSheet, Text, ViewStyle } from 'react-native';
import { colors, radius, typography } from '@presentation/theme';

type Variant = 'primary' | 'orange' | 'ghost' | 'light';

interface CTAButtonProps {
    label: string;
    onPress?: () => void;
    variant?: Variant;
    style?: ViewStyle;
    disabled?: boolean;
}

const VARIANTS: Record<Variant, { bg: string; fg: string; border?: string }> = {
    primary: { bg: colors.ink, fg: colors.paper },
    orange: { bg: colors.orange, fg: colors.paper },
    ghost: { bg: 'transparent', fg: colors.ink, border: colors.ink },
    light: { bg: colors.paper, fg: colors.ink, border: colors.border },
};

const CTAButton = ({ label, onPress, variant = 'primary', style, disabled }: CTAButtonProps) => {
    const v = VARIANTS[variant];
    return (
        <Pressable
            onPress={onPress}
            disabled={disabled}
            style={[
                styles.button,
                {
                    backgroundColor: v.bg,
                    borderColor: v.border ?? 'transparent',
                    borderWidth: v.border ? 1.5 : 0,
                    opacity: disabled ? 0.5 : 1,
                },
                style,
            ]}
        >
            <Text style={[styles.label, { color: v.fg }]}>{label}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    button: {
        height: 56,
        borderRadius: radius.pill,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 24,
    },
    label: {
        fontFamily: typography.ui,
        fontSize: 16,
        fontWeight: '700',
        letterSpacing: -0.2,
    },
});

export default CTAButton;

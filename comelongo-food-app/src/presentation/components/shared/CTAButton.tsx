import React from 'react';
import { Text, ViewStyle } from 'react-native';
import AnimatedPressable from './AnimatedPressable';

type Variant = 'primary' | 'orange' | 'ghost' | 'light';

interface CTAButtonProps {
    label: string;
    onPress?: () => void;
    variant?: Variant;
    style?: ViewStyle;
    disabled?: boolean;
}

const VARIANT_BG: Record<Variant, string> = {
    primary: 'bg-ink',
    orange: 'bg-orange',
    ghost: 'bg-transparent border-[1.5px] border-ink',
    light: 'bg-paper border border-border',
};

const VARIANT_TEXT: Record<Variant, string> = {
    primary: 'text-paper',
    orange: 'text-paper',
    ghost: 'text-ink',
    light: 'text-ink',
};

const CTAButton = ({ label, onPress, variant = 'primary', style, disabled }: CTAButtonProps) => (
    <AnimatedPressable
        onPress={onPress}
        disabled={disabled}
        className={`h-14 rounded-pill items-center justify-center px-6 ${VARIANT_BG[variant]} ${disabled ? 'opacity-50' : ''}`}
        style={style}
    >
        <Text className={`font-ui text-base font-bold tracking-tight ${VARIANT_TEXT[variant]}`}>
            {label}
        </Text>
    </AnimatedPressable>
);

export default CTAButton;

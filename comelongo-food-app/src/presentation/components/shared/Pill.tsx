import React from 'react';
import { Pressable, StyleSheet, Text, ViewStyle } from 'react-native';
import { colors, radius, typography } from '@presentation/theme';

interface PillProps {
    label: string;
    onPress?: () => void;
    primary?: boolean;
    selected?: boolean;
    dark?: boolean;
    style?: ViewStyle;
}

const Pill = ({ label, onPress, primary, selected, dark, style }: PillProps) => {
    const bg = primary || selected
        ? primary ? colors.orange : colors.ink
        : dark ? 'rgba(255,255,255,0.08)' : colors.paper;
    const fg = primary || selected
        ? colors.paper
        : dark ? colors.paper : colors.ink;
    const bd = primary || selected
        ? 'transparent'
        : dark ? 'rgba(255,255,255,0.12)' : colors.border;

    return (
        <Pressable
            onPress={onPress}
            style={[
                styles.pill,
                { backgroundColor: bg, borderColor: bd },
                style,
            ]}
        >
            <Text style={[styles.label, { color: fg }]}>{label}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    pill: {
        borderWidth: 1,
        borderRadius: radius.pill,
        paddingHorizontal: 14,
        paddingVertical: 8,
        alignSelf: 'flex-start',
    },
    label: {
        fontFamily: typography.ui,
        fontSize: 13,
        fontWeight: '600',
        letterSpacing: -0.1,
    },
});

export default Pill;

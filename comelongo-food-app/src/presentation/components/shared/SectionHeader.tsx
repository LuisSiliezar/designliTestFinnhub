import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, typography } from '@presentation/theme';

interface Props {
    label: string;
    actionLabel?: string;
    onAction?: () => void;
    eyebrow?: boolean;
    serif?: boolean;
}

const SectionHeader = ({ label, actionLabel, onAction, eyebrow, serif }: Props) => (
    <View style={styles.row}>
        <Text style={[styles.label, eyebrow && styles.eyebrow, serif && styles.serif]}>
            {eyebrow ? label.toUpperCase() : label}
        </Text>
        {actionLabel && (
            <Pressable onPress={onAction} hitSlop={8}>
                <Text style={styles.action}>{actionLabel}</Text>
            </Pressable>
        )}
    </View>
);

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    label: {
        fontFamily: typography.ui,
        fontSize: 16,
        fontWeight: '700',
        color: colors.ink,
        letterSpacing: -0.2,
    },
    eyebrow: {
        fontSize: 13,
        fontWeight: '700',
        color: colors.textMuted,
        letterSpacing: 0.4,
    },
    serif: {
        fontFamily: typography.display,
        fontSize: 22,
        fontWeight: '400',
        letterSpacing: -0.4,
    },
    action: {
        fontFamily: typography.ui,
        fontSize: 13,
        fontWeight: '700',
        color: colors.orange,
    },
});

export default SectionHeader;

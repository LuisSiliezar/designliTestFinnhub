import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, scoreColor, typography } from '@presentation/theme';
import type { ScoreBadgeProps } from '@infrastructure/interfaces';

const ScoreBadge = ({ score, size = 56, showLabel = true }: ScoreBadgeProps) => {
    const color = scoreColor(score);
    return (
        <View
            style={[
                styles.badge,
                {
                    width: size,
                    height: size,
                    borderRadius: size / 2,
                    borderColor: color,
                },
            ]}
        >
            <Text style={[styles.score, { color, fontSize: size * 0.42 }]}>
                {score.toFixed(1)}
            </Text>
            {showLabel && size >= 50 && <Text style={styles.label}>/10</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    badge: {
        backgroundColor: colors.paper,
        borderWidth: 1.5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    score: {
        fontFamily: typography.display,
        lineHeight: undefined,
    },
    label: {
        fontFamily: typography.ui,
        fontSize: 8,
        color: colors.textSubtle,
        fontWeight: '600',
        letterSpacing: 0.5,
        marginTop: 1,
    },
});

export default ScoreBadge;

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors, radius } from '@presentation/theme';

const SkeletonCard = () => (
    <View style={styles.card}>
        <View style={styles.image} />
        <View style={styles.line} />
        <View style={[styles.line, styles.lineShort]} />
    </View>
);

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.paper,
        borderRadius: radius.lg,
        borderWidth: 1,
        borderColor: colors.border,
        marginHorizontal: 16,
        marginVertical: 8,
        padding: 14,
    },
    image: {
        height: 200,
        backgroundColor: colors.warmGray,
        borderRadius: radius.md,
        marginBottom: 12,
    },
    line: {
        height: 12,
        borderRadius: 6,
        backgroundColor: colors.warmGray,
        marginVertical: 4,
    },
    lineShort: {
        width: '50%',
    },
});

export default SkeletonCard;

import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, typography } from '@presentation/theme';
import Icon, { IconName } from './Icon';

interface Props {
    title?: string;
    showBack?: boolean;
    onBack?: () => void;
    rightIcons?: { name: IconName; onPress?: () => void; badge?: boolean }[];
    serif?: boolean;
}

const AppHeader = ({ title = 'Comelongo', showBack, onBack, rightIcons = [], serif = true }: Props) => (
    <View style={styles.header}>
        {showBack ? (
            <Pressable onPress={onBack} style={styles.iconBtn} hitSlop={8}>
                <Icon name="chevron-left" size={22} />
            </Pressable>
        ) : (
            <View style={styles.iconBtn} />
        )}
        <Text style={[styles.title, serif && styles.titleSerif]}>{title}</Text>
        <View style={styles.right}>
            {rightIcons.map((r, i) => (
                <Pressable key={i} onPress={r.onPress} style={styles.iconBtn} hitSlop={8}>
                    <Icon name={r.name} size={20} />
                    {r.badge && <View style={styles.badge} />}
                </Pressable>
            ))}
            {rightIcons.length === 0 && <View style={styles.iconBtn} />}
        </View>
    </View>
);

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
        paddingVertical: 10,
        backgroundColor: colors.cream,
    },
    iconBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.paper,
        borderWidth: 1,
        borderColor: colors.border,
        position: 'relative',
    },
    right: {
        flexDirection: 'row',
        gap: 8,
    },
    title: {
        fontFamily: typography.ui,
        fontSize: 18,
        fontWeight: '700',
        color: colors.ink,
    },
    titleSerif: {
        fontFamily: typography.display,
        fontStyle: 'italic',
        fontSize: 24,
        fontWeight: '400',
    },
    badge: {
        position: 'absolute',
        top: 9,
        right: 10,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: colors.orange,
        borderWidth: 1.5,
        borderColor: colors.paper,
    },
});

export default AppHeader;

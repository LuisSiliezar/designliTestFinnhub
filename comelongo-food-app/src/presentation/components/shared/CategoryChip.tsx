import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radius, typography } from '@presentation/theme';
import type { Category } from '@domain/entities';

interface Props {
    category: Category;
    onPress?: () => void;
}

const CategoryChip = ({ category, onPress }: Props) => (
    <Pressable onPress={onPress} style={styles.wrap}>
        <View style={styles.imageWrap}>
            {category.image && <Image source={{ uri: category.image }} style={styles.image} />}
        </View>
        <Text style={styles.label} numberOfLines={1}>{category.name}</Text>
    </Pressable>
);

const styles = StyleSheet.create({
    wrap: {
        width: 96,
        alignItems: 'center',
    },
    imageWrap: {
        width: 80,
        height: 80,
        borderRadius: radius.lg,
        overflow: 'hidden',
        backgroundColor: colors.warmGray,
        borderWidth: 1,
        borderColor: colors.border,
    },
    image: { width: '100%', height: '100%' },
    label: {
        marginTop: 8,
        fontFamily: typography.ui,
        fontSize: 12,
        fontWeight: '700',
        color: colors.ink,
        textAlign: 'center',
    },
});

export default CategoryChip;

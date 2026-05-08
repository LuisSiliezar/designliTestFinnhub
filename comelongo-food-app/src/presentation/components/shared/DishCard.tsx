import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radius, shadow, typography } from '@presentation/theme';
import ScoreBadge from './ScoreBadge';
import type { DishCardProps } from '@infrastructure/interfaces';

const DishCard = ({ name, image, score, restaurantName, city, onPress }: DishCardProps) => (
    <Pressable onPress={onPress} style={[styles.card, shadow.card]}>
        <View style={styles.imageWrap}>
            {image && <Image source={{ uri: image }} style={styles.image} />}
            {typeof score === 'number' && (
                <View style={styles.scoreWrap}>
                    <ScoreBadge score={score} size={44} showLabel={false} />
                </View>
            )}
        </View>
        <View style={styles.body}>
            {restaurantName && <Text style={styles.muted}>{restaurantName.toUpperCase()}</Text>}
            <Text style={styles.title} numberOfLines={1}>{name}</Text>
            {city && <Text style={styles.subtitle}>{city}</Text>}
        </View>
    </Pressable>
);

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.paper,
        borderRadius: radius.lg,
        borderWidth: 1,
        borderColor: colors.border,
        overflow: 'hidden',
    },
    imageWrap: {
        height: 180,
        backgroundColor: colors.warmGray,
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    scoreWrap: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    body: {
        padding: 14,
    },
    muted: {
        fontFamily: typography.ui,
        fontSize: 11,
        fontWeight: '700',
        color: colors.textMuted,
        letterSpacing: 0.4,
        marginBottom: 4,
    },
    title: {
        fontFamily: typography.ui,
        fontSize: 16,
        fontWeight: '700',
        color: colors.ink,
    },
    subtitle: {
        fontFamily: typography.ui,
        fontSize: 12,
        color: colors.textMuted,
        marginTop: 2,
    },
});

export default DishCard;

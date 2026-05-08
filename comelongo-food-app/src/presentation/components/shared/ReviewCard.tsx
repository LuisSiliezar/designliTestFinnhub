import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radius, typography } from '@presentation/theme';
import ScoreBadge from './ScoreBadge';
import Icon from './Icon';
import type { ReviewCardProps } from '@infrastructure/interfaces';

const ReviewCard = ({ review, onLike, onComment, onShare, onSave }: ReviewCardProps) => {
    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <Image source={{ uri: review.author.avatar }} style={styles.avatar} />
                <View style={styles.headerText}>
                    <Text style={styles.author}>{review.author.name}</Text>
                    <Text style={styles.meta}>
                        {review.author.handle} · {review.createdAt}
                        {review.city ? ` · ${review.city}` : ''}
                    </Text>
                </View>
                <Pressable onPress={onSave} hitSlop={8}>
                    <Icon name="bookmark" size={20} />
                </Pressable>
            </View>

            {review.image && (
                <View style={styles.photoWrap}>
                    <Image source={{ uri: review.image }} style={styles.photo} />
                    <View style={styles.scoreWrap}>
                        <ScoreBadge score={review.score} size={48} />
                    </View>
                    <View style={styles.placeChip}>
                        {review.restaurantName && (
                            <Text style={styles.placeChipPlace}>{review.restaurantName}</Text>
                        )}
                        <Text style={styles.placeChipDish}>{review.dishName}</Text>
                    </View>
                </View>
            )}

            <Text style={styles.note}>{review.note}</Text>

            <View style={styles.actions}>
                <Pressable style={styles.actionBtn} onPress={onLike} hitSlop={6}>
                    <Icon name="heart" size={20} />
                    <Text style={styles.actionLabel}>{review.likes ?? 0}</Text>
                </Pressable>
                <Pressable style={styles.actionBtn} onPress={onComment} hitSlop={6}>
                    <Icon name="comment" size={20} />
                    <Text style={styles.actionLabel}>{review.comments ?? 0}</Text>
                </Pressable>
                <View style={styles.flex} />
                <Pressable onPress={onShare} hitSlop={8}>
                    <Icon name="share" size={20} />
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.paper,
        borderRadius: 22,
        marginHorizontal: 16,
        marginVertical: 8,
        borderWidth: 1,
        borderColor: colors.border,
        overflow: 'hidden',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        padding: 14,
    },
    avatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: colors.warmGray,
    },
    headerText: { flex: 1 },
    author: {
        fontFamily: typography.ui,
        fontSize: 14,
        fontWeight: '700',
        color: colors.ink,
    },
    meta: {
        fontFamily: typography.ui,
        fontSize: 12,
        color: colors.textMuted,
    },
    photoWrap: {
        height: 240,
        position: 'relative',
        backgroundColor: colors.warmGray,
    },
    photo: { width: '100%', height: '100%' },
    scoreWrap: {
        position: 'absolute',
        top: 12,
        left: 12,
        backgroundColor: colors.paper,
        borderRadius: radius.pill,
        padding: 4,
    },
    placeChip: {
        position: 'absolute',
        bottom: 12,
        left: 12,
        backgroundColor: 'rgba(14,14,14,0.85)',
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    placeChipPlace: {
        fontFamily: typography.ui,
        fontSize: 11,
        color: colors.paper,
        opacity: 0.7,
        fontWeight: '600',
    },
    placeChipDish: {
        fontFamily: typography.ui,
        fontSize: 14,
        color: colors.paper,
        fontWeight: '700',
    },
    note: {
        fontFamily: typography.ui,
        fontSize: 14,
        lineHeight: 20,
        color: colors.inkSoft,
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    actions: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 18,
        paddingHorizontal: 16,
        paddingBottom: 14,
    },
    actionBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    actionLabel: {
        fontFamily: typography.ui,
        fontSize: 13,
        fontWeight: '600',
        color: colors.ink,
    },
    flex: { flex: 1 },
});

export default ReviewCard;

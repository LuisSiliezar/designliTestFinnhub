import React from 'react';
import { Image, Text, View } from 'react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import AnimatedPressable from './AnimatedPressable';
import HeartButton from './HeartButton';
import SaveButton from './SaveButton';
import ScoreBadge from './ScoreBadge';
import Icon from './Icon';
import type { ReviewCardProps } from '@infrastructure/interfaces';

const ReviewCard = ({ review, onComment, onShare, onSave }: ReviewCardProps) => (
    <Animated.View
        entering={FadeInDown.duration(360).springify()}
        className="bg-paper rounded-[22px] mx-4 my-2 border border-border overflow-hidden"
    >
        <View className="flex-row items-center gap-2.5 p-3.5">
            <Image
                source={{ uri: review.author.avatar }}
                className="w-9 h-9 rounded-full bg-warm-gray"
            />
            <View className="flex-1">
                <Text className="font-ui text-sm font-bold text-ink">
                    {review.author.name}
                </Text>
                <Text className="font-ui text-xs text-muted">
                    {review.author.handle} · {review.createdAt}
                    {review.city ? ` · ${review.city}` : ''}
                </Text>
            </View>
            <SaveButton onToggle={() => onSave?.()} />
        </View>

        {review.image && (
            <Animated.View
                entering={FadeIn.duration(220)}
                className="h-60 relative bg-warm-gray"
            >
                <Image source={{ uri: review.image }} className="w-full h-full" />
                <View className="absolute top-3 left-3 bg-paper rounded-pill p-1">
                    <ScoreBadge score={review.score} size={48} />
                </View>
                <View className="absolute bottom-3 left-3 bg-ink/85 rounded-xl px-3 py-2">
                    {review.restaurantName && (
                        <Text className="font-ui text-[11px] text-paper opacity-70 font-semibold">
                            {review.restaurantName}
                        </Text>
                    )}
                    <Text className="font-ui text-sm text-paper font-bold">
                        {review.dishName}
                    </Text>
                </View>
            </Animated.View>
        )}

        <Text className="font-ui text-sm leading-5 text-ink-soft px-4 py-3">
            {review.note}
        </Text>

        <View className="flex-row items-center gap-4 px-4 pb-3.5">
            <HeartButton initialLikes={review.likes ?? 0} />
            <AnimatedPressable
                onPress={onComment}
                className="flex-row items-center gap-1.5"
            >
                <Icon name="comment" size={20} />
                <Text className="font-ui text-[13px] font-semibold text-ink">
                    {review.comments ?? 0}
                </Text>
            </AnimatedPressable>
            <View className="flex-1" />
            <AnimatedPressable onPress={onShare}>
                <Icon name="share" size={20} />
            </AnimatedPressable>
        </View>
    </Animated.View>
);

export default ReviewCard;

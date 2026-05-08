import React from 'react';
import { FlatList } from 'react-native';
import ReviewCard from '@presentation/components/shared/ReviewCard';
import type { Review } from '@domain/entities';

interface Props {
    reviews: Review[];
    onPressReview?: (review: Review) => void;
    ListHeaderComponent?: React.ReactElement;
}

const ReviewList = ({ reviews, ListHeaderComponent }: Props) => (
    <FlatList
        data={reviews}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ReviewCard review={item} />}
        ListHeaderComponent={ListHeaderComponent}
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
    />
);

export default ReviewList;

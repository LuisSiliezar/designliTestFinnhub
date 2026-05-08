import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
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
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
    />
);

const styles = StyleSheet.create({
    list: {
        paddingBottom: 120,
    },
});

export default ReviewList;

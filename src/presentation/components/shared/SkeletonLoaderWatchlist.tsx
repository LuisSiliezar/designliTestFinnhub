import React from 'react';
import { StyleSheet, View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

export const SkeletonLoaderWatchlist = () => {
    return (
        <SkeletonPlaceholder>
            <View style={styles.container}>
                <View style={styles.cardContainer}>
                    <View style={styles.cardSkeleton} />
                </View>
                <View style={styles.cardContainer}>
                    <View style={styles.cardSkeleton} />
                </View>
                <View style={styles.cardContainer}>
                    <View style={styles.cardSkeleton} />
                </View>
                <View style={styles.cardContainer}>
                    <View style={styles.cardSkeleton} />
                </View>
                <View style={styles.cardContainer}>
                    <View style={styles.cardSkeleton} />
                </View>
                <View style={styles.cardContainer}>
                    <View style={styles.cardSkeleton} />
                </View>
                <View style={styles.cardContainer}>
                    <View style={styles.cardSkeleton} />
                </View>
                <View style={styles.cardContainer}>
                    <View style={styles.cardSkeleton} />
                </View>
                <View style={styles.cardContainer}>
                    <View style={styles.cardSkeleton} />
                </View>
                <View style={styles.cardContainer}>
                    <View style={styles.cardSkeleton} />
                </View>
                <View style={styles.cardContainer}>
                    <View style={styles.cardSkeleton} />
                </View>
                <View style={styles.cardContainer}>
                    <View style={styles.cardSkeleton} />
                </View>
            </View>
        </SkeletonPlaceholder>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    textContainer: {
        marginTop: 15,
    },
    skeletonBox: {
        width: 120,
        height: 20,
        borderRadius: 4,
    },
    smallSkeleton: {
        width: 80,
    },
    largeSkeletonContainer: {
        marginTop: 20,
    },
    cardContainer: {
        marginTop: 10,
    },
    cardSkeleton: {
        height: 70,
        borderRadius: 8,
    },
    largeSkeleton: {
        width: '100%',
        height: 200,
        borderRadius: 8,
    },
});

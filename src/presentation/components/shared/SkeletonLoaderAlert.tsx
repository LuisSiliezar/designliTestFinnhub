import React from 'react';
import { StyleSheet, View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

export const SkeletonLoaderAlert = () => {
    return (
        <SkeletonPlaceholder>
            <View style={styles.container}>
                <View style={styles.row}>
                    <View style={styles.textContainer}>
                        <View style={styles.skeletonBox} />
                        <View style={[styles.skeletonBox, styles.smallSkeleton]} />
                    </View>
                </View>
                <View style={styles.textContainer} />
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
        height: 50,
        borderRadius: 8,
    },
    largeSkeleton: {
        width: '100%',
        height: 200,
        borderRadius: 8,
    },
});

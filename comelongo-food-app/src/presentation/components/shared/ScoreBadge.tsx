import React from 'react';
import { Text, View } from 'react-native';
import { scoreColor } from '@presentation/theme';
import type { ScoreBadgeProps } from '@infrastructure/interfaces';

const ScoreBadge = ({ score, size = 56, showLabel = true }: ScoreBadgeProps) => {
    const color = scoreColor(score);
    return (
        <View
            className="bg-paper border-[1.5px] items-center justify-center"
            style={{
                width: size,
                height: size,
                borderRadius: size / 2,
                borderColor: color,
            }}
        >
            <Text
                className="font-display"
                style={{ color, fontSize: size * 0.42 }}
            >
                {score.toFixed(1)}
            </Text>
            {showLabel && size >= 50 && (
                <Text className="font-ui text-[8px] text-subtle font-semibold tracking-wider mt-px">
                    /10
                </Text>
            )}
        </View>
    );
};

export default ScoreBadge;

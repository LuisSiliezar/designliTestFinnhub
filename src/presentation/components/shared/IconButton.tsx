import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
    iconName: string;
    onPress: () => void;
    iconColor?: string;
}

const IconButton = ({ iconName, onPress, iconColor }: Props) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.button}>
            <Icon name={iconName} size={30} color={iconColor ? iconColor : 'black'} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        marginHorizontal: 10,
    },
});

export default IconButton;

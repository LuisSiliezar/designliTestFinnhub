import React from 'react';
import LottieView from 'lottie-react-native';
import { StyleSheet, Text, View } from 'react-native';

interface Props {
    message: string;
    submessage: string;
}

const MarketClosedAnimation = ({ message, submessage }: Props) => {
    return (

        <View style={styles.container}>
            <LottieView source={require('@assets/animations/market-closed.json')} style={styles.image} autoPlay loop />
            {message &&
                <View>
                    <Text style={styles.message}> {message}</Text>
                    <Text style={styles.submessage}> {submessage}</Text>
                </View>
            }
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    image: {
        width: 500,
        height: 600,
    },
    message: {
        fontSize: 20,
        color: '#000',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    submessage: {
        fontSize: 16,
        color: '#000',
        textAlign: 'center',
    },
});

export default MarketClosedAnimation;

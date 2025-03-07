import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import theme from '../../theme/theme';

interface GreenButtonProps {
    title: string;
    onPress: () => void;
}

const GreenButton = ({ title, onPress }: GreenButtonProps) => {
    const { colors, fonts } = theme;

    return (
        <Pressable style={styles.loginButton} onPress={onPress}>
            <Text style={styles.loginButtonText}>{title}</Text>
        </Pressable>
    );
};

export default GreenButton;

const styles = StyleSheet.create({
    loginButton: {
        backgroundColor: theme.colors.primaryGreen,
        paddingVertical: 18,
        borderRadius: 8,
    },
    loginButtonText: {
        color: theme.colors.white,
        textAlign: 'center',
        fontFamily: theme.fonts.bold,
    },
});
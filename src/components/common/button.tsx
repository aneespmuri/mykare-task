import { Pressable, StyleSheet, Text, View } from 'react-native'
import theme from '../../theme/theme';

const GreenButton = ({ title, onPress }) => {
    console.log(onPress, '...')
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
})
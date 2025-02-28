import React from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import Separator from '../../../components/common/Separator';
import theme from '../../../theme/theme';
import InputField from '../../../components/common/InputField';
import GreenButton from '../../../components/common/button';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
    const { colors, fonts } = theme;


    return (
        <SafeAreaView style={styles.safeArea} >
            <Text style={styles.headerText}> A </Text>
            < View style={styles.container} >
                <Text style={styles.loginTitle}>Sign Up</Text>
                < Text style={styles.subtitle} >Fill the registration form</Text>
                < Separator height={40} />
                <InputField label="Full Name" />
                <Separator height={28} />
                < InputField label="Email" />
                <Separator height={28} />
                < InputField label="Password" />
                <Separator height={16} />
                <Separator height={40} />
                < GreenButton title={"Sign Up"} />
                <Separator height={40} />
                < SignupPrompt />
            </View>
        </SafeAreaView>
    );
};

export default Login;







// Signup Prompt
const SignupPrompt = () => {
    const { colors, fonts } = theme;
    const navigation = useNavigation();

    return (
        <View style={styles.signupContainer} >
            <Text style={styles.signupText}> Already have an account? </Text>
            <Pressable onPress={() => navigation?.navigate("SignIn")}>
                <Text style={styles.signupLink}> SignIn </Text>
            </Pressable>
        </View>
    );
};

// Styles
const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: theme.colors.white,
        flex: 1,
    },
    headerText: {
        color: theme.colors.primaryBlack,
        fontFamily: theme.fonts.bold,
        fontSize: 50,
        textAlign: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 24,
    },
    loginTitle: {
        color: theme.colors.primaryBlack,
        fontFamily: theme.fonts.semiBold,
        fontSize: 29,
        marginBottom: 12,
    },
    subtitle: {
        fontSize: 16,
        color: theme.colors.primaryGray,
        fontFamily: theme.fonts.medium,
    },
    forgotPasswordButton: {
        paddingVertical: 4,
        alignSelf: 'flex-end',
    },
    forgotPasswordText: {
        fontSize: 14,
        color: theme.colors.primaryBlack,
        fontFamily: theme.fonts.medium,
    },
    signupContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    signupText: {
        fontFamily: theme.fonts.regular,
    },
    signupLink: {
        color: theme.colors.primaryGreen,
        fontFamily: theme.fonts.bold,
    },
});



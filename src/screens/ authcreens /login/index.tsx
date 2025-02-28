import React from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import Separator from '../../../components/common/Separator';
import theme from '../../../theme/theme';
import InputField from '../../../components/common/InputField';
import GreenButton from '../../../components/common/button';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'; // Import zodResolver
import { z } from 'zod'; // Import Zod

//zod validation schema
const schema = z.object({
    mail: z.string().email('Invalid email address').min(1, 'Email is required'),
    Password: z
        .string()
        .min(8, 'Password must be at least 8 characters')
        .refine(
            (value) => /[A-Z]/.test(value),
            'Password must contain at least one uppercase letter'
        )
        .refine(
            (value) => /[0-9]/.test(value),
            'Password must contain at least one number'
        )
        .refine(
            (value) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value),
            'Password must contain at least one special character'
        ),
});
// Infer the type of the schema
type Schema = z.infer<typeof schema>;

// Login Screen
const Login = () => {
    const { colors, fonts } = theme;
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<Schema>({
        resolver: zodResolver(schema),
        defaultValues: {
            email: "",
            Password: "",
        },
    })


    const onSubmit = (data) => console.log(data)


    return (
        <SafeAreaView style={styles.safeArea} >
            <Text style={styles.headerText}> A </Text>
            < View style={styles.container} >
                <Text style={styles.loginTitle}>Login</Text>
                < Text style={styles.subtitle} >Enter your email and password</Text>
                < Separator height={40} />
                {/* <InputField label="Email" /> */}
                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <InputField
                            placeholder="First name"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            label={"Email"}
                            errors={errors?.mail}
                            keyboardType={"email-address"}
                        />
                    )}
                    name="mail"
                />
                <Separator height={8} />
                {errors.mail && <Text style={{ color: 'red' }}>{errors.mail.message}</Text>}
                <Separator height={40} />
                {/* <InputField label="Password" /> */}
                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <InputField
                            placeholder="Password"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            label={"Password"}
                            errors={errors?.Password}
                        />
                    )}
                    name="Password"
                />
                <Separator height={8} />
                {errors.Password && <Text style={{ color: 'red' }}>{errors?.Password?.message}</Text>}
                <Separator height={16} />
                <ForgotPasswordButton />
                <Separator height={40} />
                <GreenButton title={"Login"} onPress={handleSubmit(onSubmit)} />
                <Separator height={40} />
                <SignupPrompt />
            </View>
        </SafeAreaView>
    );
};

export default Login;

// Forgot Password Button
const ForgotPasswordButton = () => {
    const { colors, fonts } = theme;

    return (
        <Pressable style={styles.forgotPasswordButton} >
            <Text style={styles.forgotPasswordText}> Forgot Password ? </Text>
        </Pressable>
    );
};


// Signup Prompt
const SignupPrompt = () => {
    const { colors, fonts } = theme;
    const navigation = useNavigation();

    return (
        <View style={styles.signupContainer} >
            <Text style={styles.signupText}> Don't have an account? </Text>
            <Pressable onPress={() => navigation?.navigate("SignUp")}>
                <Text style={styles.signupLink}> Signup </Text>
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



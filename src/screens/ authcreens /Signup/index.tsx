import React, { useContext, useEffect } from 'react';
import { Alert, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Separator from '../../../components/common/Separator';
import theme from '../../../theme/theme';
import InputField from '../../../components/common/InputField';
import GreenButton from '../../../components/common/button';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod';
import { database } from '../../../../model/database';
import { Q } from '@nozbe/watermelondb';
import { AuthContext } from '../../../context/AuthContext';

const schema = z.object({
    fullName: z.string().min(1, 'Full Name is required'),
    email: z.string().email('Invalid email address').min(1, 'Email is required'),
    password: z
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

type Schema = z.infer<typeof schema>;

const Signup = () => {
    const { login } = useContext(AuthContext);
    const { colors, fonts } = theme;
    const { control, handleSubmit, formState: { errors } } = useForm<Schema>({
        resolver: zodResolver(schema),
        defaultValues: {
            fullName: "",
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data) => {
        try {
            const usersCollection = database.collections.get('users');
            const existingUser = await usersCollection.query(Q.where('email', data.email)).fetch();

            if (existingUser.length > 0) {
                Alert.alert('Error', 'Email already exists.');
                return;
            }

            await database.write(async () => {
                await usersCollection.create((user) => {
                    user.username = data.fullName;
                    user.email = data.email;
                    user.password = data.password; // In real apps, hash the password before storing
                });
            });
            Alert.alert('Success', 'User registered successfully!');
            login(data?.email)
        } catch (error) {
            Alert.alert('Error', 'Failed to register user.');
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <Text style={styles.headerText}>A</Text>
            <View style={styles.container}>
                <Text style={styles.loginTitle}>Sign Up</Text>
                <Text style={styles.subtitle}>Fill the registration form</Text>
                <Separator height={40} />
                <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <InputField
                            placeholder="Full Name"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            label="Full Name"
                            errors={errors?.fullName}
                        />
                    )}
                    name="fullName"
                />
                <Separator height={8} />
                {errors.fullName && <Text style={{ color: 'red' }}>{errors.fullName.message}</Text>}
                <Separator height={28} />
                <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <InputField
                            placeholder="Email"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            label="Email"
                            errors={errors?.email}
                        />
                    )}
                    name="email"
                />
                <Separator height={8} />
                {errors.email && <Text style={{ color: 'red' }}>{errors.email.message}</Text>}
                <Separator height={28} />
                <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <InputField
                            placeholder="Password"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            label="Password"
                            errors={errors?.password}
                        />
                    )}
                    name="password"
                />
                <Separator height={8} />
                {errors.password && <Text style={{ color: 'red' }}>{errors.password.message}</Text>}
                <Separator height={16} />
                <Separator height={40} />
                <GreenButton title="Sign Up" onPress={handleSubmit(onSubmit)} />
                <Separator height={40} />
                <SignupPrompt />
            </View>
        </SafeAreaView>
    );
};

const SignupPrompt = () => {
    const { colors, fonts } = theme;
    const navigation = useNavigation();

    return (
        <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Already have an account?</Text>
            <Pressable onPress={() => navigation?.navigate("SignIn")}>
                <Text style={styles.signupLink}>SignIn</Text>
            </Pressable>
        </View>
    );
};

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

export default Signup;
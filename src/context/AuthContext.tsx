import React, { createContext, useState, useEffect, ReactNode } from 'react';
import * as Keychain from 'react-native-keychain';

interface AuthContextType {
    userToken: string | null;
    isLoading: boolean;
    login: (email: string) => Promise<void>;
    logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [userToken, setUserToken] = useState<string | null>(null); // Store the user token
    const [isLoading, setIsLoading] = useState(true); // Track loading state

    // Check if the user is logged in on app launch
    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const credentials = await Keychain.getGenericPassword();
                if (credentials) {
                    setUserToken(credentials.password); // Set the token from Keychain
                }
            } catch (error) {
                console.error('Failed to retrieve credentials:', error);
            } finally {
                setIsLoading(false);
            }
        };

        checkLoginStatus();
    }, []);

    // Login function
    const login = async (email: string) => {
        try {
            let token;
            if (email.toLowerCase().includes('admin')) {
                token = 'admin-token'; // Replace with your actual token
            } else {
                token = 'user-token'; // Replace with your actual token
            }
            // Simulate a login API call
            await Keychain.setGenericPassword('test', token); // Store the token securely
            setUserToken(token); // Update the auth state
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    // Logout function
    const logout = async () => {
        try {
            await Keychain.resetGenericPassword(); // Clear the stored token
            setUserToken(null); // Update the auth state
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ userToken, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
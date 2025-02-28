import { ActivityIndicator, Image, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import theme from '../../../theme/theme';
import Separator from '../../../components/common/Separator';
import { database } from '../../../../model/database';
import { AuthContext } from '../../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
    const navigation = useNavigation()
    const { logout, userToken } = useContext(AuthContext)
    console.log(userToken)
    const [ip, setIP] = useState('');
    const [country, setCountry] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [users, setUsers] = useState([])

    const fetchData = async () => {
        try {
            setLoading(true);
            setError('');

            // Fetch IP address
            const ipResponse = await fetch('https://api.ipify.org?format=json');
            const ipData = await ipResponse.json();
            setIP(ipData.ip);

            // Fetch country using IP and access key
            const countryResponse = await fetch(`https://ipapi.co/${ipData.ip}/json/`);
            const countryData = await countryResponse.json();
            setCountry(countryData.country_name);

            // Fetch users from WatermelonDB
            const usersCollection = database.collections.get('users');
            const fetchedUsers = await usersCollection.query().fetch();
            setUsers(fetchedUsers);
        } catch (err) {
            setError('Failed to fetch location data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleLogout = () => {
        // Clear user session (e.g., using AsyncStorage or Context API)
        logout()
    };

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
                <Pressable onPress={fetchData} style={styles.retryButton}>
                    <Text style={styles.retryButtonText}>Retry</Text>
                </Pressable>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image
                        source={require('../../../assets/images/home.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                </View>
                <Separator height={40} />
                <Text style={styles.headerText}>Your Location & Your Ip Address</Text>
                <Separator height={40} />
                {loading ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="red" />
                        <Text style={styles.loadingText}>Fetching location data...</Text>
                    </View>
                ) : (
                    <View style={styles.infoCard}>
                        <Text style={styles.infoText}>
                            Ip Address: <Text style={styles.ipAddress}>{ip}</Text>
                        </Text>
                        <Separator height={16} />
                        <Text style={styles.infoText}>
                            Country: <Text style={styles.country}>{country}</Text>
                        </Text>
                    </View>
                )}
                <View style={{ flex: 1 }} />
                {userToken === "admin-token" &&

                    <Pressable onPress={() => navigation.navigate('Users')} style={[styles.logoutButton]}>
                        <Text style={styles.logoutButtonText}>Users (only see admin)</Text>
                    </Pressable>
                }
                <Separator height={24} />
                <Pressable onPress={handleLogout} style={styles.logoutButton}>
                    <Text style={styles.logoutButtonText}>Log Out</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
};

export default Home;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: theme.colors.white,
    },
    container: {
        paddingHorizontal: 16,
        paddingVertical: 26,
        flex: 1,
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 224,
        height: 170,
    },
    headerText: {
        color: theme.colors.primaryBlack,
        fontSize: 26,
        fontFamily: theme.fonts.semiBold,
        textAlign: 'center',
    },
    infoCard: {
        backgroundColor: '#F2F3F2',
        borderRadius: 12,
        padding: 16,
    },
    infoText: {
        color: theme.colors.primaryGray,
        fontFamily: theme.fonts.regular,
        fontSize: 16,
    },
    ipAddress: {
        color: '#FF6B6B',
        fontFamily: theme.fonts.regular,
        fontSize: 16,
    },
    country: {
        color: '#2ECC71',
        fontFamily: theme.fonts.regular,
        fontSize: 16,
    },
    logoutButton: {
        borderRadius: 18,
        backgroundColor: '#F2F3F2',
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoutButtonText: {
        color: theme.colors.primaryGreen,
        fontFamily: theme.fonts.semiBold,
        fontSize: 18,
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        color: 'red',
        fontSize: 16,
        marginBottom: 16,
    },
    retryButton: {
        backgroundColor: '#2ECC71',
        padding: 12,
        borderRadius: 8,
    },
    retryButtonText: {
        color: 'white',
        fontSize: 16,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 16,
        fontSize: 16,
        color: theme.colors.primaryGray,
    },
});
import { ActivityIndicator, SafeAreaView, StyleSheet, Text, View, Pressable, FlatList, Alert } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import theme from '../../../theme/theme';
import { database } from '../../../../model/database';
import { AuthContext } from '../../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';



const Home = () => {
    const navigation = useNavigation();
    const { userToken } = useContext(AuthContext);
    console.log(userToken);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [users, setUsers] = useState([]);

    const fetchData = async () => {
        try {
            setLoading(true);
            setError('');

            // Fetch users from WatermelonDB
            const usersCollection = database.collections.get<User>('users');
            const fetchedUsers = await usersCollection.query().fetch();
            setUsers(fetchedUsers);
        } catch (err) {
            setError('Failed to fetch user data');
        } finally {
            setLoading(false);
        }
    };

    const deleteUser = async (userId: string) => {
        try {
            await database.write(async () => {
                const user = await database.collections.get('users').find(userId);
                await user.markAsDeleted(); // syncable
                await user.destroyPermanently(); // permanent
            });
            setUsers(users.filter(user => user.id !== userId));
        } catch (err) {
            Alert.alert('Error', 'Failed to delete user');
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const renderUser = ({ item }) => (<>
        <Pressable style={styles.deleteButton} onPress={() => deleteUser(item.id)}>
            <Text>Delete</Text>
        </Pressable>
        <View style={styles.userCard}>
            <Text style={styles.userName}>{item.username}</Text>
            <Text style={styles.userEmail}>{item.email}</Text>
        </View>
    </>
    );

    if (loading) {
        return (
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={theme.colors.primaryGreen} />
                    <Text style={styles.loadingText}>Loading...</Text>
                </View>
            </SafeAreaView>
        );
    }

    if (error) {
        return (
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{error}</Text>
                    <Pressable style={styles.retryButton} onPress={fetchData}>
                        <Text style={styles.retryButtonText}>Retry</Text>
                    </Pressable>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Pressable onPress={() => navigation.goBack()}>
                    <Text>Back</Text>
                </Pressable>
                <FlatList
                    data={users}
                    renderItem={renderUser}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.listContent}
                />
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
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 26,
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
        backgroundColor: theme.colors.primaryGreen,
        padding: 12,
        borderRadius: 8,
    },
    retryButtonText: {
        color: 'white',
        fontSize: 16,
    },
    listContent: {
        paddingBottom: 16,
    },
    userCard: {
        backgroundColor: theme.colors.lightGray,
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: theme.colors.primaryBlack,
    },
    userEmail: {
        fontSize: 16,
        color: theme.colors.primaryGray,
    },
    deleteButton: {
        backgroundColor: theme.colors.primaryRed,
        padding: 8,
        borderRadius: 4,
    },
    deleteButtonText: {
        color: 'white',
        fontSize: 14,
    },
});
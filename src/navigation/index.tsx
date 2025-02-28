import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignedOutStack from './AuthStack';
import SignedInStack from './AppStack';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

// Custom hook to check if the user is signed in
const useIsSignedIn = () => {
    const { userToken } = useContext(AuthContext); // Get userToken from AuthContext
    return !!userToken; // Return true if userToken exists
};

// Custom hook to check if the user is signed out
const useIsSignedOut = () => {
    const { userToken } = useContext(AuthContext); // Get userToken from AuthContext
    return !userToken; // Return true if userToken does not exist
};

// Create the RootStack
const RootStack = createNativeStackNavigator({
    screenOptions: {
        headerShown: false,
    },
    screens: {
        LoggedIn: {
            if: useIsSignedIn, // Show SignedInStack if user is signed in
            screen: SignedInStack,
        },
        LoggedOut: {
            if: useIsSignedOut, // Show SignedOutStack if user is signed out
            screen: SignedOutStack,
        },
    },
});

// Create the Navigation component
const Navigation = createStaticNavigation(RootStack);

export default Navigation;
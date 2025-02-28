import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignedOutStack from './AuthStack';
import SignedInStack from './AppStack';

const useIsSignedIn = () => {
    return true;
};

const useIsSignedOut = () => {
    return false;
};

const RootStack = createNativeStackNavigator({
    screenOptions: {
        headerShown: false,
    },
    screens: {
        LoggedIn: {
            if: useIsSignedIn,
            screen: SignedInStack,
        },
        LoggedOut: {
            if: useIsSignedOut,
            screen: SignedOutStack,
        },
    },
});

const Navigation = createStaticNavigation(RootStack);

export default Navigation
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/appScreen/Home";

const SignedInStack = createNativeStackNavigator({
    screenOptions: {
        headerShown: false,
    },
    screens: {
        Home: Home,
    },
});
export default SignedInStack;
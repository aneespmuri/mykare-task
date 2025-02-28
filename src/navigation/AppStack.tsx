import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/appScreen/Home";
import Users from "../screens/appScreen/Users";

const SignedInStack = createNativeStackNavigator({
    screenOptions: {
        headerShown: false,
    },
    screens: {
        Home: Home,
        Users: Users,
    },
});
export default SignedInStack;
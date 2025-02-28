import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/ authcreens /login";
import Signup from "../screens/ authcreens /Signup";

const SignedOutStack = createNativeStackNavigator({
    screenOptions: {
        headerShown: false,
    },
    screens: {
        SignIn: Login,
        SignUp: Signup,
    },
});

export default SignedOutStack;
import { StyleSheet, Text, TextInput, View } from "react-native";
import theme from "../../theme/theme";

// Reusable InputField Component
const InputField = ({ label, onChangeText, placeholder, onBlur, value, errors }) => {
    const { colors, fonts } = theme;

    return (
        <View>
            <Text style={styles.inputLabel}>{label}</Text>
            <TextInput style={[styles.input, { borderBlockColor: errors ? 'red' : theme.colors.secondaryGray }]} onChangeText={onChangeText} placeholder={placeholder} onBlur={onBlur} value={value} />
        </View>
    );
};

export default InputField;

const styles = StyleSheet.create({
    inputLabel: {
        color: theme.colors.primaryGray,
        fontFamily: theme.fonts.regular,
        marginBottom: 10,
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.secondaryGray,
        paddingVertical: 10,
        fontFamily: theme.fonts.regular,
    }
})
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import Header from '../components/Header';
import { Ionicons } from '@expo/vector-icons';

export default function ContinentScreen({ navigation }) {

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <Header />
            <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.backButton} activeOpacity={0.8}>
                <Ionicons name="md-arrow-back-circle-outline" size={20} color="white" /><Text style={styles.textButton}> Retour </Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        flexDirection: 'column',
    },
    textButton: {
        color: '#ffffff',
    },
    backButton: {
        backgroundColor: '#4B7285',
        height: 40,
        margin: 10,
        marginLeft: 20,
        padding: 10,
        borderRadius: 8,
        flexDirection: "row",
        alignSelf: "left",
    },
})
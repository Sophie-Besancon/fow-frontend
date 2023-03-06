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

export default function ConfirmationtScreen({ navigation }) {

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <Header />
            <Text>Toute l'équipe de Food Of the World vous remercie pour votre commande.</Text>
            <Text>Bonne dégustation et à très bientôt !</Text>
            <Image></Image>
            <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.backButton} activeOpacity={0.8}>
                <Text style={styles.textButton}> Retour à la page d'accueil </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={console.log("voir la commande")} style={styles.backButton} activeOpacity={0.8}>
                <Text style={styles.textButton}> Voir toutes mes commandes </Text>
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
        alignSelf: "flex-start",
    },
})
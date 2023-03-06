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
import { AntDesign } from '@expo/vector-icons';

export default function ConfirmationtScreen({ navigation }) {

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <Header />
            <View style={styles.thanksPart}>
            <Text style={styles.thanksText}>🍾 Votre commande est validée ! 🍾</Text>
            <Text style={styles.thanksTextFOW}>Toute l'équipe de Food Of the World vous remercie et vous souhaite une bonne dégustation.</Text>
            <Text style={styles.thanksEmojis}>🌮🍡🍔🍜🧉</Text>
            <Text style={styles.thanksTextBye}>A très bientôt !</Text>
            {/* <Image source={require('../assets/giframen.gif')} style={{width: 100, height: 100 }} /> */}
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.backButton} activeOpacity={0.8}>
                <Text style={styles.textButton}> Retour à la page d'accueil </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={console.log("voir la commande")} style={styles.backButton} activeOpacity={0.8}>
            {/* <AntDesign name="BarcodeOutlined" size={20} color="white" /> */}
                <Text style={styles.textButton}> Voir mes commandes </Text>
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
    thanksPart: {
        flex: 1,
        borderColor: "#4B7285",
        padding: 15,
        margin: 15,
        borderWidth: 1,
        backgroundColor: '#DCF0F9',
        alignItems: 'center',
        borderRadius: 60,
        justifyContent: 'center',
        
    },
    thanksText: {
        alignItems: 'center',
        textAlign: "center",
        marginTop: 30,
        fontSize: 16,
        fontWeight: 600,
    },
    thanksEmojis: {
        alignItems: 'center',
        textAlign: "center",
        marginTop: 20,
        fontSize: 35,
    },
    thanksTextFOW: {
        alignItems: 'center',
        textAlign: "center",
        marginTop: 30,
        fontSize: 16,
        color: "#4B7285",
        fontWeight: 600,
    },
    thanksTextBye: {
        alignItems: 'center',
        textAlign: "center",
        marginTop: 30,
        fontSize: 20,
        fontWeight: 600,
        color: "#FC9F30",
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
        alignItems: 'center',
    },
})
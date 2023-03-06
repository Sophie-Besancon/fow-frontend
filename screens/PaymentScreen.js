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
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {useState} from "react";

export default function PaymentScreen({ navigation }) {

const [nameCard, setNameCard] = useState(null);
const [numberCard, setNumberCard] = useState(null);
const [expirationDate, setExpirationDate] = useState(null);
const [securityNumber, setSecurityNumber] = useState(null);

    const handleConfirmation = () => {
        navigation.navigate('Confirmation');
    }

    const numberInput = () => {
        const pattern = /^[0-9]{0,9}$/;
        return pattern.test(nameCard)
    }

    const securityInput = () => {
        const pattern = /^[0-9]{0,9}$/;
        return pattern.test(nameCard)
    }

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <Header />
            <View style={styles.statusContainer}>
                <FontAwesome name="shopping-basket" size={20} color="#4B7285" style={styles.deleteIcon} />
                <FontAwesome name="user" size={20} color="#4B7285" style={styles.deleteIcon} />
                <FontAwesome name="money" size={20} color="#FC9F30" style={styles.deleteIcon} />
            </View>
            <Text style={styles.textContainer}>Paiement</Text>
            <View style={styles.inputContainer}>
                <TextInput inputMode="text" placeholder="Nom de la carte" onChangeText={console.log('test')} value={nameCard} style={styles.input} />
                <TextInput maxLength={16} inputMode="numeric" placeholder="Numéro de carte" onChangeText={console.log('test')} value={numberCard} style={styles.input} />
                <TextInput placeholder="Date d'expiration" onChangeText={console.log('test')} value={expirationDate} style={styles.input} />
                <TextInput maxLength={3} inputMode="numeric" placeholder="Cryptogramme de sécurité" onChangeText={console.log('test')} value={securityNumber} style={styles.input} />
                <TouchableOpacity onPress={() => handleConfirmation()} style={styles.inputButton} activeOpacity={0.8}>
                    <Text style={styles.textButton}>Valider ma commande</Text>
                </TouchableOpacity>

            </View>
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
    statusContainer: {
        width: '50%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'space-between',
        marginTop: 30,
      },
      textContainer: {
        marginTop: 30,
        fontSize: 16,
      },
    textButton: {
        color: '#ffffff',
    },
    inputContainer: {
        width: "80%",
    },

    input : {
        flex: 1, 
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        padding: 10,
        marginTop: 20,
        borderRadius: 8,
        borderColor: "#4B7285",
        borderWidth: 1,
      },
    inputButton: {
        backgroundColor: '#4B7285',
        height: 40,
        margin: 20,
        marginLeft: 20,
        padding: 10,
        borderRadius: 8,
        flexDirection: "row",
        alignSelf: "flex-end",
    },
})
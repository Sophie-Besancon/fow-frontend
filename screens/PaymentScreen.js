import {
    Image,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    ScrollView,
} from 'react-native';
import Header from '../components/Header';
import { AntDesign } from '@expo/vector-icons';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearBasket } from "../reducers/users";

export default function PaymentScreen({ navigation }) {
  const users = useSelector((state) => state.users.value[0]);
  const dispatch = useDispatch();

  const [nameCard, setNameCard] = useState("");
  const [numberCard, setNumberCard] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [securityNumber, setSecurityNumber] = useState("");

  const handleConfirmation = () => {
    const articlesIds = users.articleInBasket.map((data) => data.id);
    fetch("https://fow-backend.vercel.app/orders/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        total: users.totalInBasket,
        user: users.token,
        articles: articlesIds,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch(clearBasket());
        navigation.navigate("Confirmation");
      });
  };

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <Header />
            <View style={styles.statusContainer}>
                <FontAwesome name="shopping-basket" size={20} color="#4B7285" style={styles.deleteIcon} />
                <FontAwesome name="user" size={20} color="#4B7285" style={styles.deleteIcon} />
                <FontAwesome name="money" size={20} color="#FC9F30" style={styles.deleteIcon} />
            </View>
            
            <Text style={styles.textContainer}>Paiement</Text>
            <ScrollView style={styles.inputContainer}>
            <View >
                <Text style={styles.inputLabel}>Nom de la carte</Text>
                <TextInput inputMode="text" placeholder="Nom de la carte" onChangeText={(value) => { setNameCard(value) }} value={nameCard} style={styles.input} />
                <Text style={styles.inputLabel}>Numéro de carte</Text>
                <TextInput maxLength={16} inputMode="numeric" placeholder="Numéro de carte" onChangeText={(e) => { setNumberCard(e) }} value={numberCard} style={styles.input} />
                <Text style={styles.inputLabel}>Date d'expiration</Text>
                <TextInput placeholder="Date d'expiration" onChangeText={(value) => { setExpirationDate(value) }} value={expirationDate} style={styles.input} />
                <Text style={styles.inputLabel}>Cryptogramme de sécurité</Text>
                <TextInput maxLength={3} inputMode="numeric" placeholder="Cryptogramme de sécurité" onChangeText={(value) => { setSecurityNumber(value) }} value={securityNumber} style={styles.input} />
                <TouchableOpacity onPress={() => handleConfirmation()} style={styles.inputButton} activeOpacity={0.8}>
                    <AntDesign name="checkcircle" size={18} color="white" />
                    <Text style={styles.textButton}>Valider ma commande</Text>
                </TouchableOpacity>
            </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    flexDirection: "column",
  },
  statusContainer: {
    width: "50%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "space-between",
    marginTop: 30,
  },
  textContainer: {
    marginTop: 30,
    fontSize: 16,
  },
  textButton: {
    color: "#ffffff",
  },
  inputContainer: {
    width: "80%",
  },
  inputLabel: {
    marginTop: 10,
    color: "#4B7285",
    fontWeight: 600,
    fontSize: 15,
  },
  input: {
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "transparent",
    height: 40,
    padding: 10,
    borderRadius: 8,
    borderColor: "#4B7285",
    borderWidth: 1,
    marginTop: 5,
    color: "black",
  },
  inputButton: {
    backgroundColor: "#4B7285",
    height: 40,
    marginTop: 20,
    padding: 10,
    borderRadius: 8,
    flexDirection: "row",
    alignSelf: "flex-end",
  },
});

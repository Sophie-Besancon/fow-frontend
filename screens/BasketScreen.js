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
  import Header from '../components/Header'
  import FontAwesome from "react-native-vector-icons/FontAwesome";
  
  export default function BasketScreen() {
  
    return (
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                 <Header/>
        <View style={styles.statusContainer}>
        <FontAwesome
            name="shopping-basket"
            size={20}
            color="#000000"
            style={styles.deleteIcon}
          />
          <FontAwesome
          name="user"
          size={20}
          color="#000000"
          style={styles.deleteIcon}
        />
        <FontAwesome
        name="money"
        size={20}
        color="#000000"
        style={styles.deleteIcon}
      />
        </View>
        <View style={styles.textContainer}>
          <Text>Résumé de votre commande</Text>
          </View>
          <View style={styles.tableContainer}>
            <Text>1.2.3</Text>
          </View>
          <View style={styles.totalContainer}>
            <Text>4.5.6</Text>
          </View>
          <TouchableOpacity style={styles.buttonContainer}>
            <Text style={styles.buttonText}>Étape suivante</Text>
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
    statusContainer:{
      width:'50%',
      flexDirection:'row',
      justifyContent: 'space-around',
      alignItems: 'space-between',
      marginTop: 30,
    },
    textContainer:{
      marginTop: 30,
    },
    tableContainer:{
      marginTop: 30,
      backgroundColor:"green",
      width:"90%",
      height: "35%"
    },
    totalContainer:{
      marginTop: 10,
      backgroundColor:"yellow",
      width:"90%",
      height:"15%",
    },
    buttonContainer:{
    marginTop: 30,
    alignSelf: "center",
    height: 40,
    margin: 10,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#4B7285",
    width:120,
    },
    buttonText: {
      alignSelf: "center",
      color: "white",
    },
  })
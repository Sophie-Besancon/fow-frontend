import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';


export default function HomeScreen({ navigation }) {


  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <Text>Welcome on FOW / HomeScreen </Text>
        <TextInput placeholder="Rechercher un produit" onChangeText={(value) => setSearchProduct(value)} value={searchProduct} style={styles.input} />
      <TouchableOpacity onPress={() => handleSubmit()} style={styles.button} activeOpacity={0.8}>
        <Text style={styles.textButton}>Rechercher</Text>
      </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ContinentScreen')} style={styles.button} activeOpacity={0.8}>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
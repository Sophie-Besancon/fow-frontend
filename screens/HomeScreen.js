import { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import UserConnect from '../components/UserConnect';



export default function HomeScreen({ navigation }) {

  const [searchProduct, setSearchProduct] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  const handleSearch = () => {
    fetch(`http://192.168.1.88:3000/articles/${searchProduct}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          setSearchResult(data.articles)
        }
        setSearchProduct('');
      });
  }

  // const products = searchResult.map((product, i) => {
  // return <View><Text>Afficher le produit: {product.name}</Text></View>
  // })


  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Header />
      <View style={styles.inputContainer}>
        <TextInput placeholder="Rechercher un produit" onChangeText={(value) => setSearchProduct(value)} value={searchProduct} style={styles.input} />
        <TouchableOpacity onPress={console.log("coucou")} style={styles.inputButton} activeOpacity={0.8}>
          <Text style={styles.textButton}>Rechercher</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={console.log("coucou2")} style={styles.continentButton} activeOpacity={0.8}>
          <Text style={styles.textButton}>Voyager avec nous !</Text>
        </TouchableOpacity>
      {/* {products.length > 0 ? products : (<Text>Aucun produit trouvé</Text>)} */}
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
    flexDirection: 'column',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    backgroundColor: '#ffffff',
    paddingLeft: 10,
    marginTop: 10,
    borderRadius: 8,
    borderColor: "#4B7285",
    borderWidth: 1,
  },
  inputButton: {
    backgroundColor: '#4B7285',
    height: 40,
    margin: 5,
    borderWidth: 0.2,
    padding: 10,
    borderRadius: 8,
  },
  textButton: {
    color: '#ffffff',
  },
  continentButton: {
    backgroundColor: '#FC9F30',
    height: 40,
    margin: 15,
    borderWidth: 0.2,
    padding: 10,
    borderRadius: 8,
    fontWeight: 900,
  },
})
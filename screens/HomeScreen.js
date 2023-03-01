import { useEffect, useState } from 'react';
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

export default function HomeScreen() {

  const [searchProduct, setSearchProduct] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [travelMode, setTravelMode] = useState(false);
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
      {!travelMode ? <>
        <View style={styles.inputContainer}>
          <TextInput placeholder="Rechercher un produit" onChangeText={(value) => setSearchProduct(value)} value={searchProduct} style={styles.input} />
          <TouchableOpacity onPress={console.log("coucou")} style={styles.inputButton} activeOpacity={0.8}>
            <Text style={styles.textButton}>Rechercher</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => setTravelMode(true)} style={styles.continentButton} activeOpacity={0.8}>
          <Text style={styles.textButton}>Voyager avec nous !</Text>
        </TouchableOpacity>
        {/* {products.length > 0 ? products : (<Text>Aucun produit trouvé</Text>)} */}
        <Image style={styles.image} source={require('../assets/voyage1.jpg')} resizeMode="cover" />
      </> : <View><Text>Hello</Text></View>}
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
    padding: 10,
    borderRadius: 8,
  },
  image: {
    height: "40%",
    width:"90%",
    borderRadius: 40,
    margin: 15,
    borderRadius: 40,
    borderWidth: 3,
  }
})
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
  Dimensions,
} from 'react-native';
import Header from '../components/Header';
import Carousel from 'react-native-reanimated-carousel'

export default function HomeScreen({ navigation }) {

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

  const handleContinent = () => {
    setTravelMode(true)
    navigation.navigate('Continent');
    // navigation.navigate('ContinentScreen');
  }

  // const travelPicture = async () => {
  //   const photo = await cameraRef.takePictureAsync({ quality: 0.3 });
  //   const formData = new FormData();
  // const allTravelPhotos= []
  //   formData.append('photoFromFront', {
  //     uri: photo.uri,
  //     name: 'photo.jpg',
  //     type: 'image/jpeg',
  //   });
  //   console.log('photo', photo);

  //   fetch('http://res.cloudinary.com/dzyz3cifr', {
  //     method: 'POST',
  //     body: formData,
  //   }).then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //       if (data.result) {
  //         allTravelPhotos.push(data.url)
  //       } else {
  //         console.log('error')
  //       }
  //     });


  const width = Dimensions.get('window').width;
  const images = [
    <Image style={styles.image} source={require('../assets/VoyageEurope.jpg')} resizeMode="cover" />,
    <Image style={styles.image} source={require('../assets/VoyageOceanie.jpg')} resizeMode="cover" />,
    <Image style={styles.image} source={require('../assets/VoyageAmerique.jpg')} resizeMode="cover" />,
    <Image style={styles.image} source={require('../assets/VoyageAsie.jpg')} resizeMode="cover" />,
    <Image style={styles.image} source={require('../assets/VoyageAfrique.jpg')} resizeMode="cover" />,
  ]

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Header />
      <View style={styles.inputContainer}>
        <TextInput placeholder="Rechercher un produit" onChangeText={(value) => setSearchProduct(value)} value={searchProduct} style={styles.input} />
        <TouchableOpacity onPress={console.log("coucou")} style={styles.inputButton} activeOpacity={0.8}>
          <Text style={styles.textButton}>Rechercher</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => handleContinent()} style={styles.continentButton} activeOpacity={0.8}>
        <Text style={styles.textButton}>Voyager avec nous !</Text>
      </TouchableOpacity>
      {/* {products.length > 0 ? products : (<Text>Aucun produit trouvé</Text>)} */}
      <Carousel
        loop
        width={width}
        height={width*2}
        autoPlay={true}
        pagingEnabled
        data={images}
        scrollAnimationDuration={2500}
        onSnapToItem={(index) => console.log('current index:', index)}
        renderItem={({index}) => images[index]}
      />
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
    margin: 20,
    padding: 10,
    borderRadius: 8,
  },
  image: {
    height: "40%",
    width: "90%",
    borderRadius: 40,
    margin: 20,
    borderWidth: 3,
    borderColor: "#4B7285",
  }
})
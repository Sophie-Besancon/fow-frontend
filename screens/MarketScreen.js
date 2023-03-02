import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
  ScrollView,
  Modal,
  Pressable,
} from 'react-native';
import Header from '../components/Header'
import Card from '../components/Card'
import { useEffect, useState } from "react";
import { AntDesign } from '@expo/vector-icons';


export default function MarketScreen({ route }) {
  const [articlesData, setArticlesData] = useState([]);
  const [continent, setContinent] = useState(null);
  const [category, setCategory] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  //useEffet qui détecte un params venu HomeScreen (click sur une image de continent)
  useEffect(() => {
    if (route.params?.destination) {
      setContinent(route.params?.destination)
    }
  }, [route.params?.destination])

  //useEffect qui appelle une route pour récuperer les articles en fonction des paramètres continent et catégorie
  //par defaut, si pas de catégorie sélectionner, tous les articles du site seront renvoyés
  useEffect(() => {
    fetch("http://192.168.1.14:3000/articles/", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ continent: continent, category: category }),
    }).then((response) =>
      response.json()).then((data) => {
        if (data.result) {
          setArticlesData(data.filteredArticles)
        }
      });
  }, [continent, category]);

  const cards = articlesData.map((data, i) => {
    return <Card key={i} price={data.price} name={data.name} image={data.image[0]} />;
  });

  return (

    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Header />
      <TouchableOpacity onPress={() => setModalVisible(!modalVisible)} style={styles.filterButton} activeOpacity={0.8}>
        <AntDesign name="filter" size={20} color="white" />
        <Text style={styles.textButton}> filtrer </Text>
      </TouchableOpacity>
      <ScrollView style={styles.scrollView}>
        {cards}
      </ScrollView>
      <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
        Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Par continent</Text>
            <Text style={styles.modalText}>Par catégorie</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Rechercher</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
    </KeyboardAvoidingView>


  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  filterButton: {
    backgroundColor: '#4B7285',
    height: 40,
    margin: 10,
    marginLeft: 20,
    padding: 10,
    borderRadius: 8,
    flexDirection: "row",
    alignSelf: "left",
  },
  textButton: {
    color: '#ffffff',
  },
  centeredView: {
    flex: 1,
    // justifyContent: 'center',
    marginTop: 150,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 8,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#4B7285',
  },
  buttonClose: {
    backgroundColor: '#4B7285',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    //textAlign: 'center',
  },
})



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
  TouchableWithoutFeedback,
} from 'react-native';
import Header from '../components/Header'
import Card from '../components/Card'
import { useEffect, useState } from "react";
import { AntDesign } from '@expo/vector-icons';
import SelectDropdown from 'react-native-select-dropdown'


export default function MarketScreen({ route }) {
  const [articlesData, setArticlesData] = useState([]);
  const [continent, setContinent] = useState(null);
  const [category, setCategory] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const seeAll = "voir tout";
  const selectContinent = [seeAll, "Afrique", "Amérique", "Asie", "Europe", "Océanie"]
  const selectCategory = [seeAll, "sucré", "salé", "boisson"]

  //useEffet qui détecte un params venu HomeScreen (click sur une image de continent)
  useEffect(() => {
    if (route.params?.destination) {
      setContinent(route.params?.destination)
    }
  }, [route.params?.destination])

  //useEffect qui appelle une route pour récuperer les articles en fonction des paramètres continent et catégorie
  //par defaut, si pas de catégorie sélectionner, tous les articles du site seront renvoyés
  useEffect(() => {
    fetch("http://192.168.1.88:3000/articles/", {
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
          <TouchableWithoutFeedback onPress={() => setModalVisible(!modalVisible)}>
            <View style={styles.outsideCloseBackground} />
          </TouchableWithoutFeedback>

          <View style={styles.modalView}>
            <Text style={styles.modalText}>Par continent</Text>
            <SelectDropdown
              buttonStyle={styles.buttonStyle}
              dropdownStyle={styles.dropdownStyle}
              rowTextStyle={styles.rowTextStyle}
              data={selectContinent}
              onSelect={(selectedItem, index) => { selectedItem !== seeAll ? setContinent(selectedItem) : setContinent(null) }}
              defaultButtonText={'Sélectionne un continent'}
              defaultValue={continent}
              buttonTextAfterSelection={(selectedItem, index) => { return selectedItem }}
              rowTextForSelection={(item, index) => { return item }}
            />
            <Text style={styles.modalText}>Par catégorie</Text>
            <SelectDropdown
              buttonStyle={styles.buttonStyle}
              dropdownStyle={styles.dropdownStyle}
              rowTextStyle={styles.rowTextStyle}
              data={selectCategory}
              onSelect={(selectedItem, index) => { selectedItem !== seeAll ? setCategory(selectedItem) : setCategory(null) }}
              defaultButtonText={'Sélectionne une catégorie'}
              buttonTextAfterSelection={(selectedItem, index) => { return selectedItem }}
              rowTextForSelection={(item, index) => { return item }}
            />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Voir les produits</Text>
            </Pressable>
          </View>
        </Modal>
      </View >
    </KeyboardAvoidingView >


  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  outsideCloseBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
  },
  filterButton: {
    backgroundColor: '#4B7285',
    height: 40,
    margin: 10,
    marginLeft: 20,
    padding: 10,
    borderRadius: 8,
    flexDirection: "row",
    alignSelf: "flex-start",
  },
  textButton: {
    color: '#ffffff',
  },
  modalView: {
    margin: 20,
    marginTop: 170,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
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
  buttonClose: {
    backgroundColor: '#4B7285',
    alignSelf: "flex-end",
    marginTop: 10,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',

  },
  modalText: {
    marginBottom: 10,
    marginTop: 15,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4B7285',
  },
  rowStyle: {
    fontSize: 8,
  },
  rowTextStyle: {
    borderRadius: 40,
    fontSize: 16,
  },
  dropdownStyle: {
    borderRadius: 8,
    borderColor: "#4B7285",
    borderWidth: 2,
  },
  buttonStyle: {
    backgroundColor: 'white',
    borderRadius: 8,
    borderColor: "#4B7285",
    borderWidth: 1,
    width: "100%",
    height: 40,
  }
  // searchPlaceHolderColor: {
  //   borderRadius: 8,
  //   borderColor: "red",
  //   borderWidth: 2,
  //   backgroundColor: 'red',
  // }
})



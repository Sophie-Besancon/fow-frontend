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

export default function ContinentScreen({navigation}) {

    const continentsData = [
        { name: "Amérique", imageName: "amérique" },
        { name: "Océanie", imageName: "" },
        { name: "Europe", imageName: "" },
        { name: "Afrique", imageName: "" },
        { name: "Asie", imageName: "" },
    ]

    const Continents = continentsData.map((continent, i) => {
        return (
            <View>
                <Text>{continent.name}</Text>
                <Image style={styles.image} source={require("../assets/amérique.jpg")} resizeMode="cover" onPress={console.log("HellofromContinent")} />
            </View>
        )
    })

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <Header />
            <View>
                <Text>Hello</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.continentButton} activeOpacity={0.8}>
                    <Text style={styles.textButton}>Retour</Text>
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
})
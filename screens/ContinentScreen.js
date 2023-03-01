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
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({

})
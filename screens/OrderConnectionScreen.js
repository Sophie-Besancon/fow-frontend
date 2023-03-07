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
import UserConnect from "../components/UserConnect";
import Dashboard from "../components/Dashboard";
import { useSelector } from "react-redux";
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function OrderConnectionScreen({ navigation }) {

const user = useSelector((state) => state.users.value[0]);

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <Header />
            <View style={styles.statusContainer}>
                <FontAwesome name="shopping-basket" size={20} color="#4B7285" style={styles.deleteIcon} />
                <FontAwesome name="user" size={20} color="#FC9F30" style={styles.deleteIcon} />
                <FontAwesome name="money" size={20} color="#4B7285" style={styles.deleteIcon} />
            </View>
            {user.token?<Dashboard/>:<UserConnect/>}
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
    statusContainer: {
        width: '50%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'space-between',
        marginTop: 30,
      },
    textButton: {
        color: '#ffffff',
    },
    backButton: {
        backgroundColor: '#4B7285',
        height: 40,
        margin: 10,
        marginLeft: 20,
        padding: 10,
        borderRadius: 8,
        flexDirection: "row",
        alignSelf: "flex-start",
    },
})
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Dashboard from "../components/Dashboard";
import UserConnect from "../components/UserConnect";
import Header from "../components/Header";
import Personal_Informations from "../components/Personal_Informations";

export default function AccountScreen() {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Header />
       { <UserConnect/> }
       {/*  <Dashboard />  */}
       <Personal_Informations/>

    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",

  },
});

import { KeyboardAvoidingView, Platform, StyleSheet } from "react-native";
import UserConnect from "../components/UserConnect";
import Header from "../components/Header";
import Dashboard from "../components/Dashboard";
import { useSelector } from "react-redux";

export default function AccountScreen() {
  const user = useSelector((state) => state.users.value[0]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Header />

      {user.token ? <Dashboard /> : <UserConnect />}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
});

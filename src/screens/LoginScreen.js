import React, { useState } from "react";
import {
  Alert,
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { users } from "../data/UserInfo.js";

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState(""); // Add state for username and password
  const [password, setPassword] = useState(""); // Add state for username and password
  const [error, setError] = useState("");

  const handleLogin = () => {
    const user = users.find(
      (user) => user.username === username && user.password === password // Find the user by username and password
    );
    if (user) {
      navigation.navigate("Main"); // Navigate to the main screen
    } else {
      Alert.alert("Login Failed", "Invalid username or password. Try again!", [
        { text: "OK" }, // Button to close the alert
      ]);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"} // Adjust keyboard behavior based on platform
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollViewContainer} // Add padding to the bottom of the scroll view
        keyboardShouldPersistTaps="handled" // Allow taps to pass through the keyboard
      >
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>AUTOHUB</Text>{" "}
          {/* Add a logo and tagline */}
          <Text style={styles.tagline}>FUELING CAR CONVERSATIONS</Text>
        </View>
        {error ? (
          <Text style={{ color: "red", textAlign: "center" }}>{error}</Text> // Display error message
        ) : null}
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />{" "}
        {/* Add input fields for username and password */}
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
        />
        <Button title="Login" onPress={handleLogin} />{" "}
        {/* Add a login button */}
        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
          {" "}
          {/* Add a sign-up button */}
          <Text style={styles.signupText}>
            Don't have an account yet? Sign up here
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView> // Wrap the entire screen in a KeyboardAvoidingView
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 50,
  },
  logo: {
    width: 350,
    height: 350,
    resizeMode: "contain",
  },
  logoText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  tagline: {
    fontSize: 16,
    color: "gray",
  },
  inputContainer: {
    paddingHorizontal: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: "80%",
    alignSelf: "center",
  },
  signupText: {
    marginTop: 20,
    color: "blue",
    textAlign: "center",
  },
});

export default LoginScreen;

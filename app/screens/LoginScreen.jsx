import React, { useState } from "react";
import {
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setIsLoading(true);
    setError("");
    try {
      const response = await axios.post(
        "http://192.168.70.177:5000/api/users/login",
        {
          email,
          password,
        }
      );
      console.log(response.data);
      navigation.navigate("Home", { userToken: response.data.token });
    } catch (error) {
      console.error(error);
      setError("Login failed. Please check your credentials and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.logoContainer}>
        <Ionicons name="leaf-outline" size={72} color="#3bff90" />
        <Text style={styles.logoText}>EcoLogin</Text>
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <Ionicons
            name="mail-outline"
            size={24}
            color="#000000"
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#666666"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            accessibilityLabel="Email input"
          />
        </View>
        <View style={styles.inputWrapper}>
          <Ionicons
            name="lock-closed-outline"
            size={24}
            color="#000000"
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#666666"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            accessibilityLabel="Password input"
          />
        </View>
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <TouchableOpacity
        style={styles.loginButton}
        onPress={handleLogin}
        disabled={isLoading}
        accessibilityLabel="Login button"
        accessibilityHint="Double tap to log in"
      >
        <Text style={styles.loginButtonText}>
          {isLoading ? "Logging in..." : "Login"}
        </Text>
      </TouchableOpacity>
      <View style={styles.signupRedirectContainer}>
        <Text style={styles.signupText}>Don't have an account?</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("SignUp")}
          accessibilityLabel="Sign up button"
          accessibilityHint="Double tap to go to sign up screen"
        >
          <Text style={styles.signupButtonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fffaef",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  logoText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000000",
    marginTop: 10,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 9,
    marginBottom: 15,
    paddingHorizontal: 10,
    elevation: 2,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    color: "#000000",
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: "#3bff90",
    paddingVertical: 15,
    borderRadius: 9,
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  loginButtonText: {
    color: "#000000",
    fontSize: 18,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
  signupRedirectContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  signupText: {
    color: "#000000",
    fontSize: 14,
  },
  signupButtonText: {
    color: "#3bff90",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
  },
});

export default LoginScreen;

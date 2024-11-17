import React, { useState } from "react";
import {
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";

const SignUpScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignUp = async () => {
    setIsLoading(true);
    setError("");
    try {
      const response = await axios.post(
        "http://192.168.70.177:5000/api/users/register",
        {
          name,
          email,
          password,
        }
      );
      console.log(response.data);
      navigation.navigate("Login");
    } catch (error) {
      console.error(error);
      setError("Sign up failed. Please check your information and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.logoContainer}>
          <Ionicons name="leaf-outline" size={72} color="#3bff90" />
          <Text style={styles.logoText}>EcoSignUp</Text>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <Ionicons
              name="person-outline"
              size={24}
              color="#000000"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              placeholderTextColor="#666666"
              value={name}
              onChangeText={setName}
              accessibilityLabel="Full Name input"
            />
          </View>
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
          style={styles.signUpButton}
          onPress={handleSignUp}
          disabled={isLoading}
          accessibilityLabel="Sign Up button"
          accessibilityHint="Double tap to create your account"
        >
          <Text style={styles.signUpButtonText}>
            {isLoading ? "Creating Account..." : "Sign Up"}
          </Text>
        </TouchableOpacity>
        <View style={styles.loginRedirectContainer}>
          <Text style={styles.loginText}>Already have an account?</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("Login")}
            accessibilityLabel="Log in button"
            accessibilityHint="Double tap to go to login screen"
          >
            <Text style={styles.loginButtonText}>Log In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fffaef",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
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
  signUpButton: {
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
  signUpButtonText: {
    color: "#000000",
    fontSize: 18,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
  loginRedirectContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  loginText: {
    color: "#000000",
    fontSize: 14,
  },
  loginButtonText: {
    color: "#3bff90",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
  },
});

export default SignUpScreen;

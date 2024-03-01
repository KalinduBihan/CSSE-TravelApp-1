import {
  StyleSheet,
  Button,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { db } from "../../config/index";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill in both fields.");
      return;
    }

    // Query the "users" collection to find a matching email
    const usersCollection = collection(db, "users");
    const q = query(usersCollection, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.size === 0) {
      alert("No user found with this email.");
      return;
    }

    // Attempt to sign in with the provided email and password
    try {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);
      // If the login is successful, navigate to MainHome.js
      navigation.navigate("DriverDashBoard");
      // navigation.navigate("Home");
    } catch (error) {
      console.error("Error signing in:", error.message);
      alert("Sign In failed. Please check your email and password.");
    }
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={require("../../assets/background.png")}
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        <View style={styles.container}>
          <View style={styles.container2}>
            <Text
              style={{
                color: "black",
                fontWeight: "bold",
                fontSize: 35,
                marginBottom: 40,
              }}
            >
              Sign In
            </Text>
            <TextInput
              style={styles.input}
              value={email}
              placeholder="    Enter Your Email"
              onChangeText={(text) => setEmail(text)}
            />
            <TextInput
              style={styles.input}
              value={password}
              placeholder="    Enter Your Password"
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
            />
            <TouchableOpacity
              style={styles.button}
              title="Sign Up"
              onPress={handleLogin}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>
                Sign In
              </Text>
            </TouchableOpacity>
            <Text
              style={{
                color: "black",
                fontWeight: "bold",
                fontSize: 15,
                marginTop: 30,
              }}
            >
              New User?
              <TouchableOpacity
                style={{ marginTop: 20 }}
                onPress={() => navigation.navigate("register")}
              >
                <Text style={{ color: "blue", fontWeight: "bold" }}>
                  {" "}
                  Sign Up
                </Text>
              </TouchableOpacity>
            </Text>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container2: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 15,
    padding: 40,
    width: 300,
  },
  input: {
    padding: 12,
    width: 250,
    height: 40,
    borderColor: "#D8D8D8",
    borderWidth: 1,
    marginBottom: 25,
  },
  button: {
    width: 250,
    borderRadius: 20,
    height: 40,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

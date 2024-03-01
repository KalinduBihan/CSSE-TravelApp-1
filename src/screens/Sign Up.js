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
import { Picker } from "@react-native-picker/picker";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { db } from "../../config/index";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repass, setRepass] = useState("");
  const [contact, setContact] = useState("");
  const [userType, setUserType] = useState("");
  const [status, setStatus] = useState("not on a ride");
  const [totalCredits, setTotalCredits] = useState(0);
  const [lastUserId, setLastUserId] = useState("p0"); // Initialize lastUserId

  const navigation = useNavigation();

  useEffect(() => {
    // Fetch the last used user ID from Firestore
    const fetchLastUserId = async () => {
      const lastUserIdRef = doc(db, "metadata", "lastUserId"); // Update collection and document names as needed
      const lastUserIdDoc = await getDoc(lastUserIdRef);

      if (lastUserIdDoc.exists()) {
        const lastId = lastUserIdDoc.data().value;
        setLastUserId(lastId);
      }
    };

    fetchLastUserId();
  }, []);

  const handleSignUp = async () => {
    if (!email || !password || !repass || !contact || !userType) {
      alert("Please fill in all fields.");
      return;
    }

    if (password !== repass) {
      alert("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      alert("Password should be at least 6 characters long.");
      return;
    }

    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const uid = userCredential.user.uid;

      const newUser = {
        email: email,
        contact: contact,
        userType: userType,
        password: password,
        qr: null,
        id: lastUserId, // Use the last used user ID
        totalcredit: totalCredits,
        status: status,
      };

      const userDocRef = doc(db, "users", uid);
      await setDoc(userDocRef, newUser);

      // Update the last used user ID in Firestore for the next user
      const nextUserId = `P${parseInt(lastUserId.slice(1)) + 1}`;
      const lastUserIdRef = doc(db, "metadata", "lastUserId");
      await setDoc(lastUserIdRef, { value: nextUserId });

      navigation.navigate("Home");
    } catch (error) {
      console.error("Error creating user:", error.message);
      alert("Registration failed. Please try again.");
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
              Sign Up
            </Text>
            <TextInput
              style={styles.input}
              value={email}
              placeholder="Enter Your Email"
              onChangeText={(text) => setEmail(text)}
            />
            <TextInput
              style={styles.input}
              value={contact}
              placeholder="Enter Your Contact"
              onChangeText={(text) => setContact(text)}
              keyboardType="numeric"
            />

            <Picker
              style={styles.input2}
              selectedValue={userType}
              onValueChange={(itemValue, itemIndex) => setUserType(itemValue)}
            >
              <Picker.Item label="Select user type" value="" />
              <Picker.Item label="Customer" value="customer" />
              <Picker.Item label="Driver" value="driver" />
              <Picker.Item label="Cleaner" value="cleaner" />
            </Picker>
            <TextInput
              style={styles.input}
              value={password}
              placeholder="Enter Your Password"
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
            />

            <TextInput
              style={styles.input}
              value={repass}
              placeholder="Re-enter Your Password"
              onChangeText={(text) => setRepass(text)}
              secureTextEntry={true}
            />
            <TouchableOpacity
              style={styles.button}
              title="Sign Up"
              onPress={handleSignUp}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>
                Sign Up
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
              Have an Account?
              <TouchableOpacity
                style={{ marginTop: 20 }}
                onPress={() => navigation.navigate("Login")}
              >
                <Text style={{ color: "blue", fontWeight: "bold" }}>
                  {" "}
                  Login
                </Text>
              </TouchableOpacity>
            </Text>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default SignUp;

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
  input2: {
    padding: 12,
    width: 250,
    height: 40,
    borderColor: "#D8D8D8",
    borderWidth: 1,
    marginBottom: 25,
    borderStyle: "solid",
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

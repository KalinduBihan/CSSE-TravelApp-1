import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getAuth } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../config/index"; // Import your Firebase configuration
import QRCode from "react-native-qrcode-svg";

const MainHome = () => {
  const [userDetails, setUserDetails] = useState({});
  const [qrData, setQRData] = useState(null); // Initialize qrData as null
  const navigation = useNavigation();

  // Function to generate a QR code and save it to Firestore
  const generateAndSaveQRCode = async () => {
    try {
      if (userDetails.uid) {
        const qrCodeData = JSON.stringify(userDetails); // Convert user details to a JSON string
        setQRData(qrCodeData); // Set QR code data for displaying

        // Save the QR code data to Firestore in the "users" collection under the specific user document
        const userDocRef = doc(db, "users", userDetails.uid);
        await updateDoc(userDocRef, {
          qr: qrCodeData,
        });
      }
    } catch (error) {
      console.error(" Main Error generate and save qr:", error.message);
    }
  };

  const fetchUserDetails = async () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      console.log("User", user);

      if (user) {
        const email = user.email;
        console.log("MainHome Email:", email);

        // Assuming your Firestore collection is named "users" and has documents indexed by email
        const userDocRef = doc(db, "users", email);

        // Fetch user details from Firestore
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();
          setUserDetails(userData);
        }
      }
    } catch (error) {
      console.error("Error fetching user details:", error.message);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <View style={styles.container}>
      <Text>MainHome</Text>

      {/* <TouchableOpacity onPress={generateAndSaveQRCode}> */}
      <Text>Generate and Save QR Code</Text>
      {/* </TouchableOpacity> */}
      {/* <QRCode value={qrData} size={200} /> */}
    </View>
  );
};

export default MainHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

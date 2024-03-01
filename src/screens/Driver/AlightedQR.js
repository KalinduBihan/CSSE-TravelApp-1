import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import AlightedQRView from "../../components/Driver/AlightedQRView";
import AlightedQRController from "../../controllers/AlightedQRController";
import { calculateFare } from "../../models/AlightedQRModel";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Pressable,
  ImageBackground,
  Alert,
} from "react-native";
import {
  collection,
  getDocs,
  getDoc,
  query,
  where,
  doc,
  deleteDoc,
  updateDoc,
  orderBy,
  addDoc,
} from "firebase/firestore";
import { db } from "../../../config/index";

const AlightedQR = ({ route }) => {
  const navigation = useNavigation();
  const { id, totalcredit, status, bCity, bPrice } = route.params;
  const tripsCollection = collection(db, "trips");
  const tripsQuery = query(tripsCollection, orderBy("timestamp", "desc"));
  const userCollection = collection(db, "users");

  // Create an empty object to store the fetched data
  const [alightData, setAlightData] = useState(null);
  const [userData, setUserData] = useState(null);

  const updateTotalCredit = async () => {
    const fareAmount = calculateFare(bPrice, alightData);
    const updatedTotalCredit = alightData.totalcredit - fareAmount;
    const aCity = alightData.Borded;

    try {
      if (fareAmount === 0) {
        console.log("Invalid: Fare Amount is 0");
        Alert.alert("Invalid");
      } else if (bCity !== null && aCity !== null && updatedTotalCredit >= 0) {
        // Create a new trip document
        const tripData = {
          id: alightData.id,
          totalcredit: updatedTotalCredit,
          boardedFrom: bCity,
          alightedAt: aCity,
          fare: fareAmount,
        };

        // Add the new trip document to the "trips" collection
        await addDoc(tripsCollection, tripData);
        console.log("Trip added to the database.");
        Alert.alert("Payment success ✅");
        console.log("Deleting the Boarded Record...", alightData.id);
        await AlightedQRController.deleteRecordById(id);
        await AlightedQRController.updateTotalCredit(id, updatedTotalCredit);
        await AlightedQRController.updateStatus(id);
        navigation.navigate("DriverDashBoard");
      } else {
        console.log("Invalid: Selection or insufficient credit");
        Alert.alert("Invalid selection or insufficient credit ❌");
      }
    } catch (error) {
      console.error("Error updating Total Credit or deleting record: ", error);
      Alert.alert(
        "Error updating Total Credit or deleting record. Please try again."
      );
    }
  };

  useEffect(() => {
    AlightedQRController.fetchBoardedRecord(id).then((data) => {
      if (data) {
        setAlightData(data);
      }
    });

    // AlightedQRController.fetchUsersRecord(id).then((data) => {
    //   if (data) {
    //     setUserData(data);
    //   }
    // });
  }, [id]);

  return (
    <AlightedQRView
      userData={userData}
      bCity={bCity}
      calculateFare={() => calculateFare(bPrice, alightData)}
      updateTotalCredit={updateTotalCredit}
      id={id}
      alightData={alightData}
    />
  );
};

export default AlightedQR;

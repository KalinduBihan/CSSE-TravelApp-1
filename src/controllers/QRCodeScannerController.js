import {
  collection,
  addDoc,
  getFirestore,
  getDocs,
  updateDoc,
  query,
  where,
  doc,
} from "firebase/firestore";
import { Alert } from "react-native";
import React, { useState } from "react";

const db2 = getFirestore();

export const fetchBoardedRecord = async (id) => {
  try {
    const boardedDataRef = collection(db2, "Boarded");
    const q = query(boardedDataRef, where("id", "==", id));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.size === 0) {
      console.log("No matching record found for ID:", id);
    } else {
      const doc = querySnapshot.docs[0];
      const data = doc.data();
      console.log("Matching on 1st:", data);
    }
  } catch (error) {
    console.error("Error fetching boarded data:", error);
  }
};

export const checkCustomer = async (
  id,
  totalcredit,
  status,
  bCity,
  bPrice,
  navigation
) => {
  console.log("Checking... if ", id, totalcredit, status, bCity, bPrice);
  const on = "on a ride";
  const off = "not on a ride";
  console.log("Checking:", status);

  if (status === on) {
    console.log(id, " (if): ", status, bPrice);
    navigation.navigate("AlightedQR", {
      id: id,
      totalcredit: totalcredit,
      status: status,
      bCity: bCity,
      bPrice: bPrice,
    });
  } else if (status === off) {
    console.log(id, " (else):", status);

    if (totalcredit <= 100) {
      console.log(id, " is ", status);
      Alert.alert("Not enough credits ❌", "Please recharge your account.", [
        {
          text: "OK",
          onPress: () => {
            navigation.navigate("DriverDashBoard");
          },
        },
      ]);
    } else {
      const changeStatus = "On a ride";
      console.log("Changing status");

      // Update the passenger's status in the database
      const passengerRef = doc(db, "borded", id); // Replace "your_collection_name" with your collection name
      const updatedData = {
        status: changeStatus,
      };

      try {
        await updateDoc(passengerRef, updatedData);
        console.log(`Passenger ${id} status updated to '${changeStatus}'`);
      } catch (error) {
        console.error("1 Error updating passenger status:", error);
      }

      Alert.alert("Valid pass ✅", `Passenger ${id} Boarded from ${bCity}`, [
        {
          text: "OK",
          onPress: () => {
            navigation.navigate("DriverDashBoard");
          },
        },
      ]);
    }
  }
};

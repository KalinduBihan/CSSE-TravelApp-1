import React, { useState, useEffect } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View, Alert } from "react-native";
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
import { db } from "../../../config/index";

const db2 = getFirestore();

const QRCodeScanner = () => {
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const stops = [
    { key: "0", value: "Rathnapura" },
    { key: "1", value: "Kuruwita" },
    { key: "2", value: "Ehaliyagoda" },
    { key: "3", value: "Awissawella" },
    { key: "4", value: "Hanwella" },
    { key: "5", value: "Nawagamuwa" },
    { key: "6", value: "Kaduwela" },
  ];

  const price = [
    { key: "0", value: 0 },
    { key: "1", value: 70 },
    { key: "2", value: 120 },
    { key: "3", value: 210 },
    { key: "4", value: 290 },
    { key: "5", value: 340 },
    { key: "6", value: 380 },
  ];

  const [alightData, setAlightData] = useState(null);

  const fetchBoardedRecord = async (id) => {
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
        setAlightData(data);
      }
    } catch (error) {
      console.error("Error fetching boarded data:", error);
    }
  };

  const checkPreviousStop = () => {
    if (alightData) {
      const bPricePrevious = alightData.Borded;
      console.log("bPricePrevious:", bPricePrevious);
      console.log("QRCodeScanner:", alightData);
      return bPricePrevious;
    }
    return 0; // Handle the case when alightData is still null
  };

  const bpPrevious = checkPreviousStop();
  console.log("bpPrevious:", bpPrevious);

  const priceAssign = (key) => {
    return price[key].value;
  };

  const cityAssign = (key) => {
    return stops[key].value;
  };

  const getRandomStopKey = () => {
    let availableStops = stops.filter((stop) => stop.key !== bpPrevious);
    const randomIndex = Math.floor(Math.random() * availableStops.length);
    return availableStops[randomIndex].key;
  };

  const k = getRandomStopKey();
  const bPrice = priceAssign(k);
  const bCity = cityAssign(k);

  const updateStatus = async (id) => {
    console.log("Updating status");
    try {
      const status = "on a ride";
      const usersCollection = collection(db, "users");
      const usersQuery = query(usersCollection, where("id", "==", id));
      const querySnapshot = await getDocs(usersQuery);

      if (querySnapshot.size === 0) {
        console.log(
          "User status change: No matching User record found for ID:",
          id
        );
        return;
      }

      const userDoc = querySnapshot.docs[0];
      const userRef = doc(db, "users", userDoc.id);

      await updateDoc(userRef, {
        status: status,
      });

      console.log(id, " user status updated successfully.");
    } catch (error) {
      console.log(error);
    }
  };

  const addPassenger = async (id, status, totalcredit) => {
    console.log("Storing ... ", id, status, totalcredit, bCity, bPrice);
    const boardedCollection = collection(db, "boarded");
    const boardedData = {
      id: id,
      status: status,
      totalcredit: totalcredit,
      Borded: bCity,
      bPrice: bPrice,
    };

    try {
      await addDoc(boardedCollection, boardedData);
      console.log("Data added to the 'Boarded' collection.");
      await updateStatus(id);
    } catch (error) {
      console.error("Error adding data: ", error);
    }
  };

  const checkCustomer = async (id, totalcredit, status, bCity, bPrice) => {
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
        console.log("Changing status", changeStatus);

        const passengerRef = doc(db, "borded", id);
        const updatedData = {
          status: changeStatus,
        };

        try {
          await updateDoc(passengerRef, updatedData);
          console.log(`Passenger ${id} status updated to '${changeStatus}'`);
        } catch (error) {
          // console.error("2 Error updating passenger status:", error);
        }

        addPassenger(id, changeStatus, totalcredit);

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

  const handleBarCodeScanned = ({ type, data }) => {
    console.log(data);
    setScanned(true);

    const qrData = JSON.parse(data);
    const id = qrData.id;
    const totalcredit = qrData.totalcredit;
    const status = qrData.status;

    console.log(id, totalcredit, status);

    fetchBoardedRecord(id);

    checkCustomer(id, totalcredit, status, bCity, bPrice);
  };

  if (hasPermission === null) {
    return <Text>Requesting camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <View style={styles.scanAgain}>
          <Text style={styles.scanAgainText}>Tap to Scan Again</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  scanAgain: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  scanAgainText: {
    fontSize: 18,
    color: "white",
  },
});

export default QRCodeScanner;

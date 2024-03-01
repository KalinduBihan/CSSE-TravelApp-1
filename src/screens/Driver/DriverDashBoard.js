import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Pressable,
  ImageBackground,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import DriverNavigation from "../../components/Driver/DriverNavigation";
import { useNavigation } from "@react-navigation/native";

const DriverDashBoard = () => {
  const navigation = useNavigation();

  // State to store the current time
  const [time, setTime] = useState(getCurrentTime());

  useEffect(() => {
    // Set up an interval to update the time every second
    const intervalId = setInterval(() => {
      setTime(getCurrentTime());
    }, 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  // Function to get the current date
  function getCurrentDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");

    // Create a date string in the format "YYYY-MM-DD" (e.g., "2023-08-12")
    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
  }

  // Get the current date
  const currentDate = getCurrentDate();

  // Function to get the current time
  function getCurrentTime() {
    const currentDate = new Date();
    const hours = String(currentDate.getHours()).padStart(2, "0");
    const minutes = String(currentDate.getMinutes()).padStart(2, "0");
    const seconds = String(currentDate.getSeconds()).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("../../../assets/Driver/images/background.png")}
        style={{ width: "100%", height: "100%" }}
      >
        <View style={styles.v}>
          <View style={styles.headeback}>
            <Text style={styles.Header}>Driver DashBoard</Text>
          </View>

          <View style={styles.dateandtime}>
            <Text style={styles.dateText}>{currentDate}</Text>
            <Text style={styles.dateText}>{time}</Text>
          </View>

          <View style={styles.qrScan}>
            <Image
              source={require("../../../assets/Driver/images/scan.png")}
              style={{
                borderRadius: 20,
                width: 300,
                height: 300,
                marginHorizontal: 13,
                marginVertical: 12,
              }}
            />
          </View>

          <View style={styles.screen}>
            <Pressable onPress={() => navigation.navigate("QRCodeScanner")}>
              <View style={styles.scanButton}>
                <Text style={styles.scanText}>Scan Passenger</Text>
              </View>
            </Pressable>
          </View>
        </View>

        {/* Component to display driver navigation, placed at the bottom */}
        <View style={styles.bottom}>
          <DriverNavigation />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default DriverDashBoard;

const styles = StyleSheet.create({
  qrScan: {
    borderRadius: 30,
    borderWidth: 2,
    backgroundColor: "rgba(211, 211, 211, 0.8)",
    borderColor: "rgba(211, 211, 211, 0.8)",
    width: 330,
    height: 330,
    marginHorizontal: 40,
    marginTop: 15,
    marginBottom: 20,
  },
  dateandtime: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 400,
    top: -13,
  },
  dateText: {
    color: "#F5F5DC",
    fontSize: 28,
    fontWeight: "bold",
  },
  bottom: {
    width: "100%",
    bottom: -5,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  Header: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
  v: {
    flex: 1,
    alignItems: "center",
  },
  headeback: {
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    width: 450,
    height: 90,
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: 10,
    top: -15,
  },
  safe: {
    justifyContent: "center",
  },
  scanButton: {
    backgroundColor: "rgba(255,255,255,0.5)",
    width: 320,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
  },
  scanText: {
    fontSize: 25,
    textAlign: "center",
  },
});

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ImageBackground,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  generateAndSaveQRCode,
  fetchUserDetails,
} from "../controllers/HomeController.js";

const Home = () => {
  const [userDetails, setUserDetails] = useState({});
  const [qrData, setQRData] = useState(null);
  const navigation = useNavigation();
  const [alightData, setAlightData] = useState({
    email: "",
    totalcredit: 0,
    status: "not on a ride",
  });

  const generateQRCode = () => {
    generateAndSaveQRCode(navigation, alightData);
  };

  useEffect(() => {
    fetchUserDetails(setAlightData, setUserDetails);
  }, []);

  return (
    <ImageBackground
      source={require("../../assets/jobMarket/background.png")}
      style={styles.backgroundImage}
    >
      <View style={styles.profile}>
        <View style={styles.card1}>
          <Image
            style={styles.icon1}
            source={require("../../assets/jobMarket/man.png")}
          />
          <View>
            <Text style={styles.cardTextProf}>{alightData.email}</Text>
            <Text style={styles.cardTextProf}>
              {alightData.totalcredit} LKR
            </Text>
          </View>
        </View>
      </View>
      <Text style={styles.status}>{alightData.status}</Text>

      <Image
        style={styles.iconbus}
        source={require("../../assets/jobMarket/bus.png")}
      />

      <View style={styles.container}>
        <View style={styles.buttonRow}>
          <Pressable onPress={generateQRCode}>
            <View style={styles.card}>
              <Image
                style={styles.icon}
                source={require("../../assets/jobMarket/qr.png")}
              />
              <Text style={styles.cardText}>QR Code</Text>
            </View>
          </Pressable>
          <Pressable
            onPress={() =>
              navigation.navigate("Recharge", { alightData: alightData })
            }
          >
            <View style={styles.card}>
              <Image
                style={styles.icon}
                source={require("../../assets/jobMarket/money.png")}
              />
              <Text style={styles.cardText}>Recharge</Text>
            </View>
          </Pressable>
        </View>
        <Pressable onPress={() => navigation.navigate("History")}>
          <View style={styles.cardhi}>
            <View style={styles.card1}>
              <Image
                style={styles.icon1}
                source={require("../../assets/jobMarket/history.png")}
              />
              <Text style={styles.cardText1}>History</Text>
            </View>
          </View>
        </Pressable>
      </View>
    </ImageBackground>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -400,
  },
  backgroundImage: {
    flex: 1,
  },
  buttonRow: {
    flexDirection: "row",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#FFBE5E",
    padding: 16,
    borderRadius: 8,
    shadowColor: "#FFBE5E",
    shadowRadius: 4,
    elevation: 4,
    alignItems: "center",
    width: 150, // Adjust the width as needed
    height: 130, // Adjust the height as needed
    marginHorizontal: 5, // Adjust the horizontal margin
    marginTop: 480,
  },
  cardText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  cardText1: {
    fontSize: 20,
    marginLeft: 16,
    marginTop: 13,
    fontWeight: "bold",
  },
  cardTextProf: {
    fontSize: 18,
    marginLeft: 16,
    marginTop: 3,
  },
  icon: {
    width: 80,
    height: 80,
  },
  iconbus: {
    width: 350,
    height: 230,
    marginLeft: 30,
    marginTop: 120,
  },
  icon1: {
    width: 60,
    height: 60,
    marginTop: -5,
  },
  card1: {
    flexDirection: "row",
  },
  cardhi: {
    backgroundColor: "#FFBE5E",
    padding: 16,
    borderRadius: 8,
    shadowColor: "rgba(0, 0, 0, 0.2)",
    shadowRadius: 4,
    elevation: 4,
    width: 150, // Adjust the width as needed
    alignItems: "center",
    width: 300, // Adjust the width as needed
    marginHorizontal: 5, // Adjust the horizontal margin
    height: 80,
  },

  profile: {
    backgroundColor: "#FFBE5E",
    padding: 16,
    borderRadius: 8,
    shadowColor: "rgba(0, 0, 0, 0.2)",
    shadowRadius: 4,
    elevation: 4,
    alignItems: "center",
    width: 300, // Adjust the width as needed
    marginHorizontal: 5, // Adjust the horizontal margin
    height: 80,
    marginLeft: 55,
    marginTop: 80,
  },
  status: {
    backgroundColor: "#FFBE5E",
    paddingLeft: 16,
    paddingTop: 6,
    borderRadius: 8,
    shadowColor: "rgba(0, 0, 0, 0.2)",
    shadowRadius: 4,
    elevation: 4,
    width: 100, // Adjust the width as needed
    alignItems: "center",
    marginHorizontal: 5, // Adjust the horizontal margin
    height: 35,
    borderRadius: 24,
    fontWeight: "600",
    marginLeft: 150,
    marginTop: 10,
  },
});

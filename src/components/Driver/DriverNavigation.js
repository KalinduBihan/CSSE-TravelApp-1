import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Foundation, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const DriverNavigation = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => navigation.navigate("DriverDashBoard")}
        style={styles.home}
      >
        <Foundation name="home" size={40} color="black" />
        <Text style={styles.text}>Home</Text>
      </Pressable>
      <Pressable style={styles.profile}>
        <MaterialCommunityIcons name="account" size={40} color="black" />
      </Pressable>
    </View>
  );
};

export default DriverNavigation;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    width: "97%",
    height: 55,
    alignSelf: "center",
    borderRadius: 23,
    marginBottom: 15,
    justifyContent: "space-between",
    alignItems: "center",
  },
  home: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    width: 110,
    height: 45,
    borderRadius: 23,
    marginLeft: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  profile: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    width: 60,
    height: 45,
    borderRadius: 23,
    marginRight: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 15,
    fontWeight: "bold",
    color: "black",
    marginLeft: 10,
  },
});

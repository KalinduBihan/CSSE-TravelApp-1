import React from "react";
import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

const ScanPaseneger = () => {
  const navigation = useNavigation();

  const handleQR = () => {
    console.log("ScanPaseneger");
  };
  return (
    <SafeAreaView>
      <View style={styles.screen}>
        <Pressable onPress={() => navigation.navigate("QRCodeScanner")}>
          <View style={styles.scanButton}>
            <Text style={styles.scanText}>ScanPaseneger</Text>
          </View>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default ScanPaseneger;

const styles = StyleSheet.create({
  safe: {
    justifyContent: "center",
  },
  scanButton: {
    backgroundColor: "rgba(128, 128, 128,0.6)",
    width: 300,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
  },
  scanText: {
    fontSize: 25,
    textAlign: "center",
    color: "black",
    // fontWeight: "bold",
  },
});

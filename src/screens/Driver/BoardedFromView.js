import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
} from "react-native";
import DriverNavigation from "../../components/Driver/DriverNavigation";

const BoardedFromView = ({
  route,
  scanCustomer,
  showScanResults,
  totalcredit,
}) => {
  const { data } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.v}>
        <View style={styles.headeback}>
          <Text style={styles.Header}>Scan customer</Text>
        </View>
        {showScanResults ? (
          <Text style={styles.scanResult}>{showScanResults}</Text>
        ) : (
          <Button
            title="Scan Customer"
            onPress={() => {
              scanCustomer(totalcredit);
            }}
          />
        )}
      </View>
      <View style={styles.bottom}>
        <DriverNavigation />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  Header: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
  headeback: {
    backgroundColor: "lightblue",
    width: 450,
    height: 90,
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: 10,
  },
  scanResult: {
    fontSize: 18,
    margin: 20,
    textAlign: "center",
  },
  v: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  bottom: {
    width: "100%",
    bottom: -10,
  },
});

export default BoardedFromView;

import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import DriverDashBoard from "../screens/Driver/DriverDashBoard";
import QRCodeScanner from "../screens/Driver/QRCodeScanner";
import BoardedFrom from "../screens/Driver/BoardedFrom";
import AlightedQR from "../screens/Driver/AlightedQR";

import Login from "../screens/Login";
import SignUp from "../screens/Sign Up";
import Home from "../screens/Home";
import QrCode from "../screens/Customer/QrCode";
import History from "../screens/Customer/History";
import Recharge from "../screens/Customer/Recharge";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="register" component={SignUp} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="QrCode" component={QrCode} />
        <Stack.Screen name="History" component={History} />
        <Stack.Screen name="Recharge" component={Recharge} />

        <Stack.Screen name="DriverDashBoard" component={DriverDashBoard} />
        <Stack.Screen name="QRCodeScanner" component={QRCodeScanner} />
        <Stack.Screen name="BoardedFrom" component={BoardedFrom} />
        <Stack.Screen name="AlightedQR" component={AlightedQR} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

import React, { useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  TextInput,
  Button,
  StyleSheet,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { handlePayment } from "../../models/RechargeModel";

const Recharge = () => {
  const route = useRoute();
  const alightData = route.params?.alightData;
  console.log("Recharge: ", alightData);
  const [bank, setBank] = useState("");
  const [branch, setBranch] = useState("");
  const [accNum, setAccNum] = useState("");
  const [amount, setAmount] = useState(0);
  const [remark, setRemark] = useState("");
  const [paymentResult, setPaymentResult] = useState(null);

  const handleRecharge = async () => {
    const result = await handlePayment(
      bank,
      branch,
      accNum,
      amount,
      remark,
      alightData
    );

    if (result.success) {
      setPaymentResult("Payment successful.");
      // Clear input fields
      setBank("");
      setBranch("");
      setAccNum("");
      setAmount(0);
      setRemark("");
    } else {
      setPaymentResult("Payment failed. Error: " + result.error);
    }
  };

  return (
    <ImageBackground
      source={require("../../../assets/jobMarket/PaymentBack.png")}
      style={{ width: "100%", height: "100%" }}
    >
      <View style={styles.container}>
        <View style={styles.inputfi}>
          <Text style={styles.label}>Bank:</Text>
          <TextInput
            placeholder="Enter Bank"
            style={styles.input}
            value={bank}
            onChangeText={(text) => setBank(text)}
          />
        </View>

        <View style={styles.inputfi}>
          <Text style={styles.label}>Branch:</Text>
          <TextInput
            placeholder="Enter Branch"
            style={styles.input}
            value={branch}
            onChangeText={(text) => setBranch(text)}
          />
        </View>

        <View style={styles.inputfi}>
          <Text style={styles.label}>Acc No:</Text>
          <TextInput
            placeholder="Enter Acc No"
            style={styles.input}
            value={accNum}
            onChangeText={(text) => setAccNum(text)}
          />
        </View>

        <View style={styles.inputfi}>
          <Text style={styles.label}>Amount:</Text>
          <TextInput
            placeholder="Enter Amount"
            style={styles.input}
            value={amount.toString()}
            onChangeText={(text) => setAmount(parseFloat(text) || 0)}
          />
        </View>

        <View style={styles.inputfi}>
          <Text style={styles.label}>Remark:</Text>
          <TextInput
            placeholder="Enter Remark"
            style={styles.input}
            value={remark}
            onChangeText={(text) => setRemark(text)}
          />
        </View>
        <Button title="Make Payment" onPress={handleRecharge} />

        {paymentResult && (
          <Text style={styles.paymentResult}>{paymentResult}</Text>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 300,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    width: 250,
    height: 40,
    borderColor: "#D8D8D8",
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
  },
  inputfi: {
    flexDirection: "row",
  },
  paymentResult: {
    fontSize: 18,
    marginTop: 20,
  },
});

export default Recharge;

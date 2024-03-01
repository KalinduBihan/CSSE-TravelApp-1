import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import BoardedFromView from "./BoardedFromView";
import BoardedFromController from "../../controllers/BoardedFromController";
import {
  priceAssign,
  cityAssign,
  getRandomStopKey,
} from "../../models/BoardedFromModel";

const BoardedFrom = ({ route }) => {
  const navigation = useNavigation();
  const { data } = route.params;
  const [showScanResults, setShowScanResults] = useState(null);
  console.log("BordedFrom id", data.id);

  const scanCustomer = async (totalcredit) => {
    const k = getRandomStopKey();
    const bPrice = priceAssign(k);
    const bCity = cityAssign(k);

    if (totalcredit <= 100) {
      setShowScanResults(
        "Not enough credits ❌. Please recharge your account."
      );
    } else {
      const result = await BoardedFromController.addPassenger(
        data.id,
        totalcredit,
        bCity,
        bPrice
      );
      setShowScanResults(result);
      await BoardedFromController.updateStatus(data.id);
    }
  };

  return (
    <BoardedFromView
      route={route}
      scanCustomer={scanCustomer}
      showScanResults={showScanResults}
      totalcredit={data.totalcredit}
    />
  );
};

export default BoardedFrom;

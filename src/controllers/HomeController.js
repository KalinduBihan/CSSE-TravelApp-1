import { getAuth } from "firebase/auth";
import { getAlightData } from "../models/HomeModel";

export const generateAndSaveQRCode = (navigation, alightData) => {
  try {
    if (alightData.email) {
      console.log("QR Code Data:", alightData);
      navigation.navigate("QrCode", { aaa: alightData });
    } else {
      console.log("Email is null or empty");
    }
  } catch (error) {
    console.error("Home controller :", error.message);
  }
};

export const navigateToRecharge = (navigation, alightData) => {
  navigation.navigate("Recharge", { alightData: alightData });
};

export const navigateToHistory = (navigation) => {
  navigation.navigate("History");
};

export const fetchUserDetails = async (setAlightData, setUserDetails) => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const email = user.email;
      const alightData = await getAlightData(email);
      setUserDetails(email);
      setAlightData(alightData);
    }
  } catch (error) {
    console.error("Error fetching user details:", error.message);
  }
};

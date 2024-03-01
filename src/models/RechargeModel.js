// RechargeModel.js

import {
  collection,
  addDoc,
  updateDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../config/index";

const handlePayment = async (
  bank,
  branch,
  accNum,
  amount,
  remark,
  alightData
) => {
  const { totalcredit, email } = alightData;

  try {
    // Add payment data to the payments collection
    const paymentsRef = collection(db, "payments");
    const newPayment = {
      bank: bank,
      branch: branch,
      accNum: accNum,
      amount: amount,
      remark: remark,
    };

    await addDoc(paymentsRef, newPayment);

    const updateCredit = totalcredit + amount;
    await updateTotalCredits(updateCredit, email);

    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

const updateTotalCredits = async (updateTotal, email) => {
  try {
    const usersCollection = collection(db, "users");
    const userQuery = query(usersCollection, where("email", "==", email));
    const querySnapshot = await getDocs(userQuery);

    if (querySnapshot.size === 0) {
      console.log("No matching User record found for ID:", email);
      return { success: false, error: "No matching User record found" };
    }

    const userDoc = querySnapshot.docs[0];
    const userRef = doc(db, "users", userDoc.id);

    // Update the 'totalcredit' field
    await updateDoc(userRef, {
      totalcredit: updateTotal,
    });

    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export { handlePayment, updateTotalCredits };

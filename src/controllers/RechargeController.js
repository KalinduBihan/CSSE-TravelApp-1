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

export const handlePayment = async (
  bank,
  branch,
  accNum,
  amount,
  remark,
  alightData
) => {
  try {
    const { totalcredit, email } = alightData;

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

    return true;
  } catch (error) {
    console.error("Error making payment:", error.message);
    return false;
  }
};

export const updateTotalCredits = async (updateTotal, email) => {
  try {
    const usersCollection = collection(db, "users");
    const userQuery = query(usersCollection, where("email", "==", email));
    const querySnapshot = await getDocs(userQuery);

    if (querySnapshot.size === 0) {
      console.log("No matching User record found for ID:", email);
      return false;
    }

    const userDoc = querySnapshot.docs[0];
    const userRef = doc(db, "users", userDoc.id);

    await updateDoc(userRef, {
      totalcredit: updateTotal,
    });

    console.log(email, "Total credits updated successfully.");
    return true;
  } catch (error) {
    console.error("Error updating Total Credit:", error);
    return false;
  }
};

import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../config/index";

export const getAlightData = async (email) => {
  const alightData = { email: "", totalcredit: 0, status: "not on a ride" };
  try {
    const userDataRef = collection(db, "users");
    const q = query(userDataRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.size === 0) {
      console.log("No matching record found for Email:", email);
    } else {
      const doc = querySnapshot.docs[0];
      const data = doc.data();
      alightData.id = data.id;
      alightData.email = email;
      alightData.totalcredit = data.totalcredit;
      alightData.status = data.status;
      console.log("alight data: ", alightData);
    }
  } catch (error) {
    console.error("Error fetching boarded data:", error);
  }
  return alightData;
};

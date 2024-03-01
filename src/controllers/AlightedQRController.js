import {
  collection,
  getDocs,
  getDoc,
  query,
  where,
  getFirestore,
  orderBy,
  Timestamp,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../config/index";

const AlightedQRController = {
  fetchBoardedRecord: async (id) => {
    try {
      const boardedDataRef = collection(db, "boarded");
      const q = query(boardedDataRef, where("id", "==", id));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.size === 0) {
        console.log("No matching borded record found for ID:", id);
        return null;
      } else {
        // You can access the matching record here
        const doc = querySnapshot.docs[0];
        const data = doc.data();
        return data;
      }
    } catch (error) {
      console.error("Error fetching boarded data:", error);
      return null;
    }
  },

  deleteRecordById: async (id) => {
    try {
      const boardedCollection = collection(db, "boarded");
      const querySnapshot = await getDocs(
        query(boardedCollection, where("id", "==", id))
      );

      if (querySnapshot.size === 0) {
        console.log("No matching record found for ID:", id);
        return false;
      } else {
        // Get the first matching record
        const docRef = querySnapshot.docs[0].ref;
        await deleteDoc(docRef);
        console.log("Record with ID:", id, "deleted successfully.");
        return true;
      }
    } catch (error) {
      console.error("Error deleting record:", error);
      return false;
    }
  },

  updateTotalCredit: async (id, updateTotal) => {
    try {
      const usersCollection = collection(db, "users");
      const usersQuery = query(usersCollection, where("id", "==", id));
      const querySnapshot = await getDocs(usersQuery);

      if (querySnapshot.size === 0) {
        console.log("No matching User record found for ID:", id);
        return false;
      }

      const userDoc = querySnapshot.docs[0];
      const userRef = doc(db, "users", userDoc.id);

      // Update the 'totalcredit' field
      await updateDoc(userRef, {
        totalcredit: updateTotal,
      });

      console.log(id, "Total credits updated successfully.");
      return true;
    } catch (error) {
      console.error("Error updating Total Credit:", error);
      return false;
    }
  },
  updateStatus: async (id) => {
    console.log("Updating status when Alight");
    try {
      const status = "not on a ride";
      const usersCollection = collection(db, "users");
      const usersQuery = query(usersCollection, where("id", "==", id));
      const querySnapshot = await getDocs(usersQuery);

      if (querySnapshot.size === 0) {
        console.log(
          "User status change: No matching User record found for ID:",
          id
        );
        return;
      }

      const userDoc = querySnapshot.docs[0];
      const userRef = doc(db, "users", userDoc.id);

      await updateDoc(userRef, {
        status: status,
      });

      console.log(id, " user status updated successfully.");
    } catch (error) {
      console.log(error);
    }
  },
};

export default AlightedQRController;

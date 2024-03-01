import { collection, addDoc } from "firebase/firestore";
import { db } from "../../config/index";

//get a passenger borded
const BoardedFromController = {
  addPassenger: async (id, totalcredit, bCity, bPrice) => {
    const status = "on a ride";
    const boardedCollection = collection(db, "Boarded");
    const boardedData = {
      id: id,
      status: status,
      totalcredit: totalcredit,
      Borded: bCity,
      bPrice: bPrice,
    };

    try {
      await addDoc(boardedCollection, boardedData);
      return "Data added to the 'Boarded' collection controller.";
    } catch (error) {
      console.error("Error adding data: ", error);
      return "Error adding data: " + error.message;
    }
  },
  //Updatinge passenger status
  updateStatus: async (id) => {
    console.log("Updating status");
    try {
      const status = "on a ride";
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

export default BoardedFromController;

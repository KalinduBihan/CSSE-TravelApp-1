import BoardedFromController from "../../controllers/BoardedFromController";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../config/index";

// Mocking Firebase functions
jest.mock("firebase/firestore", () => ({
  collection: jest.fn(),
  addDoc: jest.fn(),
}));

describe("BoardedFromController", () => {
  it('should add a passenger to the "Boarded" collection', async () => {
    const id = "p0";
    const totalcredit = 150;
    const bCity = "Rathnapura";
    const bPrice = 30;

    const mockCollection = jest.fn();
    const mockAddDoc = jest.fn();

    collection.mockImplementation(mockCollection);
    addDoc.mockImplementation(mockAddDoc);

    mockCollection.mockReturnValue({});

    const result = await BoardedFromController.addPassenger(
      id,
      totalcredit,
      bCity,
      bPrice
    );

    expect(result).toBe("Data added to the 'Boarded' collection controller");
    expect(mockCollection).toHaveBeenCalledWith(db, "Boarded");
    expect(mockAddDoc).toHaveBeenCalledWith(
      {},
      {
        id,
        status: "on a ride",
        totalcredit,
        Borded: bCity,
        bPrice,
      }
    );
  });
});

// import {
//   addPassenger,
//   updateStatus,
// } from "../../controllers/BoardedFromController.js";

// describe("BoardedFromController", () => {
//   it("should add a passenger", async () => {
//     // Write your test case for addPassenger here.
//     // You may use Jest's expect/assert functions to make assertions.
//   });

//   it("should update status", async () => {
//     // Write your test case for updateStatus here.
//     // You may use Jest's expect/assert functions to make assertions.
//   });
// });

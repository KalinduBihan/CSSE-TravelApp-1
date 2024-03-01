import React, { useEffect, useState, forwardRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Pressable,
} from "react-native";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { useFocusEffect } from "@react-navigation/native";


// Initialize Firebase
const db = getFirestore();

const RideItem = forwardRef(({ navigation }, ref) => {
  const [salesItems, setSalesItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRideItems = async () => {
    try {
      const salesItemsRef = collection(db, "trips");
      const querySnapshot = await getDocs(salesItemsRef);

      const fetchedRideItems = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();

        if (data.id) {
            fetchedRideItems.push({
            id: doc.id,
            alightedAt: data.alightedAt,
            boardedFrom: data.boardedFrom,
            fare: data.fare
            // status: data.status,
          });
        } else {
          console.warn(`Missing id for document with ID: ${doc.id}`);
        }
      });

      setSalesItems(fetchedRideItems);
      setLoading(false); // Set loading to false when data is fetched successfully.

    } catch (error) {
      console.error("Error fetching sales items:", error);
      setLoading(false); // Set loading to false in case of an error.
    }
  };

  useEffect(() => {
    fetchRideItems();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
        fetchRideItems();

      const reloadInterval = setInterval(fetchRideItems, 5 * 60 * 1000);

      return () => clearInterval(reloadInterval);
    }, [])
  );

  if (loading) {
    // You can render a loading indicator here
    return <Text>Loading...</Text>;
  }







  return (
    <View style={{marginTop:10}}>
      <FlatList
        ref={ref}
        data={salesItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={styles.artworkImageContainer}
          >
            <Image
                source={require("../../../assets/jobMarket/bus.png")}
                style={styles.iconbus}
              />
            
            <View style={styles.detailRow}>
              <Image
                source={require("../../../assets/jobMarket/location.png")}
                style={styles.icon}
              />
              <View style={styles.detailView}>
                <Text style={styles.detailTitle}>Leaved At:</Text>
                <Text style={styles.detailText}>{item.alightedAt}</Text>
              </View>
            </View>
            <View style={styles.detailRow}>
              <Image
                source={require("../../../assets/jobMarket/time.png")}
                style={styles.icon}
              />
              <View style={styles.detailView}>
                <Text style={styles.detailTitle}>Boarded At:</Text>
                <Text style={styles.detailText}>{item.boardedFrom}</Text>
              </View>
            </View>
            <View style={styles.detailRow}>
              <Image
                source={require("../../../assets/jobMarket/money.png")}
                style={styles.icon}
              />
              <View style={styles.detailView}>
                <Text style={styles.detailTitle}>Fare:</Text>
                <Text style={styles.detailText}>{item.fare}</Text>
              </View>
            </View>
          </View>
        )}
        numColumns={2}
        showsVerticalScrollIndicator={false}
      />

    </View>
  );
});

const styles = StyleSheet.create({
  artworkImageContainer: {
    backgroundColor: "rgba(211, 211, 211, 1)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    width: "45%",
    shadowOpacity: 0.1,
    shadowRadius: 7,
    borderRadius: 16,
    marginVertical: 10,
    marginLeft: 5,
    alignItems: "left",
    paddingVertical: 20,
    overflow: "hidden",
    width: 180,
    height: 300,
    marginLeft: 16,
    marginTop:80
  },
  dropdownStyle: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 1,
    backgroundColor: '#F3AF4A',
    marginLeft:20,
    width: 140
  },
  dropdownTextStyle: {
    fontSize: 16,
    color: 'black',
    marginLeft:33,
  },
  dropdownContainer: {
    borderColor: '#ccc',
    borderRadius: 10,
  },
  detailRowst:{
    marginLeft:60
  },
  dropdownText: {
    fontSize: 16,
    color: 'black',
  },
  detailTitle: {
    fontSize: 16,
    fontWeight: "900",
  },
  detailText: {
    fontSize: 16,
    fontWeight: "500",
  },
  artworkImage: {
    marginTop: -20,
    width: 180,
    height: 140,
    resizeMode: "cover",
    borderRadius: 16,
    marginLeft: 0,
  },
  detailView: {
    flexDirection: "column",
    marginHorizontal: 5,
    marginTop:8
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    // marginBottom: 20,
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 10,
    marginTop: 10,
    marginLeft: 10,

  },
  iconbus: {
    width: 80,
    height: 80,
    marginRight: 10,
    marginTop: 10,
    marginLeft: 45,

  },
});

export default RideItem;

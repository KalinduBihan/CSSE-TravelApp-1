import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Pressable,
  ImageBackground,
  Alert,
} from "react-native";
import DriverNavigation from "../../components/Driver/DriverNavigation";

const AlightedQRView = ({
  userData,
  bCity,
  calculateFare,
  updateTotalCredit,
  id,
  alightData,
}) => {
  console.log("AlightedQRView", id);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={require("../../../assets/Driver/images/background.png")}
        style={{ width: "100%", height: "100%" }}
      >
        <View style={styles.v}>
          <View style={styles.headeback}>
            <Text style={styles.Header}>Issue ticket</Text>
          </View>
          <View style={styles.screen}>
            <View>
              <ScrollView>
                <Image
                  source={require("../../../assets/Driver/images/profileuser.png")}
                  style={styles.image}
                />
                <View style={styles.details}>
                  <View style={{ flexDirection: "row" }}>
                    <View style={styles.detailsTitle}>
                      <Text style={styles.text}>Id</Text>
                    </View>
                    <View style={styles.detailsValue}>
                      <Text style={styles.text}>{id}</Text>
                    </View>
                  </View>
                </View>
                {/* <View style={styles.details}>
                  <View style={{ flexDirection: "row" }}>
                    <View style={styles.detailsTitle}>
                      <Text style={styles.text}>Email</Text>
                    </View>
                    <View style={styles.detailsValue}>
                      <Text style={styles.text}>{userData.email}</Text>
                    </View>
                  </View>
                </View> */}

                {alightData && (
                  <>
                    <View style={styles.details}>
                      <View style={{ flexDirection: "row" }}>
                        <View style={styles.detailsTitle}>
                          <Text style={styles.text}>Total credits</Text>
                        </View>
                        <View style={styles.detailsValue}>
                          <Text style={styles.text}>
                            {alightData.totalcredit}
                          </Text>
                        </View>
                      </View>
                    </View>

                    <View style={styles.details}>
                      <View style={{ flexDirection: "row" }}>
                        <View style={styles.detailsTitle}>
                          <Text style={styles.text}>Boarded from</Text>
                        </View>
                        <View style={styles.detailsValue}>
                          <Text style={styles.text}>{alightData.Borded}</Text>
                        </View>
                      </View>
                    </View>
                  </>
                )}

                <View style={styles.details}>
                  <View style={{ flexDirection: "row" }}>
                    <View style={styles.detailsTitle}>
                      <Text style={styles.text}>Alight at</Text>
                    </View>
                    <View style={styles.detailsValue}>
                      <Text style={styles.text}>{bCity}</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.priceV}>
                  <Text style={styles.balance}>Rs {calculateFare()}.00/=</Text>
                </View>
                <Pressable onPress={updateTotalCredit}>
                  <View style={styles.button}>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: "bold",
                        color: "black",
                        marginHorizontal: 15,
                        marginVertical: 15,
                      }}
                    >
                      Issue a ticket
                    </Text>
                  </View>
                </Pressable>
              </ScrollView>
            </View>
          </View>
        </View>

        <View style={styles.bottom}>
          <DriverNavigation />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  bottom: {
    width: "100%",
    bottom: -8,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  screen: {
    backgroundColor: "rgba(0,0,0,0.25)",
    width: 400,
    height: 720,
    alignItems: "center",
    borderRadius: 15,
    justifyContent: "flex-start",
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    alignSelf: "center",
    marginTop: 10,
  },
  priceV: {
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    width: 380,
    height: 60,
    borderRadius: 10,
    marginTop: 10,
  },
  alight: {
    backgroundColor: "white",
    width: 380,
    height: 60,
    borderRadius: 10,
    marginTop: 10,
    justifyContent: "center",
  },
  broded: {
    backgroundColor: "white",
    width: 380,
    height: 60,
    borderRadius: 10,
    marginTop: 10,
    justifyContent: "center",
  },
  brodedText: {
    fontSize: 25,
    color: "black",
    fontWeight: "bold",
    alignSelf: "center",
  },
  balance: {
    fontSize: 40,
    color: "black",
    fontWeight: "bold",
    alignSelf: "center",
    marginLeft: 20,
  },
  Header: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
  headeback: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    width: 450,
    height: 90,
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: 10,
  },
  v: {
    flex: 1,
    alignItems: "center",
  },
  details: {
    flexDirection: "column",
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    width: 380,
    height: 60,
    borderRadius: 10,
    marginTop: 10,
  },
  detailsTitle: {
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    width: 130,
    height: 60,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#E1A245",
    width: "50%",
    height: "auto",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    left: "25%",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    marginLeft: 10,
  },
  detailsValue: {
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },
});

export default AlightedQRView;

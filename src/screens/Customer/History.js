import React, { useRef, useState } from "react";
import {
  StyleSheet,
  ImageBackground,
  FlatList,
  Image,
  View,
  Text,
  Pressable
} from "react-native";
import RideItem from '../../components/JobMarket/RideItem';
import { useNavigation } from "@react-navigation/native";


const History = () => {

  const flatListRef = useRef(null);
  const navigation = useNavigation();
  const [search, setSearch] = useState("");
  const [isSearchBarFocused, setIsSearchBarFocused] = useState(false);

  const data = [{ key: "RideItem" }];

  

  return (
    <ImageBackground
      source={require("../../../assets/jobMarket/background.png")}
      style={{ width: "100%", height: "100%" }}
    >

      <FlatList
        ref={flatListRef}
        showsVerticalScrollIndicator={false}
        data={data}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => {
          switch (item.key) {
            case "RideItem":
              return <RideItem navigation={navigation} searchText={search} />;
            default:
              return null;
          }
        }}
      />
    </ImageBackground>
  );
}

export default History;

const styles = StyleSheet.create({
  searchContainer: {
    flex: 1,
    marginBottom: 20,
    
  },
  searchContainer: {
    height:200,
    width: 385,
    marginLeft:20,
    marginTop: -20
  },
});



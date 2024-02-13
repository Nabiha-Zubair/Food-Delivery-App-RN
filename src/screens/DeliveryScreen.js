import * as Progress from "react-native-progress";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
import { XMarkIcon } from "react-native-heroicons/solid";
import * as Location from "expo-location";

const DeliveryScreen = () => {
  const navigation = useNavigation();
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [Dlatitude, setLatitude] = useState(null);
  const [Dlongitude, setLongitude] = useState(73.034585);
  
  const fetchLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
    setLongitude(73.034585);
    setLatitude(33.65086);
  };
  useEffect(() => {
    fetchLocation();
  }, []);

  return (
    <View className="bg-[#00CCBB] flex-1">
      <SafeAreaView className="z-50">
        <View className="flex-row justify-between items-center p-5">
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <XMarkIcon color="white" size={30} />
          </TouchableOpacity>
          <Text className="font-light text-white text-lg">Order Help</Text>
        </View>
        <View className="bg-white mx-5 my-2 rounded-md p-6 z-50 shadow-md">
          <View className="flex-row justify-between">
            <View>
              <Text className="text-lg text-gray-400">Estimated Arrival</Text>
              <Text className="text-4xl font-bold">40-50 Minutes</Text>
            </View>
            <Image
              source={require("../assets/images/delivery.gif")}
              className="h-24 w-24 ml-2"
            />
          </View>
          <Progress.Bar size={30} color="#00CCBB" indeterminate={true} />
          <Text className="mt-3 text-gray-500">
            Your order is being prepared
          </Text>
        </View>
      </SafeAreaView>
      {Dlatitude === null ? (
        <ActivityIndicator size="small" color="#0000ff" />
      ) : (
        // <Text>MAP</Text>
        <MapView
          initialRegion={{
            latitude: Dlatitude,
            longitude: Dlongitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
          mapType="mutedStandard"
          className="flex-1 -mt-10 z-0"
        >
          <Marker
            coordinate={{ latitude: Dlatitude, longitude: Dlongitude }}
            pinColor={"green"}
            title={"title"}
            description={"description"}
          />
        </MapView>
      )}
    </View>
  );
};

export default DeliveryScreen;

import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import {
  AdjustmentsVerticalIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  UserIcon,
} from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";

import { Categories } from "../components/Categories/categories";
import { FeaturedRow } from "../components/Featured/FeaturedRow";
import sanityClient from "../../sanity";

export default function HomeScreen() {
  const [featuredCategories, setFeaturedCategories] = useState([]);
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "featured"]{
    ...,
    restaurants[]->{
      ...,
      dish[]->{
        type-> {
        name
        }
      },
      type->{
        title
      }
    }
  }`
      )
      .then((data) => {
        setFeaturedCategories(data);
      })
      .catch((err) => {
        console.log("eeror: ", err.message);
      });
  }, []);

  // console.log("fetched: ", featuredCategories);
  return (
    <SafeAreaView className="bg-white">
      <View className="flex-row p-3 items-center mx-3 space-x-2">
        <Image
          source={{ uri: "https://links.papareact.com/wru" }}
          className="h-7 w-7 bg-gray-300 p-4 rounded-full"
        />
        <View className="flex-1">
          <Text className="text-xs text-gray-500">Deliver Now!</Text>
          <Text className="font-bold text-xl">
            Current Location
            <ChevronDownIcon color="#00CCBB" size={20} />
          </Text>
        </View>

        <UserIcon color="#00CCBB" size={35} />
      </View>

      <View className="flex-row items-center m-5 space-x-2">
        <View className="flex-row items-center">
          <MagnifyingGlassIcon color="gray" size={20} className="absolute" />
          <TextInput
            className="bg-slate-100 w-4/5 p-3"
            placeholder="Restaurants and Cuisines"
            keyboardType="default"
          />
        </View>
        <AdjustmentsVerticalIcon color="#00CCBB" size={20} />
      </View>

      <ScrollView
        className="bg-[#F7F8F9] pl-5 py-5"
        contentContainerStyle={{ paddingBottom: 170 }}
      >
        {/* Categories */}
        <Categories />

        {/* Featured List */}
        {featuredCategories?.map((category) => (
          <FeaturedRow
            key={category._id}
            id={category._id}
            title={category.name}
            description={category.short_description}
            restaurants={category.restaurants}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

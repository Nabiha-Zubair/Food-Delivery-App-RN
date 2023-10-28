import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { selectCartTotal, selectCartItems } from "../../redux/slices/cartSlice";
import { useNavigation } from "@react-navigation/native";
const CartIcon = () => {
  const items = useSelector(selectCartItems);
  const navigation = useNavigation();
  const basketTotal = useSelector(selectCartTotal);
  return (
    <View className="absolute bottom-10 w-full z-50">
      <TouchableOpacity className="mx-5 bg-[#00CCBB] p-4 rounded-lg flex-row items-center space-x-1">
        <Text className=" text-white font-extrabold text-lg bg- [#01A296] py-1 px-2">
          {items.length}
        </Text>
        <Text className="flex-1 text-white font-extrabold text-lg text-center">
          View Basket
        </Text>
        <Text className="text-lgtext-white font-extrabold">$ {basketTotal}</Text>
      </TouchableOpacity>
    </View>
  );
};
export default CartIcon;

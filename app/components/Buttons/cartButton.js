import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { selectCartTotal, selectCartItems } from "../../redux/slices/cartSlice";
import { useNavigation } from "@react-navigation/native";
import { Link } from "expo-router";

const CartIcon = () => {
  const items = useSelector((state) => selectCartItems(state));
  const cartTotal = useSelector((state) => selectCartTotal(state));
  return (
    <View className="absolute bottom-10 w-full z-50">
      <Link
        href="/cart"
        className="mx-6"
      >
        <View className="flex-row w-full rounded-lg bg-primary_btn_color p-4 items-center">

        <Text className="text-white font-extrabold text-lg bg-[#01A296] py-1 px-3 rounded-lg">
          {items.length}
        </Text>
        <Text className="flex-1 text-white font-extrabold text-lg text-center">
          View Cart
        </Text>
        <Text className="text-lg text-white font-extrabold">
          $ {cartTotal.toFixed(2)}
        </Text>
        </View>

      </Link>
    </View>
  );
};
export default CartIcon;

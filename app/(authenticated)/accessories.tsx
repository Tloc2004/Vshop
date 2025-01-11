import React from "react";
import { ScrollView, View, Text } from "react-native";
import Countdown from "~/components/Countdown";
import ShopAccessoryItem from "~/components/ShopAccessoryItem";
import { useUserStore } from "~/hooks/useUserStore";
import CurrencyIcon from "~/components/CurrencyIcon";

function AccessoryShop() {
  const user = useUserStore((state) => state.user);
  const timestamp = new Date().getTime() + user.shops.remainingSecs.accessory * 1000;
    return (
    <>
      <ScrollView>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingVertical: 0,
            paddingHorizontal: 0,
          }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
              <CurrencyIcon
                  icon="kc"
                  style={{
                      width: 20,
                      height: 20,
                      marginLeft: 6,
                      marginTop: 4
                  }}/>
            <Text
              style={{
                color: "white",
                fontSize: 16,
                fontWeight: "bold",
                marginLeft: 5,
                marginTop: 3
              }}>
              {user.balances.kc.toString()}
            </Text>
          </View>
          <Countdown timestamp={timestamp} />
        </View>
        {user.shops.accessory.map((item) => (
          <ShopAccessoryItem item={item} key={item.uuid} />
        ))}
      </ScrollView>
    </>
  );
}

export default AccessoryShop;

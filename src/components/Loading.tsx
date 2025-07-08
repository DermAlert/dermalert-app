import { ActivityIndicator, View } from "react-native";

export function Loading() {
  return (
    <View className="items-center justify-center flex-1 bg-white">
      <ActivityIndicator color="#535353" size={60}/>
    </View>
  );
}
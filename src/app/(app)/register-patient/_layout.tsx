import { Stack } from "expo-router";

export default function RegisterPatientLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "none",
        gestureEnabled: false,
      }}
    />
  );
}

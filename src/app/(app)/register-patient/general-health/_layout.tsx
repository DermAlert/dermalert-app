import { Stack } from "expo-router";

export default function RegisterPatientGeneralHealthLayout() {
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

import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="forgot-password" options={{ presentation: "modal", animation: "slide_from_bottom" }} />
    </Stack>
  );
}
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="login" />
      <Stack.Screen name="signup" />
      <Stack.Screen name="dashboard" />
      <Stack.Screen name="profile" />
      <Stack.Screen name="editProfile" />
      <Stack.Screen name="shirts" />
      <Stack.Screen name="allshirts" />
      <Stack.Screen name="orderform" /> {/* ✅ Make sure this is here */}
    </Stack>
  );
}

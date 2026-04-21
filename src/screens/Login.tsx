import React, { useState, useEffect } from "react";
import { Alert } from "react-native";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input, InputField } from "@/components/ui/input";
import { SafeAreaView } from "react-native-safe-area-context";

// Native Authentication Modules
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

export default function Login({ navigation }: any) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [code, setCode] = useState("");
  const [confirm, setConfirm] = useState<any>(null); // Holds the OTP confirmation state
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Initialize Google Sign-In
    // You will get this Web Client ID from your Firebase Console -> Authentication -> Sign-in Method -> Google -> Web SDK configuration
    GoogleSignin.configure({
      webClientId: 'YOUR_WEB_CLIENT_ID.apps.googleusercontent.com',
    });
  }, []);

  // --- 1. GOOGLE AUTHENTICATION ---
  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      
      await auth().signInWithCredential(googleCredential);
      navigation.replace("Dashboard");
    } catch (error: any) {
      Alert.alert("Google Login Failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  // --- 2. PHONE AUTHENTICATION (SEND OTP) ---
  const handleSendOTP = async () => {
    if (!phoneNumber) return Alert.alert("Error", "Please enter a valid phone number.");
    setLoading(true);
    try {
      // Must include the country code, e.g., +12345678900
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      setConfirm(confirmation); // Switch UI to OTP input
    } catch (error: any) {
      Alert.alert("Failed to send OTP", error.message);
    } finally {
      setLoading(false);
    }
  };

  // --- 3. PHONE AUTHENTICATION (VERIFY OTP) ---
  const handleVerifyOTP = async () => {
    if (!code) return Alert.alert("Error", "Please enter the verification code.");
    setLoading(true);
    try {
      await confirm.confirm(code);
      navigation.replace("Dashboard");
    } catch (error: any) {
      Alert.alert("Verification Failed", "Invalid OTP code.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#171717" }}>
      <Box className="flex-1 items-center justify-center p-4">
        <Card className="w-full max-w-[400px] p-6 bg-neutral-800 rounded-xl border border-neutral-700">
          <Text className="text-2xl font-bold text-white mb-6 text-center">
            amidFly Access
          </Text>

          {/* Dynamic UI: Show Phone Input OR OTP Input based on state */}
          {!confirm ? (
            <>
              {/* Step 1: Enter Phone Number */}
              <Box className="mb-6">
                <Text className="text-gray-400 text-sm mb-2">Phone Number</Text>
                <Input variant="outline" size="md" className="border-neutral-600">
                  <InputField 
                    placeholder="+1 234 567 8900" 
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    keyboardType="phone-pad"
                    className="text-white"
                  />
                </Input>
              </Box>

              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 w-full mb-6 rounded-lg"
                onPress={handleSendOTP}
                disabled={loading}
              >
                <ButtonText>{loading ? "Sending..." : "Send Verification Code"}</ButtonText>
              </Button>

              {/* Divider */}
              <Box className="flex-row items-center mb-6">
                <Box className="flex-1 h-[1px] bg-neutral-700" />
                <Text className="text-neutral-500 mx-4 text-xs font-bold uppercase">Or</Text>
                <Box className="flex-1 h-[1px] bg-neutral-700" />
              </Box>

              {/* Google Button */}
              <Button 
                size="lg" 
                variant="outline" 
                className="border-neutral-500 w-full rounded-lg bg-white"
                onPress={handleGoogleLogin}
                disabled={loading}
              >
                <ButtonText className="text-black font-semibold">Sign in with Google</ButtonText>
              </Button>
            </>
          ) : (
            <>
              {/* Step 2: Enter Verification Code */}
              <Box className="mb-6">
                <Text className="text-gray-400 text-sm mb-2">Enter OTP Code</Text>
                <Input variant="outline" size="md" className="border-neutral-600">
                  <InputField 
                    placeholder="123 456" 
                    value={code}
                    onChangeText={setCode}
                    keyboardType="number-pad"
                    className="text-white"
                  />
                </Input>
              </Box>

              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 w-full mb-3 rounded-lg"
                onPress={handleVerifyOTP}
                disabled={loading}
              >
                <ButtonText>{loading ? "Verifying..." : "Verify & Login"}</ButtonText>
              </Button>

              <Button 
                size="lg" 
                variant="link" 
                onPress={() => setConfirm(null)} // Go back to phone input
                disabled={loading}
              >
                <ButtonText className="text-neutral-400">Change Phone Number</ButtonText>
              </Button>
            </>
          )}

        </Card>
      </Box>
    </SafeAreaView>
  );
}
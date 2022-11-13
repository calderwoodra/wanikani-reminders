import { getAuth, signInWithPhoneNumber } from "firebase/auth";
import { firebaseApp } from "/src/firebase/init";
import { useEffect } from "react";
import { useRouter } from "next/router";

export const firebaseAuth = getAuth(firebaseApp);
firebaseAuth.languageCode = "en";

export const signIn = phoneNumber => {
  phoneNumber = phoneNumber.replace(/[^0-9]/g, "");
  phoneNumber = "+1" + phoneNumber;
  return signInWithPhoneNumber(firebaseAuth, phoneNumber, window.recaptchaVerifier);
};

export const useEnforceSignIn = () => {
  const router = useRouter();
  useEffect(() => {
    if (!firebaseAuth.currentUser) {
      return router.push("/sign-in");
    }
  }, [firebaseAuth.currentUser]);
};

import { getAuth, signInWithPhoneNumber } from "firebase/auth";
import { firebaseApp } from "./init";

export const firebaseAuth = getAuth(firebaseApp);
firebaseAuth.languageCode = "en";

export const signIn = (phoneNumber) => {
  phoneNumber = phoneNumber.replace(/[^0-9]/g, "");
  phoneNumber = "+1" + phoneNumber;
  return signInWithPhoneNumber(
    firebaseAuth,
    phoneNumber,
    window.recaptchaVerifier
  );
};

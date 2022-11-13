import { getFirestore } from "firebase/firestore";
import { firebaseApp } from "/src/firebase/init";
import { collection } from "firebase/firestore";

export const firebaseDb = getFirestore(firebaseApp);
export const usersRef = collection(firebaseDb, "users");
export const remindersRef = collection(firebaseDb, "reminders");

import { ref, onValue } from "firebase/database";
import { firebaseDb } from "../firebase/db";

export function getReminders() {
  const starCountRef = ref(firebaseDb, "users/" + "reminders/" + postId + "/starCount");
  // return
}

export function createReminder() {}

import { usersRef } from "src/firebase/db";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { firebaseAuth } from "src/firebase/auth";

export async function getUser() {
  if (!firebaseAuth.currentUser) {
    return null;
  }

  const userDoc = doc(usersRef, firebaseAuth.currentUser.uid);
  const docSnapshot = await getDoc(userDoc);

  if (docSnapshot.exists()) {
    return docSnapshot.data();
  } else {
    await setDoc(userDoc, {
      api_token: "",
      threshold: 10,
    });
    const docSnapshot = await getDoc(userDoc);
    return docSnapshot.data();
  }
}

export async function updateUser(apiToken, threshold) {
  if (!firebaseAuth.currentUser) {
    return null;
  }

  const userDoc = doc(usersRef, firebaseAuth.currentUser.uid);
  await setDoc(
    userDoc,
    {
      api_token: apiToken,
      threshold: threshold,
    },
    { merge: true }
  );
  const docSnapshot = await getDoc(userDoc);
  return docSnapshot.data();
}

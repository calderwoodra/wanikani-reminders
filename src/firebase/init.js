import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBUIPSC68aqhALZS2N3Y_Hbcwmt2UkYuMk",
  authDomain: "wanikani-reminders-3f47c.firebaseapp.com",
  databaseURL: "https://wanikani-reminders-3f47c-default-rtdb.firebaseio.com",
  projectId: "wanikani-reminders-3f47c",
  storageBucket: "wanikani-reminders-3f47c.appspot.com",
  messagingSenderId: "269307484180",
  appId: "1:269307484180:web:e81e1d175e75d0b468ef01",
};

export const firebaseApp = initializeApp(firebaseConfig);

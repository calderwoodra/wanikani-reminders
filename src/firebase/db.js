import { getDatabase } from "firebase/database";
import { firebaseApp } from "./init";

export const firebaseDb = getDatabase(firebaseApp);

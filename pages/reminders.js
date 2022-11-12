import { useEffect } from "react";
import { firebaseAuth } from "../src/firebase/auth";
import {useRouter} from "next/router";

const RemindersPage = () => {
  const router = useRouter();

  useEffect(() => {
    if (!firebaseAuth.currentUser) {
      router.push("/sign-in");
    }
  }, [firebaseAuth.currentUser]);

  return <div>Hello, world!</div>;
};

export default RemindersPage;

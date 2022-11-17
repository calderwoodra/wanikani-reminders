import { Section } from "/src/components/Section";
import { Card } from "/src/components/Card";
import { Text, TextStyle } from "/src/components/text/Text";
import { Input } from "/src/components/forms/input";
import Button from "/src/components/buttons/Button";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { RecaptchaVerifier } from "firebase/auth";
import { firebaseAuth, signIn } from "/src/firebase/auth";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";

function isValidPhoneNumber(phoneNumber) {
  return phoneNumber.replace(/[^0-9]/g, "").length === 10;
}

export default function SignUpPage() {
  const router = useRouter();

  const [phone, setPhone] = useState("");
  const [showCode, setShowCode] = useState(null);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const user = useUser();
  const supabaseClient = useSupabaseClient();

  useEffect(() => {
    if (!user) return;
    router.push("/home");
  }, [user]);

  function onSignInClicked() {
    setError("");
    setLoading(true);

    let phoneNumber = phone.replace(/[^0-9]/g, "");
    phoneNumber = "+1" + phoneNumber;

    if (showCode) {
      supabaseClient.auth.verifyOtp({ phone: phoneNumber, token: code, type: "sms" })
        .then((data) => {
          if (!data.error) return;
          setError(data.error + "");
          setLoading(false);
        });
      return;
    }

    supabaseClient.auth.signInWithOtp({ phone: phoneNumber })
        .then(({ user, error }) => {
          if (error) {
            setError(error + "");
            return;
          }
          setShowCode(true)
        })
        .finally(() => setLoading(false));
  }

  function isDisabled() {
    if (!isValidPhoneNumber(phone)) {
      return true;
    }
    return !!(showCode && !code && code.length === 6);
  }

  return (
    <Section outerClassName={"bg-blue-200 h-screen"} innerClassName={"px-4"}>
      <div className={"flex flex-col h-screen justify-center items-center"}>
        <Card className={"max-w-lg"}>
          <div className={"flex flex-col justify-center items-center"}>
            <Text style={TextStyle.med_header}>Login to account</Text>
            <Text style={TextStyle.paragraph}>Enter your phone number to login or create a new account.</Text>
            <Input
              label={"Phone number"}
              outerClassName={"mt-4"}
              placeholder={"800-111-2222"}
              onChange={setPhone}
              value={phone}
              autoComplete={"phone"}
              error={!!showCode ? "" : error}
            />
            {!!showCode && (
              <Input
                value={code}
                onChange={setCode}
                label={"Confirmation code"}
                outerClassName={"mt-4"}
                placeholder={"********"}
                autoComplete={"one-time-code"}
                error={error}
              />
            )}
            <Button
              className={"mt-4"}
              disabled={isDisabled()}
              text={"Sign in"}
              loading={loading}
              onClick={onSignInClicked}
            />
          </div>
        </Card>
      </div>
    </Section>
  );
}

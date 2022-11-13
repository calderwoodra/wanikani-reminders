import { Section } from "/src/components/Section";
import { Card } from "src/components/Card";
import { Text, TextStyle } from "src/components/text/Text";
import { Input } from "src/components/forms/input";
import Button from "src/components/buttons/Button";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { RecaptchaVerifier } from "firebase/auth";
import { firebaseAuth, signIn } from "src/firebase/auth";

function isValidPhoneNumber(phoneNumber) {
  return phoneNumber.replace(/[^0-9]/g, "").length === 10;
}

export default function SignUpPage() {
  const router = useRouter();

  const [phone, setPhone] = useState("");
  const [allowSignIn, setAllowSignIn] = useState(false);
  const [showCode, setShowCode] = useState(null);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!!firebaseAuth.currentUser) {
      router.push("/reminders");
    }
  }, [firebaseAuth.currentUser]);

  function onSignInClicked() {
    setError("");
    setLoading(true);

    if (showCode) {
      showCode
          .confirm(code)
          .then(result => {
            const user = result.user;
            alert("Signed in as " + user.phoneNumber);
          })
          .catch(error => {
            setError("Failed to sign-in");
          })
          .finally(() => {
            setLoading(false);
          });
      return;
    }
    signIn(phone)
        .then(confirmationResult => {
          setShowCode(confirmationResult);
        })
        .catch(error => {
          setError("Failed to find account");
          window.recaptchaVerifier.render().then(function (widgetId) {
            grecaptcha.reset(widgetId);
            setAllowSignIn(false);
          });
        })
        .finally(() => {
          setLoading(false);
        });
  }

  useEffect(() => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
          "recaptcha-container",
          {
            size: "normal",
            callback: response => {
              setAllowSignIn(true);
            },
          },
          firebaseAuth
      );
      window.recaptchaVerifier.render().then(widgetId => {
        window.recaptchaWidgetId = widgetId;
      });
    }
  }, []);

  useEffect(() => {
    if (showCode && !!window.recaptchaVerifier) {
      window.recaptchaVerifier.clear();
    }
  }, [showCode]);

  function isDisabled() {
    if (!allowSignIn && !showCode) {
      return true;
    }

    if (!isValidPhoneNumber(phone)) {
      return true;
    }

    if (showCode && !code && code.length === 6) {
      return true;
    }

    return false;
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
              <div className={"mt-4"}>
                <div id={"recaptcha-container"}/>
              </div>
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

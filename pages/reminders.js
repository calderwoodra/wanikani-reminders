import React, { useEffect, useState } from "react";
import { firebaseAuth } from "src/firebase/auth";
import { useRouter } from "next/router";
import { getUser, updateUser } from "src/functions/user";
import { Section } from "src/components/Section";
import { Card } from "src/components/Card";
import { Text, TextStyle } from "src/components/text/Text";
import { Input } from "src/components/forms/input";
import { TailSpin } from "react-loader-spinner";
import Button from "src/components/buttons/Button";

const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

const RemindersPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [apiToken, setApiToken] = useState(null);
  const [threshold, setThreshold] = useState(null);
  const [thresholdError, setThresholdError] = useState(null);
  const [apiTokenError, setApiTokenError] = useState(null);

  useEffect(() => {
    if (!firebaseAuth.currentUser) {
      router.push("/sign-in");
    }
  }, [firebaseAuth.currentUser]);
  useEffect(() => {
    if (!user) {
      getUser().then(user => {
        if (!user) return;

        setUser(user);
        setApiToken(user.api_token);
        setThreshold(user.threshold);
        setLoading(false);
      });
    }
  }, []);

  if (loading) {
    return (
      <Section outerClassName={"bg-blue-200 h-screen"} innerClassName={"px-4"}>
        <div className={"flex flex-col h-screen justify-center items-center"}>
          <Card className={"max-w-lg"}>
            <TailSpin radius={"2"} wrapperClass={"justify-center"} height={"20"} width={"20"} color={"#063970"} />
          </Card>
        </div>
      </Section>
    );
  }

  function onSaveClicked() {
    setThresholdError(null);
    setApiTokenError(null);
    if (threshold < 10) {
      setThresholdError("Threshold must be at least 10.");
      return;
    }

    if (!regexExp.test(apiToken)) {
      setApiTokenError("API Token invalid.");
      return;
    }

    setUser(null);
    setLoading(true);
    updateUser(apiToken, threshold)
      .then(setUser)
      .finally(() => setLoading(false));
  }

  return (
    <Section outerClassName={"bg-blue-200 h-screen"} innerClassName={"px-4"}>
      <div className={"flex flex-col h-screen justify-center items-center"}>
        <Card className={"max-w-lg"}>
          <Text style={TextStyle.med_header}>Manage reminders</Text>
          <Text style={TextStyle.paragraph}>
            You can find your WaniKani Personal Access Token on your{" "}
            <a
              href={"https://www.wanikani.com/settings/personal_access_tokens"}
              target={"_blank"}
              className={"text-blue-600"}
            >
              in your account settings
            </a>
            .
          </Text>
          <Input
            label={"WaniKani API Token"}
            outerClassName={"mt-4"}
            placeholder={"13a64d4c-c93b-48b0-b34e-b7577b954c58"}
            onChange={setApiToken}
            value={apiToken}
            error={apiTokenError}
          />
          <Input
            label={"Queue Threshold"}
            outerClassName={"mt-4"}
            placeholder={"10"}
            onChange={setThreshold}
            value={threshold}
            error={thresholdError}
          />
          <div className={"w-full flex justify-end"}>
            <Button
              className={"mt-4"}
              disabled={user.threshold === threshold && user.api_token === apiToken}
              text={"Save"}
              onClick={onSaveClicked}
            />
          </div>
        </Card>
      </div>
    </Section>
  );
};

export default RemindersPage;

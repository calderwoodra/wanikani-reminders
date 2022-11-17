import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Section } from "/src/components/Section";
import { Card } from "/src/components/Card";
import { Text, TextStyle } from "/src/components/text/Text";
import { Input } from "/src/components/forms/input";
import { TailSpin } from "react-loader-spinner";
import Button from "/src/components/buttons/Button";

const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

const RemindersPage = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [apiToken, setApiToken] = useState("");
  const [threshold, setThreshold] = useState("");
  const [thresholdError, setThresholdError] = useState("");
  const [apiTokenError, setApiTokenError] = useState("");

  const user = useUser();
  const supabaseClient = useSupabaseClient();

  useEffect(() => {
    if (!user) {
      router.push("/log-in");
      return;
    }

    supabaseClient
      .from("users")
      .select("*")
      .eq("user_id", user.id)
      .single()
      .then(data => {
        // Check if the user doesn't exist yet
        if (data.status === 406) {
          return supabaseClient
            .from("users")
            .insert([{ user_id: user.id, api_token: null }])
            .then(_ => supabaseClient.from("users").select("*").eq("user_id", user.id).single());
        }
        return data;
      })
      .then(({ data, error, status }) => {
        // Check for other errors
        if (!!error && status >= 400) {
          setError(error.message);
          throw error;
        }
        console.log(data);
        return data;
      })
      .then(data => {
        setApiToken(data.api_token ?? "");
        setThreshold(data.threshold);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user]);

  if (!user || loading) {
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

    setLoading(true);
    supabaseClient
      .from("users")
      .update({ api_token: apiToken, threshold: threshold })
      .eq("user_id", user.id)
      .then(({ data, error, status }) => {
        if (!!error && status >= 400) {
          setError(error.message);
          throw error;
        }
        return data;
      })
      .finally(() => {
        setLoading(false);
      });
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
          <Text style={TextStyle.title} className={"text-end text-red-600"}>
            {error}
          </Text>
        </Card>
      </div>
    </Section>
  );
};

export default RemindersPage;

import { Card } from "/src/components/Card";
import { Section } from "/src/components/Section";
import React from "react";
import { Text, TextStyle } from "/src/components/text/Text";
import Button from "/src/components/buttons/Button";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  return (
    <Section outerClassName={"bg-blue-200 h-screen"} innerClassName={"px-4"}>
      <div className={"flex flex-col h-screen justify-center items-center"}>
        <Card className={"max-w-lg"}>
          <Text style={TextStyle.med_header}>WaniKani Reminders</Text>
          <Text style={TextStyle.body}>A simple app to remind you to do your WaniKani reviews.</Text>
          <div className={"w-full flex justify-end"}>
            <Button className={"mt-4"} text={"Log in"} onClick={() => router.push("/sign-in")} />
          </div>
        </Card>
      </div>
    </Section>
  );
}

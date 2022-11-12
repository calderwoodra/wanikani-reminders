import { Section } from "/src/components/Section";
import { Card } from "../src/components/Card";

export default function Home() {
  return (
    <Section outerClassName={"bg-blue-200 h-screen"}>
      <div className={"flex flex-col justify-center items-center"}>
        <Card className={"my-auto"}>Hello, world</Card>
      </div>
    </Section>
  );
}

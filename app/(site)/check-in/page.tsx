import type { Metadata } from "next";
import CheckInForm from "./CheckInForm";

export const metadata: Metadata = {
  title: "Weekly Check-In",
  description: "Take a moment to reflect on your week. How are you really going?",
  alternates: { canonical: "/check-in" },
};

export default function CheckInPage() {
  return <CheckInForm />;
}

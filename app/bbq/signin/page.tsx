import type { Metadata } from "next";
import Image from "next/image";
import SignInForm from "./SignInForm";

export const metadata: Metadata = {
  title: "Event Sign-In",
  description: "Sign in at the door of a Wandering Man event.",
  // Reached by scanning the QR at the door, not by search.
  robots: { index: false, follow: false },
};

export default function BbqSignInPage() {
  return (
    <main
      className="min-h-dvh flex flex-col items-center justify-center px-6 py-8"
      style={{ backgroundColor: "#111C16" }}
    >
      <div className="w-full max-w-sm flex flex-col items-center">
        <div
          className="rounded-full overflow-hidden shrink-0 flex items-center justify-center"
          style={{ width: 72, height: 72, background: "#192821" }}
        >
          <Image
            src="/twm-logo-green.png"
            alt="The Wandering Man"
            width={72}
            height={72}
            className="w-full h-full object-contain"
            priority
          />
        </div>

        <h1
          className="mt-5 text-center"
          style={{
            fontFamily: "var(--font-display), sans-serif",
            fontWeight: 700,
            fontSize: "34px",
            lineHeight: 1.1,
            color: "#F4F1EA",
          }}
        >
          Welcome in
        </h1>

        <SignInForm />
      </div>
    </main>
  );
}

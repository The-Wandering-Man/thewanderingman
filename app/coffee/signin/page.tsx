import type { Metadata } from "next";
import Image from "next/image";
import SignInForm from "../../bbq/signin/SignInForm";

export const metadata: Metadata = {
  title: "Coffee Catch-Up Sign-In",
  description: "Sign in at a Wandering Man coffee catch-up.",
  // Reached by scanning the QR at the door, not by search.
  robots: { index: false, follow: false },
};

export default function CoffeeSignInPage() {
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
          Coffee catch-up
        </h1>

        <SignInForm event="coffee" doneText="You're signed in. Grab a coffee and pull up a chair." />
      </div>
    </main>
  );
}

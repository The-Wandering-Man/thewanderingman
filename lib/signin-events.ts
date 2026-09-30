// Events that have a QR door sign-in. All rows live in the bbq_signins table,
// tagged by `event`.
export const SIGNIN_EVENTS = {
  bbq: { label: "Monthly BBQ", path: "/bbq/signin" },
  coffee: { label: "Coffee catch-up", path: "/coffee/signin" },
} as const;

export type SignInEvent = keyof typeof SIGNIN_EVENTS;

export function isSignInEvent(v: unknown): v is SignInEvent {
  return typeof v === "string" && v in SIGNIN_EVENTS;
}

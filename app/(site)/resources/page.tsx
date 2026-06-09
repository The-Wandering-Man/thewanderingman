import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mental Health Resources | The Wandering Man Geelong",
  description:
    "Crisis lines and mental health resources for men in Geelong and across Australia. If you need help, reach out now.",
  alternates: { canonical: "/resources" },
};

const crisisLines = [
  {
    name: "Lifeline",
    number: "13 11 14",
    tel: "131114",
    desc: "24/7 crisis support and suicide prevention",
  },
  {
    name: "MensLine Australia",
    number: "1300 789 978",
    tel: "1300789978",
    desc: "Telephone and online support, information and referral service for men",
  },
  {
    name: "Beyond Blue",
    number: "1300 22 46 36",
    tel: "1300224636",
    desc: "Support for anxiety, depression and suicide prevention",
  },
  {
    name: "Suicide Call Back Service",
    number: "1300 659 467",
    tel: "1300659467",
    desc: "24/7 counselling for people affected by suicide",
  },
  {
    name: "Headspace",
    number: "1800 650 890",
    tel: "1800650890",
    desc: "Mental health support for young people aged 12-25",
  },
  {
    name: "QLife",
    number: "1800 184 527",
    tel: "1800184527",
    desc: "Anonymous LGBTQ+ peer support and referral - 3pm to midnight daily",
  },
];

export default function ResourcesPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <p
        className="text-xs font-bold uppercase tracking-widest mb-4"
        style={{ color: "#39E75F" }}
      >
        Get Help
      </p>
      <h1 className="text-4xl font-extrabold mb-4" style={{ color: "#0D0D0D" }}>
        Mental Health Resources
      </h1>
      <p className="text-base mb-12" style={{ color: "#6B6B6B" }}>
        If you or someone you know is struggling, please reach out. These services are free,
        confidential, and available right now.
      </p>

      <div className="flex flex-col gap-6">
        {crisisLines.map((line) => (
          <div
            key={line.tel}
            className="p-6 rounded-2xl border"
            style={{ borderColor: "#E2E0DC" }}
          >
            <h2 className="text-lg font-bold mb-1" style={{ color: "#0D0D0D" }}>
              {line.name}
            </h2>
            <p className="text-sm mb-3" style={{ color: "#6B6B6B" }}>
              {line.desc}
            </p>
            <a
              href={`tel:${line.tel}`}
              className="text-2xl font-extrabold"
              style={{ color: "#39E75F" }}
            >
              {line.number}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

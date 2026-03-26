"use client";

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "GramTap",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "iOS",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD"
  },
  description:
    "GramTap is a free browser-based iPhone weighing scale that uses 3D Touch force sensing via Safari to measure the weight of small objects up to 385 grams.",
  url: "https://gramtap.app",
  browserRequirements:
    "Requires Safari on iOS with 3D Touch (iPhone 6S–XS)",
  featureList: [
    "Measure weight up to 385g",
    "Tare/zero function",
    "Grams, ounces, kg unit toggle",
    "No app download required",
    "Works offline as PWA"
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to use your iPhone as a weighing scale with GramTap",
  description:
    "Use GramTap to turn your iPhone into a digital scale using 3D Touch in Safari.",
  totalTime: "PT1M",
  tool: [
    {
      "@type": "HowToTool",
      name: "iPhone with 3D Touch (6S, 7, 8, X, or XS)"
    },
    { "@type": "HowToTool", name: "Safari browser" },
    { "@type": "HowToTool", name: "Metal spoon or coin" }
  ],
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open GramTap in Safari",
      text: "Go to gramtap.app in Safari on your iPhone. Do not use Chrome or Firefox."
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Place iPhone flat",
      text: "Lay your iPhone screen-up on a hard flat surface."
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Add a conductive bridge",
      text: "Place a metal spoon or coin flat on the screen to act as a conductor."
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Tare the spoon",
      text: "Tap the TARE button to zero out the spoon weight."
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Place your object and read",
      text: "Place the object on the spoon. Wait for Stabilized ✓ then read the weight."
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Which iPhones work with GramTap?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "GramTap works on iPhone 6S, 7, 8, X, and XS. These models have 3D Touch pressure-sensitive screens. iPhone 11 and later use Haptic Touch which cannot measure force."
      }
    },
    {
      "@type": "Question",
      name: "Does GramTap work in Chrome on iPhone?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. The touchforcechange API is only available in Safari on iOS. Chrome and Firefox on iPhone do not expose force touch data."
      }
    },
    {
      "@type": "Question",
      name: "How accurate is GramTap?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "GramTap is accurate to approximately ±5–10 grams for objects under 385g. Accuracy may vary based on screen protector thickness and surface type."
      }
    },
    {
      "@type": "Question",
      name: "Is GramTap free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. GramTap is completely free, requires no account, and no app download. It runs entirely in your browser."
      }
    },
    {
      "@type": "Question",
      name: "What is the maximum weight GramTap can measure?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "GramTap can measure up to approximately 385 grams. The exact maximum depends on your device's 3D Touch sensitivity, which you can calibrate in Settings."
      }
    }
  ]
};

export default function StructuredData() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareApplicationSchema)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(howToSchema)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema)
        }}
      />
    </>
  );
}

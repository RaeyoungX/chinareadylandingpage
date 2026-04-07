export const SITE_URL = "https://chinaready.org";
export const PREVIEW_PATH = "/preview";
export const WAITLIST_PATH = "/#waitlist";
export const DOWNLOAD_PATH = WAITLIST_PATH;

export const NAV_LINKS = [
  { label: "Features", href: "/#features" },
  { label: "Preview", href: "/#preview" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Guides", href: "/guides" },
  { label: "App Launch", href: WAITLIST_PATH },
];

export type Feature = {
  icon: string;
  title: string;
  description: string;
  urgent?: boolean;
};

export const FEATURES: Feature[] = [
  {
    icon: "FileText",
    title: "Documents & Visa",
    description:
      "Track visa requirements, passport validity, and essential documents you need before departure.",
    urgent: true,
  },
  {
    icon: "Globe",
    title: "VPN & Internet",
    description:
      "Set up VPN and eSIM before you leave. These apps can't be downloaded inside China.",
    urgent: true,
  },
  {
    icon: "Map",
    title: "Navigation",
    description:
      "Download offline maps and set up local navigation apps that work without Google Maps.",
  },
  {
    icon: "Train",
    title: "Transport",
    description:
      "Learn how to book trains, use metro systems, and get around Chinese cities with ease.",
  },
  {
    icon: "Shield",
    title: "Safety",
    description:
      "Emergency contacts, hospital locations, embassy info, and safety tips for your trip.",
  },
  {
    icon: "Building",
    title: "Accommodation",
    description:
      "Booking tips, hotel registration requirements, and what to know about staying in China.",
  },
  {
    icon: "CreditCard",
    title: "Payments",
    description:
      "Set up WeChat Pay and Alipay — essential for cashless payments across China.",
  },
  {
    icon: "MessageSquare",
    title: "Community",
    description:
      "Get traveler tips, city notes, and practical threads from real people. Browse by province and connect with fellow travelers.",
  },
  {
    icon: "BookOpen",
    title: "Rules & Entry Policy",
    description:
      "Visa-free country list, arrival restrictions, and what you can bring into China — all in one reference guide.",
  },
];

export type Step = {
  number: number;
  title: string;
  description: string;
  screenshotAlt: string;
};

export const STEPS: Step[] = [
  {
    number: 1,
    title: "Check Your Readiness Score",
    description:
      "See exactly how prepared you are with a personalized readiness percentage. The app tracks 14 key tasks across 7 categories so nothing gets missed.",
    screenshotAlt: "ChinaReady app dashboard showing 43% readiness score",
  },
  {
    number: 2,
    title: "Follow Step-by-Step Guides",
    description:
      "Each task comes with clear, visual instructions. From installing WeChat to setting up a VPN — we walk you through everything before you board.",
    screenshotAlt: "Step-by-step guide for setting up WeChat Pay",
  },
  {
    number: 3,
    title: "Know the Rules Before You Go",
    description:
      "Check visa-free country lists, arrival restrictions, and what you can bring into China. Fixed reference notes so you always have the latest entry policy at your fingertips.",
    screenshotAlt: "ChinaReady rules page showing visa-free countries",
  },
  {
    number: 4,
    title: "Connect with Fellow Travelers",
    description:
      "Browse traveler tips, city notes, and practical threads by province. Get real advice from people who've been there — from the best hotpot spots to navigating local transport.",
    screenshotAlt: "ChinaReady community page with traveler posts",
  },
  {
    number: 5,
    title: "Land Fully Prepared",
    description:
      "Complete all tasks, hit 100%, and land in China knowing you have everything sorted — documents, internet, payments, and navigation all ready to go.",
    screenshotAlt: "ChinaReady departure brief with all tasks completed",
  },
];

export const APP_STORE_URL = WAITLIST_PATH;
export const GOOGLE_PLAY_URL = WAITLIST_PATH;

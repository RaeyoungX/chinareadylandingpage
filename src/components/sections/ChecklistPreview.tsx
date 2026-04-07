"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Camera,
  Check,
  ChevronRight,
  ClipboardList,
  CreditCard,
  FileText,
  Languages,
  Map,
  MessageSquare,
  MoreHorizontal,
  Smartphone,
  TrainFront,
  UtensilsCrossed,
  Wifi,
  Wrench,
  Car,
} from "lucide-react";

type CategoryId = "Payments" | "Internet" | "Phone #" | "Rides" | "Rail" | "Maps";

type TutorialCallout = {
  type: "tip" | "warning" | "note";
  title?: string;
  body: string;
};

type TutorialVisual = {
  kind:
    | "app-install"
    | "wallet-card"
    | "esim-setup"
    | "sim-card"
    | "map-route"
    | "ride-booking"
    | "passport-docs"
    | "hotel-checkin"
    | "emergency-card";
  title?: string;
  accent?: string;
  pills?: string[];
};

type TutorialPhoneMockup = {
  title: string;
  accent?: string;
  chips?: string[];
  lines?: string[];
};

type TutorialScreenshot = {
  src: string;
  alt: string;
  layout?: "phone" | "wide";
  caption?: string;
};

type TutorialStep = {
  title: string;
  body: string;
  checklist?: string[];
  visual?: TutorialVisual;
  phoneMockup?: TutorialPhoneMockup;
  screenshots?: TutorialScreenshot[];
  callout?: TutorialCallout;
};

type TutorialSection = {
  title: string;
  description?: string;
  steps: TutorialStep[];
};

type ChecklistItem = {
  id: string;
  title: string;
  description: string;
  done: boolean;
  tutorial: {
    eyebrow: string;
    overview: string;
    steps: string[];
    note: string;
    heroBody?: string;
    badges?: string[];
    prep?: string[];
    sections?: TutorialSection[];
    notes?: TutorialCallout[];
    visual?: TutorialVisual;
  };
};

type ChecklistCategory = {
  id: CategoryId;
  label: string;
  title: string;
  subtitle: string;
  accent?: string;
  icon: React.ComponentType<{ className?: string }>;
  items: ChecklistItem[];
};

const tutorialOverrides: Partial<Record<string, ChecklistItem["tutorial"]>> = {
  alipay: {
    eyebrow: "Payments",
    overview:
      "Alipay is the fastest way to pay at restaurants, taxis, convenience stores, and tourist sites.",
    steps: [],
    note: "A second Visa or Mastercard gives you a cleaner fallback if one bank declines QR payments.",
    heroBody:
      "Set it up before you fly so your first payment in China is not also your first attempt to add a foreign card.",
    badges: ["Visa", "Mastercard", "Passport check"],
    prep: [
      "Use the passport name that matches your card.",
      "Have a clear passport photo ready on your phone.",
    ],
    visual: {
      kind: "wallet-card",
      title: "Alipay ready",
      accent: "Bind your card",
      pills: ["International", "Bank Cards", "Add Card"],
    },
    sections: [
      {
        title: "Create the account and add a card",
        steps: [
          {
            title: "Sign up with your regular phone number",
            body: "Open Alipay, choose the international flow if prompted, and verify your phone with SMS.",
            checklist: [
              "Any stable international number is fine.",
              "Finish sign-up before you start adding payment methods.",
            ],
            screenshots: [
              {
                src: "/images/tutorials/alipay-download-new.png",
                alt: "Search and open Alipay in the App Store",
                layout: "phone",
                caption: "Download Alipay before departure while your normal app store still works.",
              },
              {
                src: "/images/tutorials/alipay-phone-new.png",
                alt: "Enter your phone number in the Alipay signup flow",
                layout: "phone",
                caption: "Use your regular phone number during signup.",
              },
              {
                src: "/images/tutorials/alipay-code-new.png",
                alt: "Enter the SMS verification code in Alipay",
                layout: "phone",
                caption: "Finish signup by entering the SMS verification code.",
              },
            ],
            visual: {
              kind: "wallet-card",
              title: "Account setup",
              accent: "Phone verification",
              pills: ["SMS", "Profile", "International"],
            },
          },
          {
            title: "Go to Me -> Bank Cards -> Add Card",
            body: "Add your Visa or Mastercard inside the wallet area instead of waiting until checkout.",
            checklist: [
              "Enter card number, expiry date, and billing name exactly.",
              "Complete passport identity verification if requested.",
            ],
            screenshots: [
              {
                src: "/images/tutorials/alipay-step2-me.png",
                alt: "Open the Me tab in Alipay",
                layout: "phone",
                caption: "Start from the Me tab at the bottom right.",
              },
              {
                src: "/images/tutorials/alipay-step2-settings.png",
                alt: "Open settings in Alipay",
                layout: "phone",
                caption: "Tap the settings icon in the top right corner.",
              },
              {
                src: "/images/tutorials/alipay-step2-account.png",
                alt: "Open account and security in Alipay settings",
                layout: "phone",
                caption: "Open Account and Security from the settings list.",
              },
              {
                src: "/images/tutorials/alipay-step2-identity.png",
                alt: "Open identity information in Alipay account and security",
                layout: "phone",
                caption: "Find Identity Information and start verification.",
              },
              {
                src: "/images/tutorials/alipay-step2-bankcards.png",
                alt: "Open bank cards in Alipay",
                layout: "phone",
                caption: "Return to Me and open Bank Cards.",
              },
              {
                src: "/images/tutorials/alipay-step2-addcard.png",
                alt: "Add a bank card in Alipay",
                layout: "phone",
                caption: "Enter your card number to add your international card.",
              },
            ],
            visual: {
              kind: "wallet-card",
              title: "Add card",
              accent: "Wallet",
              pills: ["Me", "Bank Cards", "Add Card"],
            },
          },
          {
            title: "Make one small test payment",
            body: "A tiny transaction is enough to confirm the card is accepted before you depend on it in China.",
            checklist: [
              "Check that the card appears as active in wallet settings.",
              "Keep cash or a second card as backup for the first few days.",
            ],
            callout: {
              type: "tip",
              title: "Have a backup card",
              body: "Issuer rules vary. A second Visa or Mastercard gives you a cleaner fallback if one bank declines QR payments.",
            },
            visual: {
              kind: "wallet-card",
              title: "Test payment",
              accent: "QR success",
              pills: ["Scan", "Pay", "Receipt"],
            },
          },
        ],
      },
    ],
  },
  "wechat-pay": {
    eyebrow: "Messaging and payment",
    overview:
      "WeChat becomes your messaging app, payment wallet, and mini-program hub once you are in China.",
    steps: [],
    note: "A saved hotel contact on WeChat makes late check-in communication much easier if your train or flight is delayed.",
    badges: ["Chat", "Wallet", "Mini Programs"],
    visual: {
      kind: "wallet-card",
      title: "WeChat setup",
      accent: "Messages + Pay",
      pills: ["Sign up", "Services", "Cards"],
    },
    sections: [
      {
        title: "Set up the core account first",
        steps: [
          {
            title: "Register and finish security checks",
            body: "Use a phone number you can still access during the trip, because WeChat may ask for SMS verification later.",
            checklist: [
              "Set a secure password.",
              "Save your recovery options while you have stable internet.",
            ],
            screenshots: [
              {
                src: "/images/tutorials/wechat-search.png",
                alt: "Search for WeChat in the App Store",
                layout: "wide",
                caption: "Download WeChat before departure.",
              },
              {
                src: "/images/tutorials/wechat-signup.png",
                alt: "WeChat signup and registration verification flow",
                layout: "wide",
                caption: "Registration may include phone signup and a QR code verification step.",
              },
            ],
            visual: {
              kind: "app-install",
              title: "WeChat account",
              accent: "Phone registration",
              pills: ["SMS", "Password", "Profile"],
            },
          },
          {
            title: "Add your card in Me -> Services -> Wallet -> Cards",
            body: "Payment setup is easier when you do it at home instead of standing at a counter trying to scan a code for the first time.",
            checklist: [
              "Use the same passport identity as your flight documents.",
              "Double-check the card was saved inside Wallet.",
            ],
            screenshots: [
              {
                src: "/images/tutorials/wechat-pay-enable.png",
                alt: "Enable Weixin Pay in WeChat settings tools",
                layout: "wide",
                caption: "Enable Weixin Pay inside Tools if the payment entry is not visible yet.",
              },
              {
                src: "/images/tutorials/wechat-add-card.png",
                alt: "Add a bank card in WeChat wallet",
                layout: "wide",
                caption: "Then open Pay and Services, go to Wallet, and add your bank card.",
              },
            ],
            visual: {
              kind: "wallet-card",
              title: "WeChat Pay",
              accent: "Add card",
              pills: ["Wallet", "Cards", "Passport"],
            },
          },
          {
            title: "Try one practical feature before arrival",
            body: "Open built-in translation, save a hotel contact, and make sure you understand where mini programs appear in the interface.",
            screenshots: [
              {
                src: "/images/tutorials/wechat-pay-methods.png",
                alt: "WeChat payment methods for scan to pay and present payment code",
                layout: "wide",
                caption: "Practice the two main payment flows before arrival: scan their QR or present your payment code.",
              },
            ],
            callout: {
              type: "tip",
              body: "A saved hotel contact on WeChat makes late check-in communication much easier if your train or flight is delayed.",
            },
            visual: {
              kind: "wallet-card",
              title: "Useful tools",
              accent: "Translate",
              pills: ["Mini Programs", "Contacts"],
            },
          },
        ],
      },
    ],
  },
  balance: {
    eyebrow: "Payments without a card",
    overview:
      "Foreign-card-linked QR payments work at many places, but tiny personal merchants often still need RMB balance or cash.",
    steps: [],
    note: "Split a small amount of RMB between your wallet and bag. The goal is a quick backup, not carrying a lot of money.",
    badges: ["Cash", "ATM", "Top-up"],
    visual: {
      kind: "wallet-card",
      title: "Fallback plan",
      accent: "Cash first",
      pills: ["ATM", "Small bills", "Top-up"],
    },
    sections: [
      {
        title: "Prepare your fallback options",
        steps: [
          {
            title: "Ask a Chinese friend to transfer a small RMB balance",
            body: "The simplest fix is getting a small amount of RMB directly into your WeChat Pay balance or Alipay balance before you need it.",
            checklist: [
              "¥200 to ¥300 is enough to start.",
              "Use app balance for small vendors and market stalls.",
            ],
            visual: {
              kind: "wallet-card",
              title: "Friend transfer",
              accent: "RMB balance",
              pills: ["WeChat Pay", "Alipay", "¥200–¥300"],
            },
          },
          {
            title: "Keep a small amount of cash",
            body: "Some situations are still easier with notes, especially for outdoor vendors or very small purchases.",
            checklist: [
              "Keep ¥200 to ¥500 in small and medium bills.",
              "Use Bank of China or ICBC ATMs if you need more after arrival.",
            ],
            callout: {
              type: "tip",
              body: "This is not a bug. Small merchants often are not set up for foreign-card-linked QR payments.",
            },
            visual: {
              kind: "wallet-card",
              title: "Cash backup",
              accent: "Small bills",
              pills: ["¥20s", "¥50s", "ATM nearby"],
            },
          },
        ],
      },
    ],
  },
  vpn: {
    eyebrow: "Before departure",
    overview:
      "China blocks most Western app stores and services. Install one primary VPN and keep one backup before you leave.",
    steps: [],
    note: "Open your VPN before the plane lands so you are connected as soon as local data starts working.",
    badges: ["Primary VPN", "Backup plan"],
    prep: [
      "Use the same Apple ID or Google account you will travel with.",
      "Keep your login email and password somewhere offline.",
    ],
    visual: {
      kind: "app-install",
      title: "VPN setup",
      accent: "Install and test",
      pills: ["App Store", "Account", "Backup file"],
    },
    sections: [
      {
        title: "Set up the app while stores are open",
        steps: [
          {
            title: "Download and sign in",
            body: "Install your VPN app now, sign in, and check that a paid plan is active before you board.",
            checklist: [
              "Download the app on every device you plan to use.",
              "Complete payment and confirm your subscription works.",
            ],
            phoneMockup: {
              title: "VPN setup",
              accent: "Before flight",
              chips: ["Install", "Sign in", "Subscription"],
              lines: ["Choose provider", "Account login", "Active plan confirmed"],
            },
            visual: {
              kind: "app-install",
              title: "VPN app",
              accent: "Download now",
              pills: ["iPhone", "Android", "Laptop"],
            },
          },
          {
            title: "Test a real blocked service",
            body: "Connect to Japan, Singapore, or the US and open Google, WhatsApp, or Instagram to make sure traffic is routing correctly.",
            checklist: [
              "Try at least one message app and one website.",
              "Save one fast server to favorites.",
            ],
            phoneMockup: {
              title: "Connection test",
              accent: "Server live",
              chips: ["Japan", "Singapore", "US"],
              lines: ["Google loads", "WhatsApp connects", "Favorite server saved"],
            },
            visual: {
              kind: "app-install",
              title: "Connection test",
              accent: "Try Google",
              pills: ["Japan", "Singapore", "US"],
            },
          },
          {
            title: "Keep a backup option",
            body: "If your main app is unstable, you want a fallback ready instead of searching for one after landing.",
            checklist: [
              "Download manual config files if your provider offers them.",
              "Keep your provider's support page bookmarked offline.",
            ],
            callout: {
              type: "warning",
              title: "Do not rely on free VPNs",
              body: "Free VPNs are frequently too slow or already blocked in China.",
            },
            visual: {
              kind: "app-install",
              title: "Backup access",
              accent: "Offline backup",
              pills: ["Config files", "Support page"],
            },
          },
        ],
      },
    ],
  },
  esim: {
    eyebrow: "Arrival-day internet",
    overview:
      "A roaming-style eSIM can sometimes keep your traffic outside the mainland network, making blocked apps usable the moment you land.",
    steps: [],
    note: "The smoothest setup is often one tested VPN plus one roaming-style eSIM for immediate data on arrival.",
    badges: ["Open internet", "Arrival backup"],
    prep: [
      "Treat this as a convenience layer, not your only anti-blocking plan.",
      "Still install and test a VPN before departure.",
    ],
    visual: {
      kind: "esim-setup",
      title: "Roaming eSIM",
      accent: "Install before flight",
      pills: ["QR code", "Roaming route", "Arrival data"],
    },
    sections: [
      {
        title: "Pick a plan that is useful on day one",
        steps: [
          {
            title: "Choose a provider with recent China reviews",
            body: "Look for very recent traveler feedback that explicitly says Google, WhatsApp, Gmail, or Instagram worked in mainland China with that exact plan.",
            checklist: [
              "Prefer comments from the last few weeks, not last year.",
              "Check whether users mention iPhone or Android setup steps.",
            ],
            visual: {
              kind: "esim-setup",
              title: "Provider check",
              accent: "Recent reviews",
              pills: ["China", "Recent", "Real users"],
            },
          },
          {
            title: "Install the eSIM before you leave",
            body: "Add the profile while you still have stable home internet and time to troubleshoot.",
            checklist: [
              "Save the QR code or install instructions offline.",
              "Label the line clearly so you can switch to it quickly after landing.",
            ],
            visual: {
              kind: "esim-setup",
              title: "Install profile",
              accent: "Before departure",
              pills: ["QR code", "Install", "Label line"],
            },
          },
          {
            title: "Use it as an arrival buffer, not as your only plan",
            body: "If blocked apps still fail, switch on your VPN instead of troubleshooting for too long.",
            checklist: [
              "Test Maps, WhatsApp, or Gmail after landing.",
              "Keep your VPN ready as backup.",
            ],
            callout: {
              type: "warning",
              title: "Do not assume every eSIM bypasses blocks",
              body: "Routing depends on the exact carrier and package, and can change by plan.",
            },
            visual: {
              kind: "esim-setup",
              title: "Arrival test",
              accent: "Maps + chat",
              pills: ["Google", "WhatsApp", "Backup VPN"],
            },
          },
        ],
      },
    ],
  },
  sim: {
    eyebrow: "Local number",
    overview:
      "Many China apps and services work better with a local +86 number. A data-only eSIM helps with internet, but it does not replace a real local number.",
    steps: [],
    note: "Test one local app registration before leaving the store so you know SMS verification works.",
    badges: ["Passport", "Face scan", "+86 number"],
    visual: {
      kind: "sim-card",
      title: "Local SIM",
      accent: "China Mobile / Unicom",
      pills: ["Passport", "Store", "Plan"],
    },
    sections: [
      {
        title: "Buy the SIM in person after one hardware check",
        steps: [
          {
            title: "Confirm your phone still supports a physical SIM card",
            body: "Some travelers now have eSIM-only phones, and those devices cannot use the standard airport SIM-card path.",
            checklist: [
              "Check whether your phone has a physical SIM tray.",
              "Do not treat a data-only eSIM as a replacement for a +86 number.",
            ],
            visual: {
              kind: "sim-card",
              title: "Hardware check",
              accent: "Physical tray",
              pills: ["SIM tray", "eSIM is different"],
            },
          },
          {
            title: "Bring your passport to the airport carrier counter",
            body: "Airport counters are usually the easiest first stop because staff handles setup on the spot.",
            checklist: [
              "Take your physical passport, not just a photo.",
              "Expect a face scan or identity photo at the desk.",
              "Ask for a plan with a local +86 number, not data only.",
            ],
            visual: {
              kind: "sim-card",
              title: "Counter visit",
              accent: "Airport setup",
              pills: ["Passport", "Face scan", "+86"],
            },
          },
        ],
      },
    ],
  },
  didi: {
    eyebrow: "Transport",
    overview:
      "Didi is the easiest backup when metro signage is confusing or you arrive late with luggage.",
    steps: [],
    note: "Keep a screenshot of your hotel name in Chinese so you can confirm the destination with the driver if needed.",
    badges: ["International number", "Hotel favorite"],
    visual: {
      kind: "ride-booking",
      title: "Didi ride",
      accent: "Pickup to hotel",
      pills: ["Pickup", "Drop-off", "Express"],
    },
    sections: [
      {
        title: "Set it up before you need the first ride",
        steps: [
          {
            title: "Sign up with the phone number you will keep active",
            body: "International numbers usually work, but it is better to confirm login before you are standing outside the airport.",
            checklist: ["Verify the SMS code.", "Switch the interface language if needed."],
            screenshots: [
              {
                src: "/images/tutorials/didi-search.png",
                alt: "Search for Didi China in the App Store",
                layout: "phone",
                caption: "Download Didi before you travel.",
              },
              {
                src: "/images/tutorials/didi-signup.png",
                alt: "Didi signup and account screen",
                layout: "wide",
                caption: "Use the number you will keep active during the trip.",
              },
            ],
            visual: {
              kind: "ride-booking",
              title: "Account setup",
              accent: "SMS login",
              pills: ["Phone", "Code", "English"],
            },
          },
          {
            title: "Link a payment method through Alipay or WeChat Pay",
            body: "Didi is smoother once payment is already connected instead of asking for cash at the end of the trip.",
            checklist: [
              "Open payment settings before your first ride.",
              "Confirm Alipay or WeChat Pay is linked successfully.",
            ],
            screenshots: [
              {
                src: "/images/tutorials/didi-wallet.png",
                alt: "Didi wallet and payment methods screen",
                layout: "wide",
                caption: "Open Account, then Wallet, then Payment Methods before your first ride.",
              },
            ],
            visual: {
              kind: "ride-booking",
              title: "Payment link",
              accent: "Cashless rides",
              pills: ["Alipay", "WeChat"],
            },
          },
          {
            title: "Save your hotel as a favorite destination",
            body: "That lets you recover quickly after dinner, nightlife, or a late train when typing is the last thing you want to do.",
            screenshots: [
              {
                src: "/images/tutorials/didi-destination.png",
                alt: "Didi destination search for a hotel",
                layout: "wide",
                caption: "Search your hotel in advance and make sure the right city and address appear.",
              },
              {
                src: "/images/tutorials/didi-ride-types.png",
                alt: "Didi route options and ride type selection",
                layout: "wide",
                caption: "Check route options and compare ride types before you confirm.",
              },
            ],
            callout: {
              type: "tip",
              body: "Keep a screenshot of your hotel name in Chinese so you can confirm the destination with the driver if needed.",
            },
            visual: {
              kind: "ride-booking",
              title: "Saved hotel",
              accent: "One-tap return",
              pills: ["Favorite", "Chinese address"],
            },
          },
        ],
      },
    ],
  },
  train: {
    eyebrow: "Rail",
    overview:
      "If your trip includes another city after arrival, booking the train ahead on Trip.com removes a lot of same-day friction.",
    steps: [],
    note: "Trip.com is often the easiest foreign-traveler booking path, but 12306 is a useful backup for cross-checking availability.",
    badges: ["Trip.com", "Passport name", "Destination city"],
    visual: {
      kind: "app-install",
      title: "Train booking",
      accent: "Trip.com",
      pills: ["City to city", "Train No.", "Passport"],
    },
    sections: [
      {
        title: "Book the intercity leg before the transfer day",
        steps: [
          {
            title: "Search the exact route to your destination city",
            body: "Use the city names you will actually travel between, and double-check departure and arrival station names.",
            checklist: [
              "Search departure city and final destination city.",
              "Double-check station names.",
            ],
            screenshots: [
              {
                src: "/images/tutorials/trip-step1-trains.jpg",
                alt: "Open the Trains section in Trip.com",
                layout: "phone",
                caption: "Open Trip.com and go to the Trains section.",
              },
              {
                src: "/images/tutorials/trip-step1-search.png",
                alt: "Search train route in Trip.com",
                layout: "phone",
                caption: "Enter your departure city, destination, and date.",
              },
              {
                src: "/images/tutorials/trip-step1-passenger.png",
                alt: "Enter passenger info in Trip.com",
                layout: "phone",
                caption: "Add passenger details before continuing to payment.",
              },
            ],
            visual: {
              kind: "app-install",
              title: "Route search",
              accent: "Departure to destination",
              pills: ["Date", "City", "Station"],
            },
          },
          {
            title: "Book on Trip.com with passport details exactly matched",
            body: "China rail bookings are sensitive to passport-name mismatches, so enter your details exactly as shown on the document.",
            checklist: [
              "Use the same passport name spelling as your travel document.",
              "Save the booking confirmation and train number after payment.",
            ],
            screenshots: [
              {
                src: "/images/tutorials/trip-step2-passport.png",
                alt: "Enter passenger passport details in Trip.com",
                layout: "phone",
                caption: "Enter passenger details exactly as shown on the passport.",
              },
            ],
            visual: {
              kind: "passport-docs",
              title: "Passenger details",
              accent: "Passport match",
              pills: ["Passport", "Name", "Booking"],
            },
          },
          {
            title: "Keep the trip easy to retrieve on travel day",
            body: "Screenshot the booking, note the train number, and leave enough time for ID checks and security at the station.",
            checklist: [
              "Screenshot the Trip.com booking confirmation.",
              "Arrive early with your passport for station checks.",
            ],
            visual: {
              kind: "passport-docs",
              title: "Travel-day prep",
              accent: "Train number saved",
              pills: ["Screenshot", "Passport", "Early arrival"],
            },
          },
        ],
      },
    ],
  },
  amap: {
    eyebrow: "Navigation",
    overview:
      "Amap is more reliable than Google Maps for addresses, walking routes, subway exits, and local points of interest inside China.",
    steps: [],
    note: "Save your hotel both in English and in Chinese if the property provides the local-language address.",
    badges: ["Offline maps", "Hotel favorite"],
    visual: {
      kind: "map-route",
      title: "Amap",
      accent: "Offline route",
      pills: ["City map", "Favorite", "Metro"],
    },
    sections: [
      {
        title: "Prepare the app before you need it",
        steps: [
          {
            title: "Install the app and switch language if available",
            body: "Even partial English support is enough once your saved places and recent routes are set up ahead of time.",
            checklist: [
              "Open the app once before departure.",
              "Check whether your city names appear correctly in search.",
            ],
            visual: {
              kind: "map-route",
              title: "Language setup",
              accent: "Search cities",
              pills: ["English", "Shanghai", "Chengdu"],
            },
          },
          {
            title: "Download the city map offline",
            body: "Offline data is useful the moment airport Wi-Fi is weak or your SIM is not active yet.",
            checklist: [
              "Download maps for every city on your itinerary.",
              "Keep your hotel pinned before departure.",
            ],
            visual: {
              kind: "map-route",
              title: "Offline map",
              accent: "Download",
              pills: ["City pack", "Saved hotel"],
            },
          },
          {
            title: "Save a few critical destinations",
            body: "The airport, hotel, main station, and one hospital are the best first places to store.",
            callout: {
              type: "tip",
              body: "Save the hotel both in English and in Chinese if the property provides the local-language address.",
            },
            visual: {
              kind: "map-route",
              title: "Favorites",
              accent: "Hotel + airport",
              pills: ["Airport", "Hotel", "Station"],
            },
          },
        ],
      },
    ],
  },
};

const initialCategories: ChecklistCategory[] = [
  {
    id: "Payments",
    label: "Payments",
    title: "Set up your cashless stack before boarding",
    subtitle: "Alipay and WeChat Pay are the first things most travelers need working.",
    accent: "High Priority",
    icon: CreditCard,
    items: [
      {
        id: "alipay",
        title: "Download Alipay and bind your card",
        description: "Accepted almost everywhere in China. Add your Visa or Mastercard before departure.",
        done: true,
        tutorial: {
          eyebrow: "Payments",
          overview:
            "Alipay is accepted almost everywhere in China. The key setup is downloading it early, adding your international card, and completing identity verification before you fly.",
          steps: [
            "Download Alipay from the App Store or Google Play before departure.",
            "Choose the international signup flow and verify your phone number.",
            "Open Me, then Bank Cards, and add your Visa or Mastercard.",
            "Complete passport-based identity verification and make a small test payment.",
          ],
          note: "Foreign cards work for most merchants, but some very small sellers still require RMB balance.",
        },
      },
      {
        id: "wechat-pay",
        title: "Set up WeChat and WeChat Pay",
        description: "Messaging, payments, mini-programs, and merchant QR codes all live here.",
        done: false,
        tutorial: {
          eyebrow: "Payments",
          overview:
            "WeChat is not just chat. It is also a payment wallet, service hub, and the place many merchants expect you to already have ready.",
          steps: [
            "Download WeChat and create your account with your existing phone number.",
            "Finish the security verification prompts before travel day.",
            "Go to Me, Services, Wallet, then Cards to bind your international card.",
            "Verify identity with your passport so WeChat Pay is usable on arrival.",
          ],
          note: "Hotel staff, drivers, and small businesses may prefer coordinating with you over WeChat instead of SMS.",
        },
      },
      {
        id: "balance",
        title: "Prepare a small RMB balance backup",
        description: "Small vendors may only accept direct RMB balance, not a foreign card binding.",
        done: false,
        tutorial: {
          eyebrow: "Payments",
          overview:
            "A foreign card binding solves most payment situations, but tiny vendors can still reject it. A small RMB app balance gives you a practical backup.",
          steps: [
            "Ask a Chinese friend or contact to transfer a small amount into your Alipay or WeChat balance.",
            "Keep roughly 200 to 500 RMB available for small transactions.",
            "Use that balance for stalls, markets, and one-off QR payments that reject foreign cards.",
          ],
          note: "Cash still helps, but app balance is the closer equivalent to how locals actually pay.",
        },
      },
    ],
  },
  {
    id: "Internet",
    label: "VPN & Internet",
    title: "Lock in internet access before you land",
    subtitle: "VPNs and roaming-style eSIMs are easier to set up before entering China.",
    icon: Wifi,
    items: [
      {
        id: "vpn",
        title: "Install a VPN before departure",
        description: "VPN apps may be unavailable once you are already inside China.",
        done: true,
        tutorial: {
          eyebrow: "VPN & Internet",
          overview:
            "This is one of the few tasks that can fail completely if left too late. Install the VPN and confirm it works before you enter China.",
          steps: [
            "Download your VPN app before departure while your normal app store still works.",
            "Create your account and sign in on every device you plan to bring.",
            "Test a few server locations such as Japan, Singapore, or the US.",
            "Save manual backup configuration files if your provider offers them.",
          ],
          note: "A VPN is still the safest baseline even if you also buy an open-internet eSIM.",
        },
      },
      {
        id: "esim",
        title: "Buy an eSIM that can access the open internet",
        description: "Some plans route traffic outside mainland China, which helps on arrival day.",
        done: false,
        tutorial: {
          eyebrow: "VPN & Internet",
          overview:
            "Some travel eSIMs route traffic outside mainland China, which can make Google, WhatsApp, and Gmail usable as soon as your data starts working.",
          steps: [
            "Choose a provider with recent traveler reviews for China.",
            "Check that the plan mentions roaming or international routing behavior.",
            "Install the eSIM QR code before departure.",
            "Keep it as arrival-day connectivity, not your only backup plan.",
          ],
          note: "Routing can change by provider and plan, so do not treat this as a guaranteed VPN replacement.",
        },
      },
    ],
  },
  {
    id: "Phone #",
    label: "Phone #",
    title: "Decide whether you need a local +86 number",
    subtitle: "Some verification flows, hotel calls, and Wi-Fi logins work better with a Chinese SIM.",
    icon: Smartphone,
    items: [
      {
        id: "sim",
        title: "Get a physical SIM with a local +86 number",
        description: "Useful for app verification, delivery calls, and public Wi-Fi authentication.",
        done: false,
        tutorial: {
          eyebrow: "Phone Number",
          overview:
            "A local Chinese number solves problems that a data-only eSIM does not, especially app verification, hotel calls, and local service communication.",
          steps: [
            "Confirm your phone still supports a physical SIM card.",
            "Plan to buy the SIM from an airport or carrier store after arrival.",
            "Bring your passport because registration usually requires identity verification.",
            "Use the local number for app signups, calls, and public Wi-Fi flows.",
          ],
          note: "This matters more for longer stays than for a very short trip.",
        },
      },
    ],
  },
  {
    id: "Rides",
    label: "Rides",
    title: "Sort out ride-hailing before your first airport exit",
    subtitle: "Didi is the default option for getting around Chinese cities.",
    icon: Car,
    items: [
      {
        id: "didi",
        title: "Install Didi and link your payment method",
        description: "Switch to English and save your hotel address in Chinese before arrival.",
        done: false,
        tutorial: {
          eyebrow: "Rides",
          overview:
            "Didi is the default ride-hailing app in most Chinese cities. If it is ready before landing, your airport exit becomes much simpler.",
          steps: [
            "Download Didi before departure.",
            "Create your account with your phone number and switch the interface to English.",
            "Connect payment through Alipay or WeChat Pay.",
            "Save your hotel address in Chinese so you can book faster.",
          ],
          note: "Screenshoting your destination in Chinese is still useful in case the pickup gets messy.",
        },
      },
    ],
  },
  {
    id: "Rail",
    label: "Rail",
    title: "Book the train before the transfer day gets messy",
    subtitle: "Trip.com is usually the easiest English-language flow for intercity rail.",
    icon: TrainFront,
    items: [
      {
        id: "train",
        title: "Reserve your train to the next city on Trip.com",
        description: "Book with your passport details exactly as shown and save the confirmation offline.",
        done: false,
        tutorial: {
          eyebrow: "Rail",
          overview:
            "If you already know your next city, sorting rail ahead of time avoids handling station logistics when you are tired or offline.",
          steps: [
            "Search your route on Trip.com and compare train times early.",
            "Book with passport details exactly matching your travel document.",
            "Save the booking confirmation and train number offline.",
            "Keep your passport ready because stations often check ID before boarding.",
          ],
          note: "Trip.com is usually easier in English, but 12306 is the official backup if you need to double-check availability.",
        },
      },
    ],
  },
  {
    id: "Maps",
    label: "Maps",
    title: "Use local maps instead of relying on Google Maps",
    subtitle: "Amap is what locals use and works much better for navigation inside China.",
    icon: Map,
    items: [
      {
        id: "amap",
        title: "Download Amap and save offline city maps",
        description: "Google Maps can be inaccurate in China. Amap is the local standard.",
        done: true,
        tutorial: {
          eyebrow: "Maps",
          overview:
            "Amap is the local standard for navigation in China. It is more reliable than Google Maps for routing, pickup points, and local businesses.",
          steps: [
            "Download Amap before your trip.",
            "Switch the app to English if needed.",
            "Save your destination city offline before departure.",
            "Favorite your hotel and first key destinations in advance.",
          ],
          note: "Apple Maps can work decently, but Amap is usually what locals and drivers expect.",
        },
      },
    ],
  },
];

function getVisualMeta(kind: TutorialVisual["kind"]) {
  switch (kind) {
    case "wallet-card":
      return {
        icon: CreditCard,
        shell: "bg-[linear-gradient(135deg,#eff6ff_0%,#ffffff_100%)] ring-blue-100",
        accent: "bg-blue-50 text-blue-600",
      };
    case "esim-setup":
    case "sim-card":
      return {
        icon: Smartphone,
        shell: "bg-[linear-gradient(135deg,#eff6ff_0%,#ffffff_100%)] ring-sky-100",
        accent: "bg-sky-50 text-sky-600",
      };
    case "map-route":
      return {
        icon: Map,
        shell: "bg-[linear-gradient(135deg,#ecfeff_0%,#ffffff_100%)] ring-cyan-100",
        accent: "bg-cyan-50 text-cyan-700",
      };
    case "ride-booking":
      return {
        icon: Car,
        shell: "bg-[linear-gradient(135deg,#eef2ff_0%,#ffffff_100%)] ring-indigo-100",
        accent: "bg-indigo-50 text-indigo-600",
      };
    case "passport-docs":
    case "hotel-checkin":
    case "emergency-card":
      return {
        icon: FileText,
        shell: "bg-[linear-gradient(135deg,#f8fafc_0%,#ffffff_100%)] ring-slate-100",
        accent: "bg-slate-100 text-slate-700",
      };
    case "app-install":
    default:
      return {
        icon: FileText,
        shell: "bg-[linear-gradient(135deg,#f8fafc_0%,#ffffff_100%)] ring-slate-100",
        accent: "bg-slate-100 text-slate-700",
      };
  }
}

function TutorialVisualCard({ visual }: { visual: TutorialVisual }) {
  const { icon: Icon, shell, accent } = getVisualMeta(visual.kind);

  return (
    <div className={`rounded-[1.15rem] p-4 ring-1 ${shell}`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-slate-900">{visual.title || "Tutorial visual"}</p>
          {visual.accent ? (
            <p className="mt-1 text-xs font-medium text-slate-400">{visual.accent}</p>
          ) : null}
        </div>
        <div className={`flex h-10 w-10 items-center justify-center rounded-2xl ${accent}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
      {visual.pills?.length ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {visual.pills.map((pill) => (
            <span
              key={pill}
              className="rounded-full border border-white/80 bg-white px-3 py-1 text-[11px] font-medium text-slate-600 shadow-sm"
            >
              {pill}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function TutorialPhoneShell({ mockup }: { mockup: TutorialPhoneMockup }) {
  return (
    <div className="mx-auto max-w-[280px] rounded-[2rem] border border-slate-300 bg-slate-950 p-2 shadow-[0_18px_40px_rgba(15,23,42,0.18)]">
      <div className="mx-auto mb-2 h-1.5 w-16 rounded-full bg-slate-700" />
      <div className="overflow-hidden rounded-[1.45rem] bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)]">
        <div className="border-b border-slate-100 px-4 py-3">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                App Preview
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-900">{mockup.title}</p>
            </div>
            {mockup.accent ? (
              <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-semibold text-[#137fec] ring-1 ring-blue-100">
                {mockup.accent}
              </span>
            ) : null}
          </div>
        </div>

        <div className="space-y-3 px-4 py-4">
          {mockup.chips?.length ? (
            <div className="flex flex-wrap gap-2">
              {mockup.chips.map((chip) => (
                <span
                  key={chip}
                  className="rounded-full bg-slate-50 px-2.5 py-1 text-[11px] font-medium text-slate-500 ring-1 ring-slate-200"
                >
                  {chip}
                </span>
              ))}
            </div>
          ) : null}

          <div className="space-y-2">
            {(mockup.lines || []).map((line) => (
              <div
                key={line}
                className="rounded-[0.9rem] border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600"
              >
                {line}
              </div>
            ))}
          </div>

          <div className="rounded-[1rem] bg-[#137fec] px-3 py-2.5 text-center text-sm font-medium text-white">
            Continue
          </div>
        </div>
      </div>
    </div>
  );
}

function TutorialScreenshotsBlock({ screenshots }: { screenshots: TutorialScreenshot[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeShot = screenshots[activeIndex];

  return (
    <figure className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
          {screenshots.length > 1 ? `Step ${activeIndex + 1} of ${screenshots.length}` : "Step image"}
        </p>
        {screenshots.length > 1 ? (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() =>
                setActiveIndex((current) => (current === 0 ? screenshots.length - 1 : current - 1))
              }
              className="rounded-full border border-slate-200 bg-white p-2 text-slate-500 shadow-sm transition-colors hover:bg-slate-50"
              aria-label="Previous image"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() =>
                setActiveIndex((current) => (current === screenshots.length - 1 ? 0 : current + 1))
              }
              className="rounded-full border border-slate-200 bg-white p-2 text-slate-500 shadow-sm transition-colors hover:bg-slate-50"
              aria-label="Next image"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        ) : null}
      </div>

      {activeShot.layout === "wide" ? (
        <div>
          <div className="relative aspect-[16/9] w-full">
            <Image
              src={activeShot.src}
              alt={activeShot.alt}
              fill
              sizes="(max-width: 768px) 100vw, 720px"
              className="object-contain"
            />
          </div>
        </div>
      ) : (
        <div>
          <div className="relative mx-auto aspect-[9/19] max-w-[280px]">
            <Image
              src={activeShot.src}
              alt={activeShot.alt}
              fill
              sizes="280px"
              className="object-contain"
            />
          </div>
        </div>
      )}

      {screenshots.length > 1 ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {screenshots.map((shot, index) => (
            <button
              key={`${shot.src}-${index}`}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`h-2.5 rounded-full transition-all ${
                index === activeIndex ? "w-6 bg-slate-900" : "w-2.5 bg-slate-200"
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      ) : null}

      {activeShot.caption ? (
        <figcaption className="mt-3 px-1 text-center text-xs leading-relaxed text-slate-500">
          {activeShot.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

function countDone(items: ChecklistItem[]) {
  return items.filter((item) => item.done).length;
}

const visaFreeCountries: { name: string; days: number }[] = [
  { name: "France", days: 30 }, { name: "Germany", days: 30 }, { name: "Italy", days: 30 },
  { name: "Netherlands", days: 30 }, { name: "Spain", days: 30 }, { name: "Switzerland", days: 30 },
  { name: "Ireland", days: 30 }, { name: "Hungary", days: 30 }, { name: "Austria", days: 30 },
  { name: "Belgium", days: 30 }, { name: "Luxembourg", days: 30 }, { name: "Poland", days: 30 },
  { name: "Slovenia", days: 30 }, { name: "Portugal", days: 30 }, { name: "Greece", days: 30 },
  { name: "Cyprus", days: 30 }, { name: "Slovakia", days: 30 }, { name: "Norway", days: 30 },
  { name: "Finland", days: 30 }, { name: "Denmark", days: 30 }, { name: "Iceland", days: 30 },
  { name: "Andorra", days: 30 }, { name: "Monaco", days: 30 }, { name: "Liechtenstein", days: 30 },
  { name: "Bulgaria", days: 30 }, { name: "Romania", days: 30 }, { name: "Croatia", days: 30 },
  { name: "Montenegro", days: 30 }, { name: "North Macedonia", days: 30 }, { name: "Malta", days: 30 },
  { name: "Estonia", days: 30 }, { name: "Latvia", days: 30 }, { name: "Russia", days: 30 },
  { name: "Sweden", days: 30 }, { name: "United Kingdom", days: 30 }, { name: "Australia", days: 30 },
  { name: "New Zealand", days: 30 }, { name: "South Korea", days: 30 }, { name: "Japan", days: 30 },
  { name: "Brunei", days: 30 }, { name: "Saudi Arabia", days: 30 }, { name: "Oman", days: 30 },
  { name: "Kuwait", days: 30 }, { name: "Bahrain", days: 30 }, { name: "Brazil", days: 30 },
  { name: "Argentina", days: 30 }, { name: "Chile", days: 30 }, { name: "Peru", days: 30 },
  { name: "Uruguay", days: 30 }, { name: "Canada", days: 30 },
];

const customsRules = [
  { label: "Cash", value: "Declare if over USD 5,000 or equivalent" },
  { label: "Alcohol", value: "1.5L of spirits per adult, duty-free" },
  { label: "Tobacco", value: "400 cigarettes per adult, duty-free" },
  { label: "Electronics", value: "Personal-use quantities — no declaration needed" },
  { label: "Drones", value: "May require advance approval and declaration" },
  { label: "Medications", value: "Bring a prescription for controlled substances" },
  { label: "VPN apps", value: "Not a customs issue — restriction is on use, not possession" },
];

function RulesView() {
  return (
    <div className="divide-y divide-slate-100 bg-slate-50/50">

      {/* Visa-free countries */}
      <div className="px-5 py-6 sm:px-7">
        <div className="mb-5 flex items-center justify-between gap-3">
          <h3 className="text-sm font-semibold text-slate-900">Visa-free entry</h3>
          <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-600">
            {visaFreeCountries.length} countries
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {visaFreeCountries.map(({ name, days }) => (
            <span
              key={name}
              className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs text-slate-600"
            >
              {name}
              <span className="text-[10px] font-semibold text-slate-400">{days}D</span>
            </span>
          ))}
        </div>

        <p className="mt-4 text-[11px] text-slate-400">
          Source:{" "}
          <a
            href="https://ca.china-embassy.gov.cn/eng/zytz_0/202602/t20260217_11860807.htm"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-slate-600"
          >
            China Embassy notice · 2026-02-17
          </a>{" "}
          · Verify with your embassy before travel.
        </p>
      </div>

      {/* Arrival documents */}
      <div className="px-5 py-6 sm:px-7">
        <h3 className="mb-4 text-sm font-semibold text-slate-900">Arrival documents</h3>
        <div className="space-y-4">
          {[
            { label: "Arrival Card", desc: "Name, passport number, flight number, first accommodation address. Fill on the plane." },
            { label: "Customs Declaration", desc: "Required for all. Declare cash over USD 5,000 and restricted items." },
            { label: "Hotel address", desc: "Have a backup on paper or screenshot — officers may ask at the counter." },
          ].map((item) => (
            <div key={item.label} className="flex gap-3">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-300" />
              <div>
                <p className="text-xs font-semibold text-slate-700">{item.label}</p>
                <p className="mt-0.5 text-xs text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-4 text-[11px] text-amber-600">
          No confirmed address? Write your first hotel — you can change plans after entry.
        </p>
      </div>

      {/* Customs limits */}
      <div className="px-5 py-6 sm:px-7">
        <h3 className="mb-4 text-sm font-semibold text-slate-900">Customs limits</h3>
        <div className="space-y-2">
          {customsRules.map(({ label, value }) => (
            <div key={label} className="flex items-baseline gap-3">
              <span className="w-20 shrink-0 text-[11px] font-semibold text-slate-400">{label}</span>
              <span className="text-xs text-slate-600 leading-relaxed">{value}</span>
            </div>
          ))}
        </div>
        <p className="mt-4 text-[11px] text-slate-400">
          Source:{" "}
          <a
            href="http://english.customs.gov.cn/statics/88707c1e-aa4e-40ca-a968-bdbdbb565e4f.html"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-slate-600"
          >
            China Customs · Passenger Goods Regulations
          </a>
        </p>
      </div>

    </div>
  );
}

export default function ChecklistPreview() {
  const [activeTab, setActiveTab] = useState<"checklist" | "rules">("checklist");
  const [categories, setCategories] = useState(initialCategories);
  const [activeCategory, setActiveCategory] = useState<CategoryId>("Payments");
  const [detailItemId, setDetailItemId] = useState<string | null>(null);

  const totals = useMemo(() => {
    const allItems = categories.flatMap((category) => category.items);
    const done = countDone(allItems);
    const total = allItems.length;
    return {
      done,
      total,
      score: total > 0 ? Math.round((done / total) * 100) : 0,
    };
  }, [categories]);

  const activeCategoryData =
    categories.find((category) => category.id === activeCategory) ?? categories[0];

  const detailItem = detailItemId
    ? categories.flatMap((category) => category.items).find((item) => item.id === detailItemId) ?? null
    : null;
  const detailTutorial = detailItem
    ? {
        ...detailItem.tutorial,
        ...(tutorialOverrides[detailItem.id] || {}),
      }
    : null;

  const toggleItem = (categoryId: CategoryId, itemId: string) => {
    setCategories((current) =>
      current.map((category) =>
        category.id !== categoryId
          ? category
          : {
              ...category,
              items: category.items.map((item) =>
                item.id === itemId ? { ...item, done: !item.done } : item
              ),
            }
      )
    );
  };

  const openCategory = (categoryId: CategoryId) => {
    setActiveCategory(categoryId);
    setDetailItemId(null);
  };

  const activeTaskCount = countDone(activeCategoryData.items);
  const featureCards = [
    {
      label: "Menu Translator",
      title: "Understand what you are about to eat",
      preview: "Read ingredients fast",
      icon: UtensilsCrossed,
      iconClassName: "bg-rose-50 text-rose-500",
    },
    {
      label: "Traveler Community",
      title: "Learn from people already on the ground",
      preview: "Browse traveler tips",
      icon: MessageSquare,
      iconClassName: "bg-sky-50 text-sky-500",
    },
    {
      label: "Fix",
      title: "Troubleshoot the things that break after landing",
      preview: "Open offline fixes",
      icon: Wrench,
      iconClassName: "bg-blue-50 text-[#137fec]",
    },
  ] as const;
  const featureCardHeight = "min-h-[280px]";

  const renderFeatureBody = (featureIndex: number, compact = false) => {
    if (featureIndex === 0) {
      return (
        <div className="flex h-full flex-col">
          <div className="space-y-3">
            <p className={`leading-relaxed text-slate-500 ${compact ? "line-clamp-2 text-xs" : "line-clamp-2 text-sm"}`}>
              Open the camera and quickly check ingredients, allergens, and spice level.
            </p>

            <div className={`space-y-3 ${compact ? "" : ""}`}>
              <div className={`rounded-[1.2rem] bg-white ring-1 ring-slate-200/80 ${compact ? "p-2.5" : "p-3"}`}>
                <div className={`rounded-[1.1rem] border border-dashed border-slate-200 bg-transparent text-center ${compact ? "px-3 py-4" : "px-4 py-5"}`}>
                  <div className="mx-auto flex w-fit items-center justify-center text-slate-400">
                    <div className={`relative flex items-center justify-center rounded-[0.9rem] bg-white ring-1 ring-slate-200 ${compact ? "h-9 w-9" : "h-10 w-10"}`}>
                      <Camera className={compact ? "h-3.5 w-3.5" : "h-4 w-4"} />
                      <span className="absolute -right-1 -top-1 rounded-full bg-slate-300 text-white ring-2 ring-white ${compact ? 'h-3.5 w-3.5 text-[9px] leading-[14px]' : 'h-4 w-4 text-[10px] leading-4'}">
                        +
                      </span>
                    </div>
                  </div>
                  <p className={`mt-3 font-semibold text-slate-900 ${compact ? "text-xs" : "text-base"}`}>Add a menu photo</p>
                  <p className={`mx-auto mt-1.5 max-w-[14rem] leading-relaxed text-slate-400 ${compact ? "text-[10px]" : "text-xs"}`}>
                    Use one clear menu photo.
                    <br />
                    JPG, PNG, or WebP up to 6MB.
                  </p>
                </div>
                <div className={`mt-3 rounded-[0.95rem] bg-slate-200/80 text-center font-medium text-slate-400 ${compact ? "px-3 py-2 text-[11px]" : "px-4 py-2.5 text-xs"}`}>
                  Analyze menu
                </div>
              </div>

              <div className="mt-3 rounded-[1rem] bg-white px-3 py-3 ring-1 ring-slate-200">
                <div>
                  <p className={`font-semibold text-slate-900 ${compact ? "text-xs" : "text-sm"}`}>Example: Kung Pao Chicken</p>
                  <p className={`mt-1 text-slate-400 ${compact ? "text-[11px]" : "text-xs"}`}>Peanuts . Chili . Medium spice</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (featureIndex === 1) {
      return (
        <div className="flex h-full flex-col">
          <div className="space-y-3">
            <p className={`leading-relaxed text-slate-500 ${compact ? "line-clamp-2 text-xs" : "line-clamp-2 text-sm"}`}>
              Browse quick traveler posts across different cities.
            </p>

            <div className="space-y-3">
              <div className={`rounded-[1.4rem] bg-white shadow-sm ring-1 ring-slate-200 ${compact ? "p-3" : "p-4"}`}>
                <div className="flex gap-3">
                  <div className={`flex shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-[#137fec] ${compact ? "h-9 w-9 text-xs font-semibold" : "h-10 w-10 text-sm font-semibold"}`}>
                    I
                  </div>
                  <div className="min-w-0">
                    <div className={`flex flex-wrap items-center gap-x-2 gap-y-1 ${compact ? "text-[11px]" : "text-sm"}`}>
                      <span className="font-semibold text-slate-900">ind</span>
                      <span className="text-slate-300">·</span>
                      <span className="text-slate-400">United States</span>
                    </div>
                  </div>
                </div>
                <div className="mt-3">
                  <p className={`font-semibold text-slate-900 ${compact ? "text-sm" : "text-base"}`}>Where I would actually eat in Shanghai</p>
                  <p className={`mt-1.5 leading-relaxed text-slate-500 ${compact ? "line-clamp-2 text-[11px]" : "line-clamp-2 text-sm"}`}>
                    If you only have a few real meals in Shanghai, I would save Dahuchun shengjian for you first.
                  </p>
                </div>
              </div>

              <div className={`rounded-[1.4rem] bg-white shadow-sm ring-1 ring-slate-200 ${compact ? "p-3" : "p-4"}`}>
                <div className="flex gap-3">
                  <div className={`flex shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-emerald-500 ${compact ? "h-9 w-9 text-xs font-semibold" : "h-10 w-10 text-sm font-semibold"}`}>
                    M
                  </div>
                  <div className="min-w-0">
                    <div className={`flex flex-wrap items-center gap-x-2 gap-y-1 ${compact ? "text-[11px]" : "text-sm"}`}>
                      <span className="font-semibold text-slate-900">mia</span>
                      <span className="text-slate-300">·</span>
                      <span className="text-slate-400">Australia</span>
                    </div>
                  </div>
                </div>
                <div className="mt-3">
                  <p className={`font-semibold text-slate-900 ${compact ? "text-sm" : "text-base"}`}>eSIM that actually works</p>
                  <p className={`mt-1.5 leading-relaxed text-slate-500 ${compact ? "line-clamp-2 text-[11px]" : "line-clamp-2 text-sm"}`}>
                    Tested three options — only one had consistent 5G outside the city.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="flex h-full flex-col">
        <div className="space-y-3">
          <p className={`leading-relaxed text-slate-500 ${compact ? "line-clamp-2 text-xs" : "line-clamp-2 text-sm"}`}>
            Jump straight into the most common fixes after you land.
          </p>

          <div className="space-y-3">
            {[
              {
                title: "Payments not working",
                description: "Alipay, WeChat Pay, card decline, or immediate fallback.",
                icon: CreditCard,
              },
              {
                title: "No internet / app blocked",
                description: "eSIM, VPN, Wi-Fi, or a critical app that stopped loading.",
                icon: Wifi,
              },
            ].map((issue) => {
              const IssueIcon = issue.icon;

              return (
                <div
                  key={issue.title}
                  className={`rounded-[1.15rem] bg-white ring-1 ring-slate-200 ${compact ? "px-3 py-3" : "px-4 py-4"}`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`flex shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white text-[#137fec] ${compact ? "h-10 w-10" : "h-12 w-12"}`}>
                      <IssueIcon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className={`font-semibold text-slate-900 ${compact ? "text-sm" : "text-lg"}`}>
                        {issue.title}
                      </p>
                      <p className={`mt-2 text-slate-500 ${compact ? "line-clamp-2 text-[11px]" : "line-clamp-2 text-sm"}`}>
                        {issue.description}
                      </p>
                    </div>
                    <ChevronRight className="mt-1 h-5 w-5 shrink-0 text-slate-300" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="preview" className="min-h-[calc(100vh-4rem)] bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">Preview</p>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            See if you are ready for China
          </h1>
          <p className="mt-3 text-base text-slate-500 max-w-xl">
            Work through the checklist below — built from real traveler experience and kept up to date.
          </p>
        </div>

        <div className="overflow-hidden rounded-[2rem] border border-white/70 bg-white/75 shadow-[0_30px_100px_rgba(15,23,42,0.12)] backdrop-blur-xl">
          <div className="border-b border-slate-200/80 bg-[linear-gradient(180deg,#fbfbfd_0%,#f1f4f8_100%)] px-5 py-3">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                  <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                  <span className="h-3 w-3 rounded-full bg-[#28c840]" />
                </div>
                <span className="text-sm font-medium text-slate-400">chinaready</span>
              </div>

              <div className="flex flex-1 justify-center">
                <div className="flex w-full max-w-[420px] items-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-400 shadow-sm">
                  <Map className="h-4 w-4 text-slate-300" />
                  <span className="truncate">chinaready.app/preview</span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 text-slate-300">
                <Languages className="h-4 w-4" />
                <MoreHorizontal className="h-4 w-4" />
              </div>
            </div>
          </div>

          {/* Tab bar */}
          <div className="flex border-b border-slate-200/80 bg-white px-5">
            {([
              { id: "checklist", label: "Checklist", icon: ClipboardList },
              { id: "rules", label: "Rules & Entry", icon: BookOpen },
            ] as const).map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setActiveTab(tab.id);
                  setDetailItemId(null);
                }}
                className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? "border-slate-900 text-slate-900"
                    : "border-transparent text-slate-400 hover:text-slate-600"
                }`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === "rules" ? <RulesView /> : !detailItem ? (
            <div className="p-5 sm:p-7">
              <div className="rounded-[1.75rem] bg-white p-6 shadow-[0_20px_50px_rgba(15,23,42,0.08)] ring-1 ring-slate-200">
                <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
                  <div className="rounded-[1.3rem] border border-slate-200 bg-slate-50 p-5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                      Readiness
                    </p>
                    <div className="mt-4 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-[#137fec]">
                          <Check className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-xl font-semibold text-slate-900">Ready score</p>
                          <p className="text-sm text-slate-400">
                            {totals.done} of {totals.total} tasks complete
                          </p>
                        </div>
                      </div>
                      <span className="text-4xl font-medium tracking-tight text-[#ef7d00]">
                        {totals.score}%
                      </span>
                    </div>
                    <div className="mt-5 h-3 rounded-full bg-white ring-1 ring-slate-200">
                      <div
                        className="h-full rounded-full bg-[linear-gradient(90deg,#f59e0b_0%,#fb7185_100%)]"
                        style={{ width: `${totals.score}%` }}
                      />
                    </div>
                  </div>

                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                {categories.map((category) => {
                  const isActive = category.id === activeCategory;
                  const doneCount = countDone(category.items);

                  return (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() => openCategory(category.id)}
                      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors ${
                        isActive
                          ? "border-slate-900 bg-slate-900 text-white"
                          : "border-slate-200 bg-white text-slate-500"
                      }`}
                    >
                      <FileText className="h-4 w-4" />
                      {category.label}
                      <span className={isActive ? "text-white/65" : "text-slate-300"}>{doneCount}</span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 rounded-[1.75rem] border border-slate-200 bg-white shadow-sm">
                <div className="flex flex-col gap-4 border-b border-slate-200 px-5 py-5 sm:flex-row sm:items-start sm:justify-between sm:px-6">
                  <div>
                    <p className="text-2xl font-semibold text-slate-900">{activeCategoryData.label}</p>
                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-400">
                      {activeCategoryData.subtitle}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="rounded-full bg-slate-50 px-3 py-1.5 text-sm font-medium text-slate-500 ring-1 ring-slate-200">
                      {activeTaskCount}/{activeCategoryData.items.length} complete
                    </span>
                    {activeCategoryData.accent ? (
                      <span className="rounded-full bg-orange-50 px-3 py-1.5 text-xs font-semibold text-orange-600">
                        {activeCategoryData.accent}
                      </span>
                    ) : null}
                  </div>
                </div>

                <div className="space-y-4 p-5 sm:p-6">
                  {activeCategoryData.items.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setDetailItemId(item.id)}
                      className="w-full rounded-[1.25rem] border border-slate-200 bg-white p-5 text-left transition-colors hover:bg-slate-50"
                    >
                      <div className="flex items-start gap-4">
                        <button
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation();
                            toggleItem(activeCategoryData.id, item.id);
                          }}
                          aria-label={item.done ? "Mark incomplete" : "Mark complete"}
                          className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md border ${
                            item.done
                              ? "border-[#137fec] bg-[#137fec] text-white"
                              : "border-slate-300 bg-white text-transparent"
                          }`}
                        >
                          <Check className="h-4 w-4" />
                        </button>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-3">
                            <p
                              className={`text-lg font-medium leading-snug text-slate-900 ${
                                item.done ? "line-through opacity-60" : ""
                              }`}
                            >
                              {item.title}
                            </p>
                            <ChevronRight className="mt-1 h-5 w-5 shrink-0 text-slate-300" />
                          </div>
                          <p className="mt-3 text-sm leading-relaxed text-slate-400">
                            {item.description}
                          </p>
                          <p className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[#137fec]">
                            Open detail
                            <ArrowRight className="h-4 w-4" />
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-5 sm:p-7">
              <div className="rounded-[1.75rem] border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-100 px-5 py-5 sm:px-8">
                  <div className="flex items-start gap-4">
                    <button
                      type="button"
                      onClick={() => setDetailItemId(null)}
                      className="rounded-full bg-slate-50 p-3 text-slate-700 ring-1 ring-slate-200 transition-colors hover:bg-slate-100"
                      aria-label="Back to checklist"
                    >
                      <ArrowLeft className="h-5 w-5" />
                    </button>
                    <div className="max-w-3xl">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                        Tutorial
                      </p>
                      <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-4xl">
                        {detailItem.title}
                      </h2>
                      <p className="mt-4 text-base leading-relaxed text-slate-500">
                        {detailTutorial?.overview}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="px-5 py-8 sm:px-8">
                  <div className="mx-auto max-w-3xl space-y-10">
                    {detailTutorial?.prep?.length ? (
                      <section className="border-l-2 border-slate-200 pl-5">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                          Before You Start
                        </p>
                        <div className="mt-4 space-y-3">
                          {detailTutorial.prep.map((item) => (
                            <div key={item} className="flex items-start gap-3">
                              <div className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />
                              <p className="text-base leading-relaxed text-slate-600">{item}</p>
                            </div>
                          ))}
                        </div>
                      </section>
                    ) : null}

                    {(
                      (
                        detailTutorial?.sections?.length
                          ? detailTutorial.sections
                          : [
                              {
                                title: "Quick steps",
                                description: undefined,
                                steps: (detailTutorial?.steps || []).map<TutorialStep>((step, index) => ({
                                  title: `Step ${index + 1}`,
                                  body: step,
                                })),
                              },
                            ]
                      ) as TutorialSection[]
                    ).map((section) => (
                      <section key={section.title} className="space-y-6">
                        <div className="border-b border-slate-100 pb-4">
                          <p className="text-2xl font-semibold tracking-tight text-slate-900">
                            {section.title}
                          </p>
                          {"description" in section && section.description ? (
                            <p className="mt-3 text-base leading-relaxed text-slate-500">
                              {section.description}
                            </p>
                          ) : null}
                        </div>

                        <div className="space-y-10">
                          {section.steps.map((step, index) => (
                            <article key={`${section.title}-${step.title}`} className="space-y-5">
                              <div className="flex items-start gap-4">
                                <div className="pt-1 text-sm font-semibold text-slate-300">
                                  {String(index + 1).padStart(2, "0")}
                                </div>
                                <div className="min-w-0 flex-1 space-y-4">
                                  <div>
                                    <p className="text-xl font-semibold tracking-tight text-slate-900">
                                      {step.title}
                                    </p>
                                    <p className="mt-3 text-base leading-relaxed text-slate-600">
                                      {step.body}
                                    </p>
                                  </div>

                                  {step.checklist?.length ? (
                                    <div className="space-y-2.5">
                                      {step.checklist.map((item) => (
                                        <div key={item} className="flex items-start gap-3">
                                          <div className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#137fec]" />
                                          <p className="text-base leading-relaxed text-slate-600">
                                            {item}
                                          </p>
                                        </div>
                                      ))}
                                    </div>
                                  ) : null}

                                  {step.visual && !step.screenshots?.length ? (
                                    <div className="rounded-[1.2rem] border border-slate-200 bg-slate-50/70 p-4">
                                      <TutorialVisualCard visual={step.visual} />
                                    </div>
                                  ) : null}

                                  {step.screenshots?.length ? (
                                    <TutorialScreenshotsBlock screenshots={step.screenshots} />
                                  ) : null}

                                  {step.phoneMockup && !step.screenshots?.length ? (
                                    <TutorialPhoneShell mockup={step.phoneMockup} />
                                  ) : null}
                                </div>
                              </div>
                              {index !== section.steps.length - 1 ? (
                                <div className="border-b border-slate-100" />
                              ) : null}
                            </article>
                          ))}
                        </div>
                      </section>
                    ))}

                    {detailTutorial?.notes?.length ? (
                      <section className="space-y-3 border-t border-slate-100 pt-6">
                        {detailTutorial.notes.map((note) => (
                          <p
                            key={`${note.type}-${note.body}`}
                            className="text-base leading-relaxed text-slate-500"
                          >
                            {note.body}
                          </p>
                        ))}
                      </section>
                    ) : null}

                    <div className="border-t border-slate-100 pt-6">
                      <button
                        type="button"
                        onClick={() => setDetailItemId(null)}
                        className="inline-flex items-center gap-2 text-sm font-medium text-[#137fec]"
                      >
                        Back to {activeCategoryData.label}
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-10 space-y-5">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">
              More in the app
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-500">
              Menu translator, traveler community, and offline quick-fixes.{" "}
              <Link
                href="/#waitlist"
                className="font-medium text-[#137fec] transition-colors hover:text-[#0f6fd1]"
              >
                Join the waitlist.
              </Link>
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {featureCards.map((feature, index) => {
              const FeatureIcon = feature.icon;

              return (
                <section
                  key={feature.label}
                  className={`${featureCardHeight} rounded-[1.85rem] border border-white/90 bg-white p-5 shadow-[0_28px_70px_rgba(15,23,42,0.12)] backdrop-blur sm:p-6`}
                >
                  <div className="flex h-full flex-col overflow-hidden">
                    <div className="flex min-h-[72px] items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${feature.iconClassName}`}>
                          <FeatureIcon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-500">{feature.label}</p>
                        </div>
                      </div>
                      <div className="rounded-full bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-400 ring-1 ring-slate-200">
                        {index + 1}
                      </div>
                    </div>
                    <div className="mt-3 min-h-0 flex-1 overflow-hidden">
                      {renderFeatureBody(index)}
                    </div>
                  </div>
                </section>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}

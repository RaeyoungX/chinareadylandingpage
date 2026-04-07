export type Guide = {
  slug: string;
  title: string;
  description: string;
  category: "payments" | "internet" | "visa" | "essentials";
  readingTime: string;
  publishedAt: string; // ISO date
  coverImage?: string;
  related?: string[]; // slugs of related guides
  faqs?: { q: string; a: string }[];
};

export const guides: Guide[] = [
  {
    slug: "chinaready-app-guide",
    title: "ChinaReady App: Features and How It Works",
    description:
      "Personalised pre-departure checklist, readiness score, visa check, payments setup, VPN recommendations, offline emergency guides, and in-trip tools — everything ChinaReady does explained.",
    category: "essentials",
    readingTime: "5 min",
    publishedAt: "2026-04-06",
    coverImage: "/images/guides/chinaready-app-guide.png",
    related: ["china-travel-checklist", "vpn-china-setup-guide", "how-to-set-up-alipay-wechat-pay-as-tourist"],
  },
  {
    slug: "china-travel-checklist",
    title: "The Complete China Travel Checklist: Everything to Do Before You Land",
    description:
      "A step-by-step pre-departure checklist covering VPN, payments, SIM cards, navigation apps, documents, and entry requirements — so you arrive fully prepared.",
    category: "essentials",
    readingTime: "8 min",
    publishedAt: "2026-03-15",
    coverImage: "/images/guides/china-travel-checklist.png",
    related: ["vpn-china-setup-guide", "how-to-set-up-alipay-wechat-pay-as-tourist", "china-visa-free-countries-2026"],
    faqs: [
      { q: "How far in advance should I prepare for a trip to China?", a: "Start at least 2–3 weeks before departure. VPN setup, Alipay/WeChat Pay linking, and eSIM purchase all need to be done before you board — they can't be completed once you're inside China." },
      { q: "Do I need a VPN for China?", a: "Yes, unless you use an international eSIM. Google, WhatsApp, Instagram, Gmail and most Western apps are blocked by the Great Firewall. Install your VPN before departure — it cannot be downloaded from inside China." },
      { q: "Can I use cash in China?", a: "Cash is rarely useful in modern China. Most vendors, restaurants, and transport only accept WeChat Pay or Alipay. Set up mobile payments before arrival." },
    ],
  },
  {
    slug: "how-to-set-up-alipay-wechat-pay-as-tourist",
    title: "How to Set Up Alipay and WeChat Pay as a Foreign Tourist in China",
    description:
      "Cash is rarely accepted in China. This guide walks you through linking an international card to Alipay and WeChat Pay before your trip — including spending limits and what still doesn't work.",
    category: "payments",
    readingTime: "6 min",
    publishedAt: "2026-03-20",
    coverImage: "/images/guides/alipay-wechat-pay.png",
    related: ["china-travel-checklist", "china-esim-guide", "china-food-guide"],
    faqs: [
      { q: "Can foreign tourists use Alipay and WeChat Pay in China?", a: "Yes. Since late 2023, both Alipay and WeChat Pay allow foreign Visa, Mastercard, and Amex cards to be linked directly. You no longer need a Chinese bank account." },
      { q: "Do I need to set up Alipay before arriving in China?", a: "Yes. The setup process — including identity verification — is much smoother with unrestricted internet access. Do it before departure." },
      { q: "What is the spending limit on Alipay for foreigners?", a: "Unverified: ¥500/day, ¥1,500/month. ID-verified: ¥2,000/day, ¥20,000/month. WeChat Pay foreign cards: ¥3,000/day, ¥30,000/month." },
    ],
  },
  {
    slug: "vpn-china-setup-guide",
    title: "Best VPNs for China in 2026: What Actually Works and How to Set One Up",
    description:
      "Google, Instagram, WhatsApp, and most Western apps are blocked in China. Here's which VPNs actually work in 2026 based on real traveller reports, and why you must install yours before boarding.",
    category: "internet",
    readingTime: "5 min",
    publishedAt: "2026-03-25",
    coverImage: "/images/guides/vpn-china-setup-guide.png",
    related: ["china-esim-guide", "china-travel-checklist", "how-to-set-up-alipay-wechat-pay-as-tourist"],
    faqs: [
      { q: "Which VPN works best in China in 2026?", a: "Based on real traveller reports from Reddit communities, Astrill is the most consistently reliable VPN for China. Let's VPN and Shadowfly are solid alternatives. ExpressVPN has become increasingly unreliable since 2024." },
      { q: "Can I download a VPN after arriving in China?", a: "No. VPN apps are not available on the App Store or Google Play inside China, and VPN providers' websites are blocked. You must install and test your VPN before departure." },
      { q: "Does a VPN slow down internet speed in China?", a: "Yes, slightly. Connecting through an overseas server adds latency. For most activities — browsing, messaging, video calls — the speed is acceptable. Connect to nearby servers (Hong Kong, Japan, Singapore) for best performance." },
    ],
  },
  {
    slug: "china-esim-guide",
    title: "Best eSIM for China in 2026: Access the Internet Without a VPN",
    description:
      "International eSIMs route through overseas networks, bypassing the Great Firewall without any VPN. Compare Airalo, Nomad, Holafly and Saily — with prices, setup steps, and honest speed expectations.",
    category: "internet",
    readingTime: "6 min",
    publishedAt: "2026-04-06",
    coverImage: "/images/guides/china-esim-guide.png",
    related: ["vpn-china-setup-guide", "china-travel-checklist", "how-to-set-up-alipay-wechat-pay-as-tourist"],
    faqs: [
      { q: "Does an eSIM work in China without a VPN?", a: "Yes. International eSIMs route data through overseas carrier networks (Hong Kong, Japan, Singapore), bypassing the Great Firewall entirely. You can access Google, WhatsApp, and Instagram without a VPN." },
      { q: "What is the best eSIM for China?", a: "Airalo is the top pick for most travellers — wide coverage, transparent pricing, and reliable China performance. Holafly is best for unlimited data. Nomad is best for hotspot sharing." },
      { q: "Do I need to activate my eSIM before going to China?", a: "Yes. eSIM activation requires an internet connection to download the carrier profile. Activate on home WiFi before departure — attempting activation inside China may fail." },
    ],
  },
  {
    slug: "china-visa-free-countries-2026",
    title: "China Visa-Free Entry in 2026: 30-Day Policy and 240-Hour Transit Explained",
    description:
      "Complete guide to China's two visa-free pathways: 30-day entry for 50+ countries including UK, Canada, France, Germany, and Australia, plus the 240-hour transit policy. Full country lists, entry conditions, and the third-country rule explained.",
    category: "visa",
    readingTime: "7 min",
    publishedAt: "2026-04-01",
    coverImage: "/images/guides/china-visa-free-countries-2026.png",
    related: ["china-travel-checklist", "china-hotel-booking-guide", "china-best-time-to-visit"],
    faqs: [
      { q: "Which countries can enter China visa-free in 2026?", a: "Over 50 countries qualify for 30-day visa-free entry, including UK, Canada, France, Germany, Australia, Spain, Italy, Netherlands, and more. The policy is valid until December 31, 2026." },
      { q: "How long can I stay in China without a visa?", a: "Citizens of eligible countries can stay up to 30 days under the standard visa-free policy. The 240-hour (10-day) transit policy applies to citizens of 55 countries passing through China en route to a third destination." },
      { q: "Can I extend a visa-free stay inside China?", a: "Generally no. Extensions are not available for visa-free entries. You must exit China — to Hong Kong, Macau, or a neighbouring country — and re-enter if you need more time." },
      { q: "Does Hong Kong count as China for visa purposes?", a: "No. Hong Kong has its own immigration system, separate from mainland China. Entering Hong Kong does not use your mainland China visa-free allowance." },
    ],
  },
  {
    slug: "china-best-time-to-visit",
    title: "Best Time to Visit China: Weather, Crowds, and Public Holidays Explained",
    description:
      "April–May and September–October are the sweet spots. This guide covers China's typhoon season, summer heat and school holiday crowds, the three Golden Week surges, and the best month to visit each major destination.",
    category: "essentials",
    readingTime: "8 min",
    publishedAt: "2026-04-06",
    coverImage: "/images/guides/china-best-time-to-visit.png",
    related: ["china-travel-checklist", "china-hotel-booking-guide", "china-visa-free-countries-2026"],
    faqs: [
      { q: "What is the best time to visit China?", a: "April–May (spring) and September–October (autumn) are the best months. The weather is pleasant across most regions, and you avoid the summer heat, typhoon season, and the worst national holiday crowd surges." },
      { q: "When should I avoid travelling to China?", a: "Avoid Golden Week (October 1–7) and Labour Day (May 1–5) if possible — these are the busiest domestic travel periods. Also avoid July–August for eastern and southern China due to extreme heat, school holiday crowds, and typhoon risk." },
      { q: "Does China have a rainy season?", a: "Yes. The Yangtze Delta region (Shanghai, Nanjing, Hangzhou) experiences a 'plum rain' season in mid-June to early July with near-continuous rainfall. Southern China and Hainan are affected by typhoons from July to September." },
    ],
  },
  {
    slug: "china-food-guide",
    title: "How to Find Good Food in China: Dianping, Street Food, and Regional Cuisines",
    description:
      "Use Dianping and Xiaohongshu to eat where locals eat, decode Chinese menus without speaking the language, navigate street food markets, and know what to order in Beijing, Shanghai, Chengdu, and beyond.",
    category: "essentials",
    readingTime: "7 min",
    publishedAt: "2026-04-06",
    coverImage: "/images/guides/china-food-guide.png",
    related: ["how-to-set-up-alipay-wechat-pay-as-tourist", "china-hotel-booking-guide", "china-best-time-to-visit"],
    faqs: [
      { q: "What app do locals use to find restaurants in China?", a: "Dianping (大众点评) is China's primary restaurant discovery app — the equivalent of Yelp combined with TripAdvisor. Xiaohongshu (RED) is used for in-depth food recommendations and discovering trending spots." },
      { q: "How do you order food in China without speaking Chinese?", a: "Most mid-range restaurants have QR code ordering with photos. For street food, point at what you want or use WeChat's scan-to-translate feature on printed menus. Screenshot dishes from Dianping and show them to staff." },
      { q: "Is street food safe to eat in China?", a: "Generally yes. Stick to high-turnover stalls where ingredients are prepared in front of you. Avoid stalls with poor hygiene. Choose sealed bottled drinks rather than tap water." },
    ],
  },
  {
    slug: "china-hotel-booking-guide",
    title: "How to Book Hotels in China as a Foreign Tourist",
    description:
      "Where to book, which platforms accept foreign cards, the foreign guest registration requirement, neighbourhood tips for Beijing and Shanghai, and what to bring for check-in.",
    category: "essentials",
    readingTime: "6 min",
    publishedAt: "2026-04-06",
    coverImage: "/images/guides/china-hotel-booking-guide.png",
    related: ["china-travel-checklist", "china-visa-free-countries-2026", "china-best-time-to-visit"],
    faqs: [
      { q: "What is the best app to book hotels in China?", a: "Trip.com (formerly Ctrip) is the best option for foreign tourists — full English interface, international card support, and the widest inventory of Chinese hotels. Booking.com and Agoda also work but have more limited listings." },
      { q: "Do hotels in China accept foreign guests?", a: "Most registered hotels do, but some smaller guesthouses and private accommodation are not licensed to host foreign nationals. Always book through Trip.com and check recent reviews mentioning foreign guests." },
      { q: "Do I need my passport to check in to a hotel in China?", a: "Yes — the original passport, not a copy. Hotels are legally required to register foreign guests with local police within 24 hours, which requires scanning your passport data page." },
    ],
  },
];

export const categoryLabels: Record<Guide["category"], string> = {
  essentials: "Essentials",
  payments: "Payments",
  internet: "Internet & VPN",
  visa: "Visa & Entry",
};

export const categoryColors: Record<Guide["category"], string> = {
  essentials: "bg-slate-100 text-slate-700",
  payments:   "bg-emerald-50 text-emerald-700",
  internet:   "bg-sky-50 text-sky-700",
  visa:       "bg-amber-50 text-amber-700",
};

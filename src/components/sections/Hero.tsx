import PhoneMockup from "@/components/ui/PhoneMockup";

const heroScreens = {
  left: "/images/app-screenshot-hero.png",
  center: "/images/app-screenshot-dashboard.png",
  right: "/images/app-screenshot-guide.png",
};

export default function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-24">
        {/* Social proof badge */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-4 py-1.5">
            <div className="flex -space-x-1.5">
              {["bg-blue-400", "bg-green-400", "bg-purple-400"].map((c, i) => (
                <div key={i} className={`w-5 h-5 rounded-full ${c} border-2 border-white`} />
              ))}
            </div>
            <span className="text-xs text-gray-600 font-medium">Join travelers getting ready</span>
            <span className="text-xs bg-gray-900 text-white px-2 py-0.5 rounded-full font-medium">Get Access</span>
          </div>
        </div>

        {/* Headline */}
        <div className="text-center max-w-3xl mx-auto mb-6">
          <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-gray-900 leading-[1.15] tracking-tight">
            Your Complete Guide to
            <br />
            Landing in China
          </h1>
        </div>

        {/* Subtitle */}
        <p className="text-center text-gray-500 text-base sm:text-lg max-w-xl mx-auto mb-8 leading-relaxed">
          {"Don't just book your trip — prepare for it. ChinaReady tracks your readiness across documents, payments, VPN, and more."}
        </p>

        {/* CTAs */}
        <div className="flex items-center justify-center gap-4 mb-16 sm:mb-20">
          <a
            href="#download"
            className="inline-flex items-center px-6 py-3 bg-gray-900 text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-colors"
          >
            Download For Free
          </a>
          <a
            href="#how-it-works"
            className="inline-flex items-center gap-2 px-6 py-3 text-gray-700 text-sm font-medium hover:text-gray-900 transition-colors"
          >
            <span className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center">
              <svg className="w-3 h-3 ml-0.5" fill="currentColor" viewBox="0 0 20 20"><path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"/></svg>
            </span>
            Learn More
          </a>
        </div>

        {/* Phone mockups */}
        <div className="relative flex items-end justify-center gap-0 sm:gap-2 pb-0 -mb-4">
          {/* Left phone - tilted */}
          <div className="hidden sm:block -rotate-6 translate-y-8 translate-x-4 z-0 opacity-90">
            <PhoneMockup
              size="sm"
              src={heroScreens.left}
              alt="ChinaReady onboarding screen"
            />
          </div>
          {/* Center phone - main */}
          <div className="z-10">
            <PhoneMockup
            size="lg"
            src={heroScreens.center}
            alt="ChinaReady readiness dashboard"
          />
          </div>
          {/* Right phone - tilted */}
          <div className="hidden sm:block rotate-6 translate-y-8 -translate-x-4 z-0 opacity-90">
            <PhoneMockup
              size="sm"
              src={heroScreens.right}
              alt="ChinaReady transport setup guide"
            />
          </div>
        </div>
      </div>

      {/* Fade to gray */}
      <div className="h-24 bg-gradient-to-b from-white to-gray-50" />
    </section>
  );
}

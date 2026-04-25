import Link from "next/link";
import LogoMark from "@/components/ui/LogoMark";
import { PREVIEW_PATH, APP_STORE_URL, GOOGLE_PLAY_URL } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <LogoMark size={28} />
              <span className="text-base font-bold text-white">{"ChinaReady"}</span>
            </div>
            <p className="text-gray-500 text-xs leading-relaxed max-w-[200px]">
              Your complete travel preparation companion for China.
            </p>
          </div>

          {/* Pages */}
          <div>
            <h4 className="text-xs font-semibold text-gray-400 mb-3">Pages</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-500 hover:text-gray-300 text-xs transition-colors">Home</Link></li>
              <li><Link href="/#features" className="text-gray-500 hover:text-gray-300 text-xs transition-colors">Features</Link></li>
              <li><Link href="/#preview" className="text-gray-500 hover:text-gray-300 text-xs transition-colors">Preview</Link></li>
              <li><Link href="/#how-it-works" className="text-gray-500 hover:text-gray-300 text-xs transition-colors">How It Works</Link></li>
            </ul>
          </div>

          {/* Guides */}
          <div>
            <h4 className="text-xs font-semibold text-gray-400 mb-3">Guides</h4>
            <ul className="space-y-2">
              <li><Link href="/guides" className="text-gray-500 hover:text-gray-300 text-xs transition-colors">All Guides</Link></li>
              <li><Link href="/guides/china-travel-checklist" className="text-gray-500 hover:text-gray-300 text-xs transition-colors">Travel Checklist</Link></li>
              <li><Link href="/guides/how-to-set-up-alipay-wechat-pay-as-tourist" className="text-gray-500 hover:text-gray-300 text-xs transition-colors">Alipay & WeChat Pay</Link></li>
              <li><Link href="/guides/vpn-china-setup-guide" className="text-gray-500 hover:text-gray-300 text-xs transition-colors">VPN for China</Link></li>
              <li><Link href="/guides/china-visa-free-countries-2026" className="text-gray-500 hover:text-gray-300 text-xs transition-colors">Visa-Free Entry 2026</Link></li>
              <li><Link href="/guides/china-esim-guide" className="text-gray-500 hover:text-gray-300 text-xs transition-colors">China eSIM Guide</Link></li>
              <li><Link href="/transit-checker" className="text-gray-500 hover:text-gray-300 text-xs transition-colors">240h Transit Checker</Link></li>
              <li><Link href="/esim-vpn-checker" className="text-gray-500 hover:text-gray-300 text-xs transition-colors">eSIM vs VPN Checker</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs font-semibold text-gray-400 mb-3">Legal</h4>
            <ul className="space-y-2">
              <li><Link href="/policy" className="text-gray-500 hover:text-gray-300 text-xs transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-gray-500 hover:text-gray-300 text-xs transition-colors">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Download */}
          <div>
            <h4 className="text-xs font-semibold text-gray-400 mb-3">Download</h4>
            <ul className="space-y-2">
              <li><Link href={PREVIEW_PATH} className="text-gray-500 hover:text-gray-300 text-xs transition-colors">Try Web Preview</Link></li>
              <li><a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-300 text-xs transition-colors">Download on App Store</a></li>
              <li><a href={GOOGLE_PLAY_URL} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-300 text-xs transition-colors">Get it on Google Play</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6">
          <p className="text-gray-600 text-xs text-center">
            &copy; {new Date().getFullYear()} ChinaReady. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

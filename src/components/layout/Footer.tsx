import Link from "next/link";
import LogoMark from "@/components/ui/LogoMark";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <LogoMark size={28} />
              <span className="text-base font-bold text-gray-900">{"ChinaReady"}</span>
            </div>
            <p className="text-gray-400 text-xs leading-relaxed max-w-[200px]">
              Your complete travel preparation companion for China.
            </p>
          </div>

          {/* Pages */}
          <div>
            <h4 className="text-xs font-semibold text-gray-900 mb-3">Pages</h4>
            <ul className="space-y-2">
              <li><a href="#hero" className="text-gray-400 hover:text-gray-600 text-xs transition-colors">Home</a></li>
              <li><a href="#features" className="text-gray-400 hover:text-gray-600 text-xs transition-colors">Features</a></li>
              <li><a href="#how-it-works" className="text-gray-400 hover:text-gray-600 text-xs transition-colors">How It Works</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs font-semibold text-gray-900 mb-3">Legal</h4>
            <ul className="space-y-2">
              <li><Link href="/policy" className="text-gray-400 hover:text-gray-600 text-xs transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-gray-400 hover:text-gray-600 text-xs transition-colors">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Download */}
          <div>
            <h4 className="text-xs font-semibold text-gray-900 mb-3">Download</h4>
            <ul className="space-y-2">
              <li><a href="#download" className="text-gray-400 hover:text-gray-600 text-xs transition-colors">iOS App</a></li>
              <li><a href="#download" className="text-gray-400 hover:text-gray-600 text-xs transition-colors">Android App</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-100 mt-10 pt-6">
          <p className="text-gray-300 text-xs text-center">
            &copy; {new Date().getFullYear()} ChinaReady. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

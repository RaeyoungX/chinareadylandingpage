import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service - ChinaReady",
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">
        Terms of Service
      </h1>
      <div className="prose prose-gray max-w-none">
        <p className="text-gray-500">Last updated: March 2026</p>

        <h2>1. Acceptance of Terms</h2>
        <p>
          By downloading, installing, or using ChinaReady, you agree to be
          bound by these Terms of Service. If you do not agree to these terms,
          please do not use the app.
        </p>

        <h2>2. Description of Service</h2>
        <p>
          ChinaReady is a travel preparation app that provides checklists,
          guides, and readiness tracking for travelers visiting China. The app
          provides informational content and task management features to help
          users prepare for their trip.
        </p>

        <h2>3. Use of Service</h2>
        <p>You agree to use ChinaReady only for lawful purposes and in accordance with these Terms. You agree not to:</p>
        <ul>
          <li>Use the app in any way that violates applicable laws</li>
          <li>Attempt to interfere with the proper functioning of the app</li>
          <li>Reverse engineer or decompile any part of the app</li>
        </ul>

        <h2>4. Disclaimer</h2>
        <p>
          The information provided in ChinaReady is for general informational
          purposes only. While we strive to keep the information accurate and
          up-to-date, we make no representations or warranties of any kind
          about the completeness, accuracy, or reliability of the information.
          Travel requirements may change — always verify with official sources.
        </p>

        <h2>5. Limitation of Liability</h2>
        <p>
          ChinaReady and its creators shall not be liable for any indirect,
          incidental, special, or consequential damages arising from your use
          of the app or reliance on any information provided within it.
        </p>

        <h2>6. Intellectual Property</h2>
        <p>
          All content, features, and functionality of ChinaReady are owned by
          us and are protected by international copyright, trademark, and other
          intellectual property laws.
        </p>

        <h2>7. Changes to Terms</h2>
        <p>
          We reserve the right to modify these Terms at any time. Continued
          use of the app after changes constitutes acceptance of the new terms.
        </p>

        <h2>8. Contact</h2>
        <p>
          If you have any questions about these Terms of Service, please contact us:
        </p>
        <p>
          <strong>Email:</strong> ventong112358@gmail.com<br />
          <strong>Response Time:</strong> We aim to respond to all inquiries within 48 hours
        </p>
      </div>
    </div>
  );
}

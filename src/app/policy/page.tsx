import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How ChinaReady collects, uses and protects your personal data.",
  alternates: { canonical: "https://chinaready.org/policy" },
  robots: { index: false },
};

export default function PolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
        Privacy Policy
      </h1>
      <p className="text-gray-400 mb-10">Last updated: February 25, 2026</p>

      <div className="prose prose-gray max-w-none prose-headings:font-semibold prose-h2:text-xl prose-h3:text-base prose-p:text-gray-600 prose-li:text-gray-600">
        <p>
          Welcome to ChinaReady. We are committed to protecting your privacy and ensuring transparency about how we collect, use, and safeguard your personal information. This Privacy Policy explains our practices regarding data collection and usage for our travel preparation application.
        </p>

        <h2>1. Information We Collect</h2>

        <h3>1.1 Account Information</h3>
        <ul>
          <li>Email address (for authentication and account recovery)</li>
          <li>Name or username (for personalization)</li>
          <li>Password (encrypted and stored securely)</li>
          <li>Google account information (if you choose to sign in with Google OAuth)</li>
        </ul>

        <h3>1.2 Profile Information</h3>
        <ul>
          <li>Departure country / country of residence</li>
          <li>Travel dates and trip details</li>
          <li>Travel purpose (tourism, business, study, other)</li>
          <li>Personal preferences for trip preparation</li>
        </ul>

        <h3>1.3 Usage and Task Data</h3>
        <ul>
          <li>Task completion status and readiness score</li>
          <li>Category progress (Documents, VPN, Navigation, Transport, Safety, Accommodation, Payments)</li>
          <li>Community posts, comments, and saved content</li>
          <li>Session duration and feature usage metrics</li>
          <li>Step-by-step guide interaction data</li>
        </ul>

        <h3>1.4 Technical Information</h3>
        <ul>
          <li>Device type and operating system (for mobile app optimization)</li>
          <li>Browser type and version (for web compatibility)</li>
          <li>IP address (for security and fraud prevention)</li>
          <li>App usage analytics (crash reports, performance metrics)</li>
        </ul>

        <h2>2. How We Use Your Information</h2>
        <p>We use your information to:</p>
        <ul>
          <li><strong>Provide personalized preparation checklists:</strong> Your departure country and travel details help us generate relevant and tailored readiness tasks</li>
          <li><strong>Track your progress:</strong> Monitor your readiness score, task completion, and preparation journey</li>
          <li><strong>Generate recommendations:</strong> Provide country-specific tips, guides, and urgent task alerts</li>
          <li><strong>Improve the service:</strong> Analyze usage patterns to enhance content and user experience</li>
          <li><strong>Authenticate your account:</strong> Securely log you in and protect your data</li>
          <li><strong>Send important notifications:</strong> Account-related updates and preparation reminders (we do not send marketing emails without your consent)</li>
        </ul>

        <h2>3. Third-Party Services</h2>

        <h3>3.1 Supabase (Database & Authentication)</h3>
        <p>
          We use Supabase to store your account information, profile data, and task progress. Supabase is a secure, open-source Backend-as-a-Service platform with enterprise-grade security and GDPR compliance. Your data is stored in encrypted PostgreSQL databases with row-level security policies.
        </p>

        <h3>3.2 Google OAuth (Optional Sign-In)</h3>
        <p>
          {"If you choose to sign in with Google, we receive your Google account email, name, and profile picture. Google's own privacy policy applies to their authentication services. We only use this information to create and manage your ChinaReady account."}
        </p>

        <h2>4. Data Storage and Security</h2>
        <ul>
          <li><strong>Encryption:</strong> All data is encrypted in transit (HTTPS/TLS) and at rest</li>
          <li><strong>Access Control:</strong> Row-Level Security (RLS) policies ensure you can only access your own data</li>
          <li><strong>Password Security:</strong> Passwords are hashed using industry-standard bcrypt algorithms</li>
          <li><strong>Server Location:</strong> Your data is stored on secure servers managed by Supabase (you can request server location details)</li>
          <li><strong>Backup & Recovery:</strong> Regular automated backups ensure data durability</li>
          <li><strong>No Third-Party Sharing:</strong> We never sell or share your personal data with third parties for marketing purposes</li>
        </ul>

        <h2>5. Your Rights</h2>
        <p>Under applicable data protection laws (including GDPR and CCPA), you have the following rights:</p>

        <p><strong>Right to Access</strong><br />
        You can view all your data within the app (Profile tab, Task History). For a complete data export, contact us at ventong112358@gmail.com</p>

        <p><strong>Right to Data Portability</strong><br />
        Request a copy of your data in a machine-readable format (JSON/CSV)</p>

        <p><strong>Right to Deletion</strong><br />
        You can permanently delete your account and all associated data at any time. This action is irreversible.</p>

        <p><strong>Right to Correction</strong><br />
        Update your profile information directly in the app or contact us to correct any inaccuracies</p>

        <h2>6. Data Retention</h2>
        <ul>
          <li><strong>Active accounts:</strong> We retain your data as long as your account is active</li>
          <li><strong>Inactive accounts:</strong> Accounts inactive for more than 2 years may be automatically deleted after notification</li>
          <li><strong>Deleted accounts:</strong> Upon account deletion, all personal data is permanently removed within 30 days</li>
          <li><strong>Legal obligations:</strong> We may retain certain data if required by law (e.g., for tax or legal purposes)</li>
        </ul>

        <h2>{"7. Children's Privacy"}</h2>
        <p>
          ChinaReady is intended for users aged 13 and older. We do not knowingly collect personal information from children under 13. If you believe we have inadvertently collected such data, please contact us immediately at ventong112358@gmail.com, and we will delete it promptly.
        </p>

        <h2>8. Changes to This Policy</h2>
        <p>
          {"We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. The \"Last updated\" date at the top of this page indicates when the policy was last revised. We will notify you of significant changes via email or in-app notification."}
        </p>

        <h2>9. Contact Us</h2>
        <p>If you have any questions, concerns, or requests regarding this Privacy Policy or your personal data, please contact us:</p>
        <p>
          <strong>Email:</strong> ventong112358@gmail.com<br />
          <strong>Response Time:</strong> We aim to respond to all inquiries within 48 hours
        </p>

        <h2>10. International Users</h2>
        <p>
          ChinaReady is operated globally. If you access our service from outside the United States, please be aware that your information may be transferred to, stored, and processed in the United States or other countries where our service providers operate. By using ChinaReady, you consent to the transfer of your information to countries outside your country of residence, which may have different data protection laws.
        </p>

        <p className="mt-8 pt-6 border-t border-gray-200 text-gray-500">
          By using ChinaReady, you acknowledge that you have read and understood this Privacy Policy and agree to the collection, use, and disclosure of your information as described herein.
        </p>
      </div>
    </div>
  );
}

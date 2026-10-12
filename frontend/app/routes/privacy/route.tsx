import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import {
  FaShieldAlt,
  FaUserShield,
  FaDatabase,
  FaServer,
  FaEnvelope,
  FaArrowLeft,
  FaCheckCircle,
} from "react-icons/fa";

export const meta: MetaFunction = () => {
  return [
    { title: "Privacy Policy | Gamautos" },
    {
      name: "description",
      content:
        "Learn how Gamautos collects, uses, and safeguards your personal data, listings, and dealer information.",
    },
  ];
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Top Banner / Hero */}
      <header className="border-b border-gray-200 bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary hover:text-yellow transition-colors mb-6"
          >
            <FaArrowLeft size={12} /> Back to Marketplace
          </Link>

          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <FaShieldAlt size={24} />
            </span>
            <div>
              <h1 className="text-3xl font-black text-primary sm:text-4xl">
                Privacy Policy
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Effective Date: October 12, 2026 &bull; Last Updated: October 12, 2026
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-10 space-y-10 leading-relaxed">
          {/* Introduction */}
          <section className="space-y-3">
            <p className="text-base text-gray-700">
              Welcome to <span className="font-semibold text-primary">Gamautos</span> (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;). We operate an online automotive marketplace connecting vehicle buyers, individual sellers, and automotive dealerships across The Gambia and internationally.
            </p>
            <p className="text-base text-gray-700">
              Your privacy and the security of your data are fundamental to our service. This Privacy Policy details the types of information we collect, how it is processed and protected, and your rights concerning your personal information.
            </p>
          </section>

          <hr className="border-gray-100" />

          {/* Section 1 */}
          <section className="space-y-4">
            <div className="flex items-center gap-2.5 text-xl font-bold text-primary">
              <FaDatabase className="text-yellow" size={18} />
              <h2>1. Information We Collect</h2>
            </div>

            <div className="space-y-4 pl-2 sm:pl-4 text-sm sm:text-base text-gray-600">
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  A. Information You Provide Directly
                </h3>
                <ul className="list-disc list-inside space-y-1.5 pl-2">
                  <li>
                    <strong className="text-gray-800">Account Credentials:</strong> Full name, username, email address, password (stored via salted cryptographic hashes), and phone number.
                  </li>
                  <li>
                    <strong className="text-gray-800">Dealership & Seller Profiles:</strong> Dealership/business trade names, authorized phone lines, and physical lot or showroom locations.
                  </li>
                  <li>
                    <strong className="text-gray-800">Vehicle Listing Data:</strong> Vehicle make, model, year, VIN (Vehicle Identification Number), pricing, mileage, transmission, engine specifications, features, seller notes, and vehicle media (photos and videos).
                  </li>
                  <li>
                    <strong className="text-gray-800">Communications:</strong> Inquiries submitted to sellers or customer support messages.
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  B. Information Collected Automatically
                </h3>
                <ul className="list-disc list-inside space-y-1.5 pl-2">
                  <li>
                    <strong className="text-gray-800">Technical Data:</strong> IP address, browser type, operating system, and general device network diagnostics.
                  </li>
                  <li>
                    <strong className="text-gray-800">Cookies & Local Storage:</strong> Secure session cookies and authentication tokens (e.g., JWTs) strictly for maintaining authorized user logins and dashboard sessions. We do not operate third-party advertising tracking networks.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <hr className="border-gray-100" />

          {/* Section 2 */}
          <section className="space-y-4">
            <div className="flex items-center gap-2.5 text-xl font-bold text-primary">
              <FaUserShield className="text-yellow" size={18} />
              <h2>2. How We Use Your Information</h2>
            </div>
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 text-sm text-gray-600">
              <li className="flex items-start gap-2.5 rounded-xl bg-gray-50 p-3.5 border border-gray-100">
                <FaCheckCircle className="text-green-600 mt-1 flex-shrink-0" />
                <span>
                  <strong className="text-gray-800">Marketplace Operations:</strong> Publishing listings and connecting prospective buyers directly with dealerships and private sellers.
                </span>
              </li>
              <li className="flex items-start gap-2.5 rounded-xl bg-gray-50 p-3.5 border border-gray-100">
                <FaCheckCircle className="text-green-600 mt-1 flex-shrink-0" />
                <span>
                  <strong className="text-gray-800">Account Authentication:</strong> Verifying identities, issuing secure session tokens, and managing user and dealer permissions.
                </span>
              </li>
              <li className="flex items-start gap-2.5 rounded-xl bg-gray-50 p-3.5 border border-gray-100">
                <FaCheckCircle className="text-green-600 mt-1 flex-shrink-0" />
                <span>
                  <strong className="text-gray-800">Transactional Notices:</strong> Delivering account confirmations, password resets, and critical inventory notices via email.
                </span>
              </li>
              <li className="flex items-start gap-2.5 rounded-xl bg-gray-50 p-3.5 border border-gray-100">
                <FaCheckCircle className="text-green-600 mt-1 flex-shrink-0" />
                <span>
                  <strong className="text-gray-800">Fraud Prevention:</strong> Monitoring against duplicate listings, unauthorized dealership impersonation, and abusive platform activities.
                </span>
              </li>
            </ul>
          </section>

          <hr className="border-gray-100" />

          {/* Section 3 */}
          <section className="space-y-4">
            <div className="flex items-center gap-2.5 text-xl font-bold text-primary">
              <FaServer className="text-yellow" size={18} />
              <h2>3. How We Share and Disclose Data</h2>
            </div>
            <div className="space-y-3 text-sm sm:text-base text-gray-600">
              <p>
                We do not sell, rent, or lease your personal information. Data is shared exclusively under the following terms:
              </p>
              <ul className="list-disc list-inside space-y-2 pl-2">
                <li>
                  <strong className="text-gray-800">Public Vehicle Listings:</strong> Details submitted in your car listings (photos, specs, price, location, and your designated dealer contact name and phone number) are publicly visible to car shoppers.
                </li>
                <li>
                  <strong className="text-gray-800">Cloud Infrastructure:</strong> We rely on trusted enterprise infrastructure providers including Cloudflare (CDN and security), Railway (cloud hosting &amp; database), Cloudinary (vehicle media storage), and Resend (email delivery).
                </li>
                <li>
                  <strong className="text-gray-800">Legal Compliance:</strong> We may disclose data if required by legal process, lawful court orders, or to protect the safety and property of our users and marketplace integrity.
                </li>
              </ul>
            </div>
          </section>

          <hr className="border-gray-100" />

          {/* Section 4 */}
          <section className="space-y-4">
            <div className="flex items-center gap-2.5 text-xl font-bold text-primary">
              <FaShieldAlt className="text-yellow" size={18} />
              <h2>4. Security and Data Retention</h2>
            </div>
            <p className="text-sm sm:text-base text-gray-600">
              We employ strict technical and administrative safeguards, including Transport Layer Security (TLS/HTTPS), secure Content Security Policies (CSP), parameterized database queries, and encrypted passwords. Personal data and listings are maintained as long as your account remains active or as required by commercial record-keeping regulations.
            </p>
          </section>

          <hr className="border-gray-100" />

          {/* Section 5 & 6 */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-primary">5. Your Privacy Choices &amp; Rights</h2>
            <p className="text-sm sm:text-base text-gray-600">
              You maintain full access to your account details and vehicle listings. You may review, edit, or remove your listings at any time through your dashboard. If you wish to permanently delete your account and associated records, you can submit a deletion request to our administrative team.
            </p>
          </section>

          <hr className="border-gray-100" />

          {/* Section 7 - Contact */}
          <section className="rounded-xl bg-gray-50 p-6 border border-gray-200">
            <div className="flex items-center gap-2.5 text-lg font-bold text-primary mb-2">
              <FaEnvelope className="text-yellow" size={16} />
              <h2>Questions or Privacy Concerns?</h2>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              If you have any questions regarding this Privacy Policy or how your personal information is handled on Gamautos, contact us directly:
            </p>
            <div className="space-y-1 text-sm font-medium text-gray-800">
              <p>Email: <a href="mailto:support@gamautos.com" className="text-primary hover:underline">support@gamautos.com</a></p>
              <p>Platform: <a href="https://gamautos.com" className="text-primary hover:underline">gamautos.com</a></p>
              <p>Location: Kanifing / Banjul, The Gambia</p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

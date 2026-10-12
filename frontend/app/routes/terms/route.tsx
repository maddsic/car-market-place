import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import {
  FaShieldHalved,
  FaDatabase,
  FaServer,
  FaLock,
  FaUserCheck,
  FaArrowLeft,
  FaEnvelope,
  FaCircleCheck,
  FaEye,
  FaCloud,
} from "react-icons/fa6";

export const meta: MetaFunction = () => {
  return [
    { title: "Privacy Policy | Gamautos" },
    {
      name: "description",
      content:
        "Understand how Gamautos collects, secures, and handles your personal information, dealer profiles, and vehicle inventory data.",
    },
  ];
};

export default function PrivacyPolicy() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/70 text-slate-800 antialiased selection:bg-yellow-400 selection:text-slate-900">
      {/* Sticky Top Nav */}
      <div className="border-b border-slate-200/80 bg-white/80 backdrop-blur-md sticky top-0 z-30">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <Link
            to="/"
            className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-primary transition-colors"
          >
            <FaArrowLeft
              size={12}
              className="transition-transform group-hover:-translate-x-1"
            />
            <span>Back to Marketplace</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold text-slate-700 border border-slate-200">
              <FaShieldHalved size={11} className="text-primary" />
              Data Protection
            </span>
          </div>
        </div>
      </div>

      {/* Hero Header with ambient mesh glow */}
      <header className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-primary to-slate-950 text-white pt-16 pb-24 px-4 sm:px-6 lg:px-8">
        <div
          aria-hidden="true"
          className="absolute -top-24 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-yellow-400/10 blur-3xl pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute bottom-0 right-10 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl pointer-events-none"
        />

        <div className="relative mx-auto max-w-3xl text-center space-y-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-yellow-300 backdrop-blur-sm">
            <FaLock size={11} />
            <span>Privacy &amp; Data Safeguards</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Privacy Policy
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            Your trust is essential. Learn how your credentials, listings, and dealer records are gathered, processed, and safeguarded across Gamautos.
          </p>

          <p className="text-xs text-slate-400">
            Effective Date: October 12, 2026 &bull; Last Revised: October 12, 2026
          </p>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative -mt-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pb-20 space-y-10">
        {/* Quick Jump Navigation Pill Bar */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-2.5 shadow-lg shadow-slate-200/50 flex flex-wrap items-center justify-center gap-1.5 text-xs font-semibold text-slate-600">
          <span className="text-slate-400 px-2 hidden sm:inline">Jump to:</span>
          {[
            { label: "1. Data We Collect", id: "section-collection" },
            { label: "2. How We Use Data", id: "section-usage" },
            { label: "3. Third-Party Infrastructure", id: "section-infrastructure" },
            { label: "4. Security & Retention", id: "section-security" },
            { label: "5. Your Rights", id: "section-rights" },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollToSection(item.id)}
              className="rounded-xl px-3 py-1.5 hover:bg-slate-100 hover:text-slate-900 transition-colors"
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Content Card Container */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-12 shadow-sm space-y-12 leading-relaxed">
          {/* Preamble */}
          <section className="space-y-4">
            <p className="text-sm sm:text-base text-slate-700">
              Welcome to <strong className="text-slate-900">Gamautos</strong> (&quot;Gamautos,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;). We operate an online automotive platform connecting car shoppers with dealerships and private sellers in The Gambia and abroad.
            </p>
            <p className="text-sm sm:text-base text-slate-700">
              This Privacy Policy explains how we collect, store, and protect your information when you visit our website, register an account, publish a car listing, or interact with our APIs.
            </p>
          </section>

          <hr className="border-slate-100" />

          {/* Section 1: Data Collection */}
          <section id="section-collection" className="space-y-4 scroll-mt-24">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <FaDatabase size={18} />
              </span>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-primary">Section 1</span>
                <h2 className="text-xl font-bold text-slate-900">Information We Collect</h2>
              </div>
            </div>

            <p className="text-sm sm:text-base text-slate-600">
              We collect information to authenticate users, facilitate vehicle sales, and keep the marketplace safe:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="rounded-2xl border border-slate-200/80 p-5 space-y-2 hover:border-slate-300 transition-colors">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  <h3 className="font-bold text-sm text-slate-900">Account Credentials</h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Full name, username, email address, phone number, and cryptographically salted password hashes.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200/80 p-5 space-y-2 hover:border-slate-300 transition-colors">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  <h3 className="font-bold text-sm text-slate-900">Dealership &amp; Seller Data</h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Dealership trade name, physical lot or showroom location, direct sales phone line, and representative contact details.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200/80 p-5 space-y-2 hover:border-slate-300 transition-colors">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  <h3 className="font-bold text-sm text-slate-900">Vehicle Inventory Details</h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Make, model, year, VIN, price, odometer reading, fuel/transmission specs, options, seller notes, and uploaded photos.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200/80 p-5 space-y-2 hover:border-slate-300 transition-colors">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  <h3 className="font-bold text-sm text-slate-900">Session &amp; Token Data</h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Secure HTTP cookies and JSON Web Tokens (JWT) used strictly for authentication. We do not use third-party ad tracking pixels.
                </p>
              </div>
            </div>
          </section>

          <hr className="border-slate-100" />

          {/* Section 2: How We Use Data */}
          <section id="section-usage" className="space-y-4 scroll-mt-24">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-700">
                <FaEye size={18} />
              </span>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700">Section 2</span>
                <h2 className="text-xl font-bold text-slate-900">How We Use Your Information</h2>
              </div>
            </div>

            <p className="text-sm sm:text-base text-slate-600">
              Your data is processed strictly for essential marketplace operations:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-4 space-y-1.5">
                <FaCircleCheck className="text-emerald-500" size={15} />
                <h3 className="font-bold text-xs text-slate-800">Public Listings</h3>
                <p className="text-xs text-slate-600">
                  Displaying vehicle specs and your dealer contact phone number so buyers can reach you directly.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-4 space-y-1.5">
                <FaCircleCheck className="text-emerald-500" size={15} />
                <h3 className="font-bold text-xs text-slate-800">Authentication</h3>
                <p className="text-xs text-slate-600">
                  Verifying JWT tokens, guarding admin endpoints, and securing dealer inventory controls.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-4 space-y-1.5">
                <FaCircleCheck className="text-emerald-500" size={15} />
                <h3 className="font-bold text-xs text-slate-800">Transactional Notices</h3>
                <p className="text-xs text-slate-600">
                  Sending email confirmations, password reset links, and listing updates via Resend.
                </p>
              </div>
            </div>
          </section>

          <hr className="border-slate-100" />

          {/* Section 3: Infrastructure */}
          <section id="section-infrastructure" className="space-y-4 scroll-mt-24">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <FaServer size={18} />
              </span>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-primary">Section 3</span>
                <h2 className="text-xl font-bold text-slate-900">Third-Party Infrastructure &amp; Disclosures</h2>
              </div>
            </div>

            <p className="text-sm sm:text-base text-slate-600">
              We never sell, rent, or trade your personal information. We partner only with verified cloud providers necessary to deliver our services:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-start gap-3 rounded-2xl border border-slate-200/80 bg-white p-4">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-50 text-orange-600 flex-shrink-0">
                  <FaCloud size={16} />
                </span>
                <div className="space-y-0.5">
                  <h3 className="font-bold text-xs text-slate-900">Cloudflare</h3>
                  <p className="text-xs text-slate-500">
                    DNS management, DDoS filtering, TLS/SSL encryption, and global content delivery.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-2xl border border-slate-200/80 bg-white p-4">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-50 text-purple-600 flex-shrink-0">
                  <FaServer size={16} />
                </span>
                <div className="space-y-0.5">
                  <h3 className="font-bold text-xs text-slate-900">Railway</h3>
                  <p className="text-xs text-slate-500">
                    Managed cloud container hosting and private MySQL relational database storage.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-2xl border border-slate-200/80 bg-white p-4">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600 flex-shrink-0">
                  <FaCloud size={16} />
                </span>
                <div className="space-y-0.5">
                  <h3 className="font-bold text-xs text-slate-900">Cloudinary</h3>
                  <p className="text-xs text-slate-500">
                    Optimized cloud media storage, compression, and delivery for vehicle photography.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-2xl border border-slate-200/80 bg-white p-4">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 flex-shrink-0">
                  <FaEnvelope size={16} />
                </span>
                <div className="space-y-0.5">
                  <h3 className="font-bold text-xs text-slate-900">Resend</h3>
                  <p className="text-xs text-slate-500">
                    Transactional email delivery for password resets and verification notifications.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <hr className="border-slate-100" />

          {/* Section 4: Security & Retention */}
          <section id="section-security" className="space-y-4 scroll-mt-24">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-700">
                <FaLock size={18} />
              </span>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">Section 4</span>
                <h2 className="text-xl font-bold text-slate-900">Data Security &amp; Retention</h2>
              </div>
            </div>

            <div className="space-y-3 text-sm text-slate-600">
              <p>
                We enforce industry-standard security protocols across our stack, including HTTPS/TLS encryption across all endpoints, strict Content Security Policies (CSP), parameterized database queries, and hashed passwords.
              </p>
              <p>
                Vehicle listings and user profile data are maintained for as long as your account remains active. When you remove a listing or request account deletion, data is removed from our live databases, subject only to legal and accounting record-keeping requirements.
              </p>
            </div>
          </section>

          <hr className="border-slate-100" />

          {/* Section 5: Your Rights */}
          <section id="section-rights" className="space-y-4 scroll-mt-24">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                <FaUserCheck size={18} />
              </span>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600">Section 5</span>
                <h2 className="text-xl font-bold text-slate-900">Your Privacy Choices &amp; Rights</h2>
              </div>
            </div>

            <div className="space-y-3 text-sm text-slate-600">
              <p>
                You have full control over your marketplace profile:
              </p>
              <ul className="list-disc list-inside space-y-1.5 pl-2">
                <li><strong className="text-slate-800">Edit or Update:</strong> Modify your vehicle specifications, price in Dalasi, and phone numbers directly from your dashboard.</li>
                <li><strong className="text-slate-800">Archive or Delete:</strong> Toggle cars to &quot;Sold&quot; or delete listings at any time.</li>
                <li><strong className="text-slate-800">Account Erasure:</strong> Request complete account and profile erasure by contacting support.</li>
              </ul>
            </div>
          </section>

          <hr className="border-slate-100" />

          {/* Section 6: Contact */}
          <section className="rounded-2xl border border-slate-200 bg-slate-50/60 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">Have privacy or data questions?</h3>
              <p className="text-xs text-slate-500">
                Reach out to our administrative team for data inquiries.
              </p>
            </div>

            <a
              href="mailto:support@gamautos.com"
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold text-white hover:bg-slate-800 transition-colors"
            >
              <FaEnvelope size={12} className="text-yellow-400" />
              <span>support@gamautos.com</span>
            </a>
          </section>
        </div>
      </main>
    </div>
  );
}

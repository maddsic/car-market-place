import { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { Form, Link, useActionData, useNavigation } from "@remix-run/react";
import {
  FaCheckCircle,
  FaClock,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhoneAlt,
} from "react-icons/fa";
import Button from "~/components/Button/button";
import DisplayError from "~/components/DisplayError/displayError";
import { FormInput } from "~/components/FormInput/formInput";
import { Checkbox } from "~/components/ui/checkbox";
import { Textarea } from "~/components/ui/textarea";

export const meta: MetaFunction = () => {
  return [
    { title: "Contact Us | Gamautos" },
    {
      name: "description",
      content:
        "Have questions about buying, selling, or renting on GamAutos? Reach out to our team directly.",
    },
  ];
};

interface ContactActionData {
  success?: boolean;
  errors?: {
    firstname?: string;
    lastname?: string;
    email?: string;
    message?: string;
    form?: string;
  };
}

// Runs on the server when the form is sent
export const action = async ({ request }: ActionFunctionArgs) => {
  const form = await request.formData();

  // Spam trap: real people never fill in this hidden field
  if (form.get("website")) return { success: true };

  const firstname = String(form.get("firstname") || "").trim();
  const lastname = String(form.get("lastname") || "").trim();
  const email = String(form.get("email") || "").trim();
  const phone = String(form.get("phone") || "").trim();
  const message = String(form.get("message") || "").trim();
  const subscribe = form.get("subscribe") === "on";

  // Check the fields
  const errors: NonNullable<ContactActionData["errors"]> = {};
  if (!firstname) errors.firstname = "Please enter your first name.";
  if (!lastname) errors.lastname = "Please enter your last name.";
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (message.length < 10) {
    errors.message = "Please write a short message (at least 10 characters).";
  }
  if (Object.keys(errors).length > 0) return { errors };

  // Email the message to your team using Resend
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "GamAutos Website <noreply@gamautos.com>",
        to: [process.env.CONTACT_TO_EMAIL || "support@gamautos.com"],
        reply_to: email,
        subject: `New message from ${firstname} ${lastname}`,
        text: [
          `Name: ${firstname} ${lastname}`,
          `Email: ${email}`,
          `Phone: ${phone || "not given"}`,
          `Wants market updates: ${subscribe ? "yes" : "no"}`,
          "",
          message,
        ].join("\n"),
      }),
    });

    if (!response.ok) throw new Error(`Resend returned ${response.status}`);

    return { success: true };
  } catch (error) {
    console.error("Contact form error:", error);
    return {
      errors: {
        form: "Sorry, we could not send your message. Please call us instead.",
      },
    };
  }
};

// Same style for every input
const inputStyle =
  "rounded-xl border-slate-700 bg-slate-800/80 text-sm font-medium text-white shadow-sm placeholder:text-slate-500 focus:bg-slate-800 [&_input]:text-white";

const contactCards = [
  {
    icon: <FaPhoneAlt size={20} />,
    label: "Call Us",
    value: "+220 725 2222",
    href: "tel:+2207252222",
  },
  {
    icon: <FaEnvelope size={20} />,
    label: "Email Us",
    value: "support@gamautos.com",
    href: "mailto:support@gamautos.com",
  },
  {
    icon: <FaClock size={20} />,
    label: "Working Hours",
    value: "Mon - Sat: 8AM - 6PM",
  },
  {
    icon: <FaMapMarkerAlt size={20} />,
    label: "Location",
    value: "Kanifing / Banjul, The Gambia",
  },
];

const ContactPage = () => {
  const actionData = useActionData<ContactActionData>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const errors = actionData?.errors;

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-slate-950 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-5xl space-y-8">
        {/* HEADER */}
        <div className="space-y-3 text-center">
          <h1 className="text-3xl font-extrabold uppercase tracking-tight text-white sm:text-4xl">
            Contact <span className="text-yellow">Us</span>
          </h1>
          <p className="mx-auto max-w-lg text-sm text-slate-400">
            Have questions about buying, selling, or renting on GamAutos? Reach
            out to our team directly.
          </p>
        </div>

        {/* QUICK CONTACT CARDS */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {contactCards.map((card) => (
            <div
              key={card.label}
              className="flex items-center gap-4 rounded-2xl border border-slate-800 bg-slate-900/90 p-5 text-white"
            >
              <div className="shrink-0 rounded-xl bg-yellow/10 p-3 text-yellow">
                {card.icon}
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  {card.label}
                </p>
                {card.href ? (
                  <a
                    href={card.href}
                    className="break-words text-sm font-semibold transition-colors hover:text-yellow"
                  >
                    {card.value}
                  </a>
                ) : (
                  <p className="text-sm font-semibold text-slate-300">
                    {card.value}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* FORM CARD (or the thank-you message after sending) */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl backdrop-blur-xl sm:p-10">
          {actionData?.success ? (
            <div className="flex flex-col items-center py-8 text-center">
              <FaCheckCircle size={48} className="text-yellow" />
              <h2 className="mt-4 text-2xl font-black text-white">
                Message sent!
              </h2>
              <p className="mt-2 max-w-sm text-sm text-slate-400">
                Thank you for contacting GamAutos. We will get back to you as
                soon as we can.
              </p>
              <Link
                to="/inventory"
                className="mt-6 rounded-xl bg-yellow px-6 py-3 text-sm font-bold uppercase tracking-wider text-slate-950 transition hover:bg-amber-300 active:scale-95"
              >
                Browse cars
              </Link>
            </div>
          ) : (
            <Form method="post" className="space-y-6">
              {errors?.form && <DisplayError error={errors.form} />}

              {/* Spam trap: hidden from people, bots fill it in */}
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
              />

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="space-y-1">
                  <FormInput
                    label="First Name"
                    name="firstname"
                    placeholder="Kunta"
                    className={inputStyle}
                  />
                  {errors?.firstname && <DisplayError error={errors.firstname} />}
                </div>
                <div className="space-y-1">
                  <FormInput
                    label="Last Name"
                    name="lastname"
                    placeholder="Sidibeh"
                    className={inputStyle}
                  />
                  {errors?.lastname && <DisplayError error={errors.lastname} />}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="space-y-1">
                  <FormInput
                    label="Email Address"
                    type="email"
                    name="email"
                    placeholder="name@example.com"
                    className={inputStyle}
                  />
                  {errors?.email && <DisplayError error={errors.email} />}
                </div>
                <FormInput
                  label="Phone Number (optional)"
                  type="tel"
                  name="phone"
                  placeholder="+220 000 0000"
                  className={inputStyle}
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="message"
                  className="text-xs font-semibold text-slate-300"
                >
                  Your Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tell us how we can help..."
                  rows={5}
                  className="w-full resize-none rounded-xl border-slate-700 bg-slate-800/80 p-4 text-sm text-white transition-all placeholder:text-slate-500 focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-yellow/50"
                />
                {errors?.message && <DisplayError error={errors.message} />}
              </div>

              <div className="flex items-start space-x-3 pt-2">
                <Checkbox
                  id="subscribe"
                  name="subscribe"
                  className="mt-0.5 border-slate-700 bg-slate-800 data-[state=checked]:bg-yellow data-[state=checked]:text-black"
                />
                <label
                  htmlFor="subscribe"
                  className="cursor-pointer select-none text-xs font-medium text-slate-400"
                >
                  Subscribe to receive market updates and exclusive vehicle
                  deals.
                </label>
              </div>

              <Button
                title={isSubmitting ? "Sending..." : "Send Message"}
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-xl bg-yellow py-4 text-xs font-black uppercase tracking-wider text-slate-950 shadow-xl transition-all hover:bg-amber-300 active:scale-95 sm:rounded-2xl sm:text-sm"
              />
            </Form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactPage;

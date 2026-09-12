import { Form } from "@remix-run/react";
import { FaClock, FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import Button from "~/components/Button/button";
import { FormInput } from "~/components/FormInput/formInput";
import Heading from "~/components/Heading/heading";
import { Checkbox } from "~/components/ui/checkbox";
import { Textarea } from "~/components/ui/textarea";

const ContactPage = () => {
  return (
    <div className="min-h-screen w-full bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
      <div className="max-w-5xl w-full space-y-8">

        {/* HEADER SECTION */}
        <div className="text-center space-y-3">
          <Heading
            title="Contact Us"
            classNames="uppercase text-3xl sm:text-4xl font-extrabold text-white tracking-tight"
          />
          <p className="text-slate-400 text-sm max-w-lg mx-auto">
            Have questions about buying, selling, or renting on GamAutos? Reach out to our team directly.
          </p>
        </div>

        {/* QUICK CONTACT HIGHLIGHT CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl flex items-center gap-4 text-white">
            <div className="p-3 bg-yellow/10 text-yellow rounded-xl shrink-0">
              <FaPhoneAlt size={20} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Call Us</p>
              <a href="tel:+2207531646" className="text-sm font-semibold hover:text-yellow transition-colors">
                +220 753 1646
              </a>
            </div>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl flex items-center gap-4 text-white">
            <div className="p-3 bg-yellow/10 text-yellow rounded-xl shrink-0">
              <FaEnvelope size={20} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Email Us</p>
              <a href="mailto:gamautos@gamautos.gm" className="text-sm font-semibold hover:text-yellow transition-colors">
                gamautos@gamautos.gm
              </a>
            </div>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl flex items-center gap-4 text-white">
            <div className="p-3 bg-yellow/10 text-yellow rounded-xl shrink-0">
              <FaClock size={20} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Working Hours</p>
              <p className="text-sm font-semibold text-slate-300">Mon - Sat: 8AM - 6PM</p>
            </div>
          </div>
        </div>

        {/* MAIN FORM CARD */}
        <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl">
          <Form method="post" className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <FormInput
                label="First Name"
                name="firstname"
                placeholder="Sain"
                className="bg-slate-800/80 border-slate-700 focus:bg-slate-800 text-slate-300 placeholder:text-slate-500 rounded-xl"
              />
              <FormInput
                label="Last Name"
                name="lastname"
                placeholder="Sidibeh"
                className="bg-slate-800/80 border-slate-700 focus:bg-slate-800 text-white placeholder:text-slate-500 rounded-xl"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <FormInput
                label="Email Address"
                type="email"
                name="email"
                placeholder="name@example.com"
                className="bg-slate-800/80 border-slate-700 focus:bg-slate-800 text-white placeholder:text-slate-500 rounded-xl"
              />
              <FormInput
                label="Phone Number"
                name="phone"
                placeholder="+220 000 0000"
                className="bg-slate-800/80 border-slate-700 focus:bg-slate-800 text-white placeholder:text-slate-500 rounded-xl"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="message" className="text-xs font-semibold text-slate-300">
                Your Message
              </label>
              <Textarea
                id="message"
                name="message"
                placeholder="Tell us how we can help..."
                rows={5}
                className="w-full bg-slate-800/80 border-slate-700 focus:bg-slate-800 text-white placeholder:text-slate-500 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-yellow/50 transition-all resize-none"
              />
            </div>

            <div className="flex items-start space-x-3 pt-2">
              <Checkbox
                id="subscribe"
                className="mt-0.5 border-slate-700 bg-slate-800 data-[state=checked]:bg-yellow data-[state=checked]:text-black"
              />
              <label
                htmlFor="subscribe"
                className="text-xs text-slate-400 font-medium cursor-pointer select-none"
              >
                Subscribe to receive market updates and exclusive vehicle deals.
              </label>
            </div>

            <Button
              title="Send Message"
              type="submit"
              className="w-full py-4 bg-yellow hover:bg-primary text-white font-black rounded-xl sm:rounded-2xl transition-all active:scale-95 shadow-xl uppercase tracking-wider text-xs sm:text-sm"
            />
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;

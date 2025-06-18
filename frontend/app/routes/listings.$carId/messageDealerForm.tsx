import { Form } from "@remix-run/react";
import Button from "~/components/Button/button";
import SubHeading from "~/components/Heading/subheading";

export const MessageDealerForm = ({}) => {
  return (
    <div className="relative col-span-12 md:col-span-7 lg:col-span-8">
      <div className="mt-10 flex w-full flex-col gap-2">
        <SubHeading title="message to dealer" />
        <Form action="" method="post">
          <textarea
            name="message"
            rows={8}
            placeholder="Your Message"
            className="w-full p-3 text-[13px] outline-none"
          ></textarea>

          {/* inputs */}
          <div className="relative my-3 grid grid-cols-9 gap-2">
            <div className="col-span-3 flex flex-col gap-2">
              <label
                htmlFor="name"
                className="text-[13px] font-semibold uppercase"
              >
                Name<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter name"
                className="gray__text-medium px-3 py-1 text-[13px] outline-none"
                name="name"
              />
            </div>
            {/* Email */}
            <div className="col-span-3 flex flex-col gap-2">
              <label
                htmlFor="email"
                className="text-[13px] font-semibold uppercase"
              >
                EMAIL <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter email"
                className="gray__text-medium px-3 py-1 text-[13px] outline-none"
                name="email"
              />
            </div>
            {/* PHONE */}
            <div className="col-span-3 flex flex-col gap-2">
              <label
                htmlFor="phone"
                className="text-[13px] font-semibold uppercase"
              >
                PHONE<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter phone"
                className="gray__text-medium px-3 py-1 text-[13px] outline-none"
                name="phone"
              />
            </div>
          </div>
          <PrivacyPolicy />

          <Button
            title="send message"
            classNames="text-[13px] mt-5 text-white mb-5 lg:mb-20"
          />
        </Form>
      </div>
    </div>
  );
};

function PrivacyPolicy({}) {
  return (
    <div className="mt-2 flex items-center gap-1">
      <input type="checkbox" name="policy" />
      <span className="gray__text-medium text-[13px]">
        I accept the <span className="text-yellow">privacy policy.</span>
      </span>
    </div>
  );
}

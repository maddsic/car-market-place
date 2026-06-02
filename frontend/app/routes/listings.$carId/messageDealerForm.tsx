import { Form } from "@remix-run/react";
import Button from "~/components/Button/button";
import SubHeading from "~/components/Heading/subheading";

interface MessageDealerFormProps {
  formRef: React.RefObject<HTMLFormElement>;
  isSubmitting: boolean;
  messageActionData: any;
}

export const MessageDealerForm = ({ formRef, isSubmitting, messageActionData }: MessageDealerFormProps) => {
  const fieldErrors = messageActionData?.errors || {};
  const formValues = messageActionData?.values || {};
  return (
    <div className="relative col-span-12 md:col-span-7 lg:col-span-8">
      <div className="mt-10 flex w-full flex-col gap-2">
        <SubHeading title="message to dealer" />
        <Form ref={formRef} action="" method="post">
          <div className="flex flex-col gap-1">
            <textarea
              name="content"
              rows={8}
              placeholder="Your Message"
              defaultValue={formValues.content || ""}
              className={`w-full p-3 text-[13px] outline-none border ${fieldErrors?.content ? "border-red-500" : "border-transparent"
                }`}
              disabled={isSubmitting}
            ></textarea>
            {fieldErrors?.content && (
              <span className="text-red-500 text-[11px] font-medium">{fieldErrors.content}</span>
            )}
          </div>

          {/* inputs */}
          <div className="relative my-3 grid grid-cols-9 gap-2">
            {/* Name */}
            <div className="col-span-3 flex flex-col gap-1">
              <label htmlFor="senderName" className="text-[13px] font-semibold uppercase">
                Name<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter name"
                name="senderName"
                defaultValue={formValues?.senderName || ""}
                className={`gray__text-medium px-3 py-1 text-[13px] outline-none border ${fieldErrors?.senderName ? "border-red-500" : "border-transparent"
                  }`}
                disabled={isSubmitting}
              />
              {fieldErrors?.senderName && (
                <span className="text-red-500 text-[11px] font-medium">{fieldErrors.senderName}</span>
              )}
            </div>

            {/* Email */}
            <div className="col-span-3 flex flex-col gap-1">
              <label htmlFor="senderEmail" className="text-[13px] font-semibold uppercase">
                EMAIL <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter email"
                name="senderEmail"
                defaultValue={formValues?.senderEmail || ""}
                className={`gray__text-medium px-3 py-1 text-[13px] outline-none border ${fieldErrors?.senderEmail ? "border-red-500" : "border-transparent"
                  }`}
                disabled={isSubmitting}
              />
              {fieldErrors?.senderEmail && (
                <span className="text-red-500 text-[11px] font-medium">{fieldErrors.senderEmail}</span>
              )}
            </div>

            {/* PHONE */}
            <div className="col-span-3 flex flex-col gap-1">
              <label htmlFor="senderPhone" className="text-[13px] font-semibold uppercase">
                PHONE
              </label>
              <input
                type="text"
                placeholder="Enter phone"
                name="senderPhone"
                defaultValue={formValues?.senderPhone || ""}
                className={`gray__text-medium px-3 py-1 text-[13px] outline-none border ${fieldErrors?.senderPhone ? "border-red-500" : "border-transparent"
                  }`}
                disabled={isSubmitting}
              />
              {fieldErrors?.senderPhone && (
                <span className="text-red-500 text-[11px] font-medium">{fieldErrors.senderPhone}</span>
              )}
            </div>
          </div>
          {/* <PrivacyPolicy /> */}

          <Button
            title="send message"
            className="my-2 text-[13px] text-white lg:mb-20"
            disabled={isSubmitting}
          />
        </Form>
      </div>
    </div>
  );
};

// function PrivacyPolicy({ }) {
//   return (
//     <div className="mt-2 flex items-center gap-1">
//       <input type="checkbox" name="policy" />
//       <span className="gray__text-medium text-[13px]">
//         I accept the <span className="text-yellow">privacy policy.</span>
//       </span>
//     </div>
//   );
// }

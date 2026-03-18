import { Form } from "@remix-run/react";
import Button from "~/components/Button/button";
import { FormInput } from "~/components/FormInput/formInput";
import Heading from "~/components/Heading/heading";
import { Card } from "~/components/ui/card";
import { Checkbox } from "~/components/ui/checkbox";
import { Textarea } from "~/components/ui/textarea";
import { cn } from "~/lib/utils";

const ContactPage = () => {
  return (
    <div className="input__bg">
      <div className="max__container relative flex h-[calc(100vh-80px)] items-center justify-center">
        <Card className="relative flex w-full flex-col gap-5 p-7 shadow-lg md:gap-10 md:p-10 lg:p-20">
          <Heading title="Contact us" classNames="uppercase lg:text-[28px]" />

          <Form className="relative">
            <div className="grid grid-cols-12 gap-5">
              <div className="col-span-12 md:col-span-7">
                <div className="grid gap-5 md:grid-cols-2">
                  <FormInput
                    label="First Name"
                    name="firstname"
                    placeholder="Enter your first name"
                  />
                  <FormInput
                    label="Last Name"
                    name="lastname"
                    placeholder="Enter your last name"
                  />
                  <FormInput
                    label="Email"
                    type="email"
                    name="email"
                    placeholder="gamautos@gamautos.gm"
                  />
                  <FormInput
                    label="Phone"
                    name="phone"
                    placeholder="Phone number"
                  />
                </div>
                {/* CHECKBOX */}
                <Subscribe classNames="hidden md:block" />
              </div>

              {/* MSG */}
              <div className="col-span-12 md:col-span-5">
                <div className="flex flex-col gap-1">
                  <label htmlFor="message">Message</label>
                  <Textarea
                    name="message"
                    placeholder="Enter your message"
                    className="font-body gray__text-light focus-none rounded-none border-none pl-5 text-xs outline-none"
                    style={{ backgroundColor: "#f0f2f5" }}
                    rows={6}
                  />
                </div>
                <Subscribe classNames="md:hidden" />
                <Button
                  title={"Submit"}
                  classNames="mt-10 text-white shadow w-full p-3"
                />
              </div>
            </div>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default ContactPage;

function Subscribe({ classNames }: { classNames?: string }) {
  return (
    <div className={cn(`mt-10 flex items-center space-x-2 ${classNames}`)}>
      <Checkbox id="subscribe" className="border-none bg-[#f0f2f5]" />
      <label
        htmlFor="subscribe"
        className="gray__text-soft text-[10px] font-medium leading-4 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 md:text-xs"
      >
        Stay updated with the latest deals and exclusive offers—subscribe to our
        email list today!
      </label>
    </div>
  );
}

import { Form } from "@remix-run/react";
import { FaStar } from "react-icons/fa";
import SubHeading from "~/components/Heading/subheading";

interface DealerWriteReviewTabProps {
  isLoggedIn: boolean;
}

export default function WriteReview({ isLoggedIn }: DealerWriteReviewTabProps) {
  return (
    <section>
      <SubHeading
        className="font-extrabold capitalize md:text-xl"
        title="Write a Review"
      />

      {!isLoggedIn ? (
        <div className="mt-5 text-center text-gray-600">
          <p>
            Please{" "}
            <span className="cursor-pointer font-semibold text-blue-600 hover:underline">
              login
            </span>{" "}
            to write a review.
          </p>
        </div>
      ) : (
        <Form
          method="post"
          className="mx-auto mt-5 flex max-w-xl flex-col gap-4"
        >
          <div className="flex items-center justify-center gap-2">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <FaStar
                  key={i}
                  className="hover:text-yellow-400 cursor-pointer text-gray-300 transition"
                  size={24}
                />
              ))}
          </div>

          <textarea
            rows={4}
            placeholder="Write your experience with this dealer..."
            className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-primary"
          ></textarea>

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 py-2 font-semibold text-white transition hover:bg-blue-700"
          >
            Submit Review
          </button>
        </Form>
      )}
    </section>
  );
}

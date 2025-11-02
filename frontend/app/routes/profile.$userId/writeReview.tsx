import { useState } from "react";
import { Form } from "@remix-run/react";
import { FaStar } from "react-icons/fa";
import SubHeading from "~/components/Heading/subheading";

interface DealerWriteReviewTabProps {
  isLoggedIn: boolean;
}

const ratingData = [
  { key: "buyingProcess", label: "Buying Process " },
  { key: "customerService", label: "Customer Service " },
  { key: "overallExperience", label: "Overall Experience" },
];

export default function WriteReview({ isLoggedIn }: DealerWriteReviewTabProps) {
  // Track rating for each category
  const [ratings, setRatings] = useState({
    buyingProcess: 0,
    customerService: 0,
    overallExperience: 0,
  });

  // Track hover state for nice star highlight effect
  const [hover, setHover] = useState({
    buyingProcess: 0,
    customerService: 0,
    overallExperience: 0,
  });

  // "buyingProcess" | "customerService" | "overallExperience" value: number
  const handleRating = (field: keyof typeof ratings, value: number) => {
    setRatings((prev) => ({ ...prev, [field]: value }));
  };

  // "buyingProcess" | "customerService" | "overallExperience" value: number
  const handleHover = (field: keyof typeof hover, value: number) => {
    setHover((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <section className="w-full pb-10">
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
          className="mx-auto mt-8 flex max-w-2xl flex-col gap-8 rounded-lg bg-white p-6 shadow-md"
        >
          {/* Rating Categories */}
          <div className="flex flex-col gap-6 lg:flex-row lg:justify-between lg:gap-10">
            {ratingData.map(({ key, label }) => (
              <div key={key}>
                <p className="mb-2 font-semibold text-gray-700">{label}</p>
                <div className="flex items-center gap-2">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => {
                      const index = i + 1;
                      return (
                        <FaStar
                          key={i}
                          size={26}
                          className={`cursor-pointer transition ${
                            index <=
                            (hover[key as keyof typeof hover] ||
                              ratings[key as keyof typeof ratings])
                              ? "text-yellow"
                              : "text-gray-300"
                          }`}
                          onClick={() =>
                            handleRating(key as keyof typeof ratings, index)
                          }
                          onMouseEnter={() =>
                            handleHover(key as keyof typeof hover, index)
                          }
                          onMouseLeave={() =>
                            handleHover(
                              key as keyof typeof hover,
                              ratings[key as keyof typeof ratings],
                            )
                          }
                        />
                      );
                    })}
                </div>
              </div>
            ))}
          </div>
          {/* Review Text */}
          <div>
            <p className="mb-2 font-semibold text-gray-700">Your Comments</p>
            <textarea
              rows={5}
              name="comment"
              placeholder="Share your detailed experience with this dealer..."
              className="w-full rounded-lg border border-gray-300 p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full rounded-lg bg-primary py-3 font-semibold text-white transition hover:bg-primary/90"
          >
            Submit Review
          </button>
        </Form>
      )}
    </section>
  );
}

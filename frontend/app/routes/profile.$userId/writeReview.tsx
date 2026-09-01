import { useEffect, useRef, useState } from "react";
import { Form, Link, useActionData, useNavigation } from "@remix-run/react";
import { FaStar } from "react-icons/fa";
import SubHeading from "~/components/Heading/subheading";
import LoadingIndicator from "~/components/Loader/loadingIndicator";
import { toast } from "react-toastify";

interface DealerWriteReviewTabProps {
  isUserLoggedIn: boolean;
}

const ratingData = [
  { key: "buyingProcess", label: "Buying Process " },
  { key: "customerService", label: "Customer Service " },
  { key: "overallExperience", label: "Overall Experience" },
];

export default function WriteReview({
  isUserLoggedIn,
}: DealerWriteReviewTabProps) {
  const actionData = useActionData<{ success?: boolean; message?: string }>();
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

  const formRef = useRef<HTMLFormElement>(null);

  const navigation = useNavigation();
  const loading = navigation.state === "loading";
  const isSubmitting = navigation.state === "submitting";

  useEffect(() => {
    if (actionData?.success) {
      toast.success(actionData.message || "Review submitted successfully");
      // 2. Reset native HTML inputs (like <textarea name="comment">)
      formRef.current?.reset();
      // 3. Reset ratings and hover state
      setRatings({
        buyingProcess: 0,
        customerService: 0,
        overallExperience: 0,
      });
    } else if (actionData?.success === false) {
      toast.error(actionData.message || "Failed to submit review");
    }
  }, [actionData]);

  // "buyingProcess" | "customerService" | "overallExperience" value: number
  const handleRating = (field: string, value: number) => {
    setRatings((prev) => ({ ...prev, [field]: value }));
  };

  // "buyingProcess" | "customerService" | "overallExperience" value: number
  const handleHover = (field: string, value: number) => {
    setHover({ ...hover, [field]: value })
  }

  return (
    <section className="w-full pb-10">
      <LoadingIndicator isLoading={loading} />
      <SubHeading
        className="font-extrabold capitalize md:text-xl"
        title="Write a Review"
      />

      {!isUserLoggedIn ? (
        <div className="mt-5 text-center text-gray-600">
          <p>
            Please{" "}
            <Link
              to={"/auth/login"}
              className="cursor-pointer font-semibold text-blue-600 hover:underline"
            >
              login
            </Link>{" "}
            to write a review.
          </p>
        </div>
      ) : (
        <Form
          ref={formRef}
          method="post"
          className="mx-auto mt-8 flex max-w-2xl flex-col gap-8 rounded-lg bg-white p-6 shadow-md"
        >
          {/* HIDDEN INPUTS TO PASS STAR VALUES TO REMIX ACTION */}
          <input type="hidden" name="buyingProcess" value={ratings.buyingProcess} />
          <input type="hidden" name="customerService" value={ratings.customerService} />
          <input type="hidden" name="overallExperience" value={ratings.overallExperience} />

          {/* RATING CATEGORIES */}
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
                          className={`cursor-pointer transition ${index <=
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
              required
              placeholder="Share your detailed experience with this dealer..."
              className="w-full rounded-lg border border-gray-300 p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full rounded-lg bg-primary py-3 font-semibold text-white transition hover:bg-primary/90"
          >
            {isSubmitting ? "Submitting..." : "Submit Review"}
          </button>
        </Form>
      )}
    </section>
  );
}

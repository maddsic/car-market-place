import { FaStar } from "react-icons/fa";

interface ReviewTabProps {
  reviews: any[];
}

export default function Reviews({ reviews }: ReviewTabProps) {
  return (
    <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-2xl font-bold text-gray-800">
        Reviews{" "}
        <span className="text-base text-gray-500">({reviews.length})</span>
      </h2>
      <hr className="mb-6" />

      {reviews.map((review) => (
        <div key={review.reviewId} className="mb-8 border-b pb-6">
          {/* Overall Rating */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex w-fit items-center gap-3 rounded-lg bg-primary px-4 py-2 text-white">
              <span className="text-2xl font-bold">
                {review.overallExperience.toFixed(1)}
              </span>
              <div className="flex gap-1">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <FaStar
                      key={i}
                      size={18}
                      className={
                        i < Math.round(review.overallExperience)
                          ? "text-yellow"
                          : "text-gray-400"
                      }
                    />
                  ))}
              </div>
            </div>

            {/* Rating Categories */}
            <div className="grid grid-cols-1 gap-3 text-sm text-gray-700 sm:grid-cols-3">
              <div>
                <p className="font-semibold">Customer Service</p>
                <div className="flex items-center gap-1">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <FaStar
                        key={i}
                        size={14}
                        className={
                          i < review.customerService
                            ? "text-yellow"
                            : "text-gray-300"
                        }
                      />
                    ))}
                  <span className="ml-1 text-xs text-gray-500">
                    {review.customerService.toFixed(1)} out of 5.0
                  </span>
                </div>
              </div>

              <div>
                <p className="font-semibold">Buying Process</p>
                <div className="flex items-center gap-1">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <FaStar
                        key={i}
                        size={14}
                        className={
                          i < review.buyingProcess
                            ? "text-yellow"
                            : "text-gray-300"
                        }
                      />
                    ))}
                  <span className="ml-1 text-xs text-gray-500">
                    {review.buyingProcess.toFixed(1)} out of 5.0
                  </span>
                </div>
              </div>

              <div>
                <p className="font-semibold">Overall Experience</p>
                <div className="flex items-center gap-1">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <FaStar
                        key={i}
                        size={14}
                        className={
                          i < review.overallExperience
                            ? "text-yellow"
                            : "text-gray-300"
                        }
                      />
                    ))}
                  <span className="ml-1 text-xs text-gray-500">
                    {review.overallExperience.toFixed(1)} out of 5.0
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Review Content */}
          <div className="mt-5">
            <h3 className="mb-2 font-bold text-gray-800">Comment</h3>
            <p className="mb-3 leading-relaxed text-gray-600">
              {review.comment}
            </p>

            <div className="flex items-center justify-between text-sm text-gray-500">
              <p>
                By{" "}
                <span className="font-medium capitalize">
                  {review.user.username}
                </span>{" "}
                | Would I recommend this Dealer:{" "}
                <span className="font-semibold text-emerald-700">
                  {review.overallExperience ? "Yes 👍" : "No 👎"}
                </span>
              </p>
              <span className="text-xs underline hover:text-gray-700">
                Posted: {new Date(review.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

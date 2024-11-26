import React from "react";

export const FormatDate = ({
  createdAt,
}: {
  createdAt: Date | string;
}): string => {
  const date = new Date(createdAt);

  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export default FormatDate;

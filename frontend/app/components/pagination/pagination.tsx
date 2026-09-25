import React from "react";
import PrevButton from "~/components/PaginationLeft/prev";
import NextButton from "~/components/PaginationRight/next";
import { cn } from "~/lib/utils";

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  startIndex: number;
  onNext: () => void;
  onPrev: () => void;
  onPageSelect?: (pageNumber: number) => void;
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  startIndex,
  onNext,
  onPrev,
  onPageSelect,
  className,
}) => {
  if (!totalItems || totalItems === 0) return null;

  const currentPage = Math.floor(startIndex / itemsPerPage) + 1;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Generate array of page numbers [1, 2, 3, ...]
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className={cn("mt-10 flex items-center justify-between", className)}>
      {/* PREV BUTTON */}
      <PrevButton startIndex={startIndex} handlePrev={onPrev} />

      {/* DYNAMIC PAGINATION PAGE NUMBERS */}
      <div className="flex items-center gap-2">
        {pageNumbers.map((page) => {
          const isActive = page === currentPage;
          return (
            <button
              key={page}
              type="button"
              onClick={() => onPageSelect && onPageSelect(page)}
              className={cn(
                "rounded px-4 py-1 font-semibold text-white transition-colors duration-200",
                isActive ? "bg-yellow text-gray-800" : "bg-gray-200"
              )}
            >
              {page}
            </button>
          );
        })}
      </div>

      {/* NEXT BUTTON */}
      <NextButton
        handleNext={onNext}
        startIndex={startIndex}
        carsPerPage={itemsPerPage}
        carsLength={totalItems}
      />
    </div>
  );
};

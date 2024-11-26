import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Heading from "../Heading/heading";
import CategoryImage from "./categoryImage";
import { category } from "~/data/category";
import { useNavigate } from "@remix-run/react";
import { useEffect, useState } from "react";
import PrevButton from "../PaginationLeft/prev";
import NextButton from "../PaginationRight/next";

const Category = () => {
  const [startIndex, setStartIndex] = useState<number>(0);
  const [carsPerPage, setCarsPerPage] = useState<number>(4);
  const navigate = useNavigate();

  const handleNavigate = (section: string, value: string) => {
    navigate(`/inventory?section=${section}&value=${value}`);
  };

  useEffect(() => {
    const width = window.innerWidth;

    // Detect window Size
    const handleWindowSizeChanged = () => {
      if (width < 768) {
        setCarsPerPage(1);
      } else {
        setCarsPerPage(4);
      }
    };

    // Invoke our function
    handleWindowSizeChanged();
    window.addEventListener("resize", handleWindowSizeChanged);

    // cleanup function
    return () => window.removeEventListener("resize", handleWindowSizeChanged);
  }, []);

  // next button
  const handleNext = () => {
    if (startIndex + 1 < category.length - carsPerPage + 1) {
      setStartIndex(startIndex + 4);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 4);
    }
  };

  return (
    <div className="max__container">
      <div className="flex items-center justify-between">
        <Heading title="Browse By" colouredText="Category" />
        <div className="flex gap-4">
          <PrevButton startIndex={startIndex} handlePrev={handlePrev} />

          <NextButton
            handleNext={handleNext}
            startIndex={startIndex}
            carsPerPage={carsPerPage}
            carsLength={category.length}
          />
        </div>
      </div>

      <div className="mt-10 gap-10 md:grid md:grid-cols-12 md:gap-6">
        {category
          .slice(startIndex, startIndex + carsPerPage)
          .map((category) => (
            <CategoryImage
              key={category.id}
              imgUrl={category.imgUrl}
              classNames={`${category.colSpan} ${category.classNames}`}
              title={category.name}
              count={13}
              onClick={() => handleNavigate("category", category.name)}
            />
          ))}
      </div>
    </div>
  );
};

export default Category;

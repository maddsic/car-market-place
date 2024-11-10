import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Heading from "../Heading/heading";
import CategoryImage from "./categoryImage";
import { category } from "~/data/category";
import { useNavigate } from "@remix-run/react";

const Category = () => {
  const navigate = useNavigate();

  const handleNavigate = (section: string, value: string) => {
    navigate(`/inventory?section=${section}&value=${value}`);
  };
  return (
    <div className="max__container">
      <div className="flex items-center justify-between">
        <Heading title="Browse By" colouredText="Category" />
        <div className="flex gap-4">
          <span className="cursor-pointer rounded-lg bg-gray-200 px-5 py-3 duration-1000 hover:bg-yellow">
            <FaArrowLeft className="text-gray-400" />
          </span>
          <span className="cursor-pointer rounded-lg bg-gray-200 px-5 py-3 duration-1000 hover:bg-yellow">
            <FaArrowRight className="text-gray-400" />
          </span>
        </div>
      </div>

      <div className="mt-10 gap-10 md:grid md:grid-cols-12 md:gap-6">
        {category.map((category) => (
          <CategoryImage
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

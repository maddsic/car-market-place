import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Heading from "../Header/heading";
import CategoryImage from "./categoryImage";

const Category = () => {
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
        <CategoryImage
          imgUrl="/sedan.jpeg"
          classNames="mb-5 md:mb-0"
          title="Sedan"
          count={13}
        />
        <CategoryImage
          imgUrl="/coupe.jpeg"
          classNames="col-span-7 mb-5 md:mb-0"
          title="coupe"
          count={23}
        />
        <CategoryImage
          imgUrl="/convert.jpeg"
          classNames="col-span-7 mb-5 md:mb-0"
          title="convertable"
          count={33}
        />
        <CategoryImage imgUrl="/pickups.jpeg" title="pick-ups" count={43} />
      </div>
    </div>
  );
};

export default Category;

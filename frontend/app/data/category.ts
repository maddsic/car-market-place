import sedan from "/sedan.jpeg?url";
import coupe from "/coupe.jpeg?url";
import convertable from "/convert.jpeg?url";
import pickups from "/pickups.jpeg?url";
import suv from "/category_cars/suv.jpg?url";
import sportcar from "/category_cars/sportcar.jpg?url";
import hatchback from "/category_cars/hatchback.jpeg?url";
import van from "/category_cars/van.jpg?url";

export const category = [
  {
    id: 1,
    name: "sedan",
    imgUrl: sedan,
    colSpan: "col-span-5",
    classNames: "mb-5 md:mb-0",
  },
  {
    id: 2,
    name: "coupe",
    imgUrl: coupe,
    colSpan: "col-span-7",
    classNames: "mb-5 md:mb-0",
  },
  {
    id: 3,
    name: "convertable",
    imgUrl: convertable,
    colSpan: "col-span-7",
    classNames: "mb-5 md:mb-0",
  },
  {
    id: 4,
    name: "pick-ups",
    imgUrl: pickups,
    colSpan: "col-span-5",
    classNames: "mb-5 md:mb-0",
  },
  {
    id: 5,
    name: "sport cars",
    imgUrl: sportcar,
    colSpan: "col-span-5",
    classNames: "mb-5 md:mb-0",
  },
  {
    id: 6,
    name: "suv",
    imgUrl: suv,
    colSpan: "col-span-7",
    classNames: "mb-5 md:mb-0",
  },
  {
    id: 7,
    name: "hatchback",
    imgUrl: hatchback,
    colSpan: "col-span-7",
    classNames: "mb-5 md:mb-0",
  },
  {
    id: 8,
    name: "van",
    imgUrl: van,
    colSpan: "col-span-5",
    classNames: "mb-5 md:mb-0",
  },
];

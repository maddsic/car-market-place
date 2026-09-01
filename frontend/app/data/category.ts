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
    title: "Sedan",
    name: "Sedan",          // Exact DB match
    slug: "sedan",           // Clean URL parameter
    imgUrl: sedan,
    colSpan: "col-span-5",
    classNames: "mb-5 md:mb-0",
  },
  {
    id: 2,
    title: "Coupe",
    name: "Coupe",
    slug: "coupe",
    imgUrl: coupe,
    colSpan: "col-span-7",
    classNames: "mb-5 md:mb-0",
  },
  {
    id: 3,
    title: "Convertible",
    name: "Convertible",     // Fixed spelling to match DB
    slug: "convertible",
    imgUrl: convertable,
    colSpan: "col-span-7",
    classNames: "mb-5 md:mb-0",
  },
  {
    id: 4,
    title: "Pickup Truck",
    name: "Pickup Truck",    // Exact DB match
    slug: "pick-ups",        // Retains your clean URL slug
    imgUrl: pickups,
    colSpan: "col-span-5",
    classNames: "mb-5 md:mb-0",
  },
  {
    id: 5,
    title: "Sports Car",
    name: "Sports Car",
    slug: "sports-car",
    imgUrl: sportcar,
    colSpan: "col-span-5",
    classNames: "mb-5 md:mb-0",
  },
  {
    id: 6,
    title: "SUV",
    name: "SUV",
    slug: "suv",
    imgUrl: suv,
    colSpan: "col-span-7",
    classNames: "mb-5 md:mb-0",
  },
  {
    id: 7,
    title: "Hatchback",
    name: "Hatchback",
    slug: "hatchback",
    imgUrl: hatchback,
    colSpan: "col-span-7",
    classNames: "mb-5 md:mb-0",
  },
  {
    id: 8,
    title: "Van",
    name: "Van",
    slug: "van",
    imgUrl: van,
    colSpan: "col-span-5",
    classNames: "mb-5 md:mb-0",
  },
];

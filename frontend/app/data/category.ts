import sedan from "/sedan.jpeg?url";
import coupe from "/coupe.jpeg?url";
import convertable from "/convert.jpeg?url";
import pickups from "/pickups.jpeg?url";

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
];

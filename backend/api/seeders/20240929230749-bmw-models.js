"use strict";
const { v4: uuidv4 } = require("uuid");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.bulkInsert("CarModel", [
         {
            id: uuidv4(),
            name: "1 Series",
            make_id: "3166c20e-eccd-4a23-bd49-36014e64cf4f",
            createdAt: new Date(),
            updatedAt: new Date(),
         },
         {
            id: uuidv4(),
            name: "2 Series",
            make_id: "3166c20e-eccd-4a23-bd49-36014e64cf4f",
            createdAt: new Date(),
            updatedAt: new Date(),
         },
         {
            id: uuidv4(),
            name: "3 Series",
            make_id: "3166c20e-eccd-4a23-bd49-36014e64cf4f",
            createdAt: new Date(),
            updatedAt: new Date(),
         },
         {
            id: uuidv4(),
            name: "4 Series",
            make_id: "3166c20e-eccd-4a23-bd49-36014e64cf4f",
            createdAt: new Date(),
            updatedAt: new Date(),
         },
         {
            id: uuidv4(),
            name: "5 Series",
            make_id: "3166c20e-eccd-4a23-bd49-36014e64cf4f",
            createdAt: new Date(),
            updatedAt: new Date(),
         },
         {
            id: uuidv4(),
            name: "6 Series",
            make_id: "3166c20e-eccd-4a23-bd49-36014e64cf4f",
            createdAt: new Date(),
            updatedAt: new Date(),
         },
         {
            id: uuidv4(),
            name: "7 Series",
            make_id: "3166c20e-eccd-4a23-bd49-36014e64cf4f",
            createdAt: new Date(),
            updatedAt: new Date(),
         },
         {
            id: uuidv4(),
            name: "8 Series",
            make_id: "3166c20e-eccd-4a23-bd49-36014e64cf4f",
            createdAt: new Date(),
            updatedAt: new Date(),
         },
         {
            id: uuidv4(),
            name: "X1",
            make_id: "3166c20e-eccd-4a23-bd49-36014e64cf4f",
            createdAt: new Date(),
            updatedAt: new Date(),
         },
         {
            id: uuidv4(),
            name: "X2",
            make_id: "3166c20e-eccd-4a23-bd49-36014e64cf4f",
            createdAt: new Date(),
            updatedAt: new Date(),
         },
         {
            id: uuidv4(),
            name: "X3",
            make_id: "3166c20e-eccd-4a23-bd49-36014e64cf4f",
            createdAt: new Date(),
            updatedAt: new Date(),
         },
         {
            id: uuidv4(),
            name: "X4",
            make_id: "3166c20e-eccd-4a23-bd49-36014e64cf4f",
            createdAt: new Date(),
            updatedAt: new Date(),
         },
         {
            id: uuidv4(),
            name: "X5",
            make_id: "3166c20e-eccd-4a23-bd49-36014e64cf4f",
            createdAt: new Date(),
            updatedAt: new Date(),
         },
         {
            id: uuidv4(),
            name: "X6",
            make_id: "3166c20e-eccd-4a23-bd49-36014e64cf4f",
            createdAt: new Date(),
            updatedAt: new Date(),
         },
         {
            id: uuidv4(),
            name: "X7",
            make_id: "3166c20e-eccd-4a23-bd49-36014e64cf4f",
            createdAt: new Date(),
            updatedAt: new Date(),
         },
         {
            id: uuidv4(),
            name: "Z4",
            make_id: "3166c20e-eccd-4a23-bd49-36014e64cf4f",
            createdAt: new Date(),
            updatedAt: new Date(),
         },
      ]);
   },

   //
   async down(queryInterface, Sequelize) {
      await queryInterface.bulkDelete("CarModel", { make_id: "3166c20e-eccd-4a23-bd49-36014e64cf4f" }, {});
   },
};

"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      "videos",
      [
        {
          title: "Music",
          description: "Mario Jazz",
          url: "https://www.youtube.com/watch?v=ZuwTd8wvff0&t=1010s",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Music",
          description: "Mario jazz 2",
          url: "https://www.youtube.com/watch?v=F1xZ_uK2M6c&t=36s",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Music",
          description: "Jazz lofi",
          url: "https://www.youtube.com/watch?v=-R0UYHS8A_A",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("videos", null, {});
  },
};

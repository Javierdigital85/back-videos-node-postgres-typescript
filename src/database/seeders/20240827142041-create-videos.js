"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      "videos",
      [
        {
          title: "Introduction to Node.js",
          description: "the guide for backend",
          url: "https://www.youtube.com/watch?v=o4IDSveslTg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Proyectos para todo Programador y Desarrollador de Software",
          description: "projects",
          url: "https://www.youtube.com/watch?v=WRob5Z0XRd4",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Sequelize",
          description: "configuracion con sequelize",
          url: "https://www.youtube.com/watch?v=VyEKwp6Q4fY",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("People", null, {});
  },
};

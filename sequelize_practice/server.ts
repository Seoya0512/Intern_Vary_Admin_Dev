require("dotenv").config();

import { createApp } from "./app";
import { sequelize } from "./models";

const startServer = async () => {
  const app = createApp();
  const PORT = process.env.PORT;
  await sequelize
    .authenticate()
    .then(() => {
      console.log("Connection has been established successfully.");
    })
    .catch((err: Error) => {
      console.error("Unable to connect to the database:", err);
    });

  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
};

startServer();

import app from "./app";
import db from "./config/database";
import globalConstants from "./conts/globalContants";

const port = process.env.PORT || globalConstants.PORT;

db.sync({ force: false }).then(() => {
  app.listen(port, () => {
    console.log(`El puerto es ${port}`);
  });
});

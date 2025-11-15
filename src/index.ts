import app from "./app";
import db from "./config/database";
import globalConstants from "./conts/globalContants";

// const port = process.env.PORTDEV || process.env.PORT;

db.sync({ force: false }).then(() => {
  app.listen(globalConstants.PORT, () => {
    console.log(`El puerto es ${globalConstants.PORT}`);
  });
});

console.log("puerto",globalConstants.PORT);

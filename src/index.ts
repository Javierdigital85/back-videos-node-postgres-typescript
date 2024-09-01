import app from "./app";
import db from "./config/database";

const port = process.env.PORTDEV || process.env.PORT;

db.sync({ force: false }).then(() => {
  app.listen(port, () => {
    console.log(`El puerto es ${port}`);
  });
});

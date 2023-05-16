import mongoose from "mongoose";
import app from "./app";

const { DB_HOST, PORT = 3000 } = process.env;

if (!DB_HOST) {
  throw new Error('DB_HOST is not set');
}

mongoose
  .connect(DB_HOST)
  .then(() =>
    app.listen(PORT, () => {
      console.log("Database connection successful");
    })
  )
  .catch((error:Error) => {
    console.log(error.message);
    process.exit(1);
  });

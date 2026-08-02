import express from "express";
import connectDB from "./config/database.js";
import HANDLERS from "./handlers/index.js";
import errorMiddleware from "./middleware/error.js";
import { authMiddleware } from "./middleware/auth.js";



const app = express();

const PORT = process.env.PORT;


connectDB();

app.use(express.json());
app.use(authMiddleware);
app.use("/", HANDLERS);
app.use(errorMiddleware);



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
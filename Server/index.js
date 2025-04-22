import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import controller from "./Controller/index.js";
import multer from "multer";
import path from "path";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use(controller);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));

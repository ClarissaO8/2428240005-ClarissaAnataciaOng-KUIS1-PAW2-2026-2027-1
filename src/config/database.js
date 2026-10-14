import express from "express";
import { connectDB } from "./config/database.js";
import produkRouter from "./routes/produk.route.js";

const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/produk", produkRouter);

app.use((req, res) => {
  res.status(404).json({
    meta: {
      status: 404,
      message: `Resource not found: ${req.method} ${req.originalUrl}`
    }
  });
});

export default app;
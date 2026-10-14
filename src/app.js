import express from "express";
import mongoose from "mongoose";
import produkRouter from "./routes/produk.route.js";

const app = express();

const dbName = "ClarissaAnataciaOng_ManajemenProdukToko";
mongoose.connect(`mongodb://127.0.0.1:27017/${dbName}`)
  .then(() => console.log("MongoDB Terkoneksi Sukses!"))
  .catch((err) => console.log("Gagal koneksi: " + err.message));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/produk", produkRouter);

app.use((req, res) => {
  res.status(404).json({ status: "error", message: "Endpoint tidak ditemukan" });
});

export default app;
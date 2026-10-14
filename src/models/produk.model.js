import mongoose from "mongoose";

const produkSchema = new mongoose.Schema(
  {
    nama_produk: {
      type: String,
      required: [true, "Nama produk wajib diisi"],
      trim: true
    },
    harga: {
      type: Number,
      required: [true, "Harga wajib diisi"],
      min: [0, "Harga tidak boleh negatif"]
    },
    stok: {
      type: Number,
      required: [true, "Stok wajib diisi"],
      min: [0, "Stok tidak boleh negatif"],
      default: 0
    }
  },
  {
    timestamps: true,
    collection: "my_produk"
  }
);

const Produk = mongoose.model("Produk", produkSchema);
export default Produk;
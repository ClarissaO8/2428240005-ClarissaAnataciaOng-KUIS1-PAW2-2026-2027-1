import ProdukModel from "../models/produk.model.js";
import mongoose from "mongoose";
import { z } from "zod";

const apiResponse = ({ res, status, message, data }) => {
  return res.status(status).json({
    status: status < 400 ? "success" : "error",
    message,
    data
  });
};

const apiResponseValidation = ({ res, errors }) => {
  return res.status(400).json({
    status: "error",
    message: "Validasi gagal",
    errors: errors.flatten().fieldErrors
  });
};

const StoreProdukSchema = z.object({
  nama_produk: z.string({ required_error: "Nama produk wajib diisi" }).min(1, "Nama produk tidak boleh kosong"),
  harga: z.number({ required_error: "Harga wajib diisi" }).min(0, "Harga tidak boleh negatif"),
  stok: z.number({ required_error: "Stok wajib diisi" }).min(0, "Stok tidak boleh negatif")
});

class ProdukController {
  static async store(req, res) {
    const result = StoreProdukSchema.safeParse(req.body);

    if (!result.success) {
      return apiResponseValidation({ res, errors: result.error });
    }

    const { nama_produk, harga, stok } = result.data;

    const newProduk = await ProdukModel.create({
      nama_produk,
      harga,
      stok
    });

    return apiResponse({ res, status: 201, message: "Produk berhasil di buat", data: newProduk });
  }

  static async index(req, res) {
    const daftarProduk = await ProdukModel.find();
    return apiResponse({ res, status: 200, message: "Berhasil menampilkan semua produk", data: daftarProduk });
  }

  static async show(req, res) {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return apiResponse({ res, status: 400, message: "Format ID tidak valid", data: null });
    }

    const produk = await ProdukModel.findById(id);
    if (!produk) {
      return apiResponse({ res, status: 404, message: "Produk tidak ditemukan", data: null });
    }

    return apiResponse({ res, status: 200, message: "Detail produk ditemukan", data: produk });
  }

  static async update(req, res) {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return apiResponse({ res, status: 400, message: "Format ID tidak valid", data: null });
    }

    const result = StoreProdukSchema.safeParse(req.body);
    if (!result.success) {
      return apiResponseValidation({ res, errors: result.error });
    }

    const { nama_produk, harga, stok } = result.data;

    const produkDiupdate = await ProdukModel.findByIdAndUpdate(
      id,
      { nama_produk, harga, stok },
      { new: true }
    );

    if (!produkDiupdate) {
      return apiResponse({ res, status: 404, message: "Produk tidak ditemukan", data: null });
    }

    return apiResponse({ res, status: 200, message: "Produk berhasil di update", data: produkDiupdate });
  }

  static async destroy(req, res) {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return apiResponse({ res, status: 400, message: "Format ID tidak valid", data: null });
    }

    const produkDihapus = await ProdukModel.findByIdAndDelete(id);
    if (!produkDihapus) {
      return apiResponse({ res, status: 404, message: "Produk tidak ditemukan", data: null });
    }

    return apiResponse({ res, status: 200, message: "Produk berhasil di hapus", data: null });
  }
}

export default ProdukController;
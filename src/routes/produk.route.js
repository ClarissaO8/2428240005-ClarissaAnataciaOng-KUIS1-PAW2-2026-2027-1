import express from "express";
import ProdukController from "../controllers/produk.controller.js";

const router = express.Router();

router.post("/", ProdukController.store);
router.get("/", ProdukController.index);
router.get("/:id", ProdukController.show);
router.put("/:id", ProdukController.update);
router.delete("/:id", ProdukController.destroy);

export default router;
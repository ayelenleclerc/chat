import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.render("index");
});

router.post("/", (req, res) => {});

export default router;

import express from "express";
import * as _e from "../../config/eResponse";
import user from "./service";
const router = express.Router();

router.post("/login", async (req, res) => {
  const conds = req.body;
  const data = await user.getUserLogin(conds);

  res.status(data.status).json({ code: data.status, message: data.message });
});
router.post("/logout", async (req, res) => {
  const conds = req.body.data;
  const data = await user.getUserLogout(conds);

  res.status(data.status).json({ code: data.status, message: data.message });
});


export default router;

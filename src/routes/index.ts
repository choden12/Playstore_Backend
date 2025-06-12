import { Router } from "express";
import reviewRoutes from "./reviewRoutes";
import commentRoutes from "./commentRoutes";

const router = Router();

router.use("/reviews", reviewRoutes);
router.use("/comments", commentRoutes);

export default router;
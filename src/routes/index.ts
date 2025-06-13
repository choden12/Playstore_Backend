import { Router } from "express";
import reviewRoutes from "./reviewRoutes";
import commentRoutes from "./commentRoutes";
import categoryRoutes from "./categoryRoutes";

const router = Router();

router.use("/reviews", reviewRoutes);
router.use("/comments", commentRoutes);
router.use("/categories", categoryRoutes);

export default router;

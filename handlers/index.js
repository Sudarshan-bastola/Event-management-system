import { Router } from "express";
import EVENT_ROUTER from "./event.js";
import CATEGORY_ROUTER from "./category.js";
import USER_ROUTER from "./user.js";
import REGISTRATION_ROUTER from "./registration.js";
import PAYMENT_ROUTER from "./payment.js";
import REVIEWS_ROUTER from "./review.js";
import VENUE_ROUTER from "./venue.js";
import AUTH_ROUTER from "./auth.js";

const router = Router();

router.get("/", (req, res) => {
  res.json({ message: "welcome to the project1 API" });
});

router.use("/users", USER_ROUTER);
router.use("/events", EVENT_ROUTER);
router.use("/categories", CATEGORY_ROUTER);
router.use("/registrations", REGISTRATION_ROUTER);
router.use("/payments", PAYMENT_ROUTER);
router.use("/reviews", REVIEWS_ROUTER);
router.use("/venues", VENUE_ROUTER);
router.use("/auth", AUTH_ROUTER);

export default router;

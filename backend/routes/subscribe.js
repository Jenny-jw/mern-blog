import express from "express";
import Subscriber from "../models/Subscriber";

const router = express.Router();

router.post("/", async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required" });

  try {
    const existing = await Subscriber.findOne({ email });
    if (existing)
      return res.status(409).json({ message: "Email had already subscribed" });
    const newSubscriber = new Subscriber({ email });
    await newSubscriber.save();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

const subscribeRouter = router;
export default subscribeRouter;

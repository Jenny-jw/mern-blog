const express = require("express");
const router = express.Router();

const posts = [
  { id: 1, title: "十三區 - 六個月的家", tags: ["life"] },
  { id: 2, title: "很吵的小孩？", tags: ["education"] },
  { id: 3, title: "貓咪舌頭", tags: ["cooking"] },
];

router.get("/", (req, res) => {
  const tag = req.query.tag;
  const filterd = tag ? posts.filter((p) => p.tags.includes(tag)) : posts;
  res.json(filterd);
});

module.exports = router;

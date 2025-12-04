import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

app.post("/meta-webhook", async (req, res) => {
  try {
    const data = req.body; // بيانات الحملة القادمة من ميتا

    await axios.post(
      "https://hook.us2.make.com/bbvj8zka5uuvjqfochgh4w3ofd7qb6c8",
      data
    );

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to forward data" });
  }
});

app.listen(4000, () => {
  console.log("Backend running on port 4000");
});

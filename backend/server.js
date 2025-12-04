import express from "express";
import { WebSocketServer } from "ws";
import dotenv from "dotenv";
import tiktokAuthRoutes from "./Routes/tiktok.js";

dotenv.config();

// إنشاء تطبيق Express
const app = express();
app.use(express.json());

// ربط TikTok routes
app.use("/api/auth", tiktokAuthRoutes);

// WebSocket Server على المنفذ 8080
const wss = new WebSocketServer({ port: 8080 });
wss.on("listening", () => {
  console.log("خادم WebSocket يعمل على ws://localhost:8080");
});

wss.on("connection", (ws) => {
  console.log("تم الاتصال عبر WebSocket");
  ws.on("message", (message) => {
    console.log("تم استقبال رسالة من العميل:", message.toString());
    ws.send(JSON.stringify({ status: "تم الاستلام بنجاح", received: message.toString() }));
  });
});

// نقطة استقبال Make
app.post("/api/track", (req, res) => {
  console.log("تم استقبال بيانات من Make:", req.body);
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(req.body));
    }
  });
  res.status(200).json({ status: "OK" });
});

// تشغيل Express على المنفذ 8000
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`خادم Express يعمل على http://localhost:${PORT}`);
});

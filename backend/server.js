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

// المنفذ الذي يفرضه Render
const PORT = process.env.PORT || 10000;

// نحصل على نفس السيرفر لتشغيل Express + WebSocket
const server = app.listen(PORT, () => {
  console.log(`🚀 خادم Express يعمل على http://localhost:${PORT}`);
});

// تشغيل WebSocket على نفس السيرفر (ليس منفذ منفصل!)
const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  console.log("🔗 تم الاتصال عبر WebSocket");

  ws.on("message", (message) => {
    console.log("📩 رسالة WebSocket:", message.toString());
    ws.send(
      JSON.stringify({
        status: "تم الاستلام",
        received: message.toString(),
      })
    );
  });
});

// نقطة استقبال Make
app.post("/api/track", (req, res) => {
  console.log("📦 استقبال Make:", req.body);

  wss.clients.forEach((client) => {
    if (client.readyState === 1) {
      client.send(JSON.stringify(req.body));
    }
  });

  res.status(200).json({ status: "OK" });
});

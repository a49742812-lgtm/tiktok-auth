import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

const CLIENT_KEY = process.env.TIKTOK_CLIENT_KEY;
const CLIENT_SECRET = process.env.TIKTOK_CLIENT_SECRET;
const REDIRECT_URI = process.env.TIKTOK_REDIRECT_URI;

// -------------------------------------------
// 1) TikTok Login (إرسال المستخدم لتسجيل الدخول)
router.get("/login", (req, res) => {
  const authUrl = `https://www.tiktok.com/auth/authorize/?client_key=${CLIENT_KEY}&response_type=code&scope=user.info.basic,ad.manage&redirect_uri=${encodeURIComponent(
    REDIRECT_URI
  )}&state=amine_test_state`;

  res.redirect(authUrl);
});

// -------------------------------------------
// 2) TikTok Callback (التقاط الكود مباشرة)
router.get("/callback", async (req, res) => {
  const { code } = req.query;

  if (!code) {
    return res.status(400).send("لم يتم إرسال code من TikTok");
  }

  try {
    // تبادل الكود للحصول على Access Token
    const tokenResponse = await fetch(
      `https://business-api.tiktok.com/open_api/v1.3/oauth2/access_token/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          client_key: CLIENT_KEY,
          client_secret: CLIENT_SECRET,
          code: code,
          grant_type: "authorization_code",
        }),
      }
    );

    const tokenData = await tokenResponse.json();

    // عرض النتيجة مباشرة
    res.json({
      message: "تم تسجيل الدخول بنجاح! هذه بيانات Access Token:",
      code,
      tokenData,
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

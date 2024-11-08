// routes/users.js
import express from "express";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createClient } from "@libsql/client";

const router = express.Router();

dotenv.config();
const dbUrl = process.env.DATABASE_URL;
const authToken = process.env.DATABASE_AUTH_TOKEN;

const client = createClient({
  url: dbUrl,
  authToken: authToken,
});

router.get("/", async (req, res) => {
  try {
    const result = await client.execute("SELECT * FROM users");
    res.json(result.rows);
  } catch (error) {
    console.error("Veritabanı hatası:", error);
    res.status(500).send("Veritabanı hatası");
  }
});

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ error: "Kullanıcı adı, e-posta ve şifre gerekli!" });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await client.execute(
      `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`,
      [username, email, hashedPassword]
    );

    res.status(201).json({ message: "Kullanıcı başarıyla kaydedildi!" });
  } catch (error) {
    console.error("Kullanıcı kaydederken hata:", error);
    res.status(500).json({ error: "Kullanıcı kaydedilirken hata oluştu." });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "E-posta ve şifre gerekli!" });
  }

  try {
    const result = await client.execute(`SELECT * FROM users WHERE email = ?`, [
      email,
    ]);

    const user = result.rows[0];

    if (!user) {
      return res.status(404).json({ error: "Kullanıcı bulunamadı!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: "Şifre yanlış!" });
    }

    const token = jwt.sign(
      { userId: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ message: "Giriş başarılı!", token: token });
  } catch (error) {
    console.error("Kullanıcı girişi hatası:", error);
    res.status(500).json({ error: "Giriş yaparken hata oluştu." });
  }
});

export default router;

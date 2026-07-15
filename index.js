const express = require("express");
const { Pool } = require("pg");

const app = express();
const PORT = 3000;

app.use(express.json());

const pool = new Pool({
  user: "postgres",
  password: "Mahendradwitara",
  host: "localhost",
  port: 5432,
  database: "mahasiswa",   // huruf kecil, sesuai instruksi
});


pool.connect()
  .then(() => console.log("Berhasil terhubung ke database mahasiswa"))
  .catch((err) => console.error("Gagal konek database:", err.message));

app.get("/", (req, res) => {
  res.send("Server Express berjalan!");
});

app.get("/api/biodata", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM biodata ORDER BY id ASC");
    res.status(200).json({
      status: "success",
      total: result.rows.length,
      data: result.rows,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ status: "error", message: err.message });
  }
});

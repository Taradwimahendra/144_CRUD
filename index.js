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


app.post("/api/biodata", async (req, res) => {
  try {
    const { id, nama, nim, kelas } = req.body;
    const result = await pool.query(
      "INSERT INTO biodata (id, nama, nim, kelas) VALUES ($1, $2, $3, $4) RETURNING *",
      [id, nama, nim, kelas]
    );
    res.status(201).json({
      status: "success",
      message: "Data berhasil ditambahkan",
      data: result.rows[0],
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ status: "error", message: err.message });
  }
});

app.put("/api/biodata/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nama, nim, kelas } = req.body;
    const result = await pool.query(
      "UPDATE biodata SET nama = $1, nim = $2, kelas = $3 WHERE id = $4 RETURNING *",
      [nama, nim, kelas, id]
    );
    res.status(200).json({
      status: "success",
      message: "Data berhasil diperbarui",
      data: result.rows[0],
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ status: "error", message: err.message });
  }
});


app.delete("/api/biodata/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM biodata WHERE id = $1", [id]);
    res.status(200).json({
      status: "success",
      message: `Data dengan ID ${id} berhasil dihapus`,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ status: "error", message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});

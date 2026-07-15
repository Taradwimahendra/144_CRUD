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

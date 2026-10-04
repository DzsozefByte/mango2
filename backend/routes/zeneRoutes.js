const express = require('express');
const pool    = require('../db');
const router  = express.Router();

// GET all products
router.get('/', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM banda');
  res.json(rows);
});


// GET single product
router.get('/:id', async (req, res) => {
  const [rows] = await pool.execute(
    'SELECT * FROM banda WHERE id = ?',
    [req.params.id]
  );
  if (!rows.length) return res.status(404).json({ error: 'Not found' });
  res.json(rows[0]);
});

// POST create product
router.post('/', async (req, res) => {
  const { id, nev, mufaj, frontember } = req.body;
  const [result] = await pool.execute(
    'INSERT INTO banda (id, nev, mufaj, frontember) VALUES (?, ?, ?, ?)',
    [id, nev, mufaj, frontember]
  );
  res.status(201).json({ id: result.insertId });
});

router.delete('/:id', async (req, res) => {
  const [result] = await pool.execute(
    'DELETE FROM banda WHERE id = ?',
    [req.params.id]
  );
  res.json({ affectedRows: result.affectedRows });
});

router.put('/:id', async (req, res) => {
  const { nev, mufaj, frontember } = req.body;
  const [result] = await pool.execute(
    'UPDATE banda SET nev = ?, mufaj = ?, frontember = ? WHERE id = ?',
    [nev, mufaj, frontember, req.params.id]
  );
  res.json({ affectedRows: result.affectedRows });
});

module.exports = router;
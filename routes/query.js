const express = require('express');
const router = express.Router();
const { executeQuery } = require('../db/connection');

router.post('/', async (req, res) => {
  const { query } = req.body;

  if (!query) {
    return res.status(400).json({
      success: false,
      error: 'Query is required'
    });
  }

  try {
    const results = await executeQuery(query);
    res.json({
      success: true,
      results
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('ROOM ROUTER');
});

module.exports = router;

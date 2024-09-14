const express = require('express');
const router = express.Router();
const { postAddCoins, postRemoveCoins } = require('../controllers/coinControllers');

// POST route to add coins to a student
router.post('/add-coins', postAddCoins);

// POST route to remove coins from a student
router.post('/remove-coins', postRemoveCoins);

module.exports = router;

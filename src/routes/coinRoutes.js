const express = require('express');
const router = express.Router();
const {AddCoins, DeleteCoins} = require('../controllers/coinControllers');

router.put('/add-coins', AddCoins)
router.put('/delete-coins', DeleteCoins)
module.exports = router;

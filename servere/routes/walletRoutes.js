const express = require("express");

const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const { getWallet,
    getTransactions,
    withdrawMoney, 

} = require("../controllers/walletController");

router.get("/", protect, getWallet);



router.get("/transactions", protect, getTransactions);

router.post("/withdraw", protect, withdrawMoney);

module.exports = router;
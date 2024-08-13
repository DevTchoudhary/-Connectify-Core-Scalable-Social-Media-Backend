const express = require("express");
const { registerController,
   loginController,
    logoutController,
     refetchUserController 
    } = require("../controllers/authController");

    
const router = express.Router();

// REGISTER USER
router.post("/register", registerController);

// LOGIN USER
router.post("/login", loginController);

// LOGOUT USER
router.get("/logout", logoutController);

// FETCH CURRENT USER
router.get("/refetch", refetchUserController);

module.exports = router;

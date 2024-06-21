const express = require('express')
const { createUser, loginUser, getUser } = require('../Controllers/userController');
const fetchUser = require("../Middleware/fetchUser")

const router = express.Router()

router.post('/createuser', createUser)
router.post('/login', loginUser)
router.get('/getuser', fetchUser, getUser);

module.exports = router;
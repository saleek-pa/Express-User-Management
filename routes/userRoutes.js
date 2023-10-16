const express = require('express');
const router = express.Router()
const controller = require('../controllers/userController')

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const tryCatch=require("../middleware/TryCatchMiddleware")
const checkAuth=require("../middleware/authMiddleware")

router.use(express.json());

router.post('/register', tryCatch(controller.registration))
router.post('/login', tryCatch(controller.login))
router.post('/users', checkAuth, upload.single('photo'), tryCatch(controller.createUser))
router.get('/users', checkAuth, tryCatch(controller.getAllUsers))
router.get('/users/:id', checkAuth, tryCatch(controller.getById))
router.put('/users/:id', checkAuth, tryCatch(controller.updateUser))
router.delete('/users/:id', checkAuth, tryCatch(controller.deleteUser))

module.exports = router
const express = require('express');
const router = express.Router()
const controller = require('../controllers/userController')
const multer = require('multer');
const tryCatch=require("../middleware/TryCatchMiddleware")
const checkAuth=require("../middleware/authMiddleware")

const upload = multer({ dest: 'uploads/' });

router.use(express.json());

router.post('/register', tryCatch(controller.registration));
router.post('/login', tryCatch(controller.login));
router.use(checkAuth);

router.route('/users')
  .post(upload.single('photo'), tryCatch(controller.createUser))
  .get(tryCatch(controller.getAllUsers));

router.route('/users/:id')
  .get(tryCatch(controller.getById))
  .put(tryCatch(controller.updateUser))
  .delete(tryCatch(controller.deleteUser));

module.exports = router;
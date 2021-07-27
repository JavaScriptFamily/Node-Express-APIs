const express = require('express');
const router  = express.Router();
const auth    = require('../middleware/auth');
const admin   = require('../middleware/admin');
const userController  = require('../controller/userController');

router.get('/view', auth, userController.viewUser);
router.post('/edit', auth, userController.editUser);
router.get('/delete', auth, admin, userController.deleteUser);

module.exports = router;
const { Router } = require('express');
const { register, login, logout, showUsers } = require('../controllers/auth.controller');
const { checkRole } = require('../middlewares/checkRole');
const { isAuth } = require('../middlewares/isAuth');
const router = Router();

router.post('/join/register', register);
router.post('/join/login', login);
router.delete('/logout', isAuth, logout);
router.get('/users', checkRole, showUsers);

module.exports = router;

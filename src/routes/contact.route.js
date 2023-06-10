const { Router } = require('express');
const { contactUs, showMine, showAll } = require('../controllers/contact.controller');
const { checkRole } = require('../middlewares/checkRole');
const router = Router();

router.post('/contact/create', contactUs);
router.get('/contact/showmine', showMine);
router.get('/contact/showall', checkRole, showAll);

module.exports = router;
const { Router } = require('express');
const { addCompany, showAllCompanies, showSingleCompany, editCompany, deleteCompany } = require('../controllers/companies.controller');
const { checkRole } = require('../middlewares/checkRole');
const router = Router();

router.post('/company/add', checkRole, addCompany);
router.get('/company', showAllCompanies);
router.get('/company/:id', checkRole, showSingleCompany);
router.put('/company/edit/:id', checkRole, editCompany);
router.delete('/company/delete/:id', checkRole, deleteCompany);


module.exports = router;
const express = require('express');
const router = express.Router();
const contractorController = require('../controllers/contractor.js');
const multer = require('multer');
const { storage } = require('../cloudConfig.js'); 
const upload = multer({ storage: storage });

router.get("/apply", contractorController.renderApplyPage);

router.post('/apply', upload.single('image'), contractorController.applyForContractor);

router.get("/status", contractorController.checkContractorStatusPage);

router.post('/check', contractorController.checkContractorStatus);

router.get('/login', contractorController.renderContractorLoginPage);

router.post('/login', contractorController.contractorLogin);

router.get('/dashboard', contractorController.renderDashboard);

router.get('/edit', contractorController.renderEditForm);

router.post('/edit', upload.single('image'), contractorController.updateContractorProfile);

module.exports = router;

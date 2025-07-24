const express = require('express');
const router = express.Router();
const { logUsage, getReport } = require('../controllers/trackerController');

router.post('/track', logUsage);
router.get('/report', getReport);

module.exports = router;

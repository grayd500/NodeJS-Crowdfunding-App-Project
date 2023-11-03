// Develop/controllers/application.index.js
const router = require('express').Router();
const userRoutes = require('./userRoutes');
const projectRoutes = require('./projectRoutes');
const dashboardRoutes = require('./dashboardRoutes');

router.use('/users', userRoutes);
router.use('/projects', projectRoutes);
router.use('/dashboard', dashboardRoutes);

module.exports = router;

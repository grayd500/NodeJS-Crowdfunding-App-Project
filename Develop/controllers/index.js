const express = require('express');
const router = express.Router();
const { User, Project } = require('../models'); // Assuming your models are in the 'models' directory
const apiRoutes = require('./api');
const projectRoutes = require('./api/projectRoutes');
const userRoutes = require('./api/userRoutes');
const dashboardRoutes = require('./api/dashboardRoutes');



router.use('/api', apiRoutes);
router.use('/', userRoutes);
router.use('/', projectRoutes);
router.use('/dashboard', dashboardRoutes);

router.get('/profile', async (req, res) => {
    if (!req.session.logged_in) {
        res.redirect('/login');
        return;
    }

    try {
        // Retrieve user and their associated projects
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Project }] // Include projects associated with the user
        });

        if (!userData) {
            // No user found, redirect to login
            res.redirect('/login');
            return;
        }

        const user = userData.get({ plain: true });

        // Render the profile page with user data and their projects
        res.render('profile', {
            user,
            // Pass the projects to the profile handlebars
            projects: user.Projects, 
            logged_in: true
        });
    } catch (err) {
        console.error('Error fetching user data:', err);
        res.status(500).send(err.message);
    }
});

module.exports = router;

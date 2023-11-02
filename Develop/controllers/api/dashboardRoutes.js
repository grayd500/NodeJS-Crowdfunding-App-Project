const router = require('express').Router();
const { User } = require('../../models');
const withAuth = require('../middleware/auth');

router.get('/', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] }
        });

        if (!userData) {
            res.redirect('/login');
            return;
        }

        res.render('dashboard', {
            user: userData.get({ plain: true }),
            // Include other necessary data
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;

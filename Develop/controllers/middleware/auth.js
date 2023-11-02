// Develop/controllers/middleware/auth.js

const withAuth = (req, res, next) => {
    // If the user is not logged in, redirect them to the login page
    if (!req.session.logged_in) {
      res.redirect('/login');
    } else {
      // If the user is logged in, execute the next middleware function
      next();
    }
  };
  
  module.exports = withAuth;
  
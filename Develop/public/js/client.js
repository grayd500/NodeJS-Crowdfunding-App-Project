// Develop/public/js/client.js
document.addEventListener('DOMContentLoaded', () => {
    console.info('DOM loaded');
  
    // SIGNUP FORM
    const signupForm = document.querySelector('#signup-form');
    if (signupForm) {
      signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const userData = {
          name: document.querySelector('input[name="name"]').value.trim(),
          email: document.querySelector('input[name="email"]').value.trim(),
          password: document.querySelector('input[name="password"]').value.trim(),
        };
  
        fetch('/api/users/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userData),
        })
        .then((response) => {
          if (response.ok) {
            console.log('Account created');
            // Redirect to login page or other appropriate action
          } else {
            alert('Failed to sign up');
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
      });
    }
  
    // LOGIN FORM
    const loginForm = document.querySelector('#login-form'); // Make sure the form has this ID
    if (loginForm) {
      loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const loginData = {
          email: document.querySelector('input[name="email"]').value.trim(),
          password: document.querySelector('input[name="password"]').value.trim(),
        };
  
        fetch('/api/users/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(loginData),
        })
        .then((response) => {
          if (response.ok) {
            console.log('Logged in');
            // Redirect to profile or dashboard page
          } else {
            alert('Failed to log in');
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
      });
    }
  });
  
  
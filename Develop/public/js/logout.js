document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
  
    fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    })
    .then(response => {
      if (response.ok) {
        location.href = '/login';
      } else {
        alert('Failed to log out.');
      }
    });
  });
  
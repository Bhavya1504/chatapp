document.addEventListener('DOMContentLoaded', () => {
    const loginContainer = document.getElementById('loginContainer');
    const chatContainer = document.getElementById('chatContainer');
    const chatMessages = document.getElementById('chatMessages');
    
    const loginForm = document.getElementById('loginForm');
    const messageForm = document.getElementById('messageForm');
    
    const usernameInput = document.getElementById('username');
    const messageInput = document.getElementById('message');
    
    // Check if the user is logged in by looking for the username in local storage
    const username = localStorage.getItem('username');
    if (username) {
      showChatForm();
    }
    
    // Show the login form initially
    loginForm.addEventListener('submit', (event) => {
      event.preventDefault();
      
      const enteredUsername = usernameInput.value;
      
      // Store the username in local storage
      localStorage.setItem('username', enteredUsername);
      
      showChatForm();
    });
    
    // Show the chat form and hide the login form
    function showChatForm() {
      loginContainer.style.display = 'none';
      chatContainer.style.display = 'block';
      
      // Fetch and display existing chat messages
      fetch('/messages')
        .then(response => response.json())
        .then(messages => {
          chatMessages.innerHTML = '';
          
          messages.forEach(message => {
            const li = document.createElement('li');
            li.textContent = `${message.username}: ${message.message}`;
            chatMessages.appendChild(li);
          });
        });
    }
    
    // Handle sending messages
    messageForm.addEventListener('submit', (event) => {
      event.preventDefault();
      
      const message = messageInput.value;
      const username = localStorage.getItem('username');
      
      // Store the message on the server
      fetch('/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, message })
      })
        .then(response => response.json())
        .then(() => {
          // Clear the message input field
          messageInput.value = '';
        });
    });
  });
  
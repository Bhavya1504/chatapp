const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 7000;

app.use(express.static('public'));
app.use(express.json());

// Handle the login route for both GET and POST requests
app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/login', (req, res) => {
  const { username } = req.body;

  // Store the username in the local storage file
  fs.writeFileSync('localStorage.txt', username);

  res.redirect('/');
});

// Handle the message route
app.post('/message', (req, res) => {
  const { username, message } = req.body;

  // Append the new message to the text file
  const formattedMessage = `${username}: ${message}\n`;
  fs.appendFileSync('messages.txt', formattedMessage);

  res.sendStatus(200);
});

// Fetch and send the existing messages
app.get('/messages', (req, res) => {
  if (fs.existsSync('messages.txt')) {
    const messages = fs.readFileSync('messages.txt', 'utf8');
    res.send(messages);
  } else {
    res.send('');
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

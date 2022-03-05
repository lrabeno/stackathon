const express = require('express');
const app = express();
const path = require('path');

app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use(express.json());
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/breakout', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.use(express.static(path.join(__dirname, '/public')));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));

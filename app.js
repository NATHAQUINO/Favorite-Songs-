const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Middleware to parse JSON data
app.use(bodyParser.json());

// Sample JSON-based database for favorite songs
const favoriteSongs = [
  {
    id: 1,
    song: 'Forever',
    artist: 'Chris Brown',
    genre: 'Dance pop',
    link: 'https://www.youtube.com/watch?v=w_gK0chm8MA'
  },
  {
    id: 2,
    song: 'Making Love Out Of Nothing At All',
    artist: 'Air Supply',
    genre: 'Soft Rock',
    link: 'https://www.youtube.com/watch?v=ogoIxkPjRts'
  },
  {
    id: 3,
    song: 'Something Just Like This',
    artist: 'The Chainsmokers & Coldplay',
    genre: 'Electro pop',
    link: 'https://www.youtube.com/watch?v=FM7MFYoylVs'
  },
  {
    id: 4,
    song: 'IKAW LANG',
    artist: 'NOBITA',
    genre: 'OPM',
    link: 'https://www.youtube.com/watch?v=rxXsdj7EBm4'
  },
  {
    id: 5,
    song: 'The Night We Met ',
    artist: 'Lord Huron',
    genre: 'Folk rock',
    link: 'https://www.youtube.com/watch?v=KtlgYxa6BMU'
  }
];

// Generate a unique ID for new songs
function generateSongId() {
  return Math.max(...favoriteSongs.map(song => song.id), 0) + 1;
}

// RESTful API routes
app.get('/songs', (req, res) => {
  res.json(favoriteSongs);
});

app.get('/songs/:id', (req, res) => {
  const songId = parseInt(req.params.id);
  const song = favoriteSongs.find(s => s.id === songId);

  if (song) {
    res.json(song);
  } else {
    res.status(404).send('Song not found');
  }
});

app.post('/songs', (req, res) => {
  const data = req.body;
  data.id = generateSongId();
  favoriteSongs.push(data);
  res.status(201).json(data);
});

app.put('/songs/:id', (req, res) => {
  const songId = parseInt(req.params.id);
  const song = favoriteSongs.find(s => s.id === songId);

  if (song) {
    Object.assign(song, req.body);
    res.json(song);
  } else {
    res.status(404).send('Song not found');
  }
});

app.delete('/songs/:id', (req, res) => {
  const songId = parseInt(req.params.id);
  const songIndex = favoriteSongs.findIndex(s => s.id === songId);

  if (songIndex !== -1) {
    const deletedSong = favoriteSongs.splice(songIndex, 1)[0];
    res.send(`Deleted: ${deletedSong.song}`);
  } else {
    res.status(404).send('Song not found');
  }
});

// Start the Express server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

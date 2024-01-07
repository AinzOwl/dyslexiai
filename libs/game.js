// game.js in the /libs directory
const path = require('path');

// Initialize the JsonDB instance with the path to your JSON file
const dad = new JsonDB(path.join(__dirname, '..', 'db', 'dad.json'));
const stt = new JsonDB(path.join(__dirname, '..', 'db', 'stt.json'));

const gameLib = {
  get: (req, res, db) => {
    const { type, uuid } = req.query;

    // Check if type and uuid are provided
    if (!type || !uuid) {
      return res.status(400).json({ error: 'Type and UUID are required' });
    }

    // Check if the user exists
    const user = db.get('users', uuid);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Load the game data for the specified type
    if (type != 'dad') {
        const gameData = dad.data[type];
    } else if (type === 'stt') {
        const gameData = stt.data[type];
    }
    else {
        return res.status(404).json({ error: 'Game type not found' });
    }

    // Select the game level for the user
    const userLevel = user.level || 1; // Default to level 1 if not specified
    const gameLevelData = gameData.find(game => game.level === userLevel.toString());

    if (!gameLevelData) {
      return res.status(404).json({ error: 'Game level not found' });
    }

    // Return the game level data
    res.json(gameLevelData);
  },
  // ... other methods like post, put, delete if needed
};

module.exports = gameLib;

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/User');
const Description = require('./models/Description');
const Message = require('./models/Message');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

if (!MONGO_URI) {
  console.error("FATAL CRITICAL ANOMALY: MONGO_URI variable is absent from your .env configuration schema mapping.");
  process.exit(1);
}

mongoose.connect(MONGO_URI)
  .then(() => console.log("[Mongoose Cluster Interface] -> Connected successfully to MongoDB Atlas Cloud Database Ledger."))
  .catch((err) => console.error("Database cloud compilation link drop:", err));


// ROUTE 1: GET /api/descriptions/search - Filter logs via database model keyword query checks
app.get('/api/descriptions/search', async (req, res, next) => {
  try {
    const { q } = req.query;
    if (!q) {
      const allItems = await Description.find().sort({ createdAt: -1 });
      return res.status(200).json(allItems);
    }

    const searchQuery = new RegExp(q, 'i');
    const filteredRecords = await Description.find({
      $or: [
        { name: searchQuery },
        { ingredients: searchQuery },
        { tone: searchQuery }
      ]
    }).sort({ createdAt: -1 });

    res.status(200).json(filteredRecords);
  } catch (error) {
    next(error);
  }
});

// ROUTE 2: GET /api/descriptions - Fetch all logs straight from MongoDB
app.get('/api/descriptions', async (req, res, next) => {
  try {
    const recordsLog = await Description.find().sort({ createdAt: -1 });
    res.status(200).json(recordsLog);
  } catch (error) {
    next(error);
  }
});

// ROUTE 3: GET /api/descriptions/:id - Query a distinct document entry matching object hex ID key
app.get('/api/descriptions/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid document primary identifier sequence format provided." });
    }

    const item = await Description.findById(id);
    if (!item) {
      return res.status(404).json({ error: `Marketing document asset with ID sequence ${id} was not found.` });
    }

    res.status(200).json(item);
  } catch (error) {
    next(error);
  }
});

// ROUTE 4: POST /api/descriptions - Insert a fresh user-approved copywriting document item
app.post('/api/descriptions', async (req, res, next) => {
  try {
    const { name, ingredients, weight, features, tone, generatedText, userId, username } = req.body;
    if (!userId || !username) {
      return res.status(401).json({ error: "Unauthenticated transaction intercept." });
    }
    const newAssetDocument = new Description({ name, ingredients, weight, features, tone, generatedText, createdBy: userId, createdByUsername: username });
    const savedResult = await newAssetDocument.save();
    res.status(201).json(savedResult);
  } catch (error) {
    next(error);
  }
});
// ROUTE 5: PUT /api/descriptions/:id - Perform a full transactional parameters update query
app.put('/api/descriptions/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, ingredients, weight, features, tone, generatedText } = req.body;
    const updatedDocument = await Description.findByIdAndUpdate(id, { name, ingredients, weight, features, tone, generatedText }, { new: true });
    res.status(200).json(updatedDocument);
  } catch (error) {
    next(error);
  }
});

// ROUTE 6: DELETE /api/descriptions/:id - Erase a target document index from the live database
app.delete('/api/descriptions/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Deletion aborted. Targeted identification object key sequence is invalid." });
    }

    const droppedDocument = await Description.findByIdAndDelete(id);
    if (!droppedDocument) {
      return res.status(404).json({ error: `Wipe log sequence dropped. Document item with primary ID reference ${id} does not exist.` });
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

app.post('/api/messages', async (req, res, next) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: "Name, email, and explicit message inputs are mandatory parameters." });
    }
    const freshMessage = new Message({ name, email, message });
    const savedMessage = await freshMessage.save();
    res.status(201).json(savedMessage);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }
    next(error);
  }
});

app.get('/api/messages', async (req, res, next) => {
  try {
    const inboundLogs = await Message.find().sort({ createdAt: -1 });
    res.status(200).json(inboundLogs);
  } catch (error) {
    next(error);
  }
});

app.post('/api/auth/signup', async (req, res, next) => {
  try {
    const { username, fullName, email, password } = req.body;
    if (!username || !fullName || !email || !password) {
      return res.status(400).json({ error: "All account fields are mandatory." });
    }
    const duplicateUser = await User.findOne({ $or: [{ username }, { email }] });
    if (duplicateUser) {
      return res.status(400).json({ error: "Username string or email endpoint already registered." });
    }
    const freshUser = new User({ username, fullName, email, password });
    await freshUser.save();
    res.status(201).json({ id: freshUser._id, username: freshUser.username, fullName: freshUser.fullName });
  } catch (error) {
    next(error);
  }
});

app.post('/api/auth/login', async (req, res, next) => {
  try {
    const { identifier, password } = req.body;
    if (!identifier || !password) {
      return res.status(400).json({ error: "Identification string and password are required." });
    }
    const userMatch = await User.findOne({ $or: [{ username: identifier }, { email: identifier }] });
    if (!userMatch || userMatch.password !== password) {
      return res.status(401).json({ error: "Authentication checkpoint failed. Invalid identity parameters." });
    }
    res.status(200).json({ id: userMatch._id, username: userMatch.username, fullName: userMatch.fullName });
  } catch (error) {
    next(error);
  }
});

app.use((err, req, res, next) => {
  console.error("System structural data anomaly logged:", err.stack);
  res.status(500).json({ error: "Internal persistent database engine runtime disruption occurred." });
});

app.listen(PORT, () => {
  console.log(`[ShaktiScribe Server Operational Engine] -> Running live on port ${PORT}`);
});
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const Description = require('./models/Description');

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
    const { name, ingredients, weight, features, tone, generatedText } = req.body;

    if (!name || !ingredients || !generatedText) {
      return res.status(400).json({ error: "Product Name, input Ingredients list, and calculated description text are mandatory parameters." });
    }

    const newAssetDocument = new Description({
      name,
      ingredients,
      weight,
      features,
      tone,
      generatedText
    });

    const savedResult = await newAssetDocument.save();
    res.status(201).json(savedResult);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }
    next(error);
  }
});

// ROUTE 5: PUT /api/descriptions/:id - Perform a full transactional parameters update query
app.put('/api/descriptions/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Modification skipped. Invalid object identity key sequence format." });
    }

    const { name, ingredients, weight, features, tone, generatedText } = req.body;
    if (!name || !ingredients) {
      return res.status(400).json({ error: "Validation block failed. Updated layouts require valid name and ingredients text elements." });
    }

    const updatedDocument = await Description.findByIdAndUpdate(
      id,
      { name, ingredients, weight, features, tone, generatedText },
      { new: true, runValidators: true }
    );

    if (!updatedDocument) {
      return res.status(404).json({ error: `Asset edit rejected. Profile index matching ID ${id} is absent.` });
    }

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

app.use((err, req, res, next) => {
  console.error("System structural data anomaly logged:", err.stack);
  res.status(500).json({ error: "Internal persistent database engine runtime disruption occurred." });
});

app.listen(PORT, () => {
  console.log(`[ShaktiScribe Server Operational Engine] -> Running live on port ${PORT}`);
});
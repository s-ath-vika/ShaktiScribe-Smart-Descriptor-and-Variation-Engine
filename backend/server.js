const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

let descriptions = [
  {
    id: 1,
    name: "Himalayan Finger Millet Snacks",
    ingredients: "Organic Ragi, Himalayan Rock Salt, Rice Bran Oil",
    weight: "150g",
    features: "Rich in Calcium, Gluten-Free",
    tone: "Health-Focused",
    generatedText: "Experience the rich agricultural legacy of Uttarakhand with HimShakti's artisan-crafted Himalayan Finger Millet Snacks. Purely prepared using premium, clean mountain-grown Organic Ragi. Packed clean in customized 150g formats, it delivers nutrient-dense fuel. Explicitly verified as a local collection variant that is completely Gluten-Free.",
    createdAt: "June 16, 2026, 10:30 PM"
  },
  {
    id: 2,
    name: "Pure Rhododendron Juice",
    ingredients: "Wild Buransh Blossoms, Organic Honey, Mountain Spring Water",
    weight: "250ml",
    features: "No Added Preservatives, Anti-Oxidant Rich",
    tone: "Premium",
    generatedText: "Discover the pristine flavor roots of Uttarakhand with HimShakti's premium Pure Rhododendron Juice. Meticulously extracted from clean wild Buransh blossoms. Packaged elegantly in 250ml skus to maintain total brand profile metrics. Features a composition with No Added Preservatives.",
    createdAt: "June 15, 2026, 04:15 PM"
  }
];


// ROUTE 1: GET /api/descriptions/search - Search logs via text query flags (Must sit ABOVE /:id)
app.get('/api/descriptions/search', (req, res, next) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(200).json(descriptions);
    }
    
    const query = q.toLowerCase();
    const filtered = descriptions.filter(item => 
      item.name.toLowerCase().includes(query) || 
      item.ingredients.toLowerCase().includes(query) ||
      item.tone.toLowerCase().includes(query)
    );
    
    res.status(200).json(filtered);
  } catch (error) {
    next(error);
  }
});

// ROUTE 2: GET /api/descriptions - Fetch all catalog logs
app.get('/api/descriptions', (req, res, next) => {
  try {
    res.status(200).json(descriptions);
  } catch (error) {
    next(error);
  }
});

// ROUTE 3: GET /api/descriptions/:id - Fetch a single marketing asset record log by unique ID
app.get('/api/descriptions/:id', (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const item = descriptions.find(d => d.id === id);
    
    if (!item) {
      return res.status(404).json({ error: `Marketing item with ID ${id} was not found.` });
    }
    
    res.status(200).json(item);
  } catch (error) {
    next(error);
  }
});

// ROUTE 4: POST /api/descriptions - Append a user-approved (and potentially edited) asset log
app.post('/api/descriptions', (req, res, next) => {
  try {
    const { name, ingredients, weight, features, tone, generatedText } = req.body;
    
    if (!name || !ingredients || !generatedText) {
      return res.status(400).json({ error: "Product Name, Ingredients, and Generated Text are mandatory fields." });
    }

    const newLog = {
      id: descriptions.length > 0 ? Math.max(...descriptions.map(d => d.id)) + 1 : 1,
      name,
      ingredients,
      weight: weight || "Standard SKU",
      features: features || "None provided",
      tone: tone || "Premium",
      generatedText, 
      createdAt: new Date().toLocaleString()
    };

    descriptions.push(newLog);
    res.status(201).json(newLog);
  } catch (error) {
    next(error);
  }
});

// ROUTE 5: PUT /api/descriptions/:id - Update structural modifications within a record log
app.put('/api/descriptions/:id', (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const itemIndex = descriptions.findIndex(d => d.id === id);

    if (itemIndex === -1) {
      return res.status(404).json({ error: `Asset modification rejected. Record with ID ${id} not found.` });
    }

    const { name, ingredients, weight, features, tone } = req.body;
    
    if (!name || !ingredients) {
      return res.status(400).json({ error: "Updated parameters require validation fields: name and ingredients strings." });
    }

    descriptions[itemIndex] = {
      ...descriptions[itemIndex],
      name,
      ingredients,
      weight: weight || descriptions[itemIndex].weight,
      features: features || descriptions[itemIndex].features,
      tone: tone || descriptions[itemIndex].tone,
      updatedAt: new Date().toLocaleString()
    };

    res.status(200).json(descriptions[itemIndex]);
  } catch (error) {
    next(error);
  }
});

// ROUTE 6: DELETE /api/descriptions/:id - Wipe out item entries from list cache
app.delete('/api/descriptions/:id', (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const itemIndex = descriptions.findIndex(d => d.id === id);

    if (itemIndex === -1) {
      return res.status(404).json({ error: `Deletion skipped. Asset matching ID ${id} does not exist.` });
    }

    descriptions.splice(itemIndex, 1);
    res.status(204).send(); // 204 No Content response
  } catch (error) {
    next(error);
  }
});

//  Centralised Global Error Handling Middleware Stack Handler
app.use((err, req, res, next) => {
  console.error("Server-side exception caught:", err.stack);
  res.status(500).json({ error: "Internal server runtime anomaly detected. Processing sequence collapsed safely." });
});

app.listen(PORT, () => {
  console.log(`[ShaktiScribe Server Operational Engine] -> Running live on port ${PORT}`);
});
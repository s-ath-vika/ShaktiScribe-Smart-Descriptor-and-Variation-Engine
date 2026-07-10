const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');
const { z } = require('zod');
require('dotenv').config();
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;

// 📂 Baseline Model Syncing (Direct from project document specs)
const User = require('./models/User');
const Description = require('./models/Description');
const Message = require('./models/Message'); // Re-integrated contact form support

// 🏁 CRITICAL CORACTION: App, PORT, and secrets initialization must be at the top before any app.use() calls
const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_phrase_for_dev_mode';

// 🔌 PERSISTENT STORAGE MEMORY LIFECYCLE CONNECTIONS
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/shaktiscribe')
  .then(() => console.log('🏁 [ShaktiScribe Secure Database Node] -> Connected to MongoDB successfully!'))
  .catch(err => {
    console.error('❌ Mongoose connection sequence failed instantly on startup:', err);
  });

// 🛡️ SECURITY BARRIERS: ORIGIN CORALS & FLOOD CONTROL GATES
const allowedOrigins = ['http://localhost:5173', 'https://shaktiscribe-frontend.vercel.app'];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(new Error('CORS block: Unauthorized deployment origin.'), false);
    }
    return callback(null, true);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET || 'shaktiscribe_session_fallback_key',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// 🌐 REAL GOOGLE OAUTH STRATEGY CONFIGURATION
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID || 'DUMMY_ID',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'DUMMY_SECRET',
    // Dynamic callback URI handles both local testing and production deployment environments natively
    callbackURL: process.env.BACKEND_URL ? `${process.env.BACKEND_URL}/api/auth/google/callback` : "http://localhost:5000/api/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ email: profile.emails[0].value });
      if (!user) {
        user = new User({
          username: profile.username || profile.emails[0].value.split('@')[0],
          fullName: profile.displayName,
          email: profile.emails[0].value,
          password: 'OAuth_Authenticated_No_Password_Required'
        });
        await user.save();
      }
      return done(null, user);
    } catch (err) {
      return done(err, null);
    }
  }
));

// 🔌 Real OAuth API Routes inside your Server Endpoints Matrix
app.get('/api/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/api/auth/google/callback', 
  passport.authenticate('google', { session: false, failureRedirect: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/login` }),
  (req, res) => {
    const token = jwt.sign({ userId: req.user._id, email: req.user.email }, JWT_SECRET, { expiresIn: '7d' });
    
    // Dynamic redirect mapping based on environment state strings instead of hardcoded strings
    const targetFrontEndBase = process.env.FRONTEND_URL || 'http://localhost:5173';
    res.redirect(`${targetFrontEndBase}/login?token=${token}&id=${req.user._id}&name=${encodeURIComponent(req.user.fullName)}`);
  }
);

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 25, 
  message: { error: "Too many attempts. Rate limit rule active." },
  standardHeaders: true,
  legacyHeaders: false,
});

// Zod Input Verification Schemes
const registerSchema = z.object({
  username: z.string().min(3, "Username must contain at least 3 characters.").trim(),
  fullName: z.string().min(2, "Full Name is required.").trim(), 
  email: z.string().email("A valid email layout format is mandatory.").trim().lowercase(),
  password: z.string().min(8, "Password must be at least 8 characters long.")
});

const loginSchema = z.object({
  email: z.string().email("Invalid email layout format.").trim().lowercase(),
  password: z.string().min(1, "Password field cannot be blank.")
});

// 🔒 REQUISITE ROUTE GUARD PROTECTION MIDDLEWARE INTERCEPTOR
const requireAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: "Access Denied. Authorization token header is missing." });
    }
    const token = authHeader.split(' ')[1];
    const decodedPayload = jwt.verify(token, JWT_SECRET);
    req.user = await User.findById(decodedPayload.userId).select('-password');
    if (!req.user) {
      return res.status(401).json({ error: "Active login token points to an inactive user profile." });
    }
    next();
  } catch (error) {
    return res.status(401).json({ error: "Authentication failed. Token is invalid or expired." });
  }
};

// -------------------------------------------------------------------------
// 🔌 OPEN ENDPOINT NODES: AUTH SECTOR CONTROLLERS
// -------------------------------------------------------------------------

// AUTH ROUTE 1: User Account Registration View
app.post('/api/auth/register', authLimiter, async (req, res, next) => {
  try {
    const validatedData = registerSchema.parse(req.body);

    const existingUser = await User.findOne({ email: validatedData.email });
    if (existingUser) {
      return res.status(400).json({ error: "Registration rejected. Email already exists." });
    }

    const saltFactor = await bcrypt.genSalt(12);
    const encryptedPassword = await bcrypt.hash(validatedData.password, saltFactor);

    const newUser = new User({
      username: validatedData.username,
      fullName: validatedData.fullName,
      email: validatedData.email,
      password: encryptedPassword
    });

    await newUser.save();
    res.status(201).json({ message: "Staff user account initialized successfully!" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors[0].message });
    }
    if (error.code === 11000) {
      return res.status(400).json({ error: "Registration rejected. Username handle or email already exists." });
    }
    next(error);
  }
});

// AUTH ROUTE 2: Dynamic Token Grant Session Entry
app.post('/api/auth/login', authLimiter, async (req, res, next) => {
  try {
    const validatedData = loginSchema.parse(req.body);

    const staffUser = await User.findOne({ email: validatedData.email });
    if (!staffUser) {
      return res.status(400).json({ error: "Access Denied. Invalid email or password credentials." });
    }

    const isPasswordValid = await bcrypt.compare(validatedData.password, staffUser.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Access Denied. Invalid email or password credentials." });
    }

    const sessionToken = jwt.sign(
      { userId: staffUser._id, email: staffUser.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(200).json({
      message: "Authentication success.",
      token: sessionToken,
      user: {
        id: staffUser._id,
        username: staffUser.username,
        fullName: staffUser.fullName,
        email: staffUser.email
      }
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors[0].message });
    }
    next(error);
  }
});

// -------------------------------------------------------------------------
// 🔒 SECURED PLATFORM CRUD NODES (Guarded via requireAuth Middleware)
// -------------------------------------------------------------------------

// CRUD ROUTE 1: GET All Core Ledger Listings
app.get('/api/descriptions', requireAuth, async (req, res, next) => {
  try {
    const recordsLog = await Description.find().sort({ createdAt: -1 });
    res.status(200).json(recordsLog);
  } catch (error) { next(error); }
});

// GET Single Description Record matching parameter target lookup ID
app.get('/api/descriptions/:id', requireAuth, async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid target identity block parameter formatting configuration." });
    }
    const singleDocument = await Description.findById(id);
    if (!singleDocument) {
      return res.status(404).json({ error: "Target log entry could not be found." });
    }
    res.status(200).json(singleDocument);
  } catch (error) { next(error); }
});

// CRUD ROUTE 2: POST/Save fresh product catalog metrics downstream
app.post('/api/descriptions', requireAuth, async (req, res, next) => {
  try {
    const { name, ingredients, weight, features, tone, generatedText } = req.body;
    
    const newAssetDocument = new Description({ 
      name, 
      ingredients, 
      weight, 
      features, 
      tone, 
      generatedText,
      createdBy: req.user._id,                 
      createdByUsername: req.user.username     
    });
    
    const savedResult = await newAssetDocument.save();
    res.status(201).json(savedResult);
  } catch (error) { next(error); }
});

// CRUD ROUTE 3: PUT Overwrite modifications over specific item mappings
app.put('/api/descriptions/:id', requireAuth, async (req, res, next) => {
  try {
    const updatedDocument = await Description.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedDocument);
  } catch (error) { next(error); }
});

// CRUD ROUTE 4: DELETE Clean purging of targeted ledger lines
app.delete('/api/descriptions/:id', requireAuth, async (req, res, next) => {
  try {
    await Description.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) { next(error); }
});

// CRUD Route 6: Filter logs via database model keyword query checks
app.get('/api/descriptions/search', requireAuth, async (req, res, next) => {
  try {
    const searchQuery = new RegExp(req.query.q, 'i');
    const filteredRecords = await Description.find({
      $or: [{ name: searchQuery }, { ingredients: searchQuery }]
    }).sort({ createdAt: -1 });
    res.status(200).json(filteredRecords);
  } catch (error) { next(error); }
});

// -------------------------------------------------------------------------
// 📬 RESTORED: PUBLIC MESSAGES CHANNELS (As referenced in original User specs)
// -------------------------------------------------------------------------
app.post('/api/messages', async (req, res, next) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: "All profile fields are mandatory to forward contact messages." });
    }
    const freshMessage = new Message({ name, email, message });
    const finalizedPacket = await freshMessage.save();
    res.status(201).json({ message: "Inquiry dispatches forwarded cleanly!", finalizedPacket });
  } catch (error) {
    next(error);
  }
});

// 🏁 SYSTEM AUDIT HANDLERS: Debug Exception Patch
app.use((err, req, res, next) => {
  console.error("🛑 [SECURE CRASH AUDIT LOG]:", err);
  res.status(500).json({ 
    error: err.message || "Internal server exception occurred.",
    stack: err.stack 
  });
});

app.listen(PORT, () => {
  console.log(`🚀 [ShaktiScribe Engine Room Running Securely on Port ${PORT}]`);
});
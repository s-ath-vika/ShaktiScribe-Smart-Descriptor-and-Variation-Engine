const mongoose = require('mongoose');


const DescriptionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product brand identity name is a mandatory parameter."],
    trim: true
  },
  ingredients: {
    type: String,
    required: [true, "Product input manufacturing ingredients list is required."],
    trim: true
  },
  weight: {
    type: String,
    default: "Standard SKU Package",
    trim: true
  },
  features: {
    type: String,
    default: "None provided",
    trim: true
  },
  tone: {
    type: String,
    required: [true, "Contextual generation tone assignment must be specified."],
    enum: ['Premium', 'Traditional', 'Health-Focused'],
    default: 'Premium'
  },
  generatedText: {
    type: String,
    required: [true, "The compiled copywriting textual string must be present to save logs."]
  }
}, {
  timestamps: true 
});

module.exports = mongoose.model('Description', DescriptionSchema);
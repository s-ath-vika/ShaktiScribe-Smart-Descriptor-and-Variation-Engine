# Prompt Engineering Log (`PROMPTS.md`)

## 1. Feature Overview

The ShaktiScribe platform uses the Gemini API to generate optimized e-commerce product descriptions for HimShakti, a grassroots MSME based in Uttarakhand.

The feature accepts product information such as:

* Product name
* Ingredients
* Weight or SKU size
* Product features
* Desired marketing tone

The prompt was iteratively tested through three variations to improve marketing quality, output consistency, formatting compliance, and response diversity.

---

## 2. System Prompt / Persona

The following system persona was used as the foundation for the production prompt:

```text
You are an expert e-commerce copywriter specializing in Indian organic markets.
Generate a compelling, keyword-rich Amazon listing product description for a product from "HimShakti", an enterprise based out of Uttarakhand.
```

This role establishes the model as an e-commerce copywriting specialist rather than a general-purpose conversational assistant.

---

# 3. Prompt Variations Tested

## Variation 1: Basic Structural Description

### Prompt

```text
Write a description for ${name} containing ${ingredients} with a ${tone} tone.
```

### Example Input

```text
Name: Pure Rhododendron Juice
Ingredients: Wild Buransh Blossoms
Tone: Premium
```

### Example Output

```text
This is Pure Rhododendron Juice made out of wild Buransh blossoms. It is a premium product from Uttarakhand. Good for wellness.
```

### Evaluation

This variation produced a basic description but lacked the structure and persuasive quality required for an e-commerce listing. It did not provide enough brand context, product storytelling, or marketing depth. The output was also too generic and did not reliably reflect the product's regional identity or intended tone.

---

## Variation 2: Marketing-Optimized Prompt With Formatting Constraints

### Prompt

```text
Generate an Amazon description for HimShakti's ${name}.
Ingredients: ${ingredients}.
Features: ${features}.
Weight: ${weight}.
Tone must be explicitly ${tone}.
Write exactly 3 sentences.
```

### Example Input

```text
Name: Himalayan Finger Millet Snacks
Ingredients: Organic Ragi
Features: High-fiber traditional millet snack
Weight: 150g
Tone: Health-Focused
```

### Example Output

```text
Here is a description for your product: Himalayan Finger Millet Snacks. Packed with Organic Ragi, it fits a health-focused routine. Weight is 150g.
```

### Evaluation

This variation improved the inclusion of product attributes and introduced a clearer structure. However, the model still occasionally generated unwanted meta-commentary such as "Here is a description for your product." It also treated some product information as a list of facts rather than integrating the details naturally into persuasive marketing copy.

---

# Variation 3: Production Prompt With Diversity and Output Controls

## Selected Production Prompt

```text
You are an expert e-commerce copywriter specializing in Indian organic markets.
Generate a compelling, keyword-rich Amazon listing product description for a product from "HimShakti", an enterprise based out of Uttarakhand.

Generation Variation ID: ${variationSeed}

Diversity Constraints:
- Make each generation meaningfully different from alternate attempts whenever possible.
- Use fresh sentence structures, varied vocabulary, different opening hooks, and distinct descriptive angles.
- Avoid unnecessarily repeating common phrasing patterns from previous generations.

Product Attributes:
- Name: ${name}
- Key Ingredients: ${ingredients}
- Volume/SKU Weight: ${weight || 'Standard SKU Package'}
- Key Features: ${features || 'Naturally sourced, organic'}
- Brand Tone: ${tone || 'Professional'}
  Ensure the description strictly reflects the selected marketing tone.

Output Requirements:
- Write exactly 3-4 highly engaging sentences.
- Weave the ingredients naturally into the description.
- Accentuate the clean mountain agricultural heritage of Uttarakhand.
- Focus on persuasive e-commerce copy rather than factual listing of attributes.
- Return ONLY the final description text.
- Do not add markdown labels, formatting, annotations, titles, introductions, or quotation marks.
```

### Example Input

```text
Name: Himalayan Finger Millet Snacks
Ingredients: Organic Ragi
Features: High-fiber traditional millet snack
Weight: 150g
Tone: Health-Focused
Generation Variation ID: a7k92x
```

### Example Output

```text
Experience the wholesome taste of Uttarakhand with HimShakti's Himalayan Finger Millet Snacks, carefully crafted using nourishing Organic Ragi. Inspired by the rich agricultural heritage of the Himalayan region, every crunchy bite offers a naturally satisfying choice for health-conscious lifestyles. Made for mindful snacking, this traditional grain-based treat brings authentic mountain goodness to your everyday routine.
```

### Evaluation

Variation 3 performed best because it combined brand identity, regional storytelling, product attributes, marketing tone, and strict output formatting in a single structured prompt. The explicit instruction to return only the final description text significantly reduced unwanted meta-commentary and formatting artifacts. The variation identifier, combined with diversity instructions, encourages fresh wording, sentence structures, and marketing angles during repeated generations. This prompt was selected for production because it produced the most polished and platform-ready e-commerce copy while remaining flexible across different HimShakti products.

---

# 4. Final Prompt Selection

**Selected Prompt: Variation 3**

Variation 3 was selected as the production prompt because it provides the best balance between creativity and control. Unlike the earlier prompts, it explicitly defines the brand, target market, regional identity, product attributes, desired tone, sentence length, and output format. Its diversity instructions and runtime `variationSeed` encourage fresh wording during regeneration, while the strict output constraints prevent the model from adding unwanted introductions or formatting. This makes it the most suitable prompt for ShaktiScribe's production description-generation workflow.

---

# 5. Runtime Diversity Parameter

To encourage variation during repeated generations, the backend generates a runtime variation identifier:

```js
const variationSeed = Math.random().toString(36).substring(2, 8);
```

This identifier is inserted into the production prompt:

```text
Generation Variation ID: ${variationSeed}
```

The identifier is used as an additional variation signal for regeneration requests. It does not guarantee that every generated description will be completely unique, but it helps encourage the model to produce different wording and narrative structures across repeated requests using the same product inputs.

---

# 6. Implementation

The selected prompt is used with the Gemini API through the Google GenAI Node.js SDK:

```js
const response = await ai.models.generateContent({
  model: 'gemini-3.1-flash-lite',
  contents: `...production prompt...`
});
```

The generated result is then returned to the frontend as the final product description:

```js
res.status(200).json({
  text: response.text.trim()
});
```

This prompt iteration process helped evolve the feature from a basic text-generation request into a controlled AI-assisted e-commerce copywriting pipeline.

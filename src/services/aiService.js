const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';
const GEMINI_MODEL = 'gemini-2.5-flash'; // or 'gemini-2.5-pro' for better quality
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1/models/${GEMINI_MODEL}:generateContent`;

export const classifyHealthNeed = async (userInput) => {
  if (!GEMINI_API_KEY) {
    throw new Error('Gemini API key not found. Please set VITE_GEMINI_API_KEY in your .env file');
  }

  const prompt = `Classify the following text into ONE of these categories: Dental, OPD, Vision, Mental Health.

Return ONLY the category name from {Dental, OPD, Vision, Mental Health} that matches the text. Nothing else, no explanation, just the category name.

Text: "${userInput}"

Category:`;

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': GEMINI_API_KEY,
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.1,
          maxOutputTokens: 20,
        }
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('API Response Error:', errorData);
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const categoryText = data.candidates[0].content.parts[0].text.trim();

    // Extract category from response
    const categories = ['Dental', 'Mental Health', 'Vision', 'OPD'];
    const matchedCategory = categories.find(cat => 
      categoryText.toLowerCase().includes(cat.toLowerCase())
    );

    if (matchedCategory) {
      return matchedCategory;
    }

    // Fallback: default to OPD if classification fails
    return 'OPD';
  } catch (error) {
    console.error('Error classifying health need:', error);
    throw error;
  }
};

export const generateActionPlan = async (benefitTitle, category) => {
  if (!GEMINI_API_KEY) {
    throw new Error('Gemini API key not found. Please set VITE_GEMINI_API_KEY in your .env file');
  }

  const prompt = `Generate a 3-step action plan for an employee to avail the benefit "${benefitTitle}" in the ${category} category.

Return ONLY a numbered list of exactly 3 steps. Each step should be clear and actionable. Format:
1. Step one
2. Step two
3. Step three

No additional text, just the 3 steps:`;

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': GEMINI_API_KEY,
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.1,
          maxOutputTokens: 100,
        }
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('API Response Error:', errorData);
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const planText = data.candidates[0].content.parts[0].text.trim();

    // Parse steps from response
    const steps = planText
      .split('\n')
      .filter((line) => /^\d+\./.test(line.trim()))
      .map((line) => line.replace(/^\d+\.\s*/, '').trim())
      .filter((step) => step.length > 0)
      .slice(0, 3);

    if (steps.length === 3) {
      return steps;
    }
// Fallback action plan
    // Fallback action plan
    return [
      'Contact your HR department or benefits administrator',
      'Submit required documentation and enrollment forms',
      'Schedule your appointment or activate your benefit coverage'
    ];
  } catch (error) {
    console.error('Error generating action plan:', error);
    // Return fallback plan
    return [
      'Contact your HR department or benefits administrator',
      'Submit required documentation and enrollment forms',
      'Schedule your appointment or activate your benefit coverage'
    ];
  }
};


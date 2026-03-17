const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function analyzeDoubt(pastDoubts, newDoubt) {

  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompt = `
You are an AI mentor assistant.

Past doubts:
${pastDoubts.join("\n")}

New doubt:
${newDoubt}

Return ONLY valid JSON in this format:

{
 "masterSentence": "string",
 "keywords": ["keyword1","keyword2"],
 "questions": [
   {
     "question": "string",
     "options": ["A","B","C","D"]
   }
 ]
}

Do not add explanations.
Return JSON only.
`;

const result = await model.generateContent(prompt);
const text = result.response.text();

const cleaned = text.replace(/```json/g, "").replace(/```/g, "").trim();

return JSON.parse(cleaned);
}

module.exports = analyzeDoubt;
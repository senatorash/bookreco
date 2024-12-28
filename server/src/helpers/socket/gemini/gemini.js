// const { GoogleGenerativeAI } = require("@google/generative-ai");
// const envVarables = require("../../../config/index");
// const { GEMINI_API_KEY } = envVarables;

// const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// const geminiConversation = async (prompt) => {
//   try {
//     const result = await model.generateContent(prompt);
//     const response = result.response;
//     const text = response.text();
//     return text;
//   } catch (error) {
//     return "Sorry I'm currently having issues processing your questions. You can check back later...";
//   }
// };

// module.exports = geminiConversation;

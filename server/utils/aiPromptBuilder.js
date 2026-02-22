exports.buildPrompt = (role, skills, level) => {
  return `
You are an AI Career Coach.

Generate:
- 5 ${level} technical questions
- 2 HR questions

Role: ${role}
Skills: ${skills.join(", ")}

For each:
- Provide sample answer
- Mention difficulty
- Mention expected keywords
`;
};
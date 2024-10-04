const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

// Example response for a chatbot asking about PACE data
app.post('/ask', (req, res) => {
  const { question } = req.body;

  // Basic response logic (you can add PACE data queries here)
  let answer = '';

  if (question.toLowerCase().includes('ocean temperature')) {
    answer = 'The current ocean temperature data based on PACE is X°C.';
  } else if (question.toLowerCase().includes('phytoplankton')) {
    answer = 'Phytoplankton levels in the Pacific Ocean are currently increasing.';
  } else {
    answer = 'I’m not sure about that, but you can learn more from PACE data sources.';
  }

  res.json({ answer });
});

app.listen(port, () => {
  console.log(`Chatbot server running on http://localhost:${port}`);
});

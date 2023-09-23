const connectToMongo = require("./config/db")
const express = require("express")
const openai = require('openai')
const bodyParser = require('body-parser');
var cors = require("cors")
const app = express()
require('dotenv').config();

const port = process.env.PORT || 5050

// Connected to MongoDB
connectToMongo()


app.use(express.json())
app.use(cors())

app.use(bodyParser.json());

// Set up your OpenAI API key as an environment variable
const openaiApiKey = process.env.OPENAI_API_KEY;

// Initialize the OpenAI client
const openaiClient = new openai({ key: openaiApiKey });

// Define an API endpoint to handle chat messages
app.post('/chatbot', async (req, res) => {
  try {
    const { message } = req.body;

    // Send the user's message to OpenAI for a response
    const response = await openaiClient.completions.create({
      model: 'gpt-3.5-turbo',
      prompt: message,
      max_tokens: 50, // Adjust as needed
    });

    // Extract the bot's reply
    const botReply = response.choices[0].text;

    // Return the bot's reply to the React app
    res.json({ botReply });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});


app.use("/api/auth",require("./routes/auth"))
app.use("/api/test",require("./routes/test"))
app.use("/api/test2",require("./routes/test2"))

app.get("/", (req, res) => {
    res.send("Testing Done working!")
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})

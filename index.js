const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const dotenv = require('dotenv');
const cors = require('cors'); // Import the cors middleware
const path = require("path")

dotenv.config();

const app = express();
const port = 5000;

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

app.use(express.json());
app.use(express.static(path.join(__dirname + "/public")))
app.use(cors()); // Use the cors middleware to enable CORS

app.post('/generate', async (req, res) => {
    console.log("come");
    const { prompt } = req.body;
    // console.log({prompt});

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({ text });
    // res.json({ text });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

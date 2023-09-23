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

app.use("/api/auth",require("./routes/auth"))
app.use("/api/test",require("./routes/test"))
app.use("/api/test2",require("./routes/test2"))

app.get("/", (req, res) => {
    res.send("Testing Done working!")
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})

const express = require('express');
const app = express();
const router = require('./route/router')
const cors = require('cors');

const PORT = process.env.PORT || 3000;


app.use(express.json())
app.use(cors());
app.use(router);

app.listen(PORT, console.log(`server is open on ${PORT}`))  
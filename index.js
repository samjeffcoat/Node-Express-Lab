const express = require('express');
const db = require ('./data/db');



const server = express();
server.use(express.json());
server.get("/", (req, res) => {
    res.send('hello sam')
})

server.listen(5000, () => {
    console.log('\n*** Server Running on http://localhost:4000 ***\n');
});
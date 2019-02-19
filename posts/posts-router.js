const express = require('express');
const db = require('../data/db');
const router= express.Router();

router.get("/", (req, res) => {
    res.send('hello sam')
})


router.get('/api/posts', (req, res) => {

    db.find()
        .then(posts => {
            res.status(200).json(posts);
        })
    res.status(200).jspm(posts);
})

/// POST	/api/posts	Creates a post using the information sent inside the request body.
////When the client makes a POST request to /api/posts:
//// If the request body is missing the title or contents property:
//// A cancel the request.
//// B respond with HTTP status code 400 (Bad Request).
//// C return the following JSON response: { errorMessage: "Please provide title and contents for the post." }.

////2 If the information about the post is valid:
////A save the new post the the database.
////B return HTTP status code 201 (Created).
////C return the newly created post.

////3 If there's an error while saving the user:
////A cancel the request.
////B respond with HTTP status code 500 (Server Error).
////C return the following JSON object: { error: "There was an error while saving the post to the database" }.

router.post("/api/posts", (req, res) => {
    let post = req.body
    if (!post.title || !post.contents) {
        res.status(400).json({ error: "Please provide title and contents for the post." });
        return;
    }
    db.insert(post)
        .then(post => {
            res.status(201).json({ success: true, post })
        })
        .catch(err => {
            res.status(500).json({ err: "there was an error while saving the post to the database!" })
        })
})

module.exports = router
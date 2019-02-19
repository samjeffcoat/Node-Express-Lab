const express = require('express');
const db = require('../data/db');
const router= express.Router();




router.get('/',  async (req, res) => {
 try{
    let posts = await db.find();
    res.status(200).json(posts);
} catch (error) {
    res.status(500).json({error: "The posts information could not be retrieved."});
}
})
// Creates a post and check to make sure the post has a title and contents or it gives an error. Sets postFull requirements and assigns variables. Verified in postman.

router.post("/", async (req, res) => {
    if (!req.body.title || !req.body.contents) {
        res.status(400).json({ error: "Please provide title and contents for the post." });
        return;
    } 
    try {
        const postFull = {
            title: req.body.title,
            contents: req.body.contents
        };
        let newId= await db.insert(postFull);
        let newPost = await db.findById(newId.id);
        res.status(201).json(newPost);
    } catch(error){
        res.status(500).json({error: "There was an error while saving the post to the database"});
    }
})

// Searches for item and then returns that item by id if it is found. It worked originally without the post.length, however if I got above 160 then it didnt work 

router.get("/:id", async (req, res) => {
    try{
        const post = await db.findById(req.params.id);
        if (post.length > 0) {
            res.status(200).json(post);
        }
        else{
            res.status(404).json({ message: "The post with the specified ID does not exist"})
        }
    } catch(error) {
        console.log(error);
        res.status(500).json({ message: "The post information could not be retrieved"});
    }
});


/// Deletes id as long as its greater than 0

router.delete("/:id", async (req, res) => {
    try{
        const count = await db.remove(req.params.id);
        if (count > 0) {
            res.status(200).json({message: "The post has been nuked"});
        } else {
            res.status(404).json({message: 'The post could not be found'});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error removing the post', });
    }
});



module.exports = router
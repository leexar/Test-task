const express = require('express');
const db = require('../db/sql/recipeManager');
const history = require('../db/mongo/historyManager');

const router = express.Router();

router.post('/', async (req, res) => {
    let { name, instructions, description, ingredients } = req.body;

    try {
        await db.addOne({params: [name, instructions, description], ingredients: ingredients});
        res.status(200).json({
            success: 1
        });
    }
    catch (e) {
        res.status(500).json({
            message: e
        });
    }
});

router.get('/', async (req, res) => {
    try {
        const recipies = await db.getAll();
        res.status(200).json({
            recipies: recipies
        });
    }
    catch (e) {
        res.status(500).json({
            message: e
        });
    }
})

router.get('/:id', async (req, res) => {
    let id = req.params.id;

    try {
        const recipe = await db.getOne(id);
        res.status(200).json({
            recipe: recipe
        });
    }
    catch (e) {
        res.status(500).json({
            message: e
        });
    }
});

router.put('/:id', async (req, res) => {
    let { name, instructions, description, ingredients } = req.body;
    let id = req.params.id;
    let newRecipe = {
        id: id,
        name: name,
        instructions: instructions,
        description: description,
        ingredients: ingredients
    }
    try {
        const recipe = await db.getOne(id);
        const changes = {};
        for(let property in recipe)
        {
            if (recipe[property] != newRecipe[property] && property !== "created")
            {
                changes[property] = recipe[property];
            }
        }
        await db.updateOne({ params: [name, instructions, description, id], ingredients: ingredients });
        await history.AddOne({
            id: id, 
            date: Date.now(),
            changes: changes
        })
        res.status(200).json({
            success: 1
        });
    }
    catch (e) {
        res.status(500).json({
            message: e
        });
    }
});

router.delete('/:id', async (req, res) => {
    let id = req.params.id;

    try {
        await db.deleteOne([id]);
        await history.Delete({ id: id });

        res.status(200).json({
            success: 1
        });
    }
    catch (e) {
        res.status(500).json({
            message: e
        });
    }
});

router.get('/history/:id', async (req, res) => {
    let id = req.params.id;

    try {
        const result = await history.Find({id : id});

        res.status(200).json({
            history: result
        });
    }
    catch (e) {
        res.status(500).json({
            message: e
        });
    }
});

module.exports = router;
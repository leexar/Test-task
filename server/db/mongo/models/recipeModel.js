const mongoose = require('mongoose');

// Create a simple User's schema 
const recipe = new mongoose.Schema({
    id: Number,
    date: Date,
    changes: {
        name: String,
        ingredients: [
            {
                ingredient: String
            }
        ],
        instructions: String,
        description: String
    }
});

const recipeModel = new mongoose.model('Recipe', recipe);


module.exports = recipeModel;
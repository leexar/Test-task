const db = require('./pool');

let recipeManager = {}

recipeManager.addOne = (payload) => {
    return new Promise((resolve, reject) => {
        let params = payload.params;
        let ingredients = payload.ingredients;
        db.query('INSERT INTO recipe (name, instructions, description) VALUES (?, ?, ?)', params, (err, result) => {
            if (err) {
                return reject(err);
            }

            for (let i = 0; i < ingredients.length; i++) {
                let param = [ingredients[i].ingredient, result.insertId]
                db.query('INSERT INTO ingredients (ingredient, recipe_id) VALUES (?, ?)', param, (err, result) => {
                    if (err) {
                        return reject(err);
                    }
                })
            }

            return resolve(result);
        })
    });
}

recipeManager.getAll = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT id, name, created, description FROM recipe ORDER BY created', (err, result) => {
            if (err) {
                return reject(err);
            }

            return resolve(result);
        })
    });
}

recipeManager.getOne = (id) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM recipe WHERE id=? Limit 1;', id, (err, result) => {
            if (err) {
                return reject(err);
            }
            let recipe = result[0];
            db.query('SELECT ingredient FROM ingredients WHERE recipe_id=?;', id, (err, result) => {
                if (err) {
                    return reject(err);
                }

                recipe.ingredients = result;

                return resolve(recipe);
            })
        })
    });
}

recipeManager.updateOne = (payload) => {
    return new Promise((resolve, reject) => {
        let params = payload.params;
        let ingredients = payload.ingredients;
        db.query('UPDATE recipe SET name=?, instructions=?, description=? WHERE id=?', params, (err, result) => {
            if (err) {
                return reject(err);
            }
            let id = params[params.length - 1];
            db.query('DELETE FROM ingredients WHERE recipe_id=?', id, (err, result) => {
                if (err) {
                    return reject(err);
                }

                for (let i = 0; i < ingredients.length; i++) {
                    let param = [ingredients[i].ingredient, id]
                    db.query('INSERT INTO ingredients (ingredient, recipe_id) VALUES (?, ?)', param, (err, result) => {
                        if (err) {
                            return reject(err);
                        }
                    })
                }

                return resolve(result);
            })
        })
    });
}

recipeManager.deleteOne = (payload) => {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM recipe WHERE id=?', payload, (err, result) => {
            if (err) {
                return reject(err);
            }

            return resolve(result);
        })
    });
}

module.exports = recipeManager;
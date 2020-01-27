const db = require('./pool');

let d = {}
d.createDb = () => {
    return new Promise((resolve, reject) => {
        db.query("CREATE TABLE IF NOT EXISTS `recipe` ( `id` int(11) NOT NULL AUTO_INCREMENT, `name` varchar(120) NOT NULL, `created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, `instructions` mediumtext, `description` tinytext, PRIMARY KEY(`id`)) ENGINE = InnoDB AUTO_INCREMENT = 9 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci", (err, result) => {
            if (err) {
                return reject(err);
            }  
        })
        db.query("CREATE TABLE IF NOT EXISTS `ingredients`(`id` int(11) NOT NULL AUTO_INCREMENT, `ingredient` varchar(200) NOT NULL, `recipe_id` int(11) DEFAULT NULL, PRIMARY KEY(`id`), KEY`recipe_id_idx`(`recipe_id`), CONSTRAINT`recipe` FOREIGN KEY(`recipe_id`) REFERENCES`recipe`(`id`) ON DELETE CASCADE) ENGINE = InnoDB AUTO_INCREMENT = 27 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci", (err, result) => {
            if (err) {
                return reject(err);
            }
        })
        
        return resolve();
    });
}

module.exports = d;
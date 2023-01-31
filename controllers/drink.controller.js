/* BEGIN db initialization */
const { Op } = require("sequelize");
const dbConfig = require("../db.config.js");
const Sequelize = require("sequelize");
const connection = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});
const Drink = require("../models/drink.model")(connection, Sequelize);
/* END db initialization */

// Find a single Drink with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Drink.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Drink with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Drink with id=" + id
            });
        });
};

// Retrieve all Drinks from the database.
exports.findAll = (req, res) => {
    Drink.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving drinks."
            });
        });
};

// Retrieve all Drinks from the database with a certain type.
exports.findAllByType = (req, res) => {
    const type = req.params.type;
    console.log(type);
    res.status(500).send({ message: "Not implemented yet!" });

};



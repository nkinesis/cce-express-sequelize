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

// Create and Save a new Drink
exports.create = (req, res) => {

    // Validate request
    if (!req.body.name || !req.body.type) {
        res.status(400).send({
            message: "Drink must have a name and type!"
        });
        return;
    }

    // Create a Drink
    const drink = {
        name: req.body.name,
        image: req.body.image ? req.body.image : "coffee1.png",
        rating: req.body.rating ? req.body.rating : 1,
        count: req.body.count ? req.body.count : "1k",
        type: req.body.type,
    };

    // Save Drink in the database
    Drink.create(drink)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Drink."
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

// Update a Drink by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Drink.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Drink was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Drink with id=${id}. Maybe Drink was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Drink with id=" + id
            });
        });
};

// Delete a Drink with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Drink.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Drink was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Drink with id=${id}. Maybe Drink was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Drink with id=" + id
            });
        });
};

// Delete all Drinks from the database.
exports.deleteAll = (req, res) => {
    Drink.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Drinks were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all drinks."
            });
        });
};
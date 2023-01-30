module.exports = (sequelize, Sequelize) => {
    const Drink = sequelize.define("drink", {
        name: {
            type: Sequelize.STRING
        },
        image: {
            type: Sequelize.STRING
        },
        rating: {
            type: Sequelize.DECIMAL(10, 2)
        },
        count: {
            type: Sequelize.STRING
        },
        type: {
            type: Sequelize.STRING
        }
    }, { timestamps: true });

    return Drink;
};
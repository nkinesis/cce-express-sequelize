module.exports = (sequelize, Sequelize) => {
    const UserType = sequelize.define("userType", {
        name: {
            type: Sequelize.STRING
        },
        permissions: {
            type: Sequelize.STRING
        }
    }, { timestamps: true });

    return UserType;
};
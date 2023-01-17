const Sequelize = require('sequelize')
const { DataTypes, Op } = Sequelize

// create connection
const sequelize = new Sequelize('example_db', 'example_user', 'password', {
    host: "localhost",
    dialect: "mysql"
})

// create 2 models: user and apartment
const User = sequelize.define('user', {
    name: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    }
}, {
    timestamps: true
})

const Apartment = sequelize.define('apartment', {
    number: {
        type: DataTypes.INTEGER,
    },
    address: {
        type: DataTypes.STRING,
    }
}, {
    timestamps: false
})

// create association: many users to many apartments
User.belongsToMany(Apartment, { through: 'Users_Apartments' })
Apartment.belongsToMany(User, { through: 'Users_Apartments' })

let user, apartment
sequelize.sync({ alter: true }).then((data) => {
    return User.create({ name: 'Bob Jones', email: 'bob@example.com', password: 'heybob' })
}).then((data) => {
    user = data
    return Apartment.create({ address: '4321 Rue Test', number: 201 })
}).then((data) => {
    apartment = data
    user.addApartment(apartment)
}).then((data) => {
    return User.findOne({
        where: { email: 'bob@example.com' }, include: [{
            model: Apartment,
            as: 'apartments'
        }]
    })
}).then((data) => {
    user = data
    // this way you can see all apartments linked to a user
    console.log(user.apartments)
})


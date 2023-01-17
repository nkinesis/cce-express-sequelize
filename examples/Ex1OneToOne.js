const Sequelize = require('sequelize')
const { DataTypes } = Sequelize

// create connection
const sequelize = new Sequelize('example_db', 'example_user', 'password', {
    host: "localhost",
    dialect: "mysql"
})

// create 2 models: country and capital
const Country = sequelize.define('country', {
    name: {
        type: DataTypes.STRING,
        unique: true
    }
}, {
    timestamps: false
})

const Capital = sequelize.define('capital', {
    name: {
        type: DataTypes.STRING,
        unique: true
    }
}, {
    timestamps: false
})

// create association: 1 country to 1 capital
Country.hasOne(Capital)

let country, capital
sequelize.sync({ alter: true }).then(() => {
    return Country.count()
}).then((count) => {
    // if there are zero records, create some records
    if (count == 0) {
        Country.bulkCreate([{ name: 'France' }, { name: 'Canada' }, { name: 'Brazil' }])
        Capital.bulkCreate([{ name: 'Brasília' }, { name: 'Ottawa' }, { name: 'Paris' }])
        console.log("Data created!")
    }
}).then((data) => {
    return Capital.findOne({ where: { name: 'Paris' } })
}).then((data) => {
    capital = data
    return Country.findOne({ where: { name: 'France' } })
}).then((data) => {
    // set existing capital to existing country
    country = data
    return country.setCapital(capital)
}).then((data) => {
    // create a new country and a new capital for it
    Country.create({ name: 'England', capital: { name: 'London ' } }, {
        include: [{
            model: Capital,
            as: 'capital'
        }]
    })
}).catch((err) => {
    console.log(err)
})
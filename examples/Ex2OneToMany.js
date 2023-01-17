const Sequelize = require('sequelize')
const { DataTypes } = Sequelize

// create connection
const sequelize = new Sequelize('example_db', 'example_user', 'password', {
    host: "localhost",
    dialect: "mysql"
})

// create 2 models: country and city
const Country = sequelize.define('country', {
    name: {
        type: DataTypes.STRING,
        unique: true
    }
}, {
    timestamps: false
})

const City = sequelize.define('city', {
    name: {
        type: DataTypes.STRING
    },
    isCapital: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    }
}, {
    timestamps: false
})

// create association: 1 country to many cities
Country.hasMany(City)
City.belongsTo(Country)

let country, city
sequelize.sync({ alter: true }).then(() => {
    return Country.count()
}).then((count) => {
    // if there are zero records, create some records
    if (count == 0) {
        Country.bulkCreate([{ name: 'France' }, { name: 'Canada' }, { name: 'Brazil' }])
        console.log("Data created!")
    }
}).then((data) => {
    return City.count()
}).then((count) => {
    // if there are zero records, create some records
    if (count == 0) {
        City.bulkCreate([{ name: 'Montreal' }, { name: 'Toronto' }, { name: 'Vancouver' }])
        console.log("Data created!")
    }
}).then((data) => {
    return City.findOne({ where: { name: 'Montreal' } })
}).then((data) => {
    city = data
    return Country.findOne({ where: { name: 'Canada' } })
}).then((data) => {
    country = data
    return city.setCountry(country)
}).then((data) => {
    return City.findOne({ include: Country, where: { name: 'Montreal' } })
}).then((data) => {
    city = data
    return city.getCountry()
}).then((data) => {
    country = data
    // if everything went right, this should print "Canada"
    console.log("The country is " + country.name)
}).catch((err) => {
    console.log(err)
})
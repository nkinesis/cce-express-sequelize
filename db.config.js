module.exports = {
  HOST: "awpweather.mysql.database.azure.com",
  PORT: 3306,
  USER: "awpweather",
  PASSWORD: "webp#2022",
  DB: "awpweather",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

/*
module.exports = {
  HOST: "mysql15-farm10.kinghost.net",
  USER: "ghhomologacao41",
  PASSWORD: "higigo2019",
  DB: "ghhomologacao41",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};*/
module.exports = {
  HOST: "localhost",
  PORT: 3306,
  USER: "root",
  PASSWORD: "mypassword",
  DB: "mydb",
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
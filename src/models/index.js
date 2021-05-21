const Sequelize = require('sequelize');
const CatModel = require('./cats')

const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, CLEARDB_DATABASE_URL } = process.env;

const setUpDatabase = () => {

    const connection = CLEARDB_DATABASE_URL ? 
        new Sequelize(CLEARDB_DATABASE_URL) :
        new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
            host: DB_HOST,
            port: DB_PORT,
            dialect: "mysql"
        })
    

    const Cat = CatModel(connection, Sequelize);

    connection.sync({ alter: true });

    return { Cat };
};

module.exports = setUpDatabase();
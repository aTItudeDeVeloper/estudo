module.exports = {
    database: 'estudo',
    username: 'postgres',
    password: 'locomotive22',
    host: 'localhost',
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    },
    define: {
        timestamps: false,
        freezeTableName: true
    }
};
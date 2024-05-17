module.exports = {
    port: process.env.PORT,
    mongo:{
        dbName:process.env.DBNAME,
        dbUrl:process.env.MONGO_URI,
        dbOptions:{
            user: process.env.DBUSER_NAME,
            pass: process.env.DB_PASSWORD,
            useNewUrlParser:true,
            useUnifiedTopology: true,
        }
    }
}
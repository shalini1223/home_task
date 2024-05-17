const mongoose = require('mongoose');
const { mongo } = require('./env/local');
const db = mongoose.connection;

function connectDb(env,callback){
    let dbUrl = env.mongo.dbUrl;
    mongoose.connect(dbUrl);

    db.on('connected', async function (db){
        console.log('connected with db',dbUrl);
        callback();
    });
    db.on('error', function(err){
        console.log('err',err);
    })
}
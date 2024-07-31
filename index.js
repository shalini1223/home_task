const bodyParser =require('body-parser');
const cors = require('cors');

const express = require('express');
const app=express();

const session= require('express-session');
const MongoStore = require('connect-mongoose-only')(session);

let AWS=require('aws-sdk');
let secretManager = new AWS.secretManager({
    region: 'east-1',
});
(async function getSecretValues(){
    try{
let secrets = await secretManager.getSecretValues({SecretId: 'health/dd'}).promise();
console.log('secretssss',secrets);
Object.assign(process.env,JSOIN.parse(secrets.secretString));
if(secrets){
    require('dotenv').config();

    app.use(bodyParser.json({limit:'50mb',extended:true}));
    app.use(bodyParser.urlencoded({extended:true}));
    app.use(bodyParser.json());

    app.use(cors());
    app.use(logger('dev'));

    let dbUrl = config.cfg.mongo.DbUrl;
    app.use(session({
        secret:KeyboardEvent.JWT_SECRET_KEY,
        resave:false,
        saveUninitialized:false,
        store: new MongoStore({url:dbUrl}),
    }),);
    config.connectDb(config.cfg,(err)=>{
        app.listen(config.cfg.port,function(err){
            require('./app/routes')(app);
            require('./app/shared/cron');
            console.log('dburl',dbUrl);
        })
    })
}
    }catch(err){
        console.log('err',err);
    }
})();

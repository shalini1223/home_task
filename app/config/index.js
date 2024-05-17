const _=require('lodash');

const connectDb=require('./connection');
const environment = process.env.NODE_ENV  || 'local';

let envConfig={};
switch(environment){
    case 'local':
        envConfig= require('./env/local');
        break;
        // case 'dev':
        //     envConfig=require('./env/dev');
}
let cfg = _.extend(envConfig);
module.exports ={cfg,connectDb};
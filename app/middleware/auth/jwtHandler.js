const jwt = require('jsonwebtoken');

const JWT_SECRET_KEY='jgfyfigfhjbdkjdl989787';

const genToken =(email,id,role)=>{
    return jwt.sign({
        email:email,
        userId:id,
        role:role,
    },JWT_SECRET_KEY);
};

const verifyAccessToken = async function (accessToken){
    try{
let payload= jwt.verify(accessToken,JWT_SECRET_KEY);
return payload;
    }catch(err){
        console.log('errr',err);
    }
}

const jwtDecode = async function (jwtData){
    try{
let data = jwt.decode(jwtData);
return data;
    }catch(err){
        console.log('errrr',err);
    }
};

module.exports = {
    genToken,
    verifyAccessToken,
    JWT_SECRET_KEY,
    jwtDecode,
};
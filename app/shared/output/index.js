const errorMessages = require('../../language/index');

let output={};

output.send= function (res,data){
    res.send(data);
};

output.makeErrorResponse = function(res, errorCode, err){
    res.send(output.makeErrorResponseText(res, errorCode,err));
};

output.makeSuccessResponse = function(res,data){
let makeSuccessResponse = {status:200,output:data,time:new Date()};
res.send(makeSuccessResponse);
};


module.exports = output;
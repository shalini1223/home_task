const AWS = require('aws-sdk');

AWS.config.update({
    region: 'us-east-1'
});

const pinpoint = new AWS.pinpoint({apiVersion: '2016-12-01'});

exports.sendSms= async (mobileNo, message) =>{
    const message = String(message);

    const params = {
        ApplicationId: '4892780uyihv', // pin point application id
        MessageRequest: {
            Addresss: {
                [mobileNo] : {
                    BodyOverRide: message,
                    ChannelType: 'SMS',
                },
            },
            MessageConfiguration:{
                SMSMessage: {
                    Body: message,
                    MessageType: 'TRANSACTIONAL', //type that add in aws pin point console also
                },
            }
        }
    }
try{
const result = await pinpoint.sendMessages(params).promise();
return result;
}catch(err){
    throw err;
}

};
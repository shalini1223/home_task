const sgMail=require('@sendgrid/mail');

exports.sendMail = async (email)=>{
    try{
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
console.log('email to:',email);
let mail=await sgMail.send(email);
return mail;
    }catch(err){
        console.log('errr', err);
    }
}
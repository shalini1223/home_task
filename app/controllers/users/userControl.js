const userModel =require('./userModel');
const jwtHandler = require('../../middleware/auth/jwtHandler');
const bcrypt = require('bcrypt');
const utils = require('../../shared/utils');
const output = require('../../shared/output');
const dbService = require('../../middleware/db/service');

exports.signup = async (req,res) =>{
     try{
let user = await dbService.findOneDoc(userModel,{
     email:req.body.email,role:req.body.role,
});
if(user){
     if(user.status !== 1){
          return output.makeErrorResponseText(res, 402,language.error[30]);
     }
     return output.makeErrorResponseText(res,code.conflictStatus,language.error[3],)
}else{
     bcrypt.genSalt(10,(err,salt)=>{
          if(err) throw err;
          bcrypt.hash(req.body.password,salt,async (err,hash) => {
               if(err) throw err;
               let body= req.body;
               body.password = hash;
               let otp = commonFun.makeRandomNumber(4);
               let token;
               let newUser = await dbService.createDoc(userModel,{
                    ...body,otp:otp,token:token,
               });
               token=jwtHandler.genToken(req.body.email,newUser._id,req.body.role,);
               if(token){
                    newUser.token = token;
                    let data={token:token,...newUser._doc,};
                    if(newUser){
                         let emailData={
                              to:req.body.email,
                              from:'support@health.com',
                              subject:"Veiryf-otp",
                              templateId:'ddddddddddd', // took from sendgrid console app
                              dynamicTemplateData:{
                                   email:req.body.email,
                                   otp:`${otp}`,
                                   msg:`One time passcode valid for only 5 minutes....`,
                              },
                         };
                         emailClient.sendMail(emailData);
                         await newUser.save();
                         setTimeout(
                              async () =>{
                                   await dbService.updateOneDoc(userModel,{_id:newUser._id},{$set:{otp:null}});
                              },5*60*1000,
                         );
                         return output.makeErrorResponseText(res,data);
                    }
               }else{
                    return output.makeErrorResponseText(res, code.resErrSttaus,language.error[13],)
               }
          })
     })
}
     }catch(err){
          console.log('errrr', err);
     }
}
                                                                                                                                                                                                                               
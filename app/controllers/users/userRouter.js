const router = require('express').Router();
const userControl=require('./userControl');
const validate = require('../../middleware/valiodation');
const output=require('../../shared/output');

router.post('/signup',[validate.empty('email'),validate.empty('password'),validate.empty('confirmPassword'),validate.chckpasswordEqual('password','confirmPassword'),],userControl.signup);
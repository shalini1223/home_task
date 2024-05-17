const userRoute = require('./controllers/users/userRouter');

module.exports=(app)=>{
    app.use('/users', userRoute);
}
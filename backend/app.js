const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const HttpError = require('./models/http-error');
const usersRoutes = require ('./routes/user-routes');
const placesRoutes = require('./routes/places-routes');

const app = express();

app.use(bodyParser.json());

app.use('/api/places', placesRoutes);

app.use('/api/users', usersRoutes);


app.use((req,res,next)=>{
const error =new HttpError('Could not find this route. ',404);
throw error;
});

app.use((error,req,res,next) =>{
    if(res.headerSent){
        return next(error);
    }
    res.status(error.code || 500);
    res.json({message: error.message || 'An unknown error occurred!'});
});

mongoose.connect('mongodb+srv://ronmoyal:9eucSluPWKxM82M7@cluster0.lusckkk.mongodb.net/WeTravel?retryWrites=true&w=majority')
.then(()=>{
    app.listen(5000);
}).catch(err=>{
    console.log(err);
});


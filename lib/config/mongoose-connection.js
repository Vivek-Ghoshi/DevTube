const mongoose = require('mongoose');

const db_URI = process.env.CONNECTION;

mongoose.connect(db_URI,{})
.then(function(){
    console.log('connected to mongoose')
})
.catch(function(error){
         console.log(error.message)
});

const db  = mongoose.connection;

module.exports = db;
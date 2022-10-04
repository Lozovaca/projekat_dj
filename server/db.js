const mongoose = require('mongoose');
const atlas_uri = process.env.ATLAS_URI;

mongoose.connect(atlas_uri,(err)=>{
    if (!err) {console.log('Mongo connected successfuly');}
    else {console.log('Mongo hasnt connected successfuly');}
});

require('./models/Book');

module.exports=mongoose;

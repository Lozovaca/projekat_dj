const mongoose = require("mongoose");
var Schema = mongoose.Schema;
var BookSchema = new Schema(
    {
        title:{type:String},
        publishDate:{type:Date},
        authors:[{type:String}],
        category:{type:String},
        description:{type:String},
        numberOfPages:{type:Number}
    }
);
module.exports=mongoose.model("book", BookSchema);

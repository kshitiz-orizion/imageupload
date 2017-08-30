var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ImageSchema = new Schema({ 

  name:{type:String},
  	image: 
      { data: Buffer, contentType: String }
  
});
module.exports = mongoose.model('Img', ImageSchema);

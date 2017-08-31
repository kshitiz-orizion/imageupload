var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ImageSchema = new Schema({ 

  name:{type:String},
  url:{type:String},
  original_name:{type:String}
  
});
module.exports = mongoose.model('Img', ImageSchema);

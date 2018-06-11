var Img=require('../models/image.js');
var multer=require('multer');
var express = require('express');
var fs=require('fs'); 
var app = express();
var cloudinary=require('cloudinary');
cloudinary.config({ 
  cloud_name: 'YOUR CLOUD NAME ON CLOUDINARY', 
   api_key: 'YOUR API KEY ON CLOUDINARY', 
   api_secret: 'YOUR API SECRET KEY ON CLOUDINARY' 
});
var storage = multer.diskStorage({
  destination: 'public/uploads/',
    filename: function (req, file, cb) {
            var datetimestamp = Date.now();
            cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
        }
});
var upload =multer({storage:storage}).single('myFile');
module.exports = function(app){
	app.post('/api/image',upload,function(req,res){		
		cloudinary.uploader.upload(req.file.path,function(result) { 
  				var filePath =req.file.path; 
  				fs.unlinkSync(filePath);
  				var image = new Img();
				image.name=req.body.name;
				image.original_name=req.file.originalname;
				image.url =result.url;	 
				image.save(function(err,res1){
				 	if(err){
				 		res.json({success:false, image:[]});
				 	}
			 	else{	
				 		return res.redirect('/#!/show');
				 		}	 	
				 });
		});
	});
	app.get('/api/image', function(req, res){		
			Img.find({},function(err, image){
        		if(err)
      			res.send(err);
    			res.json({success:true, images:image});
  			});
		});
}

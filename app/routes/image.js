var Img=require('../models/image.js');
var multer=require('multer');
var express = require('express');
var fs=require('fs'); 
var app = express();

var storage = multer.diskStorage({
  destination: 'public/uploads/',
    filename: function (req, file, cb) {
            var datetimestamp = Date.now();
            cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
        }
});
var upload = multer({ storage: storage }).single('myFile');
module.exports = function(app){
	app.post('/api/image',upload,function(req,res){
		 var image = new Img();
		 image.name=req.body.name; 
		 image.image.data = req.file.path;
		 image.image.contentType =req.file.mimetype;	 
		 image.save(function(err,res1){
		 	if(err){
		 		res.json({success:false, image:[]});
		 	}
	 	else{	
		 		// res.json({success:true,image:res1});
		 		return res.redirect('/#!/show');
		 		}	 	
		 });

	});
	app.get('/api/image', function(req, res){		
			Img.find({}).exec(function (err, image) {
				var image1=[];
				if (err){
					res.json({success: false, image: []});
				} else {
					for(i=0;i<image.length;i++){
						image1[i]=new Buffer(image[i].image.data,'base64').toString().slice(15);
					}
	    			res.json({success:true, image:image1});   			
				}
			});
		});
}
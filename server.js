var cors = require('cors')
var express=require('express');
var router=express.Router();
var http=require('http');
var server=http.createServer();
var path=require('path');
var stringify = require('json-stringify-safe');
var mongoose=require('mongoose');
var bodyParser=require('body-parser');
var methodOverride=require('method-override');
var db=require('./config/db');
var app = express();
app.use(express.static('./public'));
app.use(cors());
app.set('port',process.env.PORT||80);
app.set('views',__dirname+'views');
app.set('view engine','jade');
app.use(express.static(path.join(__dirname,'public')));
mongoose.connect(db.url);

var assert = require('assert');
mongoose.connection.once('connected', function() {
  console.log("Connected to database")
});

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ 
  extended: true
}));
require('./app/routes/image.js')(app);
app.listen(3000,function(err,res){
	if(err){
		console.log('SNC');
	}
	else{
		console.log('server running on port 3000');
	}
})
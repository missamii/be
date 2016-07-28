var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var mongodb = require('mongodb');
var app = express();
var request = require('request');
PORT = process.env.PORT || 3000;

app.use(cors());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

// connect to the database server
var MongoClient = mongodb.MongoClient;

var GOOGLE_BOOKS_API = process.env.GOOGLE_BOOKS_API;


// var url = 'mongodb://heroku_jp0xr3w7:juearsuhnp8gppac1n7t31s4bq@ds029745.mlab.com:29745/heroku_jp0xr3w7/books_db';

var url = 'mongodb://localhost:27017/books_db';

mongodb.MongoClient.connect(process.env.MONGODB_URI || url, function (err, database) {
  if (err) {
    console.log(err);
    process.exit(1);
  }
});

// THANK GOD for unicorns demo & my marvel hw for the skelton of the code below.

// testing
app.get("/", function(req, res){
  res.json({"description":"HI TIFFANY"});
});

//get all books
app.get("/books", function(req, res){
  MongoClient.connect(mongoUrl, function (err, db) {
     var favbooksCollection = db.collection('books');
     if (err) {
       console.log('Unable to connect to the mongoDB server. ERROR:', err);
     } else {
       /* Get all */
       favbooksCollection.find().toArray(function (err, result) {
         if (err) {
           console.log("ERROR!", err);
           response.json("error");
         } else if (result.length) {
           console.log('Found:', result);
           response.json(result);
         } else { //
           console.log('No document(s) found with defined "find" criteria');
           response.json("nothing found");
         }
         db.close(function() {
           console.log( "database CLOSED");
         });
       }); // end find

     } // end else
   }); // end mongo connect
 }); // end get all


//add favorite books
app.post("/books/favorites", function(req, res){
  MongoClient.connect(mongoUrl, function (err, db) {
     var favbooksCollection = db.collection('books');
     if (err) {
       console.log('Unable to connect to the mongoDB server. ERROR:', err);
     } else {
       // We are connected!
       console.log('Connection established to', mongoUrl);
       console.log('add new book!');

       // Insert new favorite book!
       var newFavoriteBook = request.body;
       favbooksCollection.insert(data, function (err, result) {
         if (err) {
           console.log(err);
           response.json("error");
         } else {
           console.log('RESULT!!!!', result);
           response.json(result);
         }
         db.close(function() {
           console.log( "database CLOSED");
         });
       }); // end insert
     } // end else
   }); // end mongo connect
 }); // end add new

 // find book
 app.get('/books/:name', function(req, res){
   // response.json({"description":"find by name"});
   // console.log("request.params: ", request.params);
   MongoClient.connect(mongoUrl, function (err, db) {
     var favbooksCollection = db.collection('books');
     if (err) {
       console.log('Unable to connect to the mongoDB server. ERROR:', err);
     } else {
       // We are connected!
       console.log('Finding your saved book... ');
       /* Get */
       favebooksCollection.find(request.params).toArray(function (err, result) {
         if (err) {
           console.log("ERROR!", err);
           res.json("error");
         } else if (result.length) {
           console.log('Found:', result);
           res.json(result);
         } else { //
           console.log('No document(s) found with defined "find" criteria');
           res.json("no books found");
         }
         db.close(function() {
           console.log( "database CLOSED");
         });
       }); // end find
     } // end else
   }); // end mongo connect

 });

// delete favorite book!
app.delete('/favorites/:_id', function(req, res) {
 // console.log("request.body:", request.body);
 console.log("request.params:", request.params._id);
 // console.log(request.body.id);
 MongoClient.connect(mongoUrl, function (err, db) {
   var favbooksCollection = db.collection('books');
   if (err) {
     console.log('Unable to connect to the mongoDB server. ERROR:', err);
   } else {
     console.log('Connection established to', mongoUrl);
     console.log('Goodbye book...');

     favbooksCollection.remove({_id: ObjectId(request.body.id)}, function(err, result) {
     if (err) {
           console.log("ERROR!", err);
           res.json("error");
         } else if (result.length) {
           console.log('Found:', result);
           res.json(result);
         } else {
           console.log('No document(s) found with defined "find" criteria');
           res.json("none found");
         }
         db.close(function() {
           console.log( "database CLOSED");
         });
       });//end remove
     } // end else
   }); // end mongo connect
});//Delete Closing Tags

app.post("/", function(req, res){

// stuff will go here

var searchValue = req.body.searchValue;
var chosenEndPoint = req.body.chosenEndPoint;

request({
  url: "https://www.googleapis.com/books/v1/volumes?q=search+terms" + searchValue,
  method: "get",
  callback: function(error, response, body){
res.send(body);
        }
    });
});//end post

app.listen(PORT, function(){
  console.log('listening...');
});

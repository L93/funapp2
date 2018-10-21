// this file is to create apps
// const cors = require('cors');

const mongoose = require('mongoose');
// convention to capitalize models
const Post = require('/Users/BU-Admin/Desktop/funtime/funapp2/backend/models/post.js');
const express = require('express');

const bodyParser = require ('body-parser');
// A body parser needs to be added in order to process POST req.bodies:
// "npm install --save body-parser"

const app = express(); // express == chain of middle ware.. a "funnel" for data to go thru.

// cluster jojoDesktop: o8RKGuFt4kQufFat
// data is being saved in a "test" database as link indicates, can be overridden w/ a diff name which auto creates new db.
mongoose.connect ('mongodb+srv://jojoDesktop:o8RKGuFt4kQufFat@cluster0-lmoyq.mongodb.net/test?retryWrites=true')
.then ( () => {
  console.log('Connected to DB!') }) // confirming connection
.catch( () => {
  console.log('connection failed') // catching error
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
// can filter different types of bodies as ex shows.
// end w/ .json() to parce json data.
// and .urlencoded to parce that type of data. "{extended: false}" to only support default features of urlencoded.

// Max uses this in place of CJs npm CORS dependency:
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
     //OPTIONS implicitly sent to check for things like POST validity
     next();
});

// app.use(cors());
// app.use is to "simply use a new middleware (??)"
// "next" in app.use "continues data's journey"
// app.use((req, res, next) => {
//     console.log('First middleware');
//  next();   // --> pass data down 2 next funnel
// });

app.post("/api/posts", (req, res, next) => {
  const post =
  new Post({
  id: req.body.id,
  name: req.body.name,
  description: req.body.description,
  created: req.body.created,
  rating: req.body.rating

  });

  post.save().then(createdPost => {

  console.log('from back end w/ Post model: ' + post);

  res.status(201).json({
    message: 'Post successfully added',
    postId: createdPost._id
  // return something since this is still an end point for incoming request..'req'.
  // return something to prevent timeout.
  });

  // res status 201 = everything is ok, a new resource was created.
});
});

app.get("/api/posts",(req, res, next) => {
// can instead use app.get() here
      Post.find()
      .then(documents => {
        console.log(documents); // 'find doesnt really hold a promise but something similar to it -- huh? what is it?
        res.status(200).json({
          message: 'Posts fetched successfully!',
            posts: documents
          });
      });
  });
// max: "could use Post.find((err, documents) => {}); --a call back to retrieve data & manage errors-- but this can easily
// lead to callback hell" ..need to read more on this.
// res status 200 = everything is ok

        // --> pass data down 2 next funnel .. refered to .next() in app.use at that point



// app.use((req, res, next) => {
//     res.send('Hello from express');
//     //res.send implicitily ends the response, writting stream, return response, set right headers
//     // "and basicly do everything for us"

// });

app.put("/api/posts/:id", (req,res,next) => {
  const post = new Post ({
    _id: req.body.id,
    name: req.body.name,
    content: req.body.content
  });
  Post.updateOne({_id: req.params.id}, post ).then(
    result => { console.log(result)
      res.status(200).json({message: 'Update succesful!'});
    });
    }); 

app.delete("/api/posts/:id", (req, res, next) => { // :id example of "dynamic path segment"
  id = req.params.id;
  Post.deleteOne({_id: id}).then(result => {
    console.log(result);
    res.status(200).json({message: 'Post deleted!', id}); // <-- does res always need to be passed as a json obj?
  });
});
module.exports = app;   // exporting, like importing is diff than TS: module.export = <express variable>
// ^^ wasted an hour because exports was missing an s... dont repeat!

// exporting entire express app and middelware attached to it here.

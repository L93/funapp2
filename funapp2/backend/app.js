// this file is to create apps
// const cors = require('cors');

const mongoose = require('mongoose');
// convention to capitalize models
const Post = require('/Users/junandrepaul/Desktop/Typescript/recorveredmean/funapp2/funapp2/backend/models/post.js');
const express = require('express');

const bodyParser = require ('body-parser');
// A body parser needs to be added in order to process POST req.bodies:
// "npm install --save body-parser"


const app = express(); // express == chain of middle ware.. a "funnel" for data to go thru.

// creating image path:
const path = require('path'); // allows construction of paths "in a way thats safe on any OS (?)"
app.use('/images', express.static(path.join('funapp2/funapp2/backend/images')));
//

const MIME_TYPE_MAP = {
  'image/png' : 'png',
  'image/jpeg' : 'jpg',
  'image/jpg' : 'jpg',
};
const multer = require('multer'); // for file uploads (image in this case)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {

    // backend validation:
    const isValid = MIME_TYPE_MAP[file.mimetype]
    let error = new Error ('Invalid mime type');
    if (isValid) {
      error = null;
    }

    cb(error, 'funapp2/funapp2/backend/images'); // cb expects 2 args (error, 'path to storage folder')
    // reminder that this path is relative to server.js where app.js runs as an instance.
  },
  filename: (req, file, cb) => {
    console.log('filename called!')
    const name = file.originalname.toLowerCase().split(' ').join('-');
    // extracting file name missed file ext, pay attention to following:
    const ext = MIME_TYPE_MAP[file.mimetype]; // match file's mimetype to 1 in list. Assng val to 'ext.
    cb (null, name + '-' + Date.now() + '.' + ext);
    console.log(name + ext); // internal file name
  },
});

// Terminal to connect to cloud db:
//  Junandres-MacBook-Pro:funapp2 junandrepaul$ mongo "mongodb+srv://cluster0-lmoyq.mongodb.net/test" --username jojoDesktop

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

// <<-- Post New Item -->>
app.post("/api/posts", multer({storage: storage}).single('image'), (req, res, next) => { // notes for multer.

  // protocol property which returns "whether we're accessing server with http or https"
  const url = req.protocol + '://' + req.get('host'); // <-- constructs url for server(?)
  const post =
  new Post({
  id: req.body.id,
  name: req.body.name,
  description: req.body.description,
  created: req.body.created,
  rating: req.body.rating,
  imagePath: url + '/images/' + req.file.filename // file property by multer

  });

  post.save().then(createdPost => { // WTF does .save() do again? Mongoose propert, review!

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

// <<-- Find & return ALL items in collection -->>
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

// <<-- Modify item, find with ID -->>
app.put("/api/posts/:id", (req,res,next) => { // could use app.patch here instead
  const post = new Post ({
    _id: req.body.id,
    name: req.body.name,
    description: req.body.description,  // <-- assigning the correct variable names matters!
    created: req.body.created,
    rating: req.body.rating
  });
  Post.updateOne({_id: req.body.id}, post ).then(
    result => {
      console.log(' datails of variable transfer ' + result.id);
      console.log('data being received from front end');
      console.log( 'post: in updateOne: ' + post);
      res.status(200).json({message: 'Update succesful! Body received: ' +
      req.body.id + req.body.name + ' ' + req.body.description});
      console.log('bunch of shit just changed: ' + post)
    });
    });

    // <<-- Find Post By id -->>
app.get("/api/posts/:id", (req, res, next) => {
Post.findById(req.params.id).then(unrefinedPost => { // using post model w/ find by ID method to query db..
  if (unrefinedPost) { // max did say something about Post establishing a collection in db.. cant recall info.
    post = {id: unrefinedPost._id, name: unrefinedPost.name, description: unrefinedPost.description,
    created: unrefinedPost.created, rating: unrefinedPost.rating}
    res.status(200).json({post}) ;
    console.log('params id :' + req.params.id);
    console.log('Post being sent back is: ' + post);
  } else {
    res.status(404).json({message: 'Post not found'});
  }
});
});

app.get("/randomrequests", (req, res, next) =>
res.status(200).json(req.body))

app.post("/randomrequests", (req, res, next) =>
console.log(req.body).then(
  res.status(200).json('received and now responding with original content: ' + req.body))

 )


// <<-- Delete Post -->>
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

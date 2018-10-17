// this file is to create apps
// const cors = require('cors');


const express = require('express');

const app = express(); // express == chain of middle ware.. a "funnel" for data to go thru.

// Max uses this in place of CJs npm CORS dependency:
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
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


app.use("/api/posts",(req, res, next) => {
    const posts = [
        {   
            id: "8747834",
            name: "box",
            description: "cube",
            created: "whatve time",
            rating: "suks"

          },
        
          {
            id: "8747999",
            name: "box2",
            description: "cube2",
            created: "whatve time2",
            rating: "suks2"
          }

    ]   ;
        res.status(200).json({    //status code 200 = success
            message: 'Posts fetched successfully!',
            posts: posts
        });

        // --> pass data down 2 next funnel .. refered to .next() in app.use at that point
        console.log(JSON.stringify(posts));
        console.log('request came in!')
   });


// app.use((req, res, next) => {
//     res.send('Hello from express'); 
//     //res.send implicitily ends the response, writting stream, return response, set right headers
//     // "and basicly do everything for us"
    
// });

module.exports = app;   // exporting, like importing is diff than TS: module.export = <express variable>
// ^^ wasted an hour because exports was missing an s... dont repeat!

// exporting entire express app and middelware attached to it here.
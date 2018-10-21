const http = require('http'); // node.js import syntax
const debug = require('debug')('node-angular')
const app = require('/Users/BU-Admin/Desktop/funtime/funapp2/backend/app.js');

// const port =  process.env.PORT || 49157;
// app.set('port', port ); // hey express, set port configuration to whavtev variable port represents
// const server = http.createServer(app);
//     // res.end('createServer() response test') // used to 'end writting to the response stream"
// server.listen(port);
// // ^ This states, listen on either port 49156 or the default port host suggests


// makes sure port number is valid when trying to set up a port and receive it: (??)
const normalizePort = val => {
    var port = parseInt(val,10);

    if(isNaN(port)){
            //named pipe
        return val;
    }

    if (port >= 0) {
        //port number
        return port;
    }

    return false;
};

const onError = error => {
    if (error.syscall !== "listen") {
        throw error; // whats exactly does "throw" do?
    }

    const bind = typeof addr === "string" ? "pipe " + address : "port " + port;
    switch(error.code) {
        case "EACCES":
            console.error(bind + " requires elevated priviledges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + " is already in use");
            process.exit(1);
            break;
            default:
                throw error;
        }
};

const onListening = () => {
    const addr = server.address();
    const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
    debug("Listening on " + bind);
};

// port passed as string because .PORT on other side is typically a string.. streamlining expectations.
// as method normalizePort shows above.
const port = normalizePort(process.env.PORT || "49175"); // loadint this alone for some reason retults to cannot Get// +
// header error on this comp. Not sure it happened on zamor-imac.
app.set("port", port);

const server = http.createServer(app);
server.on("error", onError);
server.on("listening", onListening);
server.listen(port);

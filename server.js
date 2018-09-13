const http = require('http');
const express = require('express');
const socketIO = require('socket.io');



var mongoose = require("mongoose");
mongoose.Promise = global.Promise

const bodyParser = require('body-parser');


var app = express();
var server = http.createServer(app);
var io = socketIO(server);

const port = process.env.PORT || 3020;

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

var username = 'raj778';
// var encoded_user = encodeURIComponent(username);
var password = 'r@j777';
var connectPath, options;

connectPath = "mongodb://ds117719.mlab.com:17719/todoapp";
  options = {
    useNewUrlParser: true,
    auth: {
      user: username,
      password: password
    }
  }
// var conString = "mongodb://raj778:r@j777@ds117719.mlab.com:17719/todoapp";

app.use(express.static(__dirname))

// var ChatSchema = new mongoose.Schema({
//   name: String,
//   chat: String
// })
// var Chats = mongoose.model("Chats", ChatSchema)
//



mongoose.connect(connectPath, options).then(() => {
  console.log('mongodb connected');
},
(e) => {
  console.log(e);
});

var schema = new mongoose.Schema({ name: 'string', chat: 'string' });
var Chats = mongoose.model('Chats', schema);

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });
});


app.post("/chats", async (req, res) => {

    try {
        console.log(req.body);
        var chat = new Chats(req.body)

        await chat.save();
        // console.log('inside post');
        // console.log(`posting chat: ${chat}`);


        res.sendStatus(200)

        // Emit chat event
        io.emit('chat', req.body);

    } catch (error) {

        res.sendStatus(500);

        console.error(error);

    }

});

app.get("/chats", (req, res) => {

    Chats.find({}, (error, chats) => {

        res.send(chats)

    });

});








server.listen(port, () => {

    console.log("Well done, now I am listening...")

})

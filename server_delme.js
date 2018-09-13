var express = require("express")

var mongoose = require("mongoose")
mongoose.Promise = global.Promise

const bodyParser = require('body-parser');


var app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

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


io.on("connection", (socket) => {

    console.log("Socket is connected...")

});














var server = http.listen(3020, () => {

    console.log("Well done, now I am listening on ", server.address().port)

});

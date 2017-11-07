var http = require('http').Server(app);
var io = require('socket.io')(http);
app.use('/socket-io',
    express.static('node_modules/socket.io-client/dist'));
app.get('/', function (request, response) {
    response.render('chat.hbs');
});
io.on('connection', function(client){
    console.log('CONNECTED');
    client.on('disconnect', function () {
        console.log('EXITED');
    });
});


<script src="/socket-io/socket.io.js"></script>
    <script>
var server = io();
server.on('connect', function (s) {
    console.log('connected');
});
</script>


/** back end **/
client.on('incoming', function(msg){
    io.emit('chat-msg', msg);
});


/** front end **/
<input id="message" onkeypress="send_message(event)">
    <pre id="chat-box"></pre>


server.on('chat-msg', function (msg) {
    var chat = document.getElementById("chat-box");
    chat.insertAdjacentHTML('beforeend', '\n' + msg);
});
function send_message (event) {
    var char = event.which || event.keyCode;
    if (char == '13') {
        var msg = document.getElementById("message");
        server.emit('incoming', msg.value);
        msg.value = '';
    }
}
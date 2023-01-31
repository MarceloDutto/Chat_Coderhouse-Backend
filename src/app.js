import express from 'express';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io'
import router from './router/index.js';
import __dirname from './utils.js';

const port = 3000;

const app = express();

app.use(express.json());
app.use(express.static(__dirname + '/public'));


app.engine('handlebars', handlebars.engine({
    defaultLayout: ''
}));
app.set('views', __dirname + '/views');

router(app);


const httpServer = app.listen(port, () => {
    console.log(`Server running at ${port}`);
})

const io = new Server(httpServer);

let messages = [];

io.on('connection', socket => {
    console.log(`New client connected wtih id ${socket.id}`);

    socket.on('message', data => {
        messages.push(data);
        io.emit('messageLogs', messages)
    })

    socket.on('retrieveLog', () => {
        io.emit('sendLog', messages);
    })

    socket.on('userConnected', data => {
        socket.broadcast.emit('showNotification', data)
    })
})
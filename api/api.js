import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import config from '../src/config';
import * as actions from './actions/index';
import {mapUrl} from 'utils/url.js';
import PrettyError from 'pretty-error';
import http from 'http';
import cors from 'cors';
import SocketIo from 'socket.io';

const pretty = new PrettyError();
const app = express();

const server = new http.Server(app);

import axon from 'axon';
const sock = axon.socket('sub-emitter');
sock.bind(5000);

const io = new SocketIo(server);
io.path('/ws');

app.use(cors());

app.use(session({
  secret: 'react and redux rule!!!!',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60000 }
}));
app.use(bodyParser.json());


app.use((req, res) => {
  const splittedUrlPath = req.url.split('?')[0].split('/').slice(1);

  const {action, params} = mapUrl(actions, splittedUrlPath);

  if (action) {
    action(req, params)
      .then((result) => {
        if (result instanceof Function) {
          result(res);
        } else {
          res.json(result);
        }
      }, (reason) => {
        if (reason && reason.redirect) {
          res.redirect(reason.redirect);
        } else {
          console.error('API ERROR:', pretty.render(reason));
          res.status(reason.status || 500).json(reason);
        }
      });
  } else {
    res.status(404).end('NOT FOUND');
  }
});


const bufferSize = 100;
const messageBuffer = new Array(bufferSize);
let messageIndex = 0;

if (config.api.website.port) {
  const runnable = app.listen(config.api.website.port, (err) => {
    if (err) {
      console.error(err);
    }
    console.info('----\n==> 🌎  API is running on port %s', config.api.website.port);
    console.info('==> 💻  Send requests to http://%s:%s', config.api.website.host, config.api.website.port);
  });

  const sockets = [];
  sock.on('log:*', (action, payload) => {
    payload.id = messageIndex;
    messageBuffer[messageIndex % bufferSize] = payload;
    messageIndex++;
    io.emit('msg', {
      log: [payload]
    });
    console.log('emitting log message');
    /*
    sockets.forEach((s) => {
      console.log('emitting log message');
      s.emit('msg', {
        log: [payload]
      })
    })
    */
  });

  let connector = null;

  function isSocketMe(socket) {
    const match = /GT-I/.test(socket.handshake.headers['user-agent']);
    if (match) {
      connector = socket;
    }
    return match;
  }

  io.on('connection', (socket) => {
    sockets.push(socket);

    if (isSocketMe(socket)) {
      console.log(
        'DEVICE CONNECTED %s',
        socket.handshake.headers['user-agent'].match(/\((.*?)\)/).pop()
      );
    }

    if (connector) {
      io.emit('msg', {connected: true});
    }

    function history() {
      for (let index = 0; index < bufferSize; index++) {
        const msgNo = (messageIndex + index) % bufferSize;
        const msg = messageBuffer[msgNo];
        if (msg) {
          socket.emit('msg', {
            log: [msg]
          });
        }
      }
    }

    // cache should just only send the last one.
    // no need to send arrays.

    history();

    socket.on('history', history);

    console.log('Client connected, total clients: %d', sockets.length);
    socket.on('disconnect', (client) => {
      console.log('Yep Client Object');
      if (socket === connector) {
        io.emit('msg', {connected: false});
        connector = null;
      } else {
        console.log('not connector!?1');
      }
      sockets.splice(sockets.indexOf(socket), 1);
      console.log('Client disconnected, total clients: %d', sockets.length);
    });

    socket.on('input', (data) => {
      console.log('RECEIVED INPUT', data);
      io.emit('msg', data);
    });
  });
  io.listen(runnable);
} else {
  console.error('==>     ERROR: No PORT environment variable has been specified');
}

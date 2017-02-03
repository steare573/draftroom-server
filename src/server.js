import express from 'express';
import Primus from 'primus';
import PrimusEmitter from 'primus-emitter';
import { createServer } from 'http';
import debugMod from 'debug';
import socketUtil from './lib/socket/util';
import socketMgr from './lib/socket/manager';
import dispatcher from './lib/eventDispatcher';
import ChatTopic from './lib/topic/chat';
import DraftTopic from './lib/topic/draft';
import UserTopic from './lib/topic/user';

const app = express();
const port = process.env.PORT || 4000;
const server = createServer(app);
const primus = new Primus(server, { transformer: 'sockjs', parser: 'json' });
primus.use('emitter', PrimusEmitter);
const debug = debugMod('draftroom.index');

server.listen(port, () => {
  debug(`Express server listening on port ${port}`);
});

dispatcher.registerTopic('user', new UserTopic());
dispatcher.registerTopic('draft', new DraftTopic());
dispatcher.registerTopic('chat', new ChatTopic());
primus.on('connection', (spark) => {
  spark.on('data', (payload) => {
    const payloadObj = socketUtil.parsePayload(payload);

    if (payloadObj.event === 'init') {
      spark.roomId = payloadObj.data.roomId || 1; // eslint-disable-line no-param-reassign
      spark.userId = payloadObj.data.userId; // eslint-disable-line no-param-reassign
      socketMgr.addUser(payloadObj.data.roomId, payloadObj.data.userId, spark);
      payloadObj.callback();
    } else {
      payloadObj.data.roomId = spark.roomId;
      payloadObj.data.userId = spark.userId;
      dispatcher.dispatch(payloadObj.event, payloadObj.data, (err, dat) => {
        const data = dat || {};
        const status = {
          code: 200,
          message: 'OK',
        };

        if (err) {
          status.code = 500;
          status.message = err.message;
        }

        const responseData = {
          status,
          data,
        };

        if (data.responseType === 'user') {
          debug(`${payloadObj.event}.response for user`);
          responseData.data = data.data;
          socketMgr.sendUser(
            spark.roomId, spark.userId, `${payloadObj.event}.response`, responseData,
          );
          // does this really make sense
          payloadObj.callback(undefined, payloadObj.callback);
        } else {
          debug(`${payloadObj.event}.response`);
          socketMgr.sendAll(spark.roomId, `${payloadObj.event}.response`, responseData);
          payloadObj.callback(undefined, payload.callback);
        }
      });
    }
  });
});

primus.on('disconnection', () => {
  debug('spark has disconnected');
});

primus.on('error', (err) => {
  debug(`ERROR: ${err.message}`);
});

// primus.on('connection', function (spark) {
//   spark.on('data', function (payload) {

//     var event = payload.data[0];
//     var data = payload.data[1];
//     var callback = payload.data[2] || function () {};
//     if (event == 'init') {
//       spark.roomId = data.roomId;
//       spark.username = data.username;
//       socketMgr.addUser(data.roomId, data.username, spark);
//       playerService.getDraftPlayerState({roomId: spark.roomId}, function (err, res) {
//         if (!res) {
//           playerService.initializeState({roomId: spark.roomId});
//         }
//       });
//       callback();
//     } else {
//       dispatcher.dispatch(event, data, function (err, data) {
//         data = data || {};
//         var status = {
//           code: 200,
//           message: 'OK'
//         };

//         if (err) {
//           status.code = 500,
//           status.message = err.message
//         }

//         var responseData = {
//           status: status,
//           data: data
//         }

//         if(data.responseType == 'user') {
//           debug(event + '.response for user');
//           responseData.data = data.data;
//           socketMgr.sendUser(spark.roomId, spark.username, event + '.response', responseData)
//           callback(undefined, callback);
//         } else {
//           debug(event + '.response');
//           socketMgr.sendAll(spark.roomId, event + '.response', responseData );
//           callback(undefined, callback);
//         }
//       });
//     }
//   });
// });

// // primus.on('disconnection', function () {
// //   debug('spark has disconnected');
// // });

// // primus.on('error', function (err) {
// //   debug('ERROR: ' + err.message);
// // });

